# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Bounded source-only offer for the installed plugin; no user data roots."""
import argparse
import hashlib
from io import BytesIO
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
MAX_BYTES = 32 * 1024 * 1024
MAX_FILES = 4096
REQUIRED = (
    "LICENSE", "NOTICE", "README.md", "SOURCE_BUILD.md", "THIRD_PARTY_NOTICES.md",
    "plugin.yaml", "__init__.py", "desktop/app.jsx", "desktop/build.mjs",
    "desktop/package.json", "desktop/package-lock.json", "desktop/vendor/three/LICENSE",
    "desktop/vendor/three/src/Three.js", "siteform_core/api.py",
    "dashboard/manifest.json", "dashboard/plugin_api.py",
)
ROOT_FILES = {"LICENSE", "NOTICE", "README.md", "SOURCE_BUILD.md", "THIRD_PARTY_NOTICES.md",
              "plugin.yaml", "__init__.py"}
IGNORED = {"node_modules", "__pycache__", ".git", ".cache", ".pytest_cache"}


def _selected(name):
    parts = name.parts
    if any(part.startswith(".") or part in IGNORED for part in parts):
        return False
    if len(parts) == 1:
        return name.name in ROOT_FILES
    if parts[0] == "dashboard":
        return name.suffix == ".py" or (len(parts) == 2 and name.name == "manifest.json")
    if parts[0] == "siteform_core":
        return name.suffix == ".py"
    if parts[0] == "desktop":
        if parts[1] == "vendor":
            return name.suffix == ".js" or name.name in {"LICENSE", "UPSTREAM.json"}
        return len(parts) == 2 and (name.suffix in {".js", ".jsx", ".mjs"} or
               name.name in {"package.json", "package-lock.json", "THREE-LICENSE"})
    if parts[0] == "LICENSES":
        return True
    if parts[0] == "skills":
        return name.suffix == ".md"
    return parts[0] == "tessdata" and name.name in {"LICENSE", "eng.traineddata", "vie.traineddata"}


def source_files():
    root = ROOT.resolve(strict=True)
    content = {}
    total = 0

    def walk(folder):
        nonlocal total
        for path in sorted(folder.iterdir()):
            name = path.relative_to(root)
            if any(part.startswith(".") or part in IGNORED for part in name.parts):
                continue
            if path.is_symlink() or (hasattr(path, "is_junction") and path.is_junction()):
                raise ValueError("Source packaging does not follow links.")
            if path.is_dir():
                if name.parts[0] in {"siteform_core", "dashboard", "desktop", "skills", "tessdata", "LICENSES"}:
                    walk(path)
                continue
            if not _selected(name):
                continue
            if not path.resolve(strict=True).is_relative_to(root):
                raise ValueError("Source files must stay inside the plugin.")
            if len(content) >= MAX_FILES or total + path.stat().st_size > MAX_BYTES:
                raise ValueError("The source package exceeds its bounded file or byte limit.")
            data = path.read_bytes()
            total += len(data)
            if total > MAX_BYTES:
                raise ValueError("The source package exceeds its byte limit.")
            content[name.as_posix()] = data

    walk(root)
    if set(REQUIRED) - content.keys():
        raise ValueError("The installed plugin is missing required source or license files. Reinstall the complete release.")
    return dict(sorted(content.items()))


def manifest(content):
    return (json.dumps({"schema_version": 1, "license": "AGPL-3.0-only",
                       "files": {name: hashlib.sha256(data).hexdigest() for name, data in content.items()}},
                      indent=2, sort_keys=True) + "\n").encode("utf-8")


def pack():
    content = source_files()
    content["SOURCE_MANIFEST.json"] = manifest(content)
    output = BytesIO()
    with ZipFile(output, "w", compression=ZIP_DEFLATED) as archive:
        for name, data in sorted(content.items()):
            entry = ZipInfo("siteform/" + name, date_time=(2026, 1, 1, 0, 0, 0))
            entry.compress_type = ZIP_DEFLATED
            entry.external_attr = 0o100644 << 16
            archive.writestr(entry, data)
    return output.getvalue()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", action="store_true")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    if args.manifest:
        (ROOT / "SOURCE_MANIFEST.json").write_bytes(manifest(source_files()))
    if args.output:
        args.output.write_bytes(pack())
