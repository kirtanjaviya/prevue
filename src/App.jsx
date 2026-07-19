import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BackgroundPattern from "./components/BackgroundPattern";
import OgSearch from "./components/OgSearch";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">
      <BackgroundPattern />
      <Navbar />
      <main className="relative z-10">
        <Hero />
      </main>
      <OgSearch />
    </div>
  );
};

export default App;
