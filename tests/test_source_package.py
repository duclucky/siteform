# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""A fresh source package must include the API discovery descriptor."""
from io import BytesIO
import json
from pathlib import Path
import sys
import unittest
from zipfile import ZipFile

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from siteform_core import source_access

class SourcePackage(unittest.TestCase):
    def test_dashboard_discovery_survives_packaging(self):
        with ZipFile(BytesIO(source_access.pack())) as release:
            descriptor=json.loads(release.read('siteform/dashboard/manifest.json'))
            self.assertEqual(descriptor,{'name':'siteform','api':'plugin_api.py'})
            self.assertIn('siteform/dashboard/'+descriptor['api'],release.namelist())
            self.assertIn('siteform/siteform_core/api.py',release.namelist())
            self.assertIn('siteform/examples/create_example.py',release.namelist())
            self.assertIn('siteform/tests/requirements.txt',release.namelist())
            self.assertIn('siteform/tests/test_review_fixes.py',release.namelist())
            self.assertFalse(any('node_modules' in name or 'plugin-data' in name for name in release.namelist()))

if __name__=='__main__':
    unittest.main()
