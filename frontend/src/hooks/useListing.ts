import { useState, useCallback } from 'react';
import type {
  ListingState,
  PropertyDetails,
  ListingPhoto,
  PublishingPlatform,
} from '../types/listing';

const TOTAL_STEPS = 7;

const initialState: Partial<ListingState> = {
  propertyDetails: {},
  description: '',
  descriptionDraft: '',
  photos: [],
  selectedPlatforms: [],
  currentStep: 1,
  status: 'draft',
};

export function useListing(userId: string) {
  const [listing, setListing] = useState<Partial<ListingState>>({
    ...initialState,
    userId,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePropertyDetails = useCallback((details: Partial<PropertyDetails>) => {
    setListing((prev) => ({
      ...prev,
      propertyDetails: { ...(prev.propertyDetails || {}), ...details },
    }));
  }, []);

  const generateDescription = useCallback(async () => {
    if (!listing.propertyDetails) return;
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch('/api/listing/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyDetails: listing.propertyDetails }),
      });
      const data = await response.json();
      setListing((prev) => ({
        ...prev,
        description: data.description,
        descriptionDraft: data.description,
      }));
    } catch (err) {
      setError('Failed to generate description. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [listing.propertyDetails]);

  const updateDescription = useCallback((description: string) => {
    setListing((prev) => ({ ...prev, descriptionDraft: description }));
  }, []);

  const addPhoto = useCallback((photo: ListingPhoto) => {
    setListing((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), photo],
    }));
  }, []);

  const removePhoto = useCallback((photoId: string) => {
    setListing((prev) => ({
      ...prev,
      photos: (prev.photos || []).filter((p) => p.id !== photoId),
    }));
  }, []);

  const reorderPhotos = useCallback((photos: ListingPhoto[]) => {
    setListing((prev) => ({ ...prev, photos }));
  }, []);

  const togglePlatform = useCallback((platform: PublishingPlatform) => {
    setListing((prev) => {
      const current = prev.selectedPlatforms || [];
      const exists = current.includes(platform);
      return {
        ...prev,
        selectedPlatforms: exists
          ? current.filter((p) => p !== platform)
          : [...current, platform],
      };
    });
  }, []);

  const nextStep = useCallback(() => {
    setListing((prev) => ({
      ...prev,
      currentStep: Math.min((prev.currentStep || 1) + 1, TOTAL_STEPS),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setListing((prev) => ({
      ...prev,
      currentStep: Math.max((prev.currentStep || 1) - 1, 1),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setListing((prev) => ({ ...prev, currentStep: step }));
  }, []);

  return {
    listing,
    isGenerating,
    error,
    totalSteps: TOTAL_STEPS,
    updatePropertyDetails,
    generateDescription,
    updateDescription,
    addPhoto,
    removePhoto,
    reorderPhotos,
    togglePlatform,
    nextStep,
    prevStep,
    goToStep,
  };
}

