// POST /api/listing/generate-description
// Uses Anthropic to generate an MLS-style listing description from property details.

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

  const prompt = `You are an expert real estate copywriter. Write a compelling MLS listing description for this property.

Property Details:
- Address: ${propertyDetails.address || ''}, ${propertyDetails.city || ''}, ${
    propertyDetails.state || ''
  }
- Price: ${
    propertyDetails.price
      ? '$' + Number(propertyDetails.price).toLocaleString()
      : 'TBD'
  }
- Bedrooms: ${propertyDetails.bedrooms || '—'} | Bathrooms: ${
    propertyDetails.bathrooms || '—'
  }
- Square Feet: ${
    propertyDetails.squareFeet
      ? Number(propertyDetails.squareFeet).toLocaleString()
      : '—'
  }
- Lot Size: ${propertyDetails.lotSize || '—'}
- Year Built: ${propertyDetails.yearBuilt || '—'}
- Property Type: ${propertyDetails.propertyType || 'home'}
- Garage: ${propertyDetails.garage || '—'}
- HOA: ${
    propertyDetails.hoa
      ? `Yes (${propertyDetails.hoaAmount || '—'}/${
          propertyDetails.hoaFrequency || '—'
        })`
      : 'No'
  }
- Key Features: ${(propertyDetails.highlights || []).join(', ')}

Write a 150–200 word listing description that:
1. Opens with a strong hook about the home's best feature
2. Highlights the top 3–4 selling points naturally
3. Mentions the neighborhood or location appeal
4. Closes with a call to action
5. Uses professional real estate language without clichés like "charming" or "cozy"
6. Is formatted as a single paragraph

Return only the description text. No labels, no quotes.`;

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
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const text =
      Array.isArray(data.content) && data.content[0]?.text
        ? data.content[0].text.trim()
        : '';

    if (!text) {
      return res
        .status(500)
        .json({ error: 'Model returned no description. Please try again.' });
    }

    return res.status(200).json({ description: text });
  } catch (error) {
    console.error('Description generation error:', error);
    return res.status(500).json({ error: 'Failed to generate description' });
  }
}

