import { useListing } from '../../hooks/useListing';
import { StepIndicator } from './components/StepIndicator';
import { PropertyDetailsStep } from './steps/PropertyDetails';
import { ListingDescriptionStep } from './steps/ListingDescription';
import { PhotoUploadStep } from './steps/PhotoUpload';
import { PricingGuidanceStep } from './steps/PricingGuidance';
import { ListingPreviewStep } from './steps/ListingPreview';
import { PlatformSelectorStep } from './steps/PlatformSelector';
import { HandoffPackageStep } from './steps/HandoffPackage';

const STEP_LABELS = [
  'Property Details',
  'Description',
  'Photos',
  'Pricing',
  'Preview',
  'Choose Platforms',
  'Listing Package',
];

function ListingModule() {
  // Placeholder user id until auth is wired
  const listingHook = useListing('demo-user');
  const { listing, totalSteps } = listingHook;
  const currentStep = listing.currentStep || 1;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Your Listing</h1>
        <p className="text-slate-600 mt-1">
          Build your listing once. Publish everywhere. This module will eventually connect to Supabase and your full Lucid account.
        </p>
      </div>

      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={STEP_LABELS}
        onStepClick={listingHook.goToStep}
      />

      <div className="mt-8">
        {currentStep === 1 && <PropertyDetailsStep {...listingHook} />}
        {currentStep === 2 && <ListingDescriptionStep {...listingHook} />}
        {currentStep === 3 && <PhotoUploadStep {...listingHook} />}
        {currentStep === 4 && <PricingGuidanceStep {...listingHook} />}
        {currentStep === 5 && <ListingPreviewStep {...listingHook} />}
        {currentStep === 6 && <PlatformSelectorStep {...listingHook} />}
        {currentStep === 7 && <HandoffPackageStep {...listingHook} />}
      </div>
    </div>
  );
}

export default ListingModule;

