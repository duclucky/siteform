# Portable verification

Use Python 3.14 and Node.js 22 on Windows, the currently advertised platform.
Check out Hermes at the tested commit, outside the plugin source roots:

```powershell
git clone https://github.com/NousResearch/hermes-agent .test-cache/hermes
git -C .test-cache/hermes checkout b200f5bc60e31588ba2cb60e288029c4a54ba5fa
python -m venv .test-cache/venv
.test-cache/venv/Scripts/python -m pip install -r tests/requirements.txt
$env:PYTHONPATH = Join-Path $pwd '.test-cache/hermes'
$env:HERMES_DISABLE_LAZY_INSTALLS = '1'
.test-cache/venv/Scripts/python -m unittest discover -s tests -v
```

The suite uses real profile storage, geometry, PDF parsing, REST routes, immutable
options, bounded studies, quantities, archive restore and source packaging.
Fixtures are original synthetic data in temporary profiles. No account or provider
key is needed. Model interpretation tests replace only the external LLM boundary.
A symlink-security case skips explicitly when the Windows account lacks symlink
permission; it runs where supported. Never run Python with `-O` for these suites.

To verify the committed Desktop bundle:

```powershell
Push-Location desktop
npm ci --no-audit --no-fund
npm run build
git diff --exit-code -- plugin.js
Pop-Location
python siteform_core/source_access.py --manifest
git diff --exit-code -- SOURCE_MANIFEST.json
```

CI executes these checks on Windows. It does not claim to test provider access or
the complete Electron application; real Desktop acceptance is a separate check.
