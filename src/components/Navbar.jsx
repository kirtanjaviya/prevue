import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoLight from "../assets/logo-light.png";
import Button from "./Button";

const GithubIcon = ({ className = "size-5" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Docs", href: "#docs" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 w-full select-none transition-all duration-300 ${isOpen
        ? "bg-white border-b border-neutral-100"
        : scrolled
          ? "bg-white/80 border-b border-neutral-100 backdrop-blur-md"
          : "bg-transparent border-b border-transparent"
        }`}
      style={{ transform: "none" }}
    >
      <div
        className="mx-auto max-w-7xl flex h-14 items-center justify-between px-4 sm:h-16 md:px-8"
        data-scrolled={scrolled ? "true" : "false"}
      >
        <a className="flex items-center cursor-pointer shrink-0" href="/">
          <img
            src={logoLight}
            alt="Prevue"
            className="h-6 sm:h-7 md:h-8 w-auto object-contain"
          />
        </a>

        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-black"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <a
            href="https://github.com/kirtanjaviya/prevue"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-9 sm:size-10 rounded-lg text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors border border-neutral-200/80 bg-white/50 shadow-xs"
            aria-label="GitHub Repository"
            title="View on GitHub"
          >
            <GithubIcon className="size-5" />
          </a>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={scrollToSearch}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 border bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-700 border-b-4 border-b-emerald-800 active:translate-y-0.5 active:border-b-2 shadow-md h-10 px-4 py-2 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-10 items-center justify-center rounded-md lg:hidden cursor-pointer hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="size-5 text-neutral-900" />
            ) : (
              <Menu className="size-5 text-neutral-900" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 flex flex-col bg-white transition-all duration-300 ease-out border-t border-neutral-100 lg:hidden ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100 hover:text-neutral-900 block"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

            <a
              href="https://github.com/kirtanjaviya/prevue"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl py-3 border border-neutral-200 text-neutral-800 hover:bg-neutral-50 transition-colors font-medium text-sm"
            >
              <GithubIcon className="size-5" />
              <span>GitHub Repository</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                scrollToSearch();
              }}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 border bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-700 border-b-4 border-b-emerald-800 active:translate-y-0.5 active:border-b-2 shadow-md w-full py-3 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;