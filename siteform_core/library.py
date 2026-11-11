# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Profile-local quota visibility and transactional, reference-safe removal."""
from hashlib import sha256
import json
from typing import Annotated

from pydantic import BaseModel, ConfigDict, StringConstraints

from . import service


class Confirmation(BaseModel):
    model_config = ConfigDict(extra="forbid")
    token: Annotated[str, StringConstraints(pattern=r"^[0-9a-f]{64}$")]
    confirmed_name: Annotated[str, StringConstraints(max_length=240)]


TABLES = ("scenes", "variants", "height_studies", "archived_studies",
          "quantity_reviews", "quantity_heads", "position_studies")


def snapshot(db):
    return {"documents":[dict(row) for row in db.execute("SELECT id,name,pages,size FROM documents ORDER BY id")],
            **{table:[dict(row) for row in db.execute(f"SELECT * FROM {table} ORDER BY rowid")]
               for table in TABLES}}


def contains(value, identifier):
    """Conservatively retain immutable records containing an exact source ID."""
    if isinstance(value, dict):
        return any(contains(item, identifier) for item in value.values())
    if isinstance(value, list):
        return any(contains(item, identifier) for item in value)
    return value == identifier


def usage():
    with service.database() as db:
        state = snapshot(db)
    documents = []
    for document in state["documents"]:
        identifier = document["id"]
        counts = {table:sum(row.get("document_id") == identifier for row in state[table])
                  for table in ("scenes","variants","quantity_reviews","position_studies")}
        counts["height_studies"] = sum(json.loads(row["data"])["source"]["sha256"] == identifier
                                       for row in state["height_studies"])
        documents.append({**document,"counts":counts})
    return {"pdf_bytes":{"used":sum(item["size"] for item in documents),"limit":service.MAX_LIBRARY_BYTES},
            "options":{"used":len(state["variants"]),"limit":100,"per_sheet_limit":16},
            "documents":documents}


def preview_in(db, kind, identifier):
    state = snapshot(db)
    blockers = []
    selected = {table:[] for table in TABLES}
    if kind == "options":
        item = next((row for row in state["variants"] if row["id"] == identifier), None)
        if item is None:
            raise ValueError("This option is not in the current profile.")
        selected["variants"] = [item]
        for table in ("scenes","variants","height_studies","position_studies"):
            for row in state[table]:
                if table == "variants" and row["id"] == identifier:
                    continue
                if contains(json.loads(row["data"]), identifier):
                    label = row.get("name") or ("Working model" if table == "scenes" else table.replace("_"," "))
                    blockers.append({"type":table,"name":label})
    elif kind == "documents":
        item = next((row for row in state["documents"] if row["id"] == identifier), None)
        if item is None:
            raise ValueError("This PDF is not in the current profile.")
        for table in ("scenes","variants","quantity_reviews","quantity_heads","position_studies"):
            selected[table] = [row for row in state[table] if row["document_id"] == identifier]
        selected["height_studies"] = [row for row in state["height_studies"]
                                      if json.loads(row["data"])["source"]["sha256"] == identifier]
        study_ids = {row["id"] for row in selected["height_studies"]}
        selected["archived_studies"] = [row for row in state["archived_studies"] if row["id"] in study_ids]
        names = {row["id"]:row["name"] for row in state["documents"]}
        for row in state["quantity_reviews"]:
            if row["document_id"] != identifier and contains(json.loads(row["data"]),identifier):
                blockers.append({"type":"quantity evidence","name":names.get(row["document_id"],"Another project")})
        removed_ids = {row["id"] for table in ("variants","height_studies","position_studies") for row in selected[table]}
        for table in ("scenes","variants","height_studies","position_studies"):
            for row in state[table]:
                if row in selected[table]:
                    continue
                data = json.loads(row["data"])
                if any(contains(data, key) for key in removed_ids | {identifier}):
                    blockers.append({"type":table,"name":row.get("name") or "Another project's saved model or study"})
    else:
        raise ValueError("Choose a PDF or saved option.")
    token = sha256(json.dumps({"kind":kind,"id":identifier,"state":state},sort_keys=True).encode()).hexdigest()
    result = {"id":identifier,"kind":kind,"name":item["name"],"token":token,
              "eligible":not blockers,"blockers":blockers,
              "counts":{table:len(rows) for table,rows in selected.items() if rows},
              "pdf_bytes":item["size"] if kind == "documents" else 0}
    return result, selected


def preview(kind, identifier):
    with service.database() as db:
        db.execute("BEGIN")
        return preview_in(db,kind,identifier)[0]


def remove(kind, identifier, confirmation):
    with service.database() as db:
        db.execute("BEGIN IMMEDIATE")
        current, selected = preview_in(db,kind,identifier)
        if confirmation.confirmed_name != current["name"]:
            raise ValueError("Enter the exact name shown in the removal preview.")
        if confirmation.token != current["token"]:
            raise service.RevisionConflict("The library changed. Review the updated removal preview before confirming again.")
        if not current["eligible"]:
            raise ValueError("This item is still referenced. Remove dependent options first or retain the source evidence.")
        for table, rows in selected.items():
            for row in rows:
                if "id" in row:
                    db.execute(f"DELETE FROM {table} WHERE id=?", (row["id"],))
                else:
                    db.execute(f"DELETE FROM {table} WHERE document_id=? AND page=?", (row["document_id"],row["page"]))
        if kind == "documents":
            db.execute("DELETE FROM documents WHERE id=?", (identifier,))
    return {"removed":identifier,"name":current["name"],"counts":current["counts"],"pdf_bytes_released":current["pdf_bytes"]}
