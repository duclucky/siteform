"""Portable end-to-end suites using real geometry, storage and REST adapters."""
import os
import unittest

import verify_siteform
import verify_siteform_options
import verify_siteform_positions
import verify_siteform_quantities
import verify_siteform_roadmap


class Integration(unittest.TestCase):
    def run_suite(self, suite):
        previous = os.environ.get('HERMES_HOME')
        try:
            suite.main()
        finally:
            if previous is None: os.environ.pop('HERMES_HOME',None)
            else: os.environ['HERMES_HOME'] = previous

    def test_core(self): self.run_suite(verify_siteform)
    def test_options(self): self.run_suite(verify_siteform_options)
    def test_positions(self): self.run_suite(verify_siteform_positions)
    def test_quantities(self): self.run_suite(verify_siteform_quantities)
    def test_roadmap(self): self.run_suite(verify_siteform_roadmap)
