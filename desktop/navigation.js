// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
// Scoped handoff uses only the public SDK and plugin-owned storage.
const listeners = new Set();
export const scopeKey = (connection,profile) => JSON.stringify([connection ?? 'local',profile ?? 'default']);
const key = scope => 'studio-handoff:'+scope;
export function validHandoff(value,scope) {
  return value && value.scope === scope && /^[0-9a-f]{64}$/.test(value.document ?? '') &&
    Number.isInteger(value.page) && value.page > 0 && value.page <= 30 &&
    /^(working|[0-9a-f]{32})$/.test(value.option ?? '') && /^[0-9a-f]{64}$/.test(value.revision ?? '') &&
    typeof value.session === 'string' && value.session.length > 0 && value.session.length <= 200 &&
    (value.building === null || (typeof value.building === 'string' && value.building.length > 0 && value.building.length <= 48)) &&
    Number.isFinite(value.created) && Date.now()-value.created >= 0 && Date.now()-value.created < 3600000;
}
export function readHandoff(ctx,scope) {
  const value = ctx.storage?.get(key(scope),null);
  return validHandoff(value,scope) ? value : null;
}
export function clearHandoff(ctx,scope) {
  ctx.storage?.set(key(scope),null);
}
export function subscribeHandoff(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
export async function openStudio(ctx,host,model,session,building,ownsSession) {
  if (!ownsSession()) throw new Error('Focus the originating chat before opening Studio.');
  const connection = host.state.connectionId.get();
  const profile = host.state.profile.get();
  const scope = scopeKey(connection,profile);
  const value = {scope,document:model.scene.source.sha256,page:model.scene.source.page,
    option:model.id,revision:model.scene.revision,session,building:building?.code ?? null,created:Date.now()};
  if (!validHandoff(value,scope) || !ctx.storage) throw new Error('This model cannot be opened in Studio.');
  ctx.storage.set(key(scope),value);
  for (const listener of listeners) listener(value);
  host.navigate('/siteform');
}
export async function returnToChat(host,value,scope) {
  if (!validHandoff(value,scope) || scopeKey(host.state.connectionId.get(),host.state.profile.get()) !== scope) {
    throw new Error('The originating profile is no longer active. Reopen the chat from Sessions.');
  }
  await host.openSession(value.session,{profile:host.state.profile.get(),awaitHydration:true});
}
