# Caleb's iPad: Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EE5E99?logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)

A personal portfolio site designed as an interactive iPad simulator. Browse work experience, projects, education, and personal details through a fully functional iOS-inspired interface with real app icons, a lock screen, Dock, home screen folders, and springy Framer Motion animations.

> Screenshot

## Features

- **Realistic iPad Shell:** pixel-accurate frame with Dynamic Island, status bar, Home indicator, and a power button that actually turns the screen off
- **iOS Home Screen:** app icon grid with a tap-to-open Projects folder, Dock, and swipe-to-unlock lock screen; fully responsive between landscape and portrait
- **17 Interactive Apps:** Work, Projects, Education, Photos, Organizations, Mail/Contact, Settings (About Me), CalebGPT, Spotify player, Bible, and social link apps (GitHub, LinkedIn, YouTube, Letterboxd, X, Substack, RateYourMusic)
- **Framer Motion Physics:** spring-based orientation transitions, pinch-scale corner-drag resize, app open/close zoom animations, and ambient scroll gestures to close Spotify
- **Spotify App:** embedded live Spotify player with favorite new and classic albums
- **CalebGPT:** in-app AI assistant for answering questions about Caleb's background and work

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders as an interactive iPad. Click the lock screen to unlock, then tap any app icon to explore.

No environment variables are required for local development. The CalebGPT app and Spotify embeds may require API keys configured in Vercel for full functionality.

## Project Structure

```
components/
├── IPadPage.tsx          # Root orchestrator: scale, orientation, drag-resize
├── ipad/
│   ├── IPadFrame.tsx     # Hardware shell (bezels, Dynamic Island, power button)
│   ├── HomeScreen.tsx    # App grid, Dock, lock screen, wallpaper
│   └── StatusBar.tsx     # iOS-style time and icon row
└── apps/
    ├── AppWindow.tsx     # Animated wrapper for all non-Spotify apps
    ├── WorkApp.tsx       # Experience timeline
    ├── ProjectsApp.tsx   # Projects showcase
    ├── EducationApp.tsx  # Education history
    ├── PhotosApp.tsx     # Photo gallery
    ├── SpotifyApp.tsx    # Embedded Spotify player
    ├── CalebGPTApp.tsx   # AI assistant
    └── ...               # (14 total app components)

data/
└── content.ts            # All profile data: projects, experience, education, skills
```

---

**Author:** Caleb Newton ([calebnewton.me](https://calebnewton.me))

All glory to God! ✝️❤️
