import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OgSearch from "./components/OgSearch";
import MetaEditor from "./components/MetaEditor";
import PreviewSection from "./components/PreviewSection";
import MetaCodeModal from "./components/MetaCodeModal";
import { extractWebsiteMetaData } from "./services/metaExtractor";

const DEFAULT_META = {
  title: "Prevue - Social Card Generator & Metadata Inspector",
  description: "Generate custom Open Graph metadata and inspect social card previews for Twitter, LinkedIn, Facebook, and Discord instantly.",
  url: "https://prevue.kirtanjaviya.dev/",
  imageUrl: null,
};

const App = () => {
  const [metaData, setMetaData] = useState(DEFAULT_META);
  const [isLoading, setIsLoading] = useState(false);
  const [extractionError, setExtractionError] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleSearch = async (targetUrl) => {
    if (!targetUrl) return;

    setIsLoading(true);
    setExtractionError("");

    try {
      const data = await extractWebsiteMetaData(targetUrl);

      setMetaData({
        title: data.title || metaData.title,
        description: data.description || metaData.description,
        url: data.url || targetUrl,
        imageUrl: data.imageUrl || metaData.imageUrl,
      });
    } catch (err) {
      console.error("Metadata extraction error:", err);
      setExtractionError("Could not extract metadata from this URL. You can fill in details manually.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (newUrl) => {
    setMetaData((prev) => ({
      ...prev,
      url: newUrl,
    }));
  };

  const handleImageSelect = (file, objectUrlOrString) => {
    setMetaData((prev) => ({
      ...prev,
      imageUrl: objectUrlOrString,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/50 relative text-gray-800 pb-24 font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Hero Header Section */}
      <main className="relative z-10">
        <Hero />
      </main>

      {/* URL Extractor Search Bar */}
      <OgSearch
        onSearch={handleSearch}
        onUrlChange={handleUrlChange}
        isLoading={isLoading}
        externalError={extractionError}
      />

      {/* 2-Column Main Workspace Section */}
      <section className="mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDE: META Editor Box */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <MetaEditor
              metaData={metaData}
              onChange={setMetaData}
              onImageSelect={handleImageSelect}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          </div>

          {/* RIGHT SIDE: Live Previews Section */}
          <div className="lg:col-span-7 w-full flex flex-col">
            <PreviewSection metaData={metaData} />
          </div>

        </div>
      </section>

      {/* HTML Meta Code Generator Modal */}
      <MetaCodeModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        metaData={metaData}
      />
    </div>
  );
};

export default App;
