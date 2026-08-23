import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, Dialog, Flex, Heading, Stack, Text, TextInput } from '@sanity/ui';
import { useClient, useCurrentUser, type Tool } from 'sanity';
import { buildDeploymentRequest, DRAFT_TRACKED_TYPES } from './helpers';
import { deployToolStateQuery } from './queries';

export interface DeployToolOptions { actionsUrl?: string }
type State = { lastRequest: null | { requestedAt?: string | null; requestedByName?: string | null; requestedById?: string | null; note?: string | null }; draftCount: number };

export function DeployTool({ tool }: { tool: Tool<DeployToolOptions> }) {
  const baseClient = useClient({ apiVersion: '2025-02-19' });
  const client = useMemo(() => baseClient.withConfig({ perspective: 'raw', useCdn: false }), [baseClient]);
  const currentUser = useCurrentUser();
  const [state, setState] = useState<State>({ lastRequest: null, draftCount: 0 });
  const [note, setNote] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const refresh = useCallback(async () => {
    const result = await client.fetch(deployToolStateQuery, { trackedTypes: DRAFT_TRACKED_TYPES });
    setState({ lastRequest: result?.lastRequest ?? null, draftCount: Number(result?.draftCount ?? 0) });
  }, [client]);
  useEffect(() => { void refresh(); }, [refresh]);

  async function deploy() {
    setSubmitting(true);
    setMessage('');
    try {
      const payload = buildDeploymentRequest(currentUser, note);
      await client.transaction()
        .createIfNotExists({ _id: 'deploymentRequest', _type: 'deploymentRequest' })
        .patch('deploymentRequest', (patch) => note.trim() ? patch.set(payload.set) : patch.set(payload.set).unset(['note']))
        .commit();
      setMessage(`Požadavek ${payload.requestId} byl odeslán do CI.`);
      setNote('');
      setConfirm(false);
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nasazení se nepodařilo vyžádat.');
    } finally { setSubmitting(false); }
  }

  return <Box padding={[3, 4, 5]}><Stack gap={4} style={{ maxWidth: 720, margin: '0 auto' }}>
    <Card padding={4} radius={3} tone="primary" border><Stack gap={3}>
      <Heading size={2}>🚀 Nasadit web</Heading>
      <Text muted>Publikujte jednotlivé dokumenty a až potom jedním požadavkem spusťte produkční SSG build.</Text>
    </Stack></Card>
    {state.draftCount > 0 && <Card padding={3} radius={2} tone="caution" border><Text>⚠️ {state.draftCount} konceptů se v produkčním buildu neprojeví.</Text></Card>}
    {state.lastRequest && <Card padding={3} radius={2} border><Stack gap={2}>
      <Text weight="semibold">Poslední požadavek</Text>
      <Text size={1}>{state.lastRequest.requestedAt ? new Date(state.lastRequest.requestedAt).toLocaleString('cs-CZ') : '—'} · {state.lastRequest.requestedByName || state.lastRequest.requestedById}</Text>
    </Stack></Card>}
    <Card padding={4} radius={2} border><Stack gap={3}>
      <TextInput value={note} onChange={(event) => setNote(event.currentTarget.value)} maxLength={200} placeholder="Volitelná poznámka k nasazení" />
      <Flex gap={3} align="center"><Button tone="primary" text="Vyžádat produkční nasazení" onClick={() => setConfirm(true)} disabled={!currentUser || submitting} />
      {tool.options?.actionsUrl && <Button as="a" href={tool.options.actionsUrl} target="_blank" mode="ghost" text="GitHub Actions ↗" />}</Flex>
      {message && <Text size={1}>{message}</Text>}
    </Stack></Card>
    {confirm && <Dialog id="confirm-deploy" header="Potvrdit nasazení" onClose={() => !submitting && setConfirm(false)} width={1}>
      <Box padding={4}><Stack gap={4}><Text>Spustit produkční build z aktuálně publikovaného obsahu?</Text><Flex justify="flex-end" gap={2}><Button mode="ghost" text="Zrušit" onClick={() => setConfirm(false)} /><Button tone="primary" text={submitting ? 'Odesílám…' : 'Potvrdit'} onClick={() => void deploy()} disabled={submitting} /></Flex></Stack></Box>
    </Dialog>}
  </Stack></Box>;
}
