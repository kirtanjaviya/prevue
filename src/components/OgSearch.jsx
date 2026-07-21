import { useState } from "react";
import { Search } from "lucide-react";

const OgSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("https://prevue.kirtanjaviya.dev/");
  const [error, setError] = useState("");

  const normalizeUrl = (input) => {
    let trimmed = input.trim();
    if (!trimmed) return null;

    // Auto-prepend https:// if http:// or https:// is missing
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
    }

    try {
      const parsed = new URL(trimmed);
      // Ensure hostname has a valid structure (at least one dot or localhost)
      const hostname = parsed.hostname;
      if (hostname.includes(".") || hostname === "localhost") {
        return parsed.href;
      }
    } catch {
      return null;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedUrl = normalizeUrl(query);

    if (formattedUrl) {
      setError("");
      setQuery(formattedUrl);
      if (onSearch) {
        onSearch(formattedUrl);
      }
    } else {
      setError("Please enter a valid URL or domain (e.g., example.com)");
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div
      id="search-bar"
      className="flex flex-col items-center justify-center w-full px-4 sm:px-6 relative -top-4 z-10 scroll-mt-24"
    >
      <form
        onSubmit={handleSubmit}
        action="/search"
        method="GET"
        className={`flex items-center w-full max-w-[580px] bg-white border-2 rounded-[50px] p-1.5 sm:p-2 transition-all duration-300 ease-in-out ${error
            ? "border-red-500 focus-within:border-red-500 focus-within:shadow-[0_0_10px_rgba(239,68,68,0.25)]"
            : "border-[#e0e0e0] focus-within:border-brand-primary focus-within:shadow-[0_0_10px_rgba(5,150,105,0.25)]"
          }`}
      >
        <input
          type="text"
          name="q"
          value={query}
          onChange={handleChange}
          required
          placeholder="Enter URL or domain"
          className="flex-1 min-w-0 border-none outline-none pl-3.5 pr-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-base font-bold bg-transparent text-[#333333] placeholder:text-neutral-400 font-sans"
        />
        <button
          type="submit"
          className="bg-brand-primary hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full cursor-pointer flex items-center gap-1.5 sm:gap-2 border-none outline-none transition-all duration-200 ease-in-out active:scale-95 shrink-0 whitespace-nowrap shadow-xs"
        >
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          <span>Extract Meta Data</span>
        </button>
      </form>
      {error && (
        <p className="mt-2 text-xs text-red-500 font-medium text-center px-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default OgSearch;


