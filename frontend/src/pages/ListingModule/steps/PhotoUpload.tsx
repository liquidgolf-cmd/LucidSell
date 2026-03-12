import type { ListingPhoto } from '../../../types/listing';

interface StepProps {
  listing: { photos: ListingPhoto[] };
  addPhoto: (photo: ListingPhoto) => void;
  removePhoto: (id: string) => void;
  reorderPhotos: (photos: ListingPhoto[]) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function PhotoUploadStep({
  listing,
  addPhoto,
  removePhoto,
  reorderPhotos,
  nextStep,
  prevStep,
}: StepProps) {
  const photos = listing.photos || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const list = Array.from(files);
    list.forEach((file, idx) => {
      const url = URL.createObjectURL(file);
      const photo: ListingPhoto = {
        id: `${Date.now()}-${idx}`,
        url,
        file,
        order: photos.length + idx,
        isPrimary: photos.length === 0 && idx === 0,
      };
      addPhoto(photo);
    });
    e.target.value = '';
  };

  const setPrimary = (id: string) => {
    const reordered = photos
      .map((p) => ({ ...p, isPrimary: p.id === id }))
      .sort((a, b) => (a.isPrimary === b.isPrimary ? a.order - b.order : a.isPrimary ? -1 : 1));
    reorderPhotos(reordered.map((p, idx) => ({ ...p, order: idx })));
  };

  const handleReorder = (direction: 'up' | 'down', id: string) => {
    const index = photos.findIndex((p) => p.id === id);
    if (index === -1) return;
    const newPhotos = [...photos];
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= newPhotos.length) return;
    const tmp = newPhotos[index];
    newPhotos[index] = newPhotos[swapWith];
    newPhotos[swapWith] = tmp;
    reorderPhotos(
      newPhotos.map((p, idx) => ({
        ...p,
        order: idx,
      })),
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">
        Upload your best photos and set the primary image buyers will see first. You can
        re-order photos to match how they should appear on MLS and portals.
      </p>

      <div className="border border-dashed border-slate-300 rounded-xl p-6 text-center">
        <p className="text-sm font-medium text-slate-800">Upload listing photos</p>
        <p className="text-xs text-slate-500 mt-1">
          JPEG or PNG · At least 1200px wide · Exterior front, kitchen, living, primary
          bed, baths
        </p>
        <div className="mt-4">
          <label className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            Choose files…
          </label>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((photo, idx) => (
              <div
                key={photo.id}
                className="relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50"
              >
                <img src={photo.url} alt={photo.caption || ''} className="h-32 w-full object-cover" />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white">
                  #{idx + 1}
                </div>
                {photo.isPrimary && (
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-emerald-600 text-[10px] text-white">
                    Primary
                  </div>
                )}
                <div className="flex items-center justify-between gap-1 px-2 py-1.5 bg-white border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPrimary(photo.id)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900"
                  >
                    Set primary
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleReorder('up', photo.id)}
                      className="text-[11px] text-slate-500 hover:text-slate-800"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReorder('down', photo.id)}
                      className="text-[11px] text-slate-500 hover:text-slate-800"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="text-[11px] text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

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
          Continue to Pricing
        </button>
      </div>
    </div>
  );
}

