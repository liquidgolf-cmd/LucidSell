// POST /api/listing/pricing-guidance
// Uses Anthropic to return structured pricing guidance JSON for a property.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { propertyDetails } =
    typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  if (!propertyDetails || !propertyDetails.address) {
    return res
      .status(400)
      .json({ error: 'Missing property details. Address is required.' });
  }

  const prompt = `You are a real estate pricing advisor. Based on the property details below, provide pricing guidance for a FSBO seller.

Property:
- Address: ${propertyDetails.address || ''}, ${propertyDetails.city || ''}, ${
    propertyDetails.state || ''
  } ${propertyDetails.zip || ''}
- Beds/Baths: ${propertyDetails.bedrooms || '—'}bd / ${
    propertyDetails.bathrooms || '—'
  }ba
- Sq Ft: ${propertyDetails.squareFeet || '—'}
- Year Built: ${propertyDetails.yearBuilt || '—'}
- Property Type: ${propertyDetails.propertyType || 'home'}

Respond in JSON format only:
{
  "suggestedPrice": number,
  "priceRangeMin": number,
  "priceRangeMax": number,
  "confidence": "low" | "medium" | "high",
  "rationale": "2-3 sentence explanation of the pricing",
  "pricingTips": ["tip 1", "tip 2", "tip 3"]
}`;

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: 'ANTHROPIC_API_KEY is not configured on the server.' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    let raw =
      Array.isArray(data.content) && data.content[0]?.text
        ? data.content[0].text.trim()
        : '';

    if (!raw) {
      return res
        .status(500)
        .json({ error: 'Model returned no pricing guidance. Please try again.' });
    }

    raw = raw.replace(/```json|```/g, '');
    const parsed = JSON.parse(raw);
    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Pricing guidance error:', error);
    return res.status(500).json({ error: 'Failed to generate pricing guidance' });
  }
}

