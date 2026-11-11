"""Regressions for floor quantities, zero minima and guarded library removal."""
import copy
import os
from pathlib import Path
import sys
from tempfile import TemporaryDirectory
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
os.environ['HERMES_DISABLE_LAZY_INSTALLS'] = '1'
import pymupdf as pdf
from fastapi import FastAPI
from fastapi.testclient import TestClient
from siteform_core import api, service, dossier, library


class ReviewFixes(unittest.TestCase):
    def setUp(self):
        (ROOT/'.test-cache').mkdir(exist_ok=True)
        self.home = TemporaryDirectory(dir=ROOT/'.test-cache')
        self.previous = os.environ.get('HERMES_HOME')
        os.environ['HERMES_HOME'] = self.home.name
        with pdf.open() as document:
            document.new_page(width=200, height=100)
            self.key = service.upload('Synthetic.pdf', document.tobytes())['id']
        self.draft = {'scale':{'points':[[.1,.1],[.2,.1]],'metres':20},
            'buildings':[{'code':'A','height':15,'method':'traced',
                'outline':[[.1,.2],[.4,.2],[.4,.6],[.1,.6]],
                'program':{'floors':3,'floor_height_m':3,'use':'office'}}],
            'site':{'boundary':[[0,0],[1,0],[1,1],[0,1]],'reference':'Synthetic parcel'}}
        self.working = service.save(self.key,1,service.Draft.model_validate(self.draft))
        app = FastAPI(); app.include_router(api.router)
        self.client = TestClient(app)

    def tearDown(self):
        self.client.close()
        if self.previous is None: os.environ.pop('HERMES_HOME',None)
        else: os.environ['HERMES_HOME'] = self.previous
        self.home.cleanup()

    def test_floor_and_unknown_comparison(self):
        baseline = service.save_variant(self.key,1,'Baseline',self.working['revision'])
        changed = copy.deepcopy(self.draft)
        changed['buildings'][0]['program']['floors'] = 4
        right = service.save(self.key,1,service.Draft.model_validate(changed))
        result = service.compare(self.key,1,baseline['id'],'working')
        self.assertIn('program',result['building_changes'][0]['changed'])
        self.assertEqual(result['building_changes'][0]['floor_count_delta'],1)
        self.assertEqual(result['site_comparison']['metrics']['gross_floor_area_m2']['delta'],2400)
        self.assertEqual(result['site_comparison']['metrics']['far']['delta'],.12)
        del changed['buildings'][0]['program']
        service.save(self.key,1,service.Draft.model_validate(changed))
        unknown = service.compare(self.key,1,baseline['id'],'working')['site_comparison']['metrics']['far']
        self.assertEqual(unknown['status'],'became_unknown')
        self.assertIsNone(unknown['delta'])
        changed['site']['boundary'][1][0] = .9
        service.save(self.key,1,service.Draft.model_validate(changed))
        self.assertTrue(service.compare(self.key,1,baseline['id'],'working')['site_comparison']['parcel_changed'])

    def test_zero_minima_and_positive_maxima(self):
        url = f'/documents/{self.key}/1/review'
        base = {'reference':'working','revision':self.working['revision']}
        self.assertEqual(self.client.post(url,json={**base,'limits':{'min_setback_m':0,'min_clearance_m':0}}).status_code,200)
        for limits in ({'min_setback_m':-1},{'min_clearance_m':-1},{'max_height_m':0},{'max_far':0}):
            self.assertEqual(self.client.post(url,json={**base,'limits':limits}).status_code,422)

    def test_library_preview_confirmation_and_references(self):
        baseline = service.save_variant(self.key,1,'Baseline',self.working['revision'])
        path = '/library/options/'+baseline['id']
        response = self.client.get(path+'/removal')
        self.assertEqual(response.status_code,200,response.text)
        preview = response.json()
        self.assertTrue(preview['eligible'])
        payload = {'token':preview['token'],'confirmed_name':'wrong'}
        self.assertEqual(self.client.request('DELETE',path,json=payload).status_code,400)
        child = service.save_revision(self.key,1,service.RevisionRequest(base=baseline['id'],
            revision=self.working['revision'],name='Taller',changes=[{'code':'A','height_m':16}]))
        self.assertEqual(self.client.request('DELETE',path,json={**payload,'confirmed_name':'Baseline'}).status_code,409)
        blocked = self.client.get(path+'/removal').json()
        self.assertFalse(blocked['eligible'])
        self.assertTrue(blocked['blockers'])
        child_path = '/library/options/'+child['id']
        leaf = self.client.get(child_path+'/removal').json()
        self.assertEqual(self.client.request('DELETE',child_path,json={'token':leaf['token'],'confirmed_name':'Taller'}).status_code,200)
        fresh = self.client.get(path+'/removal').json()
        self.assertTrue(fresh['eligible'])
        self.assertEqual(self.client.request('DELETE',path,json={'token':fresh['token'],'confirmed_name':'Baseline'}).status_code,200)
        self.assertEqual(service.scene(self.key,1)['revision'],self.working['revision'])
        usage = self.client.get('/library').json()
        self.assertEqual(usage['options']['used'],0)
        doc_path = '/library/documents/'+self.key
        preview = self.client.get(doc_path+'/removal').json()
        self.assertEqual(self.client.request('DELETE',doc_path,json={'token':preview['token'],'confirmed_name':'Synthetic.pdf'}).status_code,200)
        self.assertEqual(service.documents(),[])

    def test_quota_recovery_and_profile_isolation(self):
        options = [service.save_variant(self.key,1,f'Option {i}',self.working['revision']) for i in range(16)]
        with self.assertRaises(ValueError):
            service.save_variant(self.key,1,'Over quota',self.working['revision'])
        option = options[-1]
        preview = library.preview('options',option['id'])
        with TemporaryDirectory(dir=ROOT/'.test-cache') as other:
            os.environ['HERMES_HOME'] = other
            self.assertEqual(self.client.get('/library').json()['options']['used'],0)
            self.assertEqual(self.client.get('/library/options/'+option['id']+'/removal').status_code,400)
        os.environ['HERMES_HOME'] = self.home.name
        library.remove('options',option['id'],library.Confirmation(token=preview['token'],confirmed_name=option['name']))
        service.save_variant(self.key,1,'Recovered capacity',self.working['revision'])
        self.assertEqual(len(service.variants(self.key,1)),16)

    def test_quantity_history_protects_supporting_pdf(self):
        with pdf.open() as document:
            page = document.new_page()
            page.insert_text((40,40),'Site area 20000 m2')
            supporting = service.upload('Evidence.pdf',document.tobytes())['id']
        review = dossier.project_review(self.key,1,[{'document_id':supporting,'page':1,'locale':'en'}])
        dossier.project_review(self.key,1,[{'document_id':self.key,'page':1,'locale':'en'}])
        preview = library.preview('documents',supporting)
        self.assertFalse(preview['eligible'])
        self.assertTrue(any(item['type'] == 'quantity evidence' for item in preview['blockers']))
        with self.assertRaises(ValueError):
            library.remove('documents',supporting,library.Confirmation(token=preview['token'],confirmed_name='Evidence.pdf'))
        self.assertEqual(dossier.get_review(review['id'])['id'],review['id'])
        project = library.preview('documents',self.key)
        library.remove('documents',self.key,library.Confirmation(token=project['token'],confirmed_name='Synthetic.pdf'))
        self.assertTrue(library.preview('documents',supporting)['eligible'])

    def test_archived_study_preserves_baseline(self):
        baseline = service.save_variant(self.key,1,'Studied baseline',self.working['revision'])
        study = service.height_study(self.key,baseline['id'],[{'code':'A','min_m':12,'max_m':15,'step_m':1}],15,None,1)
        with service.database() as db:
            db.execute('INSERT INTO archived_studies VALUES (?)',(study['id'],))
        self.assertFalse(library.preview('options',baseline['id'])['eligible'])
        preview = library.preview('documents',self.key)
        library.remove('documents',self.key,library.Confirmation(token=preview['token'],confirmed_name='Synthetic.pdf'))
        with service.database() as db:
            self.assertEqual(db.execute('SELECT count(*) FROM archived_studies').fetchone()[0],0)
            self.assertEqual(db.execute('SELECT count(*) FROM height_studies').fetchone()[0],0)

    def test_pdf_preview_cannot_remove_a_changed_project(self):
        preview = library.preview('documents',self.key)
        service.save_variant(self.key,1,'Added after preview',self.working['revision'])
        with self.assertRaises(service.RevisionConflict):
            library.remove('documents',self.key,library.Confirmation(token=preview['token'],confirmed_name='Synthetic.pdf'))
        self.assertEqual(len(service.documents()),1)
        self.assertEqual(len(service.variants(self.key,1)),1)

    def test_use_only_change_is_reported(self):
        baseline = service.save_variant(self.key,1,'Office',self.working['revision'])
        changed = copy.deepcopy(self.draft)
        changed['buildings'][0]['program']['use'] = 'school'
        service.save(self.key,1,service.Draft.model_validate(changed))
        result = service.compare(self.key,1,baseline['id'],'working')
        row = result['building_changes'][0]
        self.assertEqual(row['changed'],['program'])
        self.assertEqual(row['left_program']['use'],'office')
        self.assertEqual(row['right_program']['use'],'school')
        self.assertEqual(result['site_comparison']['metrics']['gross_floor_area_m2']['delta'],0)


if __name__ == '__main__': unittest.main()
