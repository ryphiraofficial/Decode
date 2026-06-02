# 💎 DECOODE — Frontend Studio

> Architecting digital resilience through bespoke engineering and visionary design for future-forward brands.

DECOODE is a state-of-the-art, high-fidelity React web application engineered with a focus on editorial typography, fluid micro-interactions, and premium cinematic storytelling. Built on **Vite**, **React**, and **Tailwind CSS**, the codebase utilizes **GSAP (GreenSock)** and **Framer Motion** to deliver a premium, publication-grade user experience optimized for all displays—including standard screens and ultra-wide monitor arrays.

---

## ⚡ Core Visual & Interactive Engineering Features

### 1. Cinematic Pixel-Grid Hero
* **Interactive Matrix Overlay:** Generates a dynamic, responsive canvas pixel grid overlay that randomly updates cells with transparent or brand-colored HSL tokens (`rgba(149, 255, 0, 0.85)` / `rgba(0, 163, 0, 0.85)`), styled with an elegant analog grain noise layer.
* **Cinematic Portrait Cross-Fade:** A fast, high-contrast, automated slideshow (`450ms` swap rate) displaying crystal-clear team portraits loaded from the dedicated `/profiles dcoode/` folder.
* **Responsive Subpixel Clarity:** Integrated CSS hardware acceleration (`will-change`, `backface-visibility: hidden`, `image-rendering: -webkit-optimize-contrast`) ensuring PNG portraits remain pin-sharp during scale transitions.

### 2. Interactive Studio Team Section
* **Interactive Carousel:** Features a beautiful manual slider with custom animated Arrow buttons and modern pill-shaped progress indicator dots.
* **High-contrast Typography:** Outfitted with clear typographic hierarchical descriptions. Name and roles are perfectly visible at any aspect ratio.
* **Visual Atmosphere overlays:** Houses dynamic Cyan & Crimson side-lighting overlays that simulate professional, low-light studio lighting.
* **Rotating Badge:** Features a rotating SVG Circular text badge (`join our team • join our team •`) anchored precisely at the canvas intersection.

### 3. Scroll-Linked Reveal Banner
* **Automatic Split-glide Transition:** Triggered automatically using a local GSAP ScrollTrigger timeline as the user scrolls past.
* **Snappy Pinning System:** Utilizes a super-responsive `+=100%` viewport lock with a crisp `scrub: 0.3` duration.
* **Color Inversion Magic:** Uses CSS `mix-blend-difference` to seamlessly morph the massive **"BUILD"** and **"FUTURE"** words from deep black to brilliant white as the dark background image glides beneath them.
* **Staggered Narrative Reveal:** Centered heading text floats up and dissolves word-by-word with a perfect `0.15s` delay stagger.

### 4. Stacked Cards & Editorial Narrative
* **Card Stacking Deck:** An immersive grid on the Insights page where cards anchor to the top of the viewport sequentially, overlapping like a deck of cards as the user scrolls.
* **High-Contrast Typography:** Hand-crafted graphite grids and Expertise cards optimized for comfortable long-form reading on white backdrops.

---

## 🛠️ Technology Stack & Libraries

* **Core Framework:** React 18 + Vite (configured with lightning-fast Oxc compiler)
* **Animation & Physics Engine:** GSAP (GreenSock) + ScrollTrigger (Local package integration)
* **Motion Choreography:** Framer Motion
* **Styling Ecosystem:** Tailwind CSS (Modular classes) + Vanilla CSS tokens
* **Icons:** Lucide React

---

## 📂 Project Architecture (Key Directory Highlights)

```bash
Frontend/
├── public/
│   └── profiles dcoode/        # Premium high-resolution team portraits (.jpg)
├── src/
│   ├── homepage/
│   │   ├── Hero.jsx            # Pixel-grid matrix & portrait cross-fade
│   │   ├── Team.jsx            # Studio Profile Carousel & Cyan/Warm filters
│   │   ├── RevealBanner.jsx    # GSAP Scroll-linked split text & image banner
│   │   └── css/
│   │       ├── Hero.css        # Cinematic transitions & hardware acceleration
│   │       └── Team.css        # Atmospheres, badges, and layout overrides
│   ├── pages/
│   │   ├── AboutPage.jsx       # Grid layouts and expertise portfolios
│   │   └── css/
│   │       └── AboutPage.css   # Typographic contrast & ultra-wide readability
│   ├── shared/
│   │   ├── Navbar.jsx          # Seamless floating brand navigation
│   │   └── Footer.jsx          # Studio directory and metadata links
│   ├── App.jsx                 # Route management and initialization
│   └── main.jsx                # Application root mount
├── package.json                # Project configurations & dependency tree
└── README.md                   # Core documentation
```

---

## 🚀 Setup & Local Execution

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Install Project Dependencies
Run the following command at the root of the `Frontend` directory to configure the local packages:
```bash
npm install
```

### 3. Launch Development Server
Boot up Vite's HMR (Hot Module Replacement) development server:
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser to view the live studio application.

### 4. Compile Production Bundle
Build an optimized, minified production build:
```bash
npm run build
```

---

## 💎 Design & Engineering Standards

* **No Placeholders:** All assets (portraits, images, textures) are fully integrated from your dedicated local workspace folders.
* **GPU Hardware Acceleration:** Complex animations employ CSS `will-change` properties on translations (`transform`, `opacity`, `scale`) to avoid layout thrashing and maintain a locked `60fps`.
* **SEO Best Practices:** Semantic HTML5 elements (`<section>`, `<article>`, `<main>`) are utilized natively alongside descriptive header hierarchies.
