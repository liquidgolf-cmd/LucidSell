interface StepProps {
  listing: {
    description: string;
    descriptionDraft: string;
  };
  isGenerating: boolean;
  error: string | null;
  generateDescription: () => Promise<void>;
  updateDescription: (value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function ListingDescriptionStep({
  listing,
  isGenerating,
  error,
  generateDescription,
  updateDescription,
  nextStep,
  prevStep,
}: StepProps) {
  const descriptionValue = listing.descriptionDraft || listing.description || '';

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Lucid will generate a professional-grade MLS description from your property
        details. You can edit the draft as much as you like.
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={generateDescription}
          disabled={isGenerating}
          className="px-4 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating…' : 'Generate Description'}
        </button>
        {listing.description && (
          <span className="text-xs text-slate-500">
            Regenerating will overwrite the current AI draft (not your edits).
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
          Listing description
        </label>
        <textarea
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm min-h-[180px]"
          value={descriptionValue}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Your AI-generated listing description will appear here. You can edit it before publishing."
        />
      </div>

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
          Continue to Photos
        </button>
      </div>
    </div>
  );
}

