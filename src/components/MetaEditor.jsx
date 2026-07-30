import { useMemo } from "react";
import FileUpload from "./FileUpload";
import Button from "./Button";
import { Type, AlignLeft, Code, AlertTriangle } from "lucide-react";

// Title SEO score & indicator
const getTitleSEOStatus = (title = "") => {
  const len = title.trim().length;
  if (len === 0) {
    return {
      dotClass: "bg-red-500",
      explanation: "SEO Indicator: Missing Title. Add a title to improve search indexing and social cards."
    };
  }
  if (len < 30) {
    return {
      dotClass: "bg-amber-500",
      explanation: `SEO Indicator: Short Title (${len} chars). Aim for 30–60 characters for best SEO.`
    };
  }
  if (len <= 60) {
    return {
      dotClass: "bg-emerald-500",
      explanation: `SEO Indicator: Optimal Title Length (${len} chars). Perfect for search engines & social previews!`
    };
  }
  if (len <= 70) {
    return {
      dotClass: "bg-amber-500",
      explanation: `SEO Indicator: Near cutoff (${len} chars). Title may get slightly truncated on mobile.`
    };
  }
  return {
    dotClass: "bg-red-500",
    explanation: `SEO Indicator: Title too long (${len} chars). Will be truncated with (...) in search results (>70 chars).`
  };
};

// Description SEO score & indicator
const getDescriptionSEOStatus = (desc = "") => {
  const len = desc.trim().length;
  if (len < 50) {
    return {
      dotClass: "bg-red-500",
      explanation: len === 0
        ? "SEO Indicator: Missing Description. Add a meta description for search engines."
        : `SEO Indicator: Description too short (${len} chars). Recommended: 120–160 chars.`
    };
  }
  if (len < 120) {
    return {
      dotClass: "bg-amber-500",
      explanation: `SEO Indicator: Slightly short (${len} chars). Aim for 120–160 characters for maximum visibility.`
    };
  }
  if (len <= 160) {
    return {
      dotClass: "bg-emerald-500",
      explanation: `SEO Indicator: Optimal Description Length (${len} chars). Excellent snippet coverage across Google & Social!`
    };
  }
  if (len <= 200) {
    return {
      dotClass: "bg-amber-500",
      explanation: `SEO Indicator: Approaching truncation (${len} chars). May get truncated on social cards.`
    };
  }
  return {
    dotClass: "bg-red-500",
    explanation: `SEO Indicator: Description too long (${len} chars). Will be cut off on search results & social cards.`
  };
};

const MetaEditor = ({
  metaData,
  onChange,
  onImageSelect,
  onOpenExportModal,
  noImageWarning
}) => {
  const { title = "", description = "", imageUrl = null } = metaData || {};

  const titleSEO = useMemo(() => getTitleSEOStatus(title), [title]);
  const descSEO = useMemo(() => getDescriptionSEOStatus(description), [description]);

  const handleInputChange = (field, value) => {
    onChange({
      ...metaData,
      [field]: value
    });
  };

  return (
    <div className="w-full flex flex-col font-sans">
      <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
        METADATA
      </h2>

      <div className="space-y-5">
        <div>
          <FileUpload
            initialImage={imageUrl}
            onFileSelect={(file, objectUrl) => {
              if (onImageSelect) {
                onImageSelect(file, objectUrl);
              }
            }}
          />
          {noImageWarning && (
            <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200/60 rounded-xl shadow-xs animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-amber-800 leading-snug">
                No Open Graph image was found on this website. Please upload a fallback image above.
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-neutral-900" />
                Title
              </label>

              <div className="relative group/tooltip flex items-center">
                <span
                  className={`w-2 h-2 rounded-full ${titleSEO.dotClass} cursor-pointer transition-transform duration-200 hover:scale-125`}
                />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover/tooltip:block z-30 pointer-events-none w-max max-w-[280px]">
                  <div className="bg-neutral-900 text-white text-[11px] leading-snug font-medium px-3 py-1.5 rounded-lg shadow-xl border border-neutral-800">
                    {titleSEO.explanation}
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-neutral-400">
              {title.length} chars
            </span>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Meta Title"
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 text-neutral-900 font-normal leading-normal transition-all"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-neutral-900" />
                Description
              </label>

              <div className="relative group/tooltip flex items-center">
                <span
                  className={`w-2 h-2 rounded-full ${descSEO.dotClass} cursor-pointer transition-transform duration-200 hover:scale-125`}
                />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover/tooltip:block z-30 pointer-events-none w-max max-w-[280px]">
                  <div className="bg-neutral-900 text-white text-[11px] leading-snug font-medium px-3 py-1.5 rounded-lg shadow-xl border border-neutral-800">
                    {descSEO.explanation}
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-neutral-400">
              {description.length} chars
            </span>
          </div>

          <textarea
            rows={3}
            value={description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Meta Description"
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 text-neutral-900 font-normal leading-relaxed transition-all resize-none"
          />
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="slide"
            size="md"
            onClick={onOpenExportModal}
            className="w-full rounded-xl py-3"
          >
            <span className="flex items-center justify-center gap-2">
              <Code className="w-4 h-4" />
              <span>Get Code</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetaEditor;
