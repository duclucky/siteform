"""Verify the distributable source offer without accessing user documents."""
import hashlib
from io import BytesIO
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
os.environ["HERMES_DISABLE_LAZY_INSTALLS"] = "1"


class SourceOfferTests(unittest.TestCase):
    def test_source_offer(self):
        from siteform_core import source_access
        with ZipFile(BytesIO(source_access.pack())) as archive:
            names = archive.namelist()
            for required in ("LICENSE", "NOTICE", "SOURCE_BUILD.md", "THIRD_PARTY_NOTICES.md",
                             "desktop/build.mjs", "desktop/package-lock.json",
                             "desktop/vendor/three/src/Three.js", "siteform_core/api.py",
                             "dashboard/manifest.json"):
                self.assertIn("siteform/" + required, names)
            dashboard = json.loads(archive.read("siteform/dashboard/manifest.json"))
            self.assertEqual(dashboard, {"name":"siteform", "api":"plugin_api.py"})
            manifest = json.loads(archive.read("siteform/SOURCE_MANIFEST.json"))
            self.assertEqual(len(manifest["files"]), len(names) - 1)
            for name, digest in manifest["files"].items():
                self.assertEqual(hashlib.sha256(archive.read("siteform/" + name)).hexdigest(), digest)
            self.assertFalse(any("node_modules" in name or "__pycache__" in name for name in names))

    def test_data_exclusion_and_limits(self):
        from siteform_core import source_access
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in source_access.REQUIRED:
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("example", encoding="utf-8")
            for name in ("auth.json", ".env", "desktop/.env", "siteform_core/auth.json",
                         "desktop/node_modules/stolen.js", "plugin-data/library.sqlite3",
                         "desktop/.cache/secret.js", "siteform_core/__pycache__/secret.py"):
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("DO-NOT-PUBLISH", encoding="utf-8")
            # This is a modified copy: the offer must contain the running sources.
            (root / "siteform_core/api.py").write_text("modified source", encoding="utf-8")
            with patch.object(source_access, "ROOT", root):
                data = source_access.pack()
                with ZipFile(BytesIO(data)) as archive:
                    self.assertEqual(archive.read("siteform/siteform_core/api.py"), b"modified source")
                    self.assertNotIn(b"DO-NOT-PUBLISH", b"".join(archive.read(n) for n in archive.namelist()))
                with patch.object(source_access, "MAX_BYTES", 1):
                    with self.assertRaises(ValueError):
                        source_access.pack()
                with patch.object(source_access, "MAX_FILES", 1):
                    with self.assertRaises(ValueError):
                        source_access.pack()
                (root / "LICENSE").unlink()
                with self.assertRaises(ValueError):
                    source_access.pack()

    def test_link_rejection(self):
        from siteform_core import source_access
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "desktop").mkdir()
            try:
                (root / "desktop/leak.js").symlink_to(Path(__file__))
            except OSError:
                self.skipTest("This Windows account cannot create symlinks")
            with patch.object(source_access, "ROOT", root):
                with self.assertRaisesRegex(ValueError, "links"):
                    source_access.pack()

    def test_download_route(self):
        from fastapi import FastAPI
        from fastapi.testclient import TestClient
        from siteform_core.api import router
        from siteform_core import source_access
        with tempfile.TemporaryDirectory() as folder, patch.dict(os.environ, {"HERMES_HOME":folder}):
            app = FastAPI()
            app.include_router(router)
            with TestClient(app) as client:
                result = client.post("/source/archive")
                self.assertEqual(result.status_code, 200, result.text)
                target = Path(result.json()["path"])
                # Windows runners may expose TEMP through an 8.3 alias; compare
                # canonical paths on both sides of the profile boundary.
                self.assertTrue(target.is_relative_to(Path(folder).resolve()))
                self.assertEqual(target.parent, Path(folder).resolve()/"plugin-data/siteform/downloads")
                with ZipFile(target) as archive:
                    self.assertIn("siteform/LICENSE", archive.namelist())
                with patch.object(source_access, "MAX_BYTES", 1):
                    self.assertEqual(client.post("/source/archive").status_code, 400)


if __name__ == "__main__":
    unittest.main()
