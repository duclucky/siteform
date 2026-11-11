"""The original first-use example creates a real source-linked model and archive."""
import importlib.util
import json
import os
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('example',ROOT/'examples/create_example.py')
example = importlib.util.module_from_spec(spec); spec.loader.exec_module(example)
from siteform_core import service, archive


class FirstUse(unittest.TestCase):
    def test_empty_library_to_saved_option(self):
        (ROOT/'.test-cache').mkdir(exist_ok=True)
        previous = os.environ.get('HERMES_HOME')
        try:
            with TemporaryDirectory(dir=ROOT/'.test-cache') as home:
                os.environ['HERMES_HOME'] = home
                output = example.generate(Path(home)/'example')
                self.assertEqual(service.documents(),[])
                key = service.import_pdf(str(output/'siteform-example.pdf'))['id']
                source = service.preview(key,1)
                self.assertEqual(tuple(source['size']),(200,100))
                service.create(key,1,json.loads((output/'confirmed-draft.json').read_text()))
                scene = service.scene(key,1)
                self.assertEqual(scene['metrics']['footprint_m2'],4150)
                self.assertEqual(scene['metrics']['volume_m3'],44550)
                self.assertAlmostEqual(scene['site_metrics']['parcel_area_m2'],14400)
                self.assertEqual(scene['site_metrics']['gross_floor_area_m2'],10700)
                option = service.save_variant(key,1,'Example baseline',scene['revision'])
                roof = service.roof_study(key,option['id'],'A roof study','A','gable',2,90,1)
                self.assertEqual(len(service.variants(key,1)),2)
                self.assertTrue(archive.pack(key,1).startswith(b'PK'))
                self.assertIn(str(output/'siteform-example.pdf'),(output/'chat-prompt.txt').read_text())
                with self.assertRaises(FileExistsError): example.generate(output)
        finally:
            if previous is None: os.environ.pop('HERMES_HOME',None)
            else: os.environ['HERMES_HOME'] = previous
