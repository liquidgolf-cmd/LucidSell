interface StepProps {
  listing: {
    propertyDetails: any;
    suggestedPrice?: number;
    priceRangeMin?: number;
    priceRangeMax?: number;
  };
  updatePropertyDetails: (details: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function PricingGuidanceStep({
  listing,
  updatePropertyDetails,
  nextStep,
  prevStep,
}: StepProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [guidance, setGuidance] = React.useState<{
    suggestedPrice?: number;
    priceRangeMin?: number;
    priceRangeMax?: number;
    confidence?: 'low' | 'medium' | 'high';
    rationale?: string;
    pricingTips?: string[];
  } | null>(null);

  const runPricing = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/listing/pricing-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyDetails: listing.propertyDetails }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate pricing guidance');
      }
      setGuidance(data);
      if (data.suggestedPrice) {
        updatePropertyDetails({ price: data.suggestedPrice });
      }
    } catch (e: any) {
      setError(e.message || 'Failed to generate pricing guidance');
    } finally {
      setLoading(false);
    }
  };

  const priceLabel = (value?: number) =>
    typeof value === 'number' ? `$${value.toLocaleString()}` : '—';

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Lucid can suggest a pricing range based on your property details. This is an AI
        estimate — always cross-check with actual comps and a local professional.
      </p>

      <button
        type="button"
        onClick={runPricing}
        disabled={loading}
        className="px-4 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing…' : 'Generate Pricing Guidance'}
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      {guidance && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Suggested list price
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {priceLabel(guidance.suggestedPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Range
              </p>
              <p className="text-sm text-slate-800">
                {priceLabel(guidance.priceRangeMin)} – {priceLabel(guidance.priceRangeMax)}
              </p>
              {guidance.confidence && (
                <p className="mt-1 text-[11px] text-slate-500">
                  Confidence: <span className="font-medium">{guidance.confidence}</span>
                </p>
              )}
            </div>
          </div>
          {guidance.rationale && (
            <p className="text-sm text-slate-700">{guidance.rationale}</p>
          )}
          {guidance.pricingTips && guidance.pricingTips.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-xs text-slate-700 space-y-1">
              {guidance.pricingTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white"
        >
          Continue to Preview
        </button>
      </div>
    </div>
  );
}

