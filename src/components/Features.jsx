import React from "react";

const features = [
  {
    number: "01/",
    title: "Inspect live links",
    description: "Fetch existing Open Graph tags, Twitter cards, and favicons from any URL instantly.",
    cutPosition: "right", // top-right cut
    bgColor: "bg-[#22242a] hover:bg-[#1a1c21] text-white",
    numberColor: "text-neutral-500",
    descColor: "text-neutral-400",
  },
  {
    number: "02/",
    title: "Multi-platform previews",
    description: "Visualize exact card rendering for X (Twitter), LinkedIn, Facebook, Discord, Slack, and Google Search.",
    cutPosition: "none", // no cut
    bgColor: "bg-[#f2f2f5] hover:bg-[#ebebee] text-neutral-900",
    numberColor: "text-neutral-400",
    descColor: "text-neutral-500",
  },
  {
    number: "03/",
    title: "Clean meta export",
    description: "Generate production-ready HTML meta tags, Next.js metadata objects, or React code snippets.",
    cutPosition: "left", // top-left cut
    bgColor: "bg-[#22242a] hover:bg-[#1a1c21] text-white",
    numberColor: "text-neutral-500",
    descColor: "text-neutral-400",
  },
];

// SVG masks for smooth, rounded corner cut transitions
const MASK_TOP_RIGHT = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" preserveAspectRatio="none"><path fill="black" d="M 24 0 H 230 Q 244 0 254 10 L 284 40 Q 296 52 296 66 V 176 Q 296 200 272 200 H 24 Q 0 200 0 176 V 24 Q 0 0 24 0 Z"/></svg>')`;

const MASK_TOP_LEFT = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" preserveAspectRatio="none"><path fill="black" d="M 66 0 H 276 Q 300 0 300 24 V 176 Q 300 200 276 200 H 24 Q 0 200 0 176 V 66 Q 0 52 10 40 L 40 10 Q 50 0 66 0 Z"/></svg>')`;

const Features = () => {
  return (
    <section id="features" className="py-16 sm:py-20 bg-transparent scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
            FEATURES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Designed for precision.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f) => {
            let maskStyle = {};
            if (f.cutPosition === "right") {
              maskStyle = {
                WebkitMaskImage: MASK_TOP_RIGHT,
                maskImage: MASK_TOP_RIGHT,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              };
            } else if (f.cutPosition === "left") {
              maskStyle = {
                WebkitMaskImage: MASK_TOP_LEFT,
                maskImage: MASK_TOP_LEFT,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              };
            }

            return (
              <div
                key={f.number}
                style={maskStyle}
                className={`relative min-h-[160px] sm:min-h-[185px] p-5 sm:p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ${f.bgColor} cursor-pointer group`}
              >
                <div className="flex justify-center">
                  <span className={`font-mono text-xs sm:text-sm font-semibold tracking-wider ${f.numberColor}`}>
                    {f.number}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-bold mb-1.5 tracking-tight">
                    {f.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${f.descColor}`}>
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
