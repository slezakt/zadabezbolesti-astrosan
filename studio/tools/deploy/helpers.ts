export const DRAFT_TRACKED_TYPES = ['page', 'post', 'author', 'category', 'siteSettings'] as const;

export function buildDeploymentRequest(
  user: { id: string; name?: string } | null | undefined,
  note?: string,
  now = new Date().toISOString(),
) {
  if (!user?.id) throw new Error('Pro nasazení musíte být přihlášeni do Sanity Studia.');
  const requestId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `req_${Date.now()}`;
  return {
    requestId,
    set: {
      requestedAt: now,
      requestId,
      requestedById: user.id,
      ...(user.name?.trim() ? { requestedByName: user.name.trim() } : {}),
      ...(note?.trim() ? { note: note.trim().slice(0, 200) } : {}),
    },
  };
}
