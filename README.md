# Shrey Jani — Portfolio

A modern, responsive personal portfolio built with **React 18** and **TypeScript**. Showcases my projects, experience, and achievements with smooth animations, a polished dark/light theme, and a mobile-first layout.

🔗 **Live site:** [shrey-jani.github.io/Portfolio](https://shrey-jani.github.io/Portfolio)
🔗 **AWS Live site:** [shrey-jani.github.io/Portfolio](https://main.d3rgyz6bu61hp6.amplifyapp.com)

---

## Table of Contents

- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Deployment](#deployment)
- [Contact](#contact)
- [License](#license)

---

## Highlights

- 🎨 Clean, minimal UI with a one-click **dark / light theme** toggle
- 📱 **Fully responsive** — mobile-first, tested across breakpoints
- ⚡ Built on **React 18 + TypeScript** for type-safe, predictable UI
- 🎯 Smooth-scroll navigation and a back-to-top control
- 🌟 Scroll-triggered reveal animations via **Intersection Observer** and **GSAP**
- 🚀 Production-optimized bundle with lazy reveals and efficient re-renders

---

## Tech Stack

| Category       | Tools                                         |
| -------------- | --------------------------------------------- |
| Framework      | React 18, TypeScript 4                        |
| Styling        | CSS3, CSS Custom Properties (Grid + Flexbox)  |
| Animation      | GSAP, Intersection Observer API               |
| Icons          | react-icons                                   |
| Tooling        | Create React App (react-scripts 5)            |
| Deployment     | GitHub Pages (`gh-pages`), AWS                |

---

## Getting Started

### Prerequisites

- **Node.js** 14 or higher
- **npm** (or yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shrey-Jani/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script            | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm start`       | Runs the app in development mode with hot reload   |
| `npm run build`   | Builds an optimized production bundle into `build/` |
| `npm test`        | Launches the test runner in watch mode             |
| `npm run deploy`  | Publishes the build to GitHub Pages                |
| `npm run eject`   | Ejects from Create React App (one-way operation)   |

---

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/               # Custom React hooks
│   ├── useTheme.ts
│   └── useScrollReveal.ts
├── data/                # Portfolio content
│   └── portfolio.ts
├── types/               # Shared TypeScript types
│   └── index.ts
├── styles/              # Global styles
│   └── index.css
├── App.tsx              # Root component
└── index.tsx            # Entry point
```

---

## Key Features

### 🌗 Theme Toggle
- Supports both dark and light modes
- Persists the user's choice in `localStorage`
- Respects the OS-level preference on first visit

### 🧭 Smooth Navigation
- Anchor links smoothly scroll to each section
- Sticky header with active-section highlighting
- Back-to-top button for long pages

### 📐 Responsive Design
- Mobile-first layout that scales gracefully to tablet and desktop
- Built with modern CSS Grid and Flexbox
- See [`MOBILE-RESPONSIVE.md`](MOBILE-RESPONSIVE.md) for the breakpoint strategy

### ⚙️ Performance
- Code-split production build
- Scroll-reveal animations powered by the Intersection Observer (no layout thrash)
- Memoized components and lean re-render paths

---

## Deployment

### GitHub Pages

```bash
npm run deploy
```

This runs `predeploy` → `build`, then publishes the `build/` folder to the `gh-pages` branch via the `gh-pages` package.

### AWS / Static Hosting

The `build/` folder is a fully static bundle — drop it into any static host (S3 + CloudFront, Vercel, Netlify, etc.). See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the AWS workflow used by this repo.

---

## Contact

**Shrey Jani**

- 📧 Email: [janishre@sheridancollege.ca](mailto:janishre@sheridancollege.ca)
- 💼 LinkedIn: [linkedin.com/in/shrey-jani](https://www.linkedin.com/in/shrey-jani/)
- 🐙 GitHub: [github.com/Shrey-Jani](https://github.com/Shrey-Jani)

---

## License

This project is open source and available under the [MIT License](LICENSE).