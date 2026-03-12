import { ListingCard } from '../components/ListingCard';
import type { ListingState } from '../../../types/listing';

interface StepProps {
  listing: Partial<ListingState>;
  nextStep: () => void;
  prevStep: () => void;
}

export function ListingPreviewStep({ listing, nextStep, prevStep }: StepProps) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Here&apos;s how your listing will roughly appear on major portals. You can still
        go back and adjust details, photos, or description before choosing platforms.
      </p>

      <ListingCard listing={listing} />

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
          Continue to Platforms
        </button>
      </div>
    </div>
  );
}

