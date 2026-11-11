# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""SiteForm dashboard router loaded by Hermes."""
import sys
from pathlib import Path

root = str(Path(__file__).resolve().parents[1])
sys.path.insert(0, root)
try:
    from siteform_core.api import router
finally:
    sys.path.remove(root)
