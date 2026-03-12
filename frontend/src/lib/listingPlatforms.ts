import type { PlatformConfig } from '../types/listing';

export const PLATFORMS: PlatformConfig[] = [
  {
    id: 'houzeo',
    name: 'Houzeo',
    tier: 'paid-mls',
    cost: '$249–$349 upfront',
    closingFee: '0.5%–1.25% at closing',
    mlsAccess: true,
    syndicatesTo: ['Zillow', 'Realtor.com', 'Redfin', 'Trulia', '100+ sites'],
    url: 'https://www.houzeo.com',
    recommended: true,
    pros: [
      'Widest MLS coverage nationwide',
      'Intuitive online dashboard',
      'Strong customer reviews (4.9★)',
      'Unlimited listing changes on Gold plan',
    ],
    cons: [
      'Closing fee on top of upfront cost',
      'Variable broker quality by state',
    ],
    submissionInstructions: [
      {
        stepNumber: 1,
        title: 'Create your Houzeo account',
        description:
          'Go to houzeo.com and click "List My Home." Select the Gold plan ($299) for best value.',
        url: 'https://www.houzeo.com',
      },
      {
        stepNumber: 2,
        title: 'Enter your property address',
        description:
          'Houzeo will confirm your local MLS coverage and assign a listing broker.',
      },
      {
        stepNumber: 3,
        title: 'Fill in property details',
        description:
          'Use your Lucid Listing Package — all the fields are pre-filled and ready to copy.',
        fieldsToFill: [
          'Address',
          'Price',
          'Beds/Baths',
          'Sq Ft',
          'Year Built',
          'Description',
          'Photos',
        ],
      },
      {
        stepNumber: 4,
        title: 'Upload your photos',
        description:
          'Upload in the order shown in your Lucid Listing Package. Lead with the exterior shot.',
      },
      {
        stepNumber: 5,
        title: 'Sign the listing agreement',
        description:
          'Houzeo sends a digital agreement with your listing broker. Review and sign electronically.',
      },
      {
        stepNumber: 6,
        title: 'Go live',
        description:
          'Your listing typically goes live on MLS within 24–48 hours, then syndicates to all major sites.',
      },
    ],
  },
  {
    id: 'homecoin',
    name: 'Homecoin',
    tier: 'paid-mls',
    cost: 'From $149',
    mlsAccess: true,
    syndicatesTo: ['Zillow', 'Realtor.com', 'Redfin', 'Trulia'],
    url: 'https://www.homecoin.com',
    recommended: false,
    pros: ['Most affordable flat fee MLS', 'Simple and direct process', 'No hidden fees'],
    cons: ['Less support than Houzeo', 'Fewer add-on features'],
    submissionInstructions: [
      {
        stepNumber: 1,
        title: 'Go to Homecoin.com',
        description: 'Select your state and choose your listing package.',
        url: 'https://www.homecoin.com',
      },
      {
        stepNumber: 2,
        title: 'Enter your listing details',
        description:
          'Use your Lucid Listing Package to copy in all property details and description.',
        fieldsToFill: ['Address', 'Price', 'Beds/Baths', 'Sq Ft', 'Description', 'Photos'],
      },
      {
        stepNumber: 3,
        title: 'Pay the flat fee',
        description: 'Pay once upfront. No commission, no closing fees.',
      },
      {
        stepNumber: 4,
        title: 'Submit and go live',
        description: 'Listing typically appears on MLS within 1–3 business days.',
      },
    ],
  },
  {
    id: 'zillow-fsbo',
    name: 'Zillow FSBO',
    tier: 'free',
    cost: 'Free',
    mlsAccess: false,
    syndicatesTo: ['Zillow', 'Trulia'],
    url: 'https://www.zillow.com/selling-options/list-by-owner/',
    recommended: false,
    pros: ['Free', 'High traffic site', 'Easy to set up'],
    cons: [
      'No MLS access',
      'Does NOT sync to Realtor.com or Redfin',
      'Less serious buyer pool',
    ],
    submissionInstructions: [
      {
        stepNumber: 1,
        title: 'Go to Zillow and create a seller account',
        description:
          'Visit zillow.com and select "List your home for sale by owner."',
        url: 'https://www.zillow.com/selling-options/list-by-owner/',
      },
      {
        stepNumber: 2,
        title: 'Claim your home',
        description: 'Search for your address and claim the property listing.',
      },
      {
        stepNumber: 3,
        title: 'Add your listing details',
        description:
          'Use your Lucid Listing Package to fill in all details and paste your description.',
        fieldsToFill: ['Price', 'Description', 'Highlights', 'Photos'],
      },
      {
        stepNumber: 4,
        title: 'Publish',
        description: 'Your listing goes live immediately on Zillow and Trulia.',
      },
    ],
  },
  {
    id: 'facebook-marketplace',
    name: 'Facebook Marketplace',
    tier: 'free',
    cost: 'Free',
    mlsAccess: false,
    syndicatesTo: [],
    url: 'https://www.facebook.com/marketplace',
    recommended: false,
    pros: ['Free', 'High local reach', 'Easy sharing to neighborhood groups'],
    cons: ['No MLS', 'More informal buyer pool', 'Manual inquiry management'],
    submissionInstructions: [
      {
        stepNumber: 1,
        title: 'Open Facebook Marketplace',
        description:
          'Log into Facebook and go to Marketplace. Click "Create new listing."',
        url: 'https://www.facebook.com/marketplace/create/item',
      },
      {
        stepNumber: 2,
        title: 'Select "Homes for sale or rent"',
        description: 'Choose the real estate category for better visibility.',
      },
      {
        stepNumber: 3,
        title: 'Enter your listing details',
        description:
          'Use your Lucid Listing Package. Keep the description punchy — buyers scroll fast.',
        fieldsToFill: ['Price', 'Address', 'Beds/Baths', 'Description', 'Photos'],
      },
      {
        stepNumber: 4,
        title: 'Share to neighborhood groups',
        description:
          'After publishing, share the listing to local neighborhood and community Facebook groups for maximum reach.',
      },
    ],
  },
];

export const getRecommendedPlatform = (): PlatformConfig => {
  return PLATFORMS.find((p) => p.recommended) || PLATFORMS[0];
};

export const getPlatformById = (id: string): PlatformConfig | undefined => {
  return PLATFORMS.find((p) => p.id === id);
};

