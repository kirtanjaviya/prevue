import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent py-6 px-4 text-center">
      <p className="text-sm sm:text-base text-slate-600 font-medium">
        Copyright © {currentYear} - All rights reserved by Prevue
      </p>
    </footer>
  );
};

export default Footer;
