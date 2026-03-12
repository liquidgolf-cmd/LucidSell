import type { PropertyDetails as PropertyDetailsType } from '../../../types/listing';

interface StepProps {
  listing: { propertyDetails: Partial<PropertyDetailsType> };
  updatePropertyDetails: (details: Partial<PropertyDetailsType>) => void;
  nextStep: () => void;
}

export function PropertyDetailsStep({
  listing,
  updatePropertyDetails,
  nextStep,
}: StepProps) {
  const p = listing.propertyDetails || {};

  const handleChange = (field: keyof PropertyDetailsType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    updatePropertyDetails({ [field]: value } as Partial<PropertyDetailsType>);
  };

  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const highlights = value
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);
    updatePropertyDetails({ highlights });
  };

  const canContinue = Boolean(p.address && p.city && p.state && p.price);

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Start with the basics. You can refine details later — Lucid just needs enough to
        generate smart copy and pricing guidance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Address
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.address || ''}
            onChange={handleChange('address')}
            placeholder="123 Main Street"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            City
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.city || ''}
            onChange={handleChange('city')}
            placeholder="Salt Lake City"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            State
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.state || ''}
            onChange={handleChange('state')}
            placeholder="UT"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            ZIP
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.zip || ''}
            onChange={handleChange('zip')}
            placeholder="84101"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            List Price
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.price ?? ''}
            onChange={handleChange('price')}
            placeholder="450000"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Beds
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.bedrooms ?? ''}
            onChange={handleChange('bedrooms')}
            placeholder="4"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Baths
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.bathrooms ?? ''}
            onChange={handleChange('bathrooms')}
            placeholder="2.5"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Square Feet
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.squareFeet ?? ''}
            onChange={handleChange('squareFeet')}
            placeholder="2100"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Lot Size
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.lotSize || ''}
            onChange={handleChange('lotSize')}
            placeholder="0.25 acres"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Year Built
          </label>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.yearBuilt ?? ''}
            onChange={handleChange('yearBuilt')}
            placeholder="1998"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Property Type
          </label>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.propertyType || 'single-family'}
            onChange={handleChange('propertyType')}
          >
            <option value="single-family">Single-family</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="multi-family">Multi-family</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            Garage
          </label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={p.garage || ''}
            onChange={handleChange('garage')}
            placeholder="2-car attached"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
          Key Features (comma separated)
        </label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={(p.highlights || []).join(', ')}
          onChange={handleHighlightChange}
          placeholder="updated kitchen, new roof, large backyard"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          disabled={!canContinue}
          className="px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Save &amp; Continue
        </button>
      </div>
    </div>
  );
}

