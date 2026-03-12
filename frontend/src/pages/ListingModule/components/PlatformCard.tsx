import type { PlatformConfig } from '../../../types/listing';

interface PlatformCardProps {
  platform: PlatformConfig;
  selected: boolean;
  onToggle: () => void;
}

export function PlatformCard({ platform, selected, onToggle }: PlatformCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'w-full text-left rounded-xl border p-4 transition shadow-sm',
        selected
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-slate-200 bg-white hover:border-emerald-400',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {platform.name}
            </h3>
            {platform.recommended && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Lucid Pick
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-600">
            {platform.tier === 'free'
              ? 'Free · No MLS'
              : platform.tier === 'paid-mls'
              ? 'Flat-fee MLS access'
              : 'Flat-fee platform'}
          </p>
          {platform.cost && (
            <p className="mt-1 text-xs text-slate-700">
              Cost: <span className="font-medium">{platform.cost}</span>
              {platform.closingFee && ` · Closing fee: ${platform.closingFee}`}
            </p>
          )}
          {platform.mlsAccess && (
            <p className="mt-1 text-[11px] text-slate-600">
              MLS →{' '}
              <span className="font-medium">
                {platform.syndicatesTo.slice(0, 3).join(', ')}
              </span>
              {platform.syndicatesTo.length > 3 && ' + more'}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={[
              'inline-flex items-center justify-center rounded-full border px-2 py-1 text-[11px] font-medium',
              selected
                ? 'border-emerald-500 text-emerald-700 bg-white'
                : 'border-slate-300 text-slate-600 bg-slate-50',
            ].join(' ')}
          >
            {selected ? 'Selected' : 'Select'}
          </span>
          {platform.mlsAccess && (
            <span className="text-[10px] uppercase tracking-[0.16em] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
              MLS
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

