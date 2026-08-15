import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { getSanityClient } from '../../../utils/sanity';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const client = getSanityClient();
  const token = import.meta.env.SANITY_API_READ_TOKEN;

  if (!token) {
    return new Response('Chybí SANITY_API_READ_TOKEN pro náhledový režim', { status: 401 });
  }

  const clientWithToken = client.withConfig({ token });
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response('Neplatný bezpečnostní token nebo URL pro náhled', { status: 401 });
  }

  // Nastavení cookie pro náhledový režim
  cookies.set('sanity_draft_mode', 'true', {
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  return redirect(redirectTo);
};
