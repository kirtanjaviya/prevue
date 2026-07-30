import React from "react";
import { ArrowRight } from "lucide-react";

const CapsuleBadge = ({
  text = "Get code instantly",
  href = "#search-bar",
  onClick,
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }

    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        const inputElement = targetElement.querySelector("input");
        if (inputElement) {
          setTimeout(() => inputElement.focus(), 400);
        }
      }
    }
  };

  return (
    <div className="mb-6 flex justify-center z-10 relative">
      <a
        href={href}
        onClick={handleClick}
        className="group relative inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/80 border border-neutral-200/80 hover:border-neutral-300 shadow-xs backdrop-blur-md transition-colors duration-200 cursor-pointer text-neutral-800 select-none overflow-hidden"
      >
        {/* Subtle Shimmer Sweep on Hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-900/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-in-out pointer-events-none" />

        {/* Capsule Text */}
        <span className="font-medium tracking-tight text-neutral-700 group-hover:text-neutral-950 transition-colors">
          {text}
        </span>

        {/* Minimal Interactive Arrow */}
        <div className="flex items-center justify-center text-neutral-400 group-hover:text-neutral-800 transition-colors">
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300 ease-out" />
        </div>
      </a>
    </div>
  );
};

export default CapsuleBadge;


