import { Code, Edit3, Eye } from "lucide-react";

const features = [
  {
    name: "Edit in real-time",
    description: "Update your title, description, and images on the fly. No more guessing how your metadata looks.",
    icon: Edit3,
  },
  {
    name: "Live previews",
    description: "Instantly visualize how your links will appear across Twitter, LinkedIn, Facebook, and Discord.",
    icon: Eye,
  },
  {
    name: "Instant code generation",
    description: "Copy production-ready HTML meta tags with a single click and paste them directly into your project.",
    icon: Code,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-transparent scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-200/60 pt-20">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
            Features
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
            Prevue provides simple tools to craft the perfect first impression across the web, without writing code manually.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <div className="w-12 h-12 flex items-center justify-center bg-neutral-100 text-neutral-700 rounded-lg mb-6">
                <feature.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.name}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
