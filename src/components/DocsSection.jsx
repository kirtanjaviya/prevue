import React from 'react';

const DocsSection = () => {
  return (
    <section id="docs" className="py-20 bg-transparent scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-200/60 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Documentation & Guidelines
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Everything you need to know about optimizing your website's social metadata.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 border-b border-neutral-200 pb-2">What is Open Graph?</h3>
            <p className="text-neutral-600 leading-relaxed">
              The Open Graph protocol enables any web page to become a rich object in a social graph. It was originally created by Facebook and is now supported by Twitter, LinkedIn, Discord, and almost all other major platforms. It allows you to control how your website looks when shared by setting specific <code>&lt;meta&gt;</code> tags in your HTML's <code>&lt;head&gt;</code>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Text & Description Lengths (SEO)</h3>
            <ul className="list-disc pl-5 space-y-3 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Title Length:</strong> Aim for <strong>30-60 characters</strong>. If your title is too long, it will get truncated with an ellipsis (...) in Google search results and on social cards.
              </li>
              <li>
                <strong className="text-neutral-800">Description Length:</strong> The optimal length is <strong>120-160 characters</strong>. This gives you enough space to write a compelling summary without getting cut off across different devices.
              </li>
              <li>
                <strong className="text-neutral-800">Why it matters:</strong> Getting the length right maximizes your visibility and click-through rate (CTR). Too short, and you miss out on keywords. Too long, and your message is lost.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Image Size Guidelines</h3>
            <ul className="list-disc pl-5 space-y-3 text-neutral-600">
              <li>
                <strong className="text-neutral-800">Recommended Size:</strong> 1200 x 628 pixels (1.91:1 ratio). This size works universally well across Facebook, Twitter, and LinkedIn.
              </li>
              <li>
                <strong className="text-neutral-800">Minimum Size:</strong> 200 x 200 pixels. Images smaller than this may not be displayed by social platforms.
              </li>
              <li>
                <strong className="text-neutral-800">File Size:</strong> Keep your images under 5MB to ensure they are fetched quickly by crawler bots.
              </li>
              <li>
                <strong className="text-neutral-800">Formats:</strong> Use standard formats like JPEG, PNG, or WebP. SVGs are typically not supported for Open Graph images.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4 border-b border-neutral-200 pb-2">Platform Specifics</h3>
            <p className="text-neutral-600 leading-relaxed mb-4">
              While Open Graph is standard, some platforms have specific tags or behaviors:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                <h4 className="font-semibold text-neutral-900 mb-2">Twitter / X</h4>
                <p className="text-sm text-neutral-600">Uses the <code>twitter:card</code> tag to determine layout. We recommend <code>summary_large_image</code> as the standard for full-width image cards.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                <h4 className="font-semibold text-neutral-900 mb-2">LinkedIn</h4>
                <p className="text-sm text-neutral-600">Heavily relies on standard <code>og:</code> tags but often caches images aggressively. Use their Post Inspector tool to clear cache.</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default DocsSection;
