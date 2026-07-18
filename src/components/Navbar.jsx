import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/logo.png";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
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
    { name: "Features", href: "#" },
    { name: "How it works", href: "#" },
    { name: "Docs", href: "#" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 w-full select-none transition-all duration-300 ${isOpen
        ? "bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800"
        : scrolled
          ? "bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-100 dark:border-white/10 backdrop-blur-md"
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
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="size-5 text-amber-500" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>

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
          <div className="mt-auto pt-6 flex flex-col gap-4">
            <div className="mb-2 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-neutral-800"></div>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full rounded-xl px-4 py-3 text-base font-medium text-neutral-900 dark:text-white transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <span>Theme</span>
              {theme === "dark" ? (
                <div className="flex items-center gap-2 text-amber-500">
                  <Sun className="size-5" />
                  <span>Light Mode</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                  <Moon className="size-5" />
                  <span>Dark Mode</span>
                </div>
              )}
            </button>

            <Button
              variant="primary"
              className="w-full rounded-xl py-3.5 text-base font-medium"
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