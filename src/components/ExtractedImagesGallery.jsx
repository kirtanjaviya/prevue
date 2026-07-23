import { Check, Image as ImageIcon, Sparkles } from "lucide-react";

const ExtractedImagesGallery = ({
  images = [],
  selectedImageUrl = null,
  onSelectImage,
  websiteDomain = "",
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case "og":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-300/50";
      case "twitter":
        return "bg-sky-500/10 text-sky-700 border-sky-300/50";
      case "favicon":
        return "bg-amber-500/10 text-amber-700 border-amber-300/50";
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200";
    }
  };

  return (
    <div className="w-full space-y-2.5 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          <span className="text-xs font-semibold text-neutral-800">
            Extracted Website Images ({images.length})
          </span>
        </div>
        {websiteDomain && (
          <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
            {websiteDomain}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
        {images.map((img, idx) => {
          const isSelected = selectedImageUrl === img.url;
          return (
            <button
              key={`${img.url}-${idx}`}
              type="button"
              onClick={() => onSelectImage(img.url)}
              className={`relative group rounded-xl overflow-hidden border text-left transition-all cursor-pointer aspect-[16/10] bg-neutral-900/90 ${
                isSelected
                  ? "ring-2 ring-brand-primary border-brand-primary shadow-sm"
                  : "border-neutral-200 hover:border-brand-primary/60 hover:shadow-xs"
              }`}
            >
              <img
                src={img.url}
                alt={img.label || `Extracted image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image link fails to load
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Selection Check Mark Badge */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 z-10 w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Overlay with Tag Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-1.5">
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border w-max truncate max-w-full backdrop-blur-md ${getTypeBadge(
                    img.type
                  )}`}
                >
                  {img.label || "Page Media"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExtractedImagesGallery;
