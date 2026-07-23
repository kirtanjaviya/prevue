import { useState } from "react";
import { X, Check, AlertTriangle, Code2 } from "lucide-react";

const MetaCodeModal = ({ isOpen, onClose, metaData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const {
    title = "",
    description = "",
    url = "",
    imageUrl = "",
  } = metaData || {};

  const cleanTitle = title || "Page Title";
  const cleanDesc = description || "Page description...";
  const cleanUrl = url || "https://prevue.kirtanjaviya.dev/";
  const cleanImg = imageUrl || "https://prevue.kirtanjaviya.dev/og-image.svg";

  const rawCodeString = `<!-- Primary Meta Tags -->
<title>${cleanTitle}</title>
<meta name="title" content="${cleanTitle}" />
<meta name="description" content="${cleanDesc}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${cleanUrl}" />
<meta property="og:title" content="${cleanTitle}" />
<meta property="og:description" content="${cleanDesc}" />
<meta property="og:image" content="${cleanImg}" />

<!-- X (Twitter) -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${cleanUrl}" />
<meta property="twitter:title" content="${cleanTitle}" />
<meta property="twitter:description" content="${cleanDesc}" />
<meta property="twitter:image" content="${cleanImg}" />

<!-- Meta Tags Generated with https://prevue.kirtanjaviya.dev -->`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCodeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs font-sans animate-fade-in"
      onClick={onClose}
    >
      {/* 90-Degree Square Border Modal Container (rounded-none) */}
      <div
        className="w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden border border-neutral-300 p-5 sm:p-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Close Button (Dedicated row above warning banner) */}
        <div className="flex items-center justify-end mb-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-none transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Banner Box (90-Degree Corners) */}
        <div className="w-full bg-[#fcf8e3] border border-[#faebcc] rounded-none p-3 mb-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#8a6d3b] shrink-0">
          <AlertTriangle className="w-4 h-4 text-[#8a6d3b] shrink-0" />
          <span>Warning: Be sure to upload your image to your CMS or host.</span>
        </div>

        {/* Code View Box Replicating Exact metatags.io Typography & Spacing */}
        <div className="flex-1 overflow-x-auto overflow-y-auto bg-[#eef3f9] border border-[#d0dfef] rounded-none p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[#1a202c] scrollbar-thin">
          <div className="whitespace-pre min-w-max font-mono">
            {/* Primary Meta Tags */}
            <span className="text-[#8c9ba5] block mb-0.5">&lt;!-- Primary Meta Tags --&gt;</span>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;title&gt;</span>
              <span className="text-[#1a202c] font-normal">{cleanTitle}</span>
              <span className="text-[#2b6cb0] font-medium">&lt;/title&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">name=</span><span className="text-[#1a202c] font-normal">&quot;title&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanTitle}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">name=</span><span className="text-[#1a202c] font-normal">&quot;description&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanDesc}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>

            {/* Open Graph */}
            <span className="text-[#8c9ba5] block mt-4 mb-0.5">&lt;!-- Open Graph / Facebook --&gt;</span>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;og:type&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;website&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;og:url&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanUrl}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;og:title&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanTitle}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;og:description&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanDesc}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;og:image&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanImg}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>

            {/* X / Twitter */}
            <span className="text-[#8c9ba5] block mt-4 mb-0.5">&lt;!-- X (Twitter) --&gt;</span>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;twitter:card&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;summary_large_image&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;twitter:url&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanUrl}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;twitter:title&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanTitle}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;twitter:description&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanDesc}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>
            <div>
              <span className="text-[#2b6cb0] font-medium">&lt;meta</span> <span className="text-[#4a5568]">property=</span><span className="text-[#1a202c] font-normal">&quot;twitter:image&quot;</span> <span className="text-[#4a5568]">content=</span><span className="text-[#1a202c] font-normal">&quot;{cleanImg}&quot;</span> <span className="text-[#2b6cb0] font-medium">/&gt;</span>
            </div>

            {/* Footer Comment */}
            <span className="text-[#8c9ba5] block mt-4">&lt;!-- Meta Tags Generated with https://prevue.kirtanjaviya.dev --&gt;</span>
          </div>
        </div>

        {/* Modal Footer matching exact screenshot layout */}
        <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between shrink-0">
          <p className="text-xs sm:text-sm text-neutral-600 font-medium flex items-center gap-1.5">
            <span>Copy the code into your website</span>
            <code className="px-2 py-0.5 bg-neutral-200 text-neutral-800 font-mono text-xs rounded-none">
              &lt;head&gt;
            </code>
          </p>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-primary hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-none transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Code2 className="w-4 h-4" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetaCodeModal;
