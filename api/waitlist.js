/**
 * Vercel serverless function: POST /api/waitlist
 * Accepts { fname, email } and returns 200 on success.
 * Add your own storage (e.g. Airtable, Supabase) via env vars when ready.
 */
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fname, email } = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  if (!fname || !email || !String(email).includes('@')) {
    return res.status(400).json({ error: 'Please provide a valid name and email.' });
  }

  // Optional: wire to Airtable, Supabase, or email service via env vars
  // e.g. await fetch(process.env.WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ fname, email }) });
  console.log('Waitlist signup:', { fname, email });

  return res.status(200).json({ ok: true });
}
