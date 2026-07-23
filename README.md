# Prevue

Prevue is an open-source web application for inspecting, previewing, and generating social media meta tags and card previews in real-time.

When you post a link on social platforms like Twitter (X), LinkedIn, Facebook, or Discord, this tool lets you see exactly how the link card will look before publishing. You can scrape meta tags directly from any live URL, tweak titles and descriptions, upload or choose custom social images, and export clean HTML meta tags for your site.

---

## Features

- **URL Scraping**: Paste any web address to extract existing title, description, and Open Graph images using Microlink and fallback proxies.
- **Multi-Platform Previews**: Side-by-side card rendering for:
  - Twitter / X (Large Image Cards)
  - LinkedIn (Feed Summary Cards)
  - Facebook (Social Share Cards)
  - Discord (Rich Embed Cards)
- **Live Metadata Editor**: Customize title, description, URL, and image with immediate preview updates.
- **Image Hosting & Scraped Gallery**: Upload local images (hosted via ImgBB CDN) or pick from images scraped from the page.
- **HTML Tag Exporter**: Generate ready-to-copy HTML `<meta>` tags (Open Graph, Twitter Cards, SEO) for insertion into your site's `<head>`.

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/kirtanjaviya/prevue.git
   cd prevue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Note: If you want to use custom image uploads via ImgBB, set your API key in `VITE_IMGBB_API_KEY`. A fallback key is provided by default.*

4. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Project Structure

```text
prevue/
├── public/                 # Static assets and site manifest
├── src/
│   ├── assets/             # SVGs and static brand graphics
│   ├── components/         # React components
│   │   ├── FileUpload.jsx           # Drag-and-drop image uploader
│   │   ├── Hero.jsx                 # Header hero section
│   │   ├── MetaCodeModal.jsx        # Exportable HTML code modal
│   │   ├── MetaEditor.jsx           # Metadata input controls
│   │   ├── Navbar.jsx               # Navigation bar with GitHub link
│   │   ├── OgSearch.jsx             # URL search bar input
│   │   ├── PreviewSection.jsx       # Multi-platform social preview cards
│   │   └── ExtractedImagesGallery.jsx # Scraped image selector
│   ├── services/           # External API & extraction services
│   │   ├── imageUploader.js         # ImgBB CDN upload handler
│   │   └── metaExtractor.js         # URL metadata & proxy parser
│   ├── App.jsx             # Root layout and state management
│   ├── index.css           # Tailwind CSS imports & custom styles
│   └── main.jsx            # Application entry point
├── .env.example           # Environment template
├── package.json           # Project dependencies & scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Compiles and bundles the application for production in the `dist` directory.
- `npm run preview` - Runs a local web server to preview the built production app.
- `npm run lint` - Runs ESLint to check for syntax and code style issues.

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).
