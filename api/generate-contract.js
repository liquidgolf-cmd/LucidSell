/**
 * Vercel serverless function: POST /api/generate-contract
 * Returns contract draft text. Add ANTHROPIC_API_KEY and templates for real generation when ready.
 */
const PLACEHOLDER = {
  contractText: `This <strong>Residential Real Estate Purchase Agreement</strong> is entered into by and between <strong>Seller</strong> and <strong>John & Jane Smith</strong> ("Buyer").<br><br><strong>1. Property.</strong> Seller agrees to sell the property located at <strong>123 Main Street</strong>, including all fixtures and improvements thereto.<br><br><strong>2. Purchase Price.</strong> Total purchase price: <strong>$458,000</strong>. Earnest money deposit of $9,160 due within 3 business days of acceptance; remainder due at closing.<br><br><strong>3. Closing Date.</strong> This transaction shall close on or before the agreed closing date. Possession transfers to Buyer at closing.<br><br><strong>4. Contingencies.</strong> Buyer obtaining financing approval within 21 days. No inspection contingency per accepted offer terms.<br><br><em style="color:var(--muted);font-size:13px;">[ Full clauses: Title, Disclosures, Default, Dispute Resolution generated in complete draft. Have a licensed attorney review before signing. ]</em>`
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // TODO: when ANTHROPIC_API_KEY or templates are ready, generate from req.body (buyer, price, address, etc.)
  return res.status(200).json(PLACEHOLDER);
}
