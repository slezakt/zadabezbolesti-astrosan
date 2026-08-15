import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect, request }) => {
  cookies.delete('sanity_draft_mode', {
    path: '/',
  });

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirect') || '/';

  return redirect(redirectTo);
};
