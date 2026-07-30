import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";

const OgSearch = ({ onSearch, onUrlChange, isLoading = false, externalError = "" }) => {
  const [query, setQuery] = useState("https://prevue.kirtanjaviya.dev/");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onUrlChange) {
        onUrlChange(query);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [query, onUrlChange]);

  const normalizeUrl = (input) => {
    let trimmed = input.trim();
    if (!trimmed) return null;

    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }

    try {
      const parsed = new URL(trimmed);
      const hostname = parsed.hostname;
      if (hostname.includes(".") || hostname === "localhost") {
        return parsed.href;
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleExtract = (urlToExtract) => {
    const formattedUrl = normalizeUrl(urlToExtract);

    if (formattedUrl) {
      setLocalError("");
      setQuery(formattedUrl);
      if (onSearch) {
        onSearch(formattedUrl);
      }
    } else {
      setLocalError("Please enter a valid URL or domain (e.g., prevue.kirtanjaviya.dev)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleExtract(query);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (localError) {
      setLocalError("");
    }
  };

  const activeError = localError || externalError;

  return (
    <div
      id="search-bar"
      className="flex flex-col items-center justify-center w-full px-4 sm:px-6 relative -top-4 z-10 scroll-mt-24 font-sans"
    >
      <form
        onSubmit={handleSubmit}
        className={`flex items-center w-full max-w-[580px] bg-white border-2 rounded-[50px] p-1.5 sm:p-2 transition-all duration-300 ease-in-out shadow-sm ${activeError
            ? "border-red-500 focus-within:border-red-500 focus-within:shadow-[0_0_10px_rgba(239,68,68,0.25)]"
            : "border-[#e0e0e0] focus-within:border-brand-primary focus-within:shadow-[0_0_10px_rgba(5,150,105,0.25)]"
          }`}
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          disabled={isLoading}
          required
          placeholder="Enter URL (e.g. prevue.kirtanjaviya.dev)"
          className="flex-1 min-w-0 border-none outline-none pl-3.5 pr-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base font-bold bg-transparent text-[#333333] placeholder:text-neutral-400 font-sans disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="group relative overflow-hidden flex items-center justify-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-97 shrink-0 whitespace-nowrap shadow-md hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] border border-emerald-500/80 outline-none select-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-spin" />
              <span>Extracting...</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="relative z-10">Extract Meta Data</span>
            </>
          )}
        </button>
      </form>

      {activeError && (
        <p className="mt-2 text-xs text-red-500 font-medium text-center px-2">
          {activeError}
        </p>
      )}
    </div>
  );
};

export default OgSearch;
