/**
 * Vercel serverless function: POST /api/generate-listing
 * Returns listing copy (MLS, Zillow headline, social). Add ANTHROPIC_API_KEY and call Claude for real AI copy when ready.
 */
const PLACEHOLDER = {
  mlsCopy: 'Nestled on a quiet cul-de-sac in one of the area\'s most sought-after neighborhoods, this beautifully maintained 4-bedroom, 2.5-bath residence offers the perfect blend of refined living and everyday comfort. The thoughtfully updated kitchen serves as the heart of the home, with seamless flow to the expansive backyard — ideal for entertaining or unwinding. Top-rated schools are minutes away, downtown is easily accessible. <strong>Priced at $450,000.</strong> Schedule your private showing today.',
  zillowCopy: 'Quiet Cul-De-Sac · Updated Kitchen · 4BR/2.5BA · Top Schools · $450K',
  socialCopy: '🏡 Just listed in [City]! 4 bed · 2.5 bath · 2,100 sqft. Updated kitchen, large backyard, top-rated schools nearby. Open house this Saturday! DM for details. #JustListed #ForSale'
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // TODO: when ANTHROPIC_API_KEY is set, call Claude with req.body (address, beds, baths, etc.) and return generated copy
  return res.status(200).json(PLACEHOLDER);
}
