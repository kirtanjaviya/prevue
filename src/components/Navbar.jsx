import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoLight from "../assets/logo-light.png";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { name: "Features", href: "#" },
    { name: "How it works", href: "#" },
    { name: "Docs", href: "#" },
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
      {/* Header wrapper */}
      <div
        className="mx-auto max-w-7xl flex h-14 items-center justify-between px-4 sm:h-16 md:px-8"
        data-scrolled={scrolled ? "true" : "false"}
      >
        {/* Logo Section */}
        <a className="flex items-center cursor-pointer shrink-0" href="/">
          <img
            src={logoLight}
            alt="Prevue"
            className="h-6 sm:h-7 md:h-8 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-brand-primary"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="hidden lg:block">
            <Button variant="primary">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 flex flex-col bg-white transition-all duration-300 ease-out border-t border-neutral-100 lg:hidden ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
      >
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
          {/* Navigation links inside drawer */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:bg-emerald-50/50 hover:text-brand-primary block"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action buttons inside drawer */}
          <div className="mt-auto pt-6 flex flex-col gap-4">
            <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

            <Button
              variant="primary"
              className="w-full rounded-xl py-3.5 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;