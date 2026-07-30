import React from "react";
import Button from "./Button";
import CapsuleBadge from "./CapsuleBadge";

const Hero = () => {
  const scrollToSearch = () => {
    const searchElement = document.getElementById("search-bar");
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: "smooth" });
      const inputElement = searchElement.querySelector("input");
      if (inputElement) {
        setTimeout(() => inputElement.focus(), 400);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 text-center max-w-4xl mx-auto">
      <CapsuleBadge text="Get code instantly" />

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] max-w-3xl my-4">
        Preview and perfect your <span className="text-neutral-500 font-normal">social cards.</span>
      </h1>

      <p className="font-sans text-neutral-600 text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mt-2 mb-8 leading-relaxed font-normal tracking-tight">
        Inspect Open Graph metadata for any link. Fine-tune your title, description, and preview image before you publish.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
        <Button
          variant="primary"
          className="w-full sm:w-44 py-3 text-sm font-medium shadow-xs"
          onClick={scrollToSearch}
        >
          Try for free
        </Button>
        <a
          href="#docs"
          className="flex items-center justify-center w-full sm:w-44 h-11 rounded-xl bg-white text-neutral-800 border border-neutral-200 font-medium text-sm hover:bg-neutral-50 hover:text-neutral-950 hover:border-neutral-300 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          View docs
        </a>
      </div>
    </div>
  );
};

export default Hero;


