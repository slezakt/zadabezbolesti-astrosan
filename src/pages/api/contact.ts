import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

// Jednoduchý paměťový rate limiter (3 zprávy za minutu z 1 IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const contactSchema = z.object({
  name: z.string().min(2, 'Jméno musí mít alespoň 2 znaky.'),
  email: z.string().email('Zadejte platnou e-mailovou adresu.'),
  message: z.string().min(10, 'Zpráva musí mít alespoň 10 znaků.'),
  honeypot: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minuta

  // Kontrola Rate Limitingu
  const currentLimit = rateLimitMap.get(ip);
  if (currentLimit) {
    if (now < currentLimit.resetTime) {
      if (currentLimit.count >= 3) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Byl překročen limit odeslaných zpráv. Zkuste to prosím za minutu.',
          }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
      currentLimit.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: result.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, message, honeypot, turnstileToken } = result.data;

    // Honeypot kontrola pro bota
    if (honeypot && honeypot.length > 0) {
      // Tichý úspěch bez odeslání e-mailu
      return new Response(
        JSON.stringify({ success: true, message: 'Zpráva byla úspěšně odeslána.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validace Cloudflare Turnstile tokenu (pokud je v env příslušný tajný klíč)
    const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && turnstileToken) {
      const turnstileRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: turnstileSecret,
            response: turnstileToken,
            remoteip: ip,
          }),
        }
      );

      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Ověření Cloudflare Turnstile selhalo. Zkuste to prosím znovu.',
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Zde probíhá odeslání e-mailu (např. přes Resend / SMTP)
    // Pro účely vývoje vracíme potvrzení o úspešném odeslání
    console.log(`[Formulář odeslán] Od: ${name} (${email}), Zpráva: ${message}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Děkujeme! Vaše zpráva byla úspěšně odeslána.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Při zpracování zprávy došlo k chybě na serveru.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
