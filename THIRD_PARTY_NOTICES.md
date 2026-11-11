# Third-party notices

Original SiteForm code is AGPL-3.0-only. Component licenses below remain intact.
The listed Python versions describe the verified local environment; only versions
explicitly pinned in plugin.yaml are installation pins. Runtime packages are
obtained by Hermes and are not embedded as Python wheels in this release.

| Component | Version | License / supplied notices | Preferred source |
|---|---|---|---|
| Three.js | 0.180.0 | MIT, desktop/vendor/three/LICENSE | https://github.com/mrdoob/three.js/tree/r180 |
| esbuild (build tool) | 0.25.12 | MIT, LICENSES/esbuild-MIT.txt | https://github.com/evanw/esbuild/tree/v0.25.12 |
| PyMuPDF | 1.26.7 | AGPL-3.0 or commercial; wrapper files carry GPL-3.0-only headers; LICENSES/PyMuPDF/COPYING, LICENSE and LICENSES/GPL-3.0.txt | https://github.com/pymupdf/PyMuPDF/tree/1.26.7 |
| MuPDF (via PyMuPDF) | supplied by PyMuPDF 1.26.7 | AGPL-3.0 or commercial | https://mupdf.com/releases/ |
| FastAPI | 0.162.0 observed | MIT, LICENSES/fastapi | https://github.com/fastapi/fastapi/tree/0.162.0 |
| python-multipart | 0.0.33 observed | Apache-2.0, LICENSES/python-multipart | https://github.com/Kludex/python-multipart/tree/0.0.33 |
| Shapely | 2.1.2 | BSD-3-Clause, LICENSES/shapely; wheel notices also cover GEOS LGPL-2.1 and Windows components | https://github.com/shapely/shapely/tree/2.1.2 |
| NumPy | 2.5.4 observed | BSD-3-Clause and included third-party notices, LICENSES/numpy | https://github.com/numpy/numpy/tree/v2.5.4 |
| Tesseract tessdata_fast English/Vietnamese | existing eng.traineddata and vie.traineddata | Apache-2.0, tessdata/LICENSE | https://github.com/tesseract-ocr/tessdata_fast |
| Hermes / plugin SDK | host-provided | MIT, LICENSES/Hermes-MIT.txt | https://github.com/NousResearch/hermes-agent |
| React | host-provided, external import | MIT; distributed by the Hermes host | https://github.com/facebook/react |

The vendored Three.js modules are byte-identical to the npm 0.180.0 tarball.
UPSTREAM.json records the registry URL and verified SHA-512 SRI. Only the dependency
graph used by SiteForm is included. No upstream source notices have been removed.
The bundle resolves preferred modules directly rather than Three.js build output.

The PyMuPDF wheel's COPYING is a dual-license notice, not the full license text.
The AGPL text is supplied in LICENSE and GPLv3 in LICENSES/GPL-3.0.txt. The wrapper's
upstream SPDX notices continue to apply to its own files. See the upstream
[licensing statement](https://pymupdf.readthedocs.io/en/latest/about.html#license-and-copyright).

The Hermes package manager resolves additional transitive Python dependencies.
Their installed metadata and license notices remain authoritative for those
separately installed distributions. If redistributing a complete runtime, audit
and include the notices and corresponding sources for that runtime as well.

This inventory and the technical source offer document release preparation; they
are not a legal certification or a commercial PyMuPDF license.
