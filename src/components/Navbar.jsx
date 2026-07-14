import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
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
      className={`fixed inset-x-0 top-0 z-50 mx-auto w-full select-none transition-all duration-300 ${isOpen ? "max-w-none" : "max-w-7xl"
        }`}
      style={{ transform: "none" }}
    >
      {/* Header wrapper */}
      <div
        className={`flex h-14 items-center justify-between px-4 transition-all duration-300 sm:h-16 md:px-8 ${isOpen
          ? "bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 shadow-none mt-0 rounded-none"
          : scrolled
            ? "bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm mt-0 rounded-none backdrop-blur-md"
            : "bg-transparent shadow-none border-transparent mt-0 rounded-none"
          }`}
        data-scrolled={scrolled ? "true" : "false"}
      >
        {/* Logo Section */}
        <a className="flex items-center cursor-pointer shrink-0" href="/">
          <img
            src={logo}
            alt="Logo"
            className="relative z-20 h-10 w-10 object-contain -mr-0.55"
          />
          <span className="text-base sm:text-lg font-semibold tracking-tight text-[#111A35] dark:text-white font-logo-font">
            Meta<span className="text-[#5B50F6]">Deck</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 lg:flex lg:gap-4">
          <Button variant="text" href="/login">
            Login
          </Button>
          <Button variant="primary">
            Try for free
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex size-10 items-center justify-center rounded-md lg:hidden cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="size-5 text-neutral-900 dark:text-white" />
          ) : (
            <Menu className="size-5 text-neutral-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 flex flex-col bg-white dark:bg-neutral-900 transition-all duration-300 ease-out border-t border-neutral-100 dark:border-neutral-800 lg:hidden ${isOpen
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
                className="rounded-xl px-4 py-3.5 text-base font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800 block"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action buttons inside drawer */}
          <div className="mt-auto pt-6">
            <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800"></div>

            <Button
              variant="secondary"
              href="/login"
              className="w-full text-center py-3.5 text-base font-medium rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Button>
            <Button
              variant="primary"
              className="mt-3 w-full rounded-xl py-3.5 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Try for free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;