// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useState} from 'react';
import {downloadPrepared} from './export.js';

export function SourceAccess({ctx}) {
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  async function download() {
    setBusy(true);
    setError('');
    try {await downloadPrepared(ctx,'/source/archive');}
    catch (exc) {setError(exc.message || 'Could not prepare the source download.');}
    finally {setBusy(false);}
  }
  return <div className="sf-source-access">
    <span>SiteForm · AGPL-3.0-only</span>
    <button type="button" onClick={download} disabled={busy}>
      {busy ? 'Preparing source…' : 'Download source & licenses'}
    </button>
    {error && <p role="alert">{error}</p>}
  </div>;
}
