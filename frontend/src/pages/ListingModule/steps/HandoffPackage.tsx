import { useState } from 'react';
import { getPlatformById } from '../../../lib/listingPlatforms';
import type { ListingState } from '../../../types/listing';

interface StepProps {
  listing: Partial<ListingState>;
  prevStep: () => void;
}

export function HandoffPackageStep({ listing, prevStep }: StepProps) {
  const [activeId, setActiveId] = useState<string | null>(
    listing.selectedPlatforms && listing.selectedPlatforms[0]
      ? String(listing.selectedPlatforms[0])
      : null,
  );

  const selectedConfigs = (listing.selectedPlatforms || [])
    .map((id) => getPlatformById(String(id)))
    .filter(Boolean);

  const activeConfig =
    (activeId && getPlatformById(activeId)) || (selectedConfigs[0] as any) || null;

  const copyToClipboard = (value: string) => {
    if (!value) return;
    navigator.clipboard?.writeText(value).catch(() => {});
  };

  const exportPackage = () => {
    const content = generateExportText(listing);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeAddress =
      listing.propertyDetails?.address?.replace(/\s+/g, '-').toLowerCase() || 'listing';
    a.download = `lucid-listing-package-${safeAddress}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-emerald-900">
          Your listing is ready to publish
        </h2>
        <p className="text-sm text-emerald-800 mt-1">
          Use this package to copy details into any flat-fee MLS or FSBO platform. Lucid
          keeps everything in one place so you don&apos;t miss a field.
        </p>
      </div>

      {/* Platform tabs */}
      {selectedConfigs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedConfigs.map((platform: any) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => setActiveId(platform.id)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium border',
                activeId === platform.id
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {platform.name}
              {platform.mlsAccess && (
                <span className="ml-1 text-[10px] uppercase tracking-[0.16em] text-sky-700">
                  MLS
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Instructions for active platform */}
      {activeConfig && (
        <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {activeConfig.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Follow these steps to publish your Lucid listing on{' '}
                {activeConfig.name}.
              </p>
            </div>
            <a
              href={activeConfig.url}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white hover:bg-slate-800"
            >
              Open {activeConfig.name} →
            </a>
          </div>
          <div className="space-y-3">
            {activeConfig.submissionInstructions.map((step: any) => (
              <div key={step.stepNumber} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                  {step.stepNumber}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{step.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                  {step.fieldsToFill && (
                    <p className="text-[11px] text-sky-700 mt-1">
                      Fields to fill: {step.fieldsToFill.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Listing Package export and quick copy */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Listing Package</h3>
          <button
            type="button"
            onClick={exportPackage}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 text-slate-700 hover:bg-white"
          >
            Download as .txt
          </button>
        </div>

        <div className="space-y-3">
          <CopyField
            label="Listing Price"
            value={
              listing.propertyDetails?.price
                ? `$${Number(listing.propertyDetails.price).toLocaleString()}`
                : ''
            }
            onCopy={copyToClipboard}
          />
          <CopyField
            label="Address"
            value={[
              listing.propertyDetails?.address,
              listing.propertyDetails?.city,
              listing.propertyDetails?.state,
              listing.propertyDetails?.zip,
            ]
              .filter(Boolean)
              .join(', ')}
            onCopy={copyToClipboard}
          />
          <CopyField
            label="Beds / Baths"
            value={`${listing.propertyDetails?.bedrooms ?? '—'} bed / ${
              listing.propertyDetails?.bathrooms ?? '—'
            } bath`}
            onCopy={copyToClipboard}
          />
          <CopyField
            label="Square Feet"
            value={
              listing.propertyDetails?.squareFeet
                ? `${Number(
                    listing.propertyDetails.squareFeet,
                  ).toLocaleString()} sq ft`
                : ''
            }
            onCopy={copyToClipboard}
          />
          <CopyField
            label="Description"
            value={listing.descriptionDraft || listing.description || ''}
            onCopy={copyToClipboard}
            multiline
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2.5 rounded-lg text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}

function CopyField({
  label,
  value,
  onCopy,
  multiline,
}: {
  label: string;
  value: string;
  onCopy: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
          {label}
        </span>
        <button
          type="button"
          onClick={() => onCopy(value)}
          className="text-[11px] text-sky-700 hover:text-sky-900"
        >
          Copy
        </button>
      </div>
      {multiline ? (
        <textarea
          readOnly
          value={value}
          rows={4}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 resize-none"
        />
      ) : (
        <div className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800">
          {value}
        </div>
      )}
    </div>
  );
}

function generateExportText(listing: Partial<ListingState>): string {
  const p = listing.propertyDetails || {};
  const price =
    typeof p.price === 'number'
      ? `$${p.price.toLocaleString()}`
      : p.price
      ? String(p.price)
      : '';

  const header = `LUCID LISTING PACKAGE
Generated by Lucid — lucidsell.com
=====================================
`;

  const propertyBlock = `
PROPERTY DETAILS
Address: ${[p.address, p.city, p.state, p.zip].filter(Boolean).join(', ')}
Price: ${price}
Bedrooms: ${p.bedrooms ?? ''}
Bathrooms: ${p.bathrooms ?? ''}
Square Feet: ${
    p.squareFeet ? Number(p.squareFeet).toLocaleString() + ' sq ft' : ''
  }
Lot Size: ${p.lotSize ?? ''}
Year Built: ${p.yearBuilt ?? ''}
Property Type: ${p.propertyType ?? ''}
Garage: ${p.garage ?? ''}
HOA: ${
    p.hoa
      ? `Yes - $${p.hoaAmount ?? ''}/${p.hoaFrequency ?? ''}`
      : p.hoa === false
      ? 'No'
      : ''
  }
Key Features: ${(p.highlights || []).join(', ')}
`;

  const descriptionBlock = `
LISTING DESCRIPTION
${listing.descriptionDraft || listing.description || ''}
`;

  const photosBlock = `
PHOTOS
${(listing.photos || [])
  .map(
    (ph, i) =>
      `Photo ${i + 1}: ${ph.url}${ph.caption ? ` — ${ph.caption}` : ''}`,
  )
  .join('\n')}
`;

  return `${header}\n${propertyBlock}\n${descriptionBlock}\n${photosBlock}\n`;
}

