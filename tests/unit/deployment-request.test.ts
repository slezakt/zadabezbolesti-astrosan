import { describe, expect, it } from 'vitest';
import { buildDeploymentRequest } from '../../studio/tools/deploy/helpers';

describe('deployment request', () => {
  it('requires an authenticated Studio user', () => expect(() => buildDeploymentRequest(null)).toThrow());
  it('uses stable metadata without secrets', () => {
    const result = buildDeploymentRequest({ id: 'user-1', name: ' Editor ' }, ' note ', '2026-01-01T00:00:00.000Z');
    expect(result.set).toMatchObject({ requestedById: 'user-1', requestedByName: 'Editor', note: 'note' });
  });
});
