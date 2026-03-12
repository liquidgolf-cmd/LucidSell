export interface PropertyDetails {
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  halfBaths: number;
  squareFeet: number;
  lotSize: string; // e.g. "0.25 acres"
  yearBuilt: number;
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family' | 'land';
  garage: string; // e.g. "2-car attached"
  hoa: boolean;
  hoaAmount?: number;
  hoaFrequency?: 'monthly' | 'quarterly' | 'annual';
  basement: boolean;
  pool: boolean;
  highlights: string[]; // User-entered key features
}

export interface ListingPhoto {
  id: string;
  url: string;
  file?: File;
  caption?: string;
  order: number;
  isPrimary: boolean;
}

export type PublishingPlatform =
  | 'houzeo'
  | 'homecoin'
  | 'fizber'
  | 'fsbo-com'
  | 'flat-fee-group'
  | 'zillow-fsbo'
  | 'facebook-marketplace'
  | 'craigslist'
  | 'forsalebyowner';

export interface ListingState {
  id?: string;
  userId: string;
  propertyDetails: Partial<PropertyDetails>;
  description: string;
  descriptionDraft: string;
  photos: ListingPhoto[];
  suggestedPrice?: number;
  priceRangeMin?: number;
  priceRangeMax?: number;
  selectedPlatforms: PublishingPlatform[];
  currentStep: number;
  status: 'draft' | 'ready' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface SubmissionStep {
  stepNumber: number;
  title: string;
  description: string;
  url?: string;
  fieldsToFill?: string[];
}

export interface PlatformConfig {
  id: PublishingPlatform;
  name: string;
  tier: 'free' | 'paid-flat-fee' | 'paid-mls';
  cost?: string;
  closingFee?: string;
  mlsAccess: boolean;
  syndicatesTo: string[];
  url: string;
  recommended: boolean;
  pros: string[];
  cons: string[];
  submissionInstructions: SubmissionStep[];
}

