# Prevue

> **Instant Social Card Generator, Open Graph Debugger & Meta Tag Inspector**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-prevue.kirtanjaviya.dev-059669?style=for-the-badge&logo=googlechrome&logoColor=white)](https://prevue.kirtanjaviya.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Prevue is an open-source web application for inspecting, previewing, and generating social media meta tags and link preview cards in real-time.

When posting links on platforms like Twitter (X), LinkedIn, Facebook, or Discord, Prevue shows exactly how your link cards will render before publishing. Scrape metadata directly from live URLs, customize titles and descriptions, upload custom social images via ImgBB CDN, and export production-ready HTML `<meta>` tags for your website.

**Live Application**: [https://prevue.kirtanjaviya.dev/](https://prevue.kirtanjaviya.dev/)

---

## Features

- **Automated URL Metadata Scraping**: Paste any web address to extract existing titles, descriptions, and Open Graph images using Microlink and fallback proxy parsers.
- **Multi-Platform Social Previews**: Pixel-perfect real-time card previews for:
  - Twitter / X (Summary with Large Image)
  - LinkedIn (Feed Summary Cards)
  - Facebook (Social Share Cards)
  - Discord (Rich Embed Cards)
- **Live Metadata Editor**: Edit title, description, target URL, and social images on the fly with instant visual updates across all card previews.
- **Image Hosting & Extracted Gallery**: Drag-and-drop local image uploads hosted directly via ImgBB CDN, or pick from images extracted from the scraped site.
- **1-Click HTML Meta Tag Generator**: Generate formatted `<meta>` tags (Open Graph, Twitter Cards, SEO) ready to copy into your project's `<head>`.
- **Responsive Design**: Built with React 19, Motion, Lucide icons, and Tailwind CSS v4.

---

## Live Demo

Try the app live in your browser:  
[https://prevue.kirtanjaviya.dev/](https://prevue.kirtanjaviya.dev/)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **[React 19](https://react.dev/)** | UI Framework |
| **[Vite 8](https://vitejs.dev/)** | Build Tool & Dev Server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-First Styling |
| **[Motion](https://motion.dev/)** | Animations & Transitions |
| **[Lucide React](https://lucide.dev/)** | Icons |
| **[ImgBB API](https://imgbb.com/)** | Image Hosting CDN |

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js 18.0.0 or higher
- npm, yarn, pnpm, or bun

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/kirtanjaviya/prevue.git
   cd prevue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Copy `.env.example` to create `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(Optional)* To use custom image uploads via ImgBB, set your API key in `VITE_IMGBB_API_KEY`. A fallback key is provided for development.

4. Start Development Server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Project Structure

```text
prevue/
├── public/                     # Static assets & site manifest
│   ├── favicon.png
│   ├── og-image.svg
│   └── site.webmanifest
├── src/
│   ├── assets/                 # Brand graphics and logos
│   ├── components/             # React UI components
│   │   ├── BackgroundPattern.jsx  # Background styling pattern
│   │   ├── Button.jsx             # Reusable button component
│   │   ├── CapsuleBadge.jsx       # Badge component
│   │   ├── DocsSection.jsx        # FAQ & Documentation section
│   │   ├── ExtractedImagesGallery.jsx # Scraped image selector
│   │   ├── Features.jsx           # Feature highlights grid
│   │   ├── FileUpload.jsx         # Drag-and-drop image uploader
│   │   ├── Footer.jsx             # App footer
│   │   ├── Hero.jsx               # Hero section header
│   │   ├── MetaCodeModal.jsx      # Exportable HTML code modal
│   │   ├── MetaEditor.jsx         # Metadata input controls
│   │   ├── Navbar.jsx             # Top navigation bar
│   │   ├── OgSearch.jsx           # URL extraction search bar
│   │   └── PreviewSection.jsx     # Multi-platform preview cards
│   ├── services/               # External service handlers
│   │   ├── imageUploader.js       # ImgBB CDN image upload handler
│   │   └── metaExtractor.js       # URL metadata parser & proxy logic
│   ├── App.jsx                 # Main application layout & state
│   ├── index.css               # Global styles & Tailwind CSS v4
│   └── main.jsx                # Application entry point
├── .env.example                # Environment variables template
├── index.html                  # Main HTML entry file
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---


## Contributing

Contributions are welcome. Feel free to submit a Pull Request or open an Issue to report bugs or suggest features.

1. Fork the project repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

Distributed under the [MIT License](LICENSE).
