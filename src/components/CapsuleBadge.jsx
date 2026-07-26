import React from "react";
import { Zap } from "lucide-react";

const CapsuleBadge = ({ text = "Get code instantly", href = "#" }) => {
  return (
    <div className="mb-4 flex justify-center z-10 relative">
      <div
        className="inline-flex items-center justify-center font-medium w-fit whitespace-nowrap gap-2 py-2 px-3 sm:px-4 text-xs sm:text-sm rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white/90"
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </div>
        <span className="font-medium">{text}</span>
        <Zap className="h-3.5 w-3.5 text-orange-500 fill-orange-500/20" />
      </div>
    </div>
  );
};

export default CapsuleBadge;
