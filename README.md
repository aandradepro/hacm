# HACM — From Ambiguity to Architecture

**Structuring enterprise data for trust, governance, and AI-readiness.**

---

## Overview

HACM is a one-page, interactive pitch site designed for enterprise data architects and executives. It presents a semantic-first approach to data architecture, bridging legacy systems to modern cloud, data products, and AI platforms.

The site is built with:

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type-safe code
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth scroll animations

---

## Key Features

### Content

- **Centralized Content**: All text is stored in `app/data/content.json` for easy updates
- **Semantic-First Narrative**: 6 sections that tell a coherent story
- **SAP Perspective**: Each section includes a dedicated SAP ecosystem view

### User Experience

- **Smooth Scroll Snapping**: Each section fills the viewport for slide-like navigation
- **Reveal Animations**: Content fades in as the user scrolls
- **Fixed Navigation**: Menu stays at the top for quick section access
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Resolution Badge**: Shows current screen size as evidence of responsiveness

### Export

- **Markdown Export**: Download all content as a `.md` file for LLMs or documentation
- **JSON Export**: Structured data format (via lib)
- **HTML Export**: Clean, printable version (via lib)

### Accessibility

- High contrast colors (WCAG AA compliant)
- Keyboard navigation support
- Reduced motion support for accessibility preferences

---

## Color Palette

| Color          | HEX       | Usage                    |
| -------------- | --------- | ------------------------ |
| Deep Blue      | `#0F4C8A` | Primary, titles, headers |
| Modern Teal    | `#00B4A0` | Accents, highlights      |
| Pure White     | `#FFFFFF` | Backgrounds              |
| Technical Gray | `#2D3748` | Secondary text           |
| Subtle Gold    | `#FFD700` | Special details          |
| Light Gray     | `#E8EEF4` | Secondary backgrounds    |

---

## Project Structure

The project follows a clean Next.js 14 App Router structure:

- `app/components/sections/` — Each main section (Hero, Problem, Approach, Results, Bridge, CTA, Footer)
- `app/components/ui/` — Reusable UI components (Navigation, ExportButton, ResolutionBadge, AnimatedSection)
- `app/data/` — Centralized content JSON
- `app/lib/` — Utility functions for export and general use
- `app/styles/` — Global CSS with Tailwind
- `app/public/` — Static assets (images, fonts, favicon)
- Root configuration files for Next.js, TypeScript, Tailwind, and PostCSS

---

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, or pnpm

### Installation

Navigate to the project folder, install dependencies, and start the development server:

```bash
cd HACM
npm install
npm run dev
```

### Build for Production

```bash
npm run build
```

The output will be in the `out` folder, ready for static hosting.

---

## Deployment

### Vercel (Recommended)

1. Push the code to a GitHub repository
2. Import the repository in Vercel
3. Deploy — it works automatically with Next.js

### Static Hosting

1. Run `npm run build`
2. Upload the `out` folder to any static hosting service (Netlify, Cloudflare Pages, AWS S3, etc.)

---

## Content Management

All content is centralized in `app/data/content.json`. To update the site:

1. Edit the JSON file
2. Changes reflect immediately in development
3. Rebuild for production

This makes it easy to update the pitch without touching component code.

---

## Export Functionality

The site includes a fixed export button (bottom-right corner) that downloads the entire content as a Markdown file. This is useful for:

- Sharing content with recruiters or clients
- Feeding content to LLMs for analysis
- Creating documentation
- Archiving the pitch content

Additional export formats (JSON, HTML) are available via the `app/lib/export.ts` utility.

---

## Responsiveness Evidence

The site includes a Resolution Badge (bottom-left corner) that displays:

- Current device type (Mobile, Tablet, Desktop, Large Desktop)
- Screen dimensions (width × height)
- A visual "Responsive" confirmation

This serves as immediate evidence of responsive design when viewed by recruiters or executives.

---

## License

MIT

---

## Author

Alexandre Andrade

---

## Brand

**~Å~** — Precision with Care

---

*Built with Next.js, Tailwind CSS, and Framer Motion.*