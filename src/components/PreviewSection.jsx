import { useState } from "react";
import { Eye, Globe } from "lucide-react";

// Default social card banner asset
const DEFAULT_PREVIEW_IMG = "/og-image.svg";

// Brand SVG Icons
const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

const DiscordIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const SlackIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.323A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);

const GoogleIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
  </svg>
);

const extractDomain = (rawUrl = "") => {
  if (!rawUrl) return "prevue.kirtanjaviya.dev";
  try {
    const formatted = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    const parsed = new URL(formatted);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return rawUrl.replace(/^https?:\/\//, "").split("/")[0] || "prevue.kirtanjaviya.dev";
  }
};

const PreviewSection = ({ metaData }) => {
  const [activeTab, setActiveTab] = useState("all");

  const {
    title = "Prevue - Social Card Generator & Metadata Inspector",
    description = "Generate custom Open Graph metadata and inspect social card previews for Twitter, LinkedIn, Facebook, and Discord instantly.",
    url = "https://prevue.kirtanjaviya.dev/",
    imageUrl = null
  } = metaData || {};

  const domain = extractDomain(url);
  const displayImage = imageUrl || DEFAULT_PREVIEW_IMG;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const tabs = [
    { id: "all", label: "All Previews", icon: Eye, activeColor: "text-brand-primary" },
    { id: "twitter", label: "Twitter / X", icon: TwitterIcon, activeColor: "text-neutral-900" },
    { id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, activeColor: "text-[#0a66c2]" },
    { id: "facebook", label: "Facebook", icon: FacebookIcon, activeColor: "text-[#1877f2]" },
    { id: "discord", label: "Discord", icon: DiscordIcon, activeColor: "text-[#5865F2]" },
    { id: "slack", label: "Slack", icon: SlackIcon, activeColor: "text-[#E01E5A]" },
    { id: "google", label: "Google Search", icon: GoogleIcon, activeColor: "" },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden flex flex-col font-sans lg:h-[560px]">
      {/* Tabs Bar */}
      <div className="p-3 bg-neutral-50/70 border-b border-neutral-200/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                isActive
                  ? "bg-white text-neutral-900 shadow-xs border-neutral-200/80"
                  : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/80 border-transparent"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? tab.activeColor : "text-neutral-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Previews Display Area (Scrollable without visible scrollbars) */}
      <div className="p-5 sm:p-6 space-y-8 flex-1 min-h-0 overflow-y-auto bg-neutral-50/40 no-scrollbar">

        {/* 1. TWITTER / X PREVIEW */}
        {(activeTab === "all" || activeTab === "twitter") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <TwitterIcon className="w-3.5 h-3.5 text-neutral-900" />
                Twitter / X
              </span>
            </div>

            <div className="max-w-[500px] bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="aspect-[1200/628] w-full bg-neutral-100 overflow-hidden relative group">
                <img
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3.5 bg-white">
                <p className="text-[12px] text-neutral-500 font-normal truncate mb-0.5">
                  {domain}
                </p>
                <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1 leading-snug">
                  {title || "Untitled Card"}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed font-normal">
                  {description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. LINKEDIN PREVIEW */}
        {(activeTab === "all" || activeTab === "linkedin") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0a66c2]" />
                LinkedIn
              </span>
            </div>

            <div className="max-w-[500px] bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="aspect-[1200/628] w-full bg-neutral-100 overflow-hidden">
                <img
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 bg-[#f8f9fa] border-t border-neutral-100">
                <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1">
                  {title || "Untitled Title"}
                </h3>
                <p className="text-[11px] text-neutral-500 font-normal truncate mt-0.5">
                  {domain}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. FACEBOOK PREVIEW */}
        {(activeTab === "all" || activeTab === "facebook") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <FacebookIcon className="w-3.5 h-3.5 text-[#1877f2]" />
                Facebook
              </span>
            </div>

            <div className="max-w-[500px] bg-white border border-neutral-200/80 rounded-none sm:rounded-md overflow-hidden shadow-xs">
              <div className="aspect-[1200/628] w-full bg-neutral-100 overflow-hidden">
                <img
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-[#f2f3f5] border-t border-neutral-200">
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider truncate mb-0.5">
                  {domain}
                </p>
                <h3 className="text-sm font-bold text-neutral-900 line-clamp-1 leading-snug">
                  {title || "Untitled Card"}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-2 mt-0.5 leading-snug">
                  {description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. DISCORD PREVIEW */}
        {(activeTab === "all" || activeTab === "discord") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2]" />
                Discord
              </span>
            </div>

            <div className="max-w-[500px] bg-[#313338] text-white p-3.5 rounded-lg border-l-4 border-emerald-500 shadow-sm font-sans">
              <p className="text-[11px] text-[#b5bac1] font-semibold mb-1">
                {domain}
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-[#00a8fc] hover:underline line-clamp-1 inline-block mb-1.5"
              >
                {title || "Untitled Embed"}
              </a>
              <p className="text-xs text-[#dbdee1] leading-relaxed line-clamp-3 mb-3 font-normal">
                {description || "No description provided."}
              </p>
              <div className="aspect-[1200/628] w-full max-h-[220px] rounded-lg overflow-hidden bg-neutral-900">
                <img
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. SLACK PREVIEW */}
        {(activeTab === "all" || activeTab === "slack") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <SlackIcon className="w-3.5 h-3.5 text-[#E01E5A]" />
                Slack
              </span>
            </div>

            <div className="max-w-[500px] bg-white border-l-4 border-l-[#e8e8e8] pl-3 py-1 font-sans">
              <div className="flex items-center gap-1.5 mb-1">
                <img
                  src={faviconUrl}
                  alt={domain}
                  className="w-4 h-4 object-contain rounded-xs"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-xs font-bold text-[#1d1c1d]">{domain}</span>
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-bold text-[#1264a3] hover:underline line-clamp-1 mb-1 block"
              >
                {title || "Untitled Attachment"}
              </a>
              <p className="text-xs text-[#616061] line-clamp-2 mb-2.5 font-normal leading-relaxed">
                {description || "No description provided."}
              </p>
              <div className="aspect-[1200/628] w-full max-h-[220px] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={displayImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. GOOGLE SEARCH PREVIEW */}
        {(activeTab === "all" || activeTab === "google") && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <GoogleIcon className="w-3.5 h-3.5" />
                Google Search
              </span>
            </div>

            <div className="max-w-[580px] bg-white border border-neutral-200 p-4 rounded-xl shadow-xs font-sans">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 overflow-hidden shrink-0">
                  <img
                    src={faviconUrl}
                    alt={domain}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        e.currentTarget.nextElementSibling.classList.remove("hidden");
                      }
                    }}
                  />
                  <Globe className="w-3.5 h-3.5 text-neutral-600 hidden" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#202124] font-normal truncate">
                    {domain}
                  </p>
                  <p className="text-[11px] text-[#4d5156] font-normal truncate leading-none">
                    {url}
                  </p>
                </div>
              </div>

              <h3 className="text-base font-normal text-[#1a0dab] hover:underline cursor-pointer line-clamp-1 mb-1">
                {title || "Untitled Search Result"}
              </h3>

              <p className="text-xs text-[#4d5156] leading-normal line-clamp-2 font-normal">
                {description || "No description specified for search engines."}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PreviewSection;
