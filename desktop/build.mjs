// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import {build} from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const result = await build({
  absWorkingDir:root, entryPoints:['app.jsx'], bundle:true, format:'esm', minify:true,
  external:['react','@hermes/plugin-sdk'], outfile:'plugin.js', legalComments:'inline',
  alias:{three:'./vendor/three/src/Three.js','three/addons':'./vendor/three/examples/jsm'},
  banner:{js:'/*! SiteForm: AGPL-3.0-only. Copyright (c) 2026 SiteForm contributors. See LICENSE and THIRD_PARTY_NOTICES.md. */'},
  metafile:true,
});
for (const input of Object.keys(result.metafile.inputs)) {
  if (input.includes('node_modules')) throw new Error('Unexpected bundled dependency: '+input);
}
console.log('Built SiteForm from '+Object.keys(result.metafile.inputs).length+' preferred-source modules.');
