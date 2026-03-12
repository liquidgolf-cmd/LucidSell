import { PLATFORMS, getRecommendedPlatform } from '../../../lib/listingPlatforms';
import type { ListingState, PublishingPlatform } from '../../../types/listing';
import { PlatformCard } from '../components/PlatformCard';

interface StepProps {
  listing: Partial<ListingState>;
  togglePlatform: (id: PublishingPlatform) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function PlatformSelectorStep({
  listing,
  togglePlatform,
  nextStep,
  prevStep,
}: StepProps) {
  const selected = listing.selectedPlatforms || [];
  const recommended = getRecommendedPlatform();

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Choose where you want your listing to appear. Lucid recommends a flat-fee MLS
        service for most sellers — that gets you onto Zillow, Realtor.com, Redfin, and
        more in one shot.
      </p>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
        <p className="font-semibold text-[11px] uppercase tracking-[0.16em]">
          Lucid Recommendation
        </p>
        <p className="mt-1">
          Start with <span className="font-medium">{recommended.name}</span> to get onto
          the MLS and all major portals. Then optionally add free channels like Zillow
          FSBO or Facebook for extra local reach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            selected={selected.includes(platform.id)}
            onToggle={() => togglePlatform(platform.id)}
          />
        ))}
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
          Continue to Listing Package
        </button>
      </div>
    </div>
  );
}

