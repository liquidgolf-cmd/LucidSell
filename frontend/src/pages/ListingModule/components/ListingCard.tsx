import type { ListingState } from '../../../types/listing';

interface ListingCardProps {
  listing: Partial<ListingState>;
}

export function ListingCard({ listing }: ListingCardProps) {
  const p = listing.propertyDetails || {};
  const price =
    typeof p.price === 'number'
      ? `$${p.price.toLocaleString()}`
      : p.price
      ? String(p.price)
      : '—';

  return (
    <article className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
        {(listing.photos && listing.photos[0]?.url && (
          <img
            src={listing.photos[0].url}
            alt={listing.photos[0].caption || 'Listing photo'}
            className="w-full h-full object-cover"
          />
        )) || <span>Primary photo preview</span>}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 truncate">
              {p.address || '123 Main Street'}
            </h2>
            <p className="text-xs text-slate-600">
              {[p.city, p.state, p.zip].filter(Boolean).join(', ') || 'Your city, ST ZIP'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-700">{price}</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
              For Sale
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600">
          {p.bedrooms ?? '—'} bd · {p.bathrooms ?? '—'} ba ·{' '}
          {p.squareFeet ? `${p.squareFeet.toLocaleString()} sq ft` : 'sq ft —'}
        </p>
        <p className="text-xs text-slate-600 line-clamp-3">
          {listing.descriptionDraft || listing.description || 'Your generated listing description will appear here.'}
        </p>
      </div>
    </article>
  );
}

