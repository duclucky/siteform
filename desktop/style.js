// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
export const css = `
.siteform .sf-source-access{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;color:var(--sf-muted);font-size:12px}.siteform .sf-source-access button{min-height:36px;font-size:12px}.siteform .sf-source-access p{flex-basis:100%}
.siteform{--sf-bg:var(--ui-bg-chrome,#111827);--sf-card:var(--ui-bg-elevated,#1f2937);--sf-fg:var(--ui-text-primary,#f8fafc);--sf-muted:var(--ui-text-secondary,#cbd5e1);--sf-line:var(--ui-stroke-secondary,#475569);--sf-accent:var(--ui-accent,#38bdf8);color:var(--sf-fg);background:var(--sf-bg);min-height:100vh;padding:28px clamp(16px,3vw,48px) 40px;font:14px/1.5 system-ui,sans-serif}
.siteform *{box-sizing:border-box}.siteform :focus-visible{outline:2px solid var(--sf-accent);outline-offset:3px}.siteform h1{font-size:clamp(26px,4vw,39px);line-height:1.1;letter-spacing:-.035em;margin:6px 0 8px}.siteform h2{font-size:19px;line-height:1.15;margin:5px 0 10px}.siteform p{margin:5px 0 10px;color:var(--sf-muted)}.sf-header{margin:0 auto 20px;max-width:1480px}.siteform .sf-kicker{font-size:11px;letter-spacing:.13em;text-transform:uppercase;font-weight:700;color:var(--sf-muted)}
.sf-card{padding:16px;background:var(--sf-card);border:1px solid var(--sf-line);border-radius:13px;min-width:0}.sf-intake{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;margin:0 auto 16px;max-width:1480px}.sf-intake label:nth-child(2){flex:1;min-width:180px}.sf-workspace{display:grid;grid-template-columns:minmax(0,2.25fr) minmax(245px,1fr);gap:14px;align-items:start;max-width:1480px;margin:auto}.sf-results{max-width:1480px;margin:16px auto 0}.sf-bar{display:flex;justify-content:space-between;align-items:center;gap:12px}.sf-inline,.sf-candidates{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.sf-modes,.sf-candidates{margin-bottom:8px}.siteform button,.siteform input,.siteform select{color:inherit;font:inherit;border-radius:7px;border:1px solid var(--sf-line);background:var(--sf-bg);min-height:34px;padding:6px 9px}.siteform button{cursor:pointer;font-weight:600}.siteform button:hover,.siteform button[aria-pressed=true]{border-color:var(--sf-accent);background:color-mix(in srgb,var(--sf-accent) 13%,var(--sf-card))}.siteform button:disabled,.siteform input:disabled{opacity:.55;cursor:default}.siteform button.sf-primary{width:100%;margin-top:12px;background:var(--sf-accent);border-color:var(--sf-accent);color:var(--theme-background-seed,var(--sf-bg));min-height:42px}.siteform label{font-size:12px;color:var(--sf-muted);font-weight:600}.siteform label input,.siteform label select{display:block;width:100%;margin-top:4px}.siteform input[type=file]{max-width:270px}.siteform input[type=file]::file-selector-button{color:inherit;background:var(--sf-card);border:1px solid var(--sf-line);border-radius:5px;padding:3px 8px;cursor:pointer}.siteform input[type=range]{padding:0;min-height:18px;accent-color:var(--sf-accent)}
.sf-sheet-scroll{max-height:66vh;overflow:auto;border:1px solid var(--sf-line);border-radius:8px;background:#f8fafc}.sf-drawing{position:relative;cursor:crosshair}.sf-sheet-layer{position:absolute;left:50%;top:50%}.sf-drawing img{display:block;width:100%;height:100%;user-select:none;pointer-events:none}.sf-drawing svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.sf-drawing polygon,.sf-drawing rect,.sf-drawing circle,.sf-drawing polyline{stroke-width:2;vector-effect:non-scaling-stroke}.sf-region,.sf-outline{fill:#009aff30;stroke:#008dff}.sf-confirmed{fill:#0ea57236;stroke:#047653}.sf-ruler{fill:none;stroke:#ec5000}.sf-point{fill:#ff7900;stroke:#fff}.siteform .sf-caption{font-size:12px;margin:8px 0}.sf-zoom{min-width:94px}.sf-rows{display:grid;gap:9px;margin-top:10px;max-height:48vh;overflow:auto}.sf-rows fieldset{min-width:0;border:1px solid var(--sf-line);border-radius:8px;margin:0;padding:9px}.sf-rows legend{font-size:11px;color:var(--sf-muted);padding:0 4px}.sf-rows button{margin-top:7px;font-size:11px;min-height:27px}.sf-fields{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:6px}.sf-flag{color:var(--ui-status-warning,#d97706)!important}.sf-viewport,.sf-plan{width:100%;height:clamp(300px,54vh,630px);background:#101b2a;border-radius:8px;overflow:hidden}.sf-viewport{background:radial-gradient(ellipse at 50% 22%,#f1f3ef 0%,#dce4e3 51%,#afbec0 100%)}.sf-viewport canvas{display:block;width:100%;height:100%}.sf-table{overflow:auto}.sf-table table{width:100%;text-align:left;border-collapse:collapse}.sf-table th,.sf-table td{padding:8px;border-bottom:1px solid var(--sf-line)}.siteform i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}
.sf-model-summary{display:flex;gap:8px;flex-wrap:wrap;margin:2px 0 11px;color:var(--sf-muted);font-size:12px}.sf-model-summary span{padding:4px 9px;border:1px solid var(--sf-line);border-radius:6px}.sf-inspect{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding:10px;margin:10px 0;border:1px solid var(--sf-accent);border-radius:8px;background:color-mix(in srgb,var(--sf-accent) 7%,var(--sf-card))}.sf-inspect button,.siteform .sf-building-button{min-height:34px}.siteform .sf-building-button{border-color:transparent;background:transparent;text-align:left}.sf-picked{background:color-mix(in srgb,var(--sf-accent) 9%,var(--sf-card))}.sf-viewport canvas{cursor:grab}.sf-viewport canvas:active{cursor:grabbing}.sf-plan polygon{cursor:pointer}
.sf-roof-fields{display:grid;gap:6px;margin-top:8px}.sf-roof-fields .sf-caption{margin:0}.sf-variants{max-width:1480px;margin:16px auto 0}.sf-option-controls{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:7px 0 12px}.sf-option-save{display:flex;gap:7px;flex-wrap:wrap;align-items:end}.sf-option-controls label{min-width:150px}.sf-viewing{font-size:11px;font-weight:500;color:var(--sf-muted)}
@media(max-width:880px){.sf-workspace{grid-template-columns:minmax(0,1fr)}.sf-rows{max-height:none}.sf-sheet-scroll{max-height:55vh}} 
.siteform.sf-chat-model{width:100%;min-height:0;background:transparent;padding:0;margin:12px 0;overflow-wrap:anywhere}
.sf-chat-model .sf-results{margin:0}.sf-chat-model .sf-bar{flex-wrap:wrap;align-items:flex-start}
.sf-chat-model .sf-viewport,.sf-chat-model .sf-plan,.sf-chat-placeholder{min-height:240px;height:clamp(240px,36vh,360px)}
.sf-chat-model .sf-inline{gap:8px}.sf-chat-model .sf-inline button{min-height:40px}
.sf-chat-camera{margin-top:10px}
.sf-chat-tools{margin-bottom:8px}.sf-chat-tools .sf-inline{align-items:flex-end}
.sf-chat-tools select{max-width:100%;min-height:40px}
.sf-chat-tools .sf-table th,.sf-chat-tools .sf-table td{padding:6px 8px}
.sf-chat-tools .sf-table td{font-variant-numeric:tabular-nums;text-align:right}
.sf-review{border-top:1px solid var(--sf-line);padding-top:10px;margin-top:12px}
.sf-review summary{width:fit-content;cursor:pointer;font-weight:650;margin-bottom:6px}
.sf-review-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(155px,100%),1fr));gap:8px;margin:8px 0}
.sf-review-fields label{min-width:0}
.sf-removal{border:1px solid #c56843;background:var(--sf-card);margin-top:12px}
.sf-removal form{display:flex;align-items:end;gap:12px;flex-wrap:wrap;margin:12px 0}
.sf-removal label{display:flex;flex-direction:column;gap:6px;min-width:min(280px,100%)}
.sf-removal button[type=submit]{background:#9e371b;color:#fff;border-color:#9e371b}
.sf-library-row{border-top:1px solid var(--sf-line);padding:10px 0}
.sf-findings{display:grid;gap:5px;margin:8px 0;padding-left:20px}
.sf-findings button{margin-left:6px}
.sf-plan-ruler{margin-bottom:8px}.sf-plan-ruler output{font-variant-numeric:tabular-nums}
.sf-plan.sf-measuring,.sf-plan.sf-measuring polygon{cursor:crosshair}
.sf-study-trace{max-height:240px}.sf-study-save{margin-top:12px}
.sf-editor-fields{margin:0;padding:0;border:0;min-width:0}
.sf-ruler-check{display:grid;gap:6px;margin-top:10px}
.sf-ruler-detail{display:grid;justify-items:start;gap:8px;margin-top:12px;padding:10px;border:1px solid var(--sf-line);border-radius:8px}
.sf-ruler-detail .sf-caption{margin:0}
.siteform button.sf-ruler-crop{display:block;position:relative;width:100%;max-width:384px;padding:0;border:0;border-radius:0;cursor:crosshair;outline:1px solid var(--sf-line)}
.siteform button.sf-ruler-crop:focus-visible{outline:2px solid var(--sf-accent);outline-offset:2px}
.sf-ruler-crop img{display:block;width:100%;height:auto;user-select:none;pointer-events:none}
.sf-ruler-crop svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sf-ruler-crop circle,.sf-ruler-crop path{fill:none;stroke-width:1.5;vector-effect:non-scaling-stroke}
.sf-ruler-vertex{stroke:#008891}
.sf-ruler-crop path,.sf-ruler-marker{stroke:#e33c19}
.sf-calibration{display:grid;gap:3px;padding:8px 10px;border:1px solid var(--sf-line);border-radius:8px;font-size:12px}
.sf-quantity-section{max-width:1480px;margin:0 auto 16px}
.sf-quantity-section>summary{padding:12px 16px;border:1px solid var(--sf-line);border-radius:8px;cursor:pointer;font-weight:600}
.sf-quantity-section[open]>summary{margin-bottom:10px}
.sf-quantities small{display:block;font-size:11px;font-weight:400;color:var(--sf-muted);overflow-wrap:anywhere}
.sf-quantities input[type=checkbox]{width:18px;height:18px;min-height:18px;accent-color:var(--sf-accent)}
.sf-quantities .sf-option-controls{margin:12px 0}
.sf-quantities .sf-option-controls label{flex:1;min-width:140px}
.sf-quantities .sf-option-controls input[type=number]{max-width:100px}
.sf-quantity-evidence{margin:12px 0;padding:12px;background:var(--sf-bg);border:1px solid var(--sf-line);border-radius:8px}
.sf-quantity-evidence img{display:block;width:auto;max-width:100%;max-height:280px;object-fit:contain;background:white}
.sf-quantity-evidence figcaption{margin-top:8px;font-size:12px;overflow-wrap:anywhere}
.sf-quantity-calculation{padding:12px;margin:12px 0;border:1px solid var(--sf-accent);border-radius:8px}
.sf-quantity-calculation strong{font-size:20px}
.sf-manual-quantity{display:grid;gap:10px;border:1px solid var(--sf-line);border-radius:8px;padding:12px;margin-top:12px}
.sf-manual-quantity select{max-width:100%}
.sf-position-explorer{margin:16px 0}
.sf-position-explorer>summary{cursor:pointer;font-weight:600;padding:10px 0}
.sf-position-axis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;border:1px solid var(--sf-line);border-radius:8px;margin:8px 0;padding:10px;min-width:0}
.sf-position-axis legend{font-size:12px;color:var(--sf-muted)}
.sf-position-study{margin-top:14px}
.sf-position-study>.sf-results{margin-top:12px}
.sf-evidence-crop{display:block;width:100%;height:180px;background:var(--sf-bg)}
.sf-chat-model .sf-results+.sf-chat-tools{margin-top:8px}
.sf-parcel{fill:none;stroke:#2563eb;stroke-width:2;stroke-dasharray:6 3}
.sf-exclusion{fill:#be123c30;stroke:#be123c;stroke-width:2}
.siteform label input[type=checkbox]{display:inline;width:auto;min-height:0;margin:0 6px 0 0}
.sf-plan path{cursor:pointer}
.sf-plan.sf-measuring path{cursor:crosshair}
.sf-check-ruler{fill:none;stroke:#2563eb;stroke-dasharray:5 3}
.sf-intake .sf-file{flex:0 1 auto;min-width:0}
.sf-intake .sf-library-choice{flex:1;min-width:180px}
.sf-quick-edit{margin-top:12px;background:var(--sf-bg)}
.sf-quick-edit form{display:grid;gap:12px;max-width:640px}
.sf-chat-tools>.sf-inline{flex-wrap:wrap;gap:8px}
`;
