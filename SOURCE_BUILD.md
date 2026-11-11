# Source, licenses and build

SiteForm original code is AGPL-3.0-only. Read LICENSE, NOTICE and
THIRD_PARTY_NOTICES.md. Third-party source and language data retain their licenses.
The distribution includes the preferred SiteForm source, the selected unmodified
Three.js modules, build script and npm lockfile. No private repository or service
is required to rebuild the plugin. Hermes supplies React and the plugin SDK.

## Rebuild Desktop

Use Node.js 20 or later and npm. In the extracted siteform/desktop directory:

```sh
npm ci --no-audit --no-fund
npm run build
```

This installs the pinned build-only esbuild 0.25.12 and its platform executable.
Three.js is already included under vendor/three and is not fetched during build.
build.mjs aliases three to vendor/three/src/Three.js, aliases its add-ons, and
keeps react and @hermes/plugin-sdk external. It bundles app.jsx to plugin.js.
The build fails if any node_modules source is unexpectedly bundled. License
comments and the SiteForm license banner are retained in the output.

## Backend and manifest

Python 3.12 or later and a compatible Hermes installation are required. Runtime
requirements and native tool declarations are in plugin.yaml. Hermes installs
those requirements separately. All SiteForm backend modules are provided directly
under siteform_core; dashboard/plugin_api.py loads the router. No backend compiler
or model weights are needed. The plugin uses the model configured by the user in
Hermes when a workflow requests model interpretation.

After changing or rebuilding, from the siteform directory run:

```sh
python siteform_core/source_access.py --manifest
python siteform_core/source_access.py --output siteform-source.zip
```

Use an output path outside the plugin for a release archive. The archive includes
SOURCE_MANIFEST.json with SHA-256 hashes of every other entry. These hashes attest
to the packaged bytes, not the author's identity. Paths and timestamps are stable
so identical inputs produce identical archive bytes. Changes to running source are
reflected in a fresh offer; the original manifest is not treated as an access gate.

## Source offer in Hermes

Select **Download source & licenses** at the top of the SiteForm studio or a
SiteForm model, quantity, height-study or position-study chat card. The authenticated
profile route POST /source/archive prepares a ZIP from the installed plugin tree.
Hermes's file-save bridge presents a save dialog. This uses the active Hermes
gateway and does not require an additional public source server. An operator who
exposes a modified version over a network must keep an effective source offer for
its users and satisfy the relevant AGPL obligations.

The source packer uses fixed source roots, excludes hidden directories, caches,
node_modules and profile data, rejects filesystem links, and limits content to
4,096 files and 32 MiB before compression. It never reads the library or credentials.
Missing source or license files fail visibly rather than returning a partial offer.

## Redistribution

Keep LICENSE, NOTICE, THIRD_PARTY_NOTICES.md, LICENSES, tessdata/LICENSE and the
Three.js notice with redistributions. Provide corresponding source and build
materials required by the applicable licenses, including your changes. If shipping
runtime dependencies or a complete Hermes binary, its separate dependencies and
source obligations require their own inventory; this plugin ZIP is not that bundle.
The public source repository is https://github.com/duclucky/siteform. Catalog installs pin an exact reviewed commit.
