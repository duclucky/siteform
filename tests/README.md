# Regression check

Run with the Python environment used by Hermes, with Hermes importable:

```sh
python -m unittest discover -s tests -v
```

When developing against a Hermes source checkout, add that checkout to
`PYTHONPATH`. The test uses an isolated temporary Hermes home and a synthetic
PDF/geometry fixture. It does not read a personal library or call a model.
It verifies immutable roof/height edits, concurrent idempotent retries, stale
revision rejection, validation, unknown building IDs and profile isolation.

The development project also exercised source packaging, PDF intake, quantities,
height/position studies, real Desktop UI and the configured OpenAI gpt-5.4 model.
A fresh public pinned install is checked separately during release preparation.
