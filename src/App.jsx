import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BackgroundPattern from "./components/BackgroundPattern";
import OgSearch from "./components/OgSearch";
import FileUpload from "./components/FileUpload";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800 pb-20">
      <BackgroundPattern />
      <Navbar />
      <main className="relative z-10">
        <Hero />
      </main>
      <OgSearch />
      <div className="mt-12 px-4 sm:px-8 max-w-5xl mx-auto flex justify-start">
        <FileUpload />
      </div>
    </div>
  );
};

export default App;
