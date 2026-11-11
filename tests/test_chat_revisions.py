# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Inline edits save revision-checked alternatives without mutating their source."""
import os
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
from concurrent.futures import ThreadPoolExecutor
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
(ROOT/'.test-cache').mkdir(exist_ok=True)
os.environ['HERMES_DISABLE_LAZY_INSTALLS'] = '1'
import pymupdf as pdf
from fastapi import FastAPI
from fastapi.testclient import TestClient
from siteform_core import api, service


class ChatEdits(unittest.TestCase):
    def test_revision_checked_alternatives(self):
        with TemporaryDirectory(dir=ROOT/'.test-cache') as home:
            os.environ['HERMES_HOME'] = home
            with pdf.open() as document:
                document.new_page(width=200,height=100)
                key = service.upload('drawing.pdf',document.tobytes())['id']
            draft = {'scale':{'points':[[.1,.1],[.2,.1]],'metres':20},'buildings':[
                {'code':'A','height':12,'method':'traced',
                 'outline':[[.1,.1],[.5,.1],[.5,.4],[.1,.4]],
                 'roof':{'kind':'gable','rise_m':4,'angle_deg':0}},
                {'code':'B','height':8,'method':'traced',
                 'outline':[[.6,.6],[.8,.6],[.8,.8],[.6,.8]]}]}
            working = service.save(key,1,service.Draft.model_validate(draft))
            base = service.save_variant(key,1,'Baseline',working['revision'])
            app = FastAPI(); app.include_router(api.router)
            with TestClient(app) as client:
                url = f'/documents/{key}/1/revisions'
                payload = {'base':base['id'],'revision':working['revision'],
                           'name':'Taller A','changes':[{'code':'A','height_m':14}]}
                response = client.post(url,json=payload)
                self.assertEqual(response.status_code,200,response.text)
                saved = response.json()
                result = service.variant(key,1,saved['id'])['scene']
                self.assertEqual(result['buildings'][0]['height_m'],14)
                self.assertEqual(result['buildings'][0]['roof'],working['buildings'][0]['roof'])
                self.assertEqual(result['buildings'][1],working['buildings'][1])
                self.assertEqual(client.post(url,json=payload).json(),saved)
                with ThreadPoolExecutor(max_workers=4) as pool:
                    retries = list(pool.map(lambda _: client.post(url,json=payload).json(),range(4)))
                self.assertTrue(all(item == saved for item in retries))
                flat = client.post(url,json={**payload,'name':'Flat A','changes':[{'code':'A','roof':None}]}).json()
                flat_scene = service.variant(key,1,flat['id'])['scene']
                self.assertEqual(flat_scene['buildings'][0]['height_m'],12)
                self.assertIsNone(flat_scene['buildings'][0]['roof'])
                for changes in ([{'code':'Missing','height_m':14}], [{'code':'A','height_m':12}],
                                [{'code':'A'}],
                                [{'code':'A','height_m':14},{'code':'a','height_m':15}]):
                    with self.subTest(changes=changes):
                        self.assertEqual(client.post(url,json={**payload,'name':'Invalid','changes':changes}).status_code,400)
                self.assertEqual(client.post(url,json={**payload,'revision':'0'*64,'name':'Stale'}).status_code,400)
                self.assertEqual(client.post(url,json={**payload,'changes':[{'code':'A','height_m':1001}]}).status_code,422)
                self.assertEqual(client.post(url,json={**payload,'changes':[{'code':'A','height_m':3}]}).status_code,422)
                self.assertEqual(service.scene(key,1),working)
                self.assertEqual(service.variant(key,1,base['id'])['scene'],working)
                self.assertEqual(len(service.variants(key,1)),3)
                other = Path(home)/'other-profile'; other.mkdir()
                os.environ['HERMES_HOME'] = str(other)
                self.assertEqual(client.post(url,json=payload).status_code,400)
                os.environ['HERMES_HOME'] = home


if __name__ == '__main__':
    unittest.main()
