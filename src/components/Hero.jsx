import React, { useState, useEffect } from "react";
import Button from "./Button";
import CapsuleBadge from "./CapsuleBadge";

const TypewriterEffectSmooth = ({
  words,
  className = "",
  cursorClassName = "",
}) => {
  const fullText = words.map((w) => w.text).join(" ");
  const [displayedTextIndex, setDisplayedTextIndex] = useState(0);

  useEffect(() => {
    if (displayedTextIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedTextIndex((prev) => prev + 1);
      }, 45);
      return () => clearTimeout(timeout);
    }
  }, [displayedTextIndex, fullText]);

  const isFinished = displayedTextIndex >= fullText.length;
  let currentCharCount = 0;

  return (
    <div className={`flex items-center justify-center my-2 sm:my-4 min-h-[3.25rem] sm:min-h-[4.5rem] md:min-h-[5.5rem] ${className}`}>
      <div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-3.5 gap-y-1 text-center max-w-full">
        {words.map((word, wordIdx) => {
          const wordStart = currentCharCount;
          const wordLength = word.text.length;
          currentCharCount += wordLength + 1;

          if (displayedTextIndex < wordStart) {
            return null;
          }

          const visibleCharCount = Math.min(
            wordLength,
            displayedTextIndex - wordStart
          );
          const visibleText = word.text.slice(0, visibleCharCount);

          if (word.isSelection) {
            return (
              <span
                key={`word-${wordIdx}`}
                className="relative inline-flex items-center px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-sm bg-[#f4f4f6] border border-neutral-300 mx-0.5 sm:mx-1 select-none"
              >
                {/* 4 Corner Selection Handles / Dots */}
                <span className="absolute -top-[3px] -left-[3px] sm:-top-[4px] sm:-left-[4px] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-400 border border-white shadow-xs" />
                <span className="absolute -top-[3px] -right-[3px] sm:-top-[4px] sm:-right-[4px] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-400 border border-white shadow-xs" />
                <span className="absolute -bottom-[3px] -left-[3px] sm:-bottom-[4px] sm:-left-[4px] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-400 border border-white shadow-xs" />
                <span className="absolute -bottom-[3px] -right-[3px] sm:-bottom-[4px] sm:-right-[4px] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-400 border border-white shadow-xs" />

                <span className="font-hero text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-neutral-900">
                  {visibleText}
                </span>
              </span>
            );
          }

          return (
            <span
              key={`word-${wordIdx}`}
              className={`inline-block font-hero text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${word.className || "text-neutral-900"
                }`}
            >
              {visibleText}
            </span>
          );
        })}
        <span
          className={`inline-block w-[3px] sm:w-[4px] h-6 sm:h-8 md:h-11 bg-emerald-600 ml-0.5 sm:ml-1 rounded-full transition-opacity duration-300 ${isFinished ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"
            } ${cursorClassName}`}
        />
      </div>
    </div>
  );
};

const Hero = () => {
  const words = [
    { text: "See" },
    { text: "How" },
    { text: "Your" },
    { text: "Prevue", isSelection: true },
    { text: "Looks" },
  ];

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
    <div className="flex flex-col items-center justify-center min-h-[65vh] sm:min-h-[75vh] pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 text-center max-w-5xl mx-auto">
      {/* Capsule Badge Component */}
      <CapsuleBadge />

      {/* Main typewriter text */}
      <TypewriterEffectSmooth words={words} className="my-1 sm:my-2" />

      <p className="font-sans text-neutral-500 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-lg mt-2 sm:mt-3 mb-6 sm:mb-8 leading-relaxed font-normal tracking-normal px-2">
        Generate custom Open Graph metadata and inspect social card previews for Twitter, LinkedIn, Facebook, and Discord instantly.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
        <Button
          variant="primary"
          className="w-full sm:w-44 py-3 text-sm font-semibold shadow-md"
          onClick={scrollToSearch}
        >
          Try for free
        </Button>
        <a href="#docs" className="flex items-center justify-center w-full sm:w-44 h-11 rounded-xl bg-white text-neutral-900 border border-neutral-300 font-semibold text-sm hover:bg-neutral-50 transition-all cursor-pointer">
          View Docs
        </a>
      </div>
    </div>
  );
};

export default Hero;
