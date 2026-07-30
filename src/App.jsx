import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OgSearch from "./components/OgSearch";
import MetaEditor from "./components/MetaEditor";
import PreviewSection from "./components/PreviewSection";
import MetaCodeModal from "./components/MetaCodeModal";
import Features from "./components/Features";
import DocsSection from "./components/DocsSection";
import Footer from "./components/Footer";
import { extractWebsiteMetaData } from "./services/metaExtractor";

const DEFAULT_META = {
  title: "Prevue - Social Card Generator & Metadata Inspector",
  description: "Generate custom Open Graph metadata and inspect social card previews for Twitter, LinkedIn, Facebook, and Discord instantly.",
  url: "https://prevue.kirtanjaviya.dev/",
  imageUrl: "",
};

const App = () => {
  const [metaData, setMetaData] = useState(DEFAULT_META);
  const [isLoading, setIsLoading] = useState(false);
  const [extractionError, setExtractionError] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [noImageWarning, setNoImageWarning] = useState(false);

  // Fetch metadata for user-submitted URL
  const handleSearch = async (targetUrl) => {
    if (!targetUrl) return;

    setIsLoading(true);
    setExtractionError("");
    setNoImageWarning(false);

    try {
      const data = await extractWebsiteMetaData(targetUrl);

      // Fallback title if API returns domain name
      const domainName = targetUrl.replace(/^https?:\/\//i, "").split("/")[0].replace(/^www\./, "");
      const isDomainOnlyTitle = data.title && data.title.toLowerCase().trim() === domainName.toLowerCase().trim();
      const finalTitle = (data.title && !isDomainOnlyTitle) ? data.title : metaData.title;

      if (!data.imageUrl) {
        setNoImageWarning(true);
      }

      setMetaData({
        title: finalTitle,
        description: data.description || "",
        url: data.url || targetUrl,
        imageUrl: data.imageUrl || "",
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
    setNoImageWarning(false);
    setMetaData((prev) => ({
      ...prev,
      imageUrl: objectUrlOrString,
    }));
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/50 relative text-gray-800 font-sans">
      <Navbar />

      <main className="relative z-10">
        <Hero />
      </main>

      {/* URL search bar */}
      <OgSearch
        onSearch={handleSearch}
        onUrlChange={handleUrlChange}
        isLoading={isLoading}
        externalError={extractionError}
      />

      {/* Editor & Preview section */}
      <section id="editor-section" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-5 w-full flex flex-col lg:sticky lg:top-24">
            <MetaEditor
              metaData={metaData}
              onChange={setMetaData}
              onImageSelect={handleImageSelect}
              onOpenExportModal={() => setIsExportModalOpen(true)}
              noImageWarning={noImageWarning}
            />
          </div>

          <div className="lg:col-span-7 w-full flex flex-col">
            <PreviewSection metaData={metaData} />
          </div>

        </div>
      </section>

      <Features />

      <DocsSection />

      <Footer />

      <MetaCodeModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        metaData={metaData}
      />
    </div>
  );
};

export default App;
