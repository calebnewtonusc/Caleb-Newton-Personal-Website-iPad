# Caleb's iPad: Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EE5E99?logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Railway](https://img.shields.io/badge/Deployed-Railway-0B0D0E?logo=railway&logoColor=white)

Live at [calebnewton.me](https://calebnewton.me).

A personal portfolio site designed as an interactive iPad simulator. Browse work experience, projects, education, and personal details through a fully functional iOS-inspired interface with real app icons, a lock screen, Dock, home screen folders, and springy Framer Motion animations.

## Features

- **Realistic iPad Shell:** pixel-accurate frame with Dynamic Island, status bar, Home indicator, and a power button that actually turns the screen off
- **iOS Home Screen:** 19-icon app grid, Dock, and swipe-to-unlock lock screen; fully responsive between landscape and portrait
- **10 In-Site Apps:** About, Work, Education, Organizations, Photos, Mentors, Mail, Bible, CalebGPT, and an embedded Spotify player. Nine more icons open external links: Ideas, GitHub, LinkedIn, YouTube, Substack, X, Letterboxd, RateYourMusic, and Calendly
- **3D Drag-to-Rotate:** grab the frame and the whole iPad tilts on a spring, with a drop shadow that shifts with the angle. Clamped to 30 degrees, mouse and touch
- **Framer Motion Physics:** spring-based orientation transitions, pinch-scale corner-drag resize, app open/close zoom animations, and ambient scroll gestures to close Spotify
- **Spotify App:** embedded live Spotify player with favorite new and classic albums
- **CalebGPT:** in-app AI assistant for answering questions about Caleb's background and work

## Tech Stack

| Layer      | Technology               |
| ---------- | ------------------------ |
| Framework  | Next.js 16 (App Router)  |
| Language   | TypeScript 5             |
| UI         | React 19, Tailwind CSS 4 |
| Animation  | Framer Motion 12         |
| Deployment | Railway (Docker)         |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders as an interactive iPad. Click the lock screen to unlock, then tap any app icon to explore.

No environment variables are required for local development. The CalebGPT app and Spotify embeds may require API keys configured in Railway for full functionality.

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
    ├── SettingsApp.tsx   # About Me
    ├── WorkApp.tsx       # Experience timeline
    ├── EducationApp.tsx  # Education history
    ├── FilesApp.tsx      # Organizations
    ├── PhotosApp.tsx     # Photo gallery
    ├── MentorsApp.tsx    # Mentors
    ├── ContactApp.tsx    # Mail
    ├── BibleApp.tsx      # Bible
    ├── SpotifyApp.tsx    # Embedded Spotify player
    └── CalebGPTApp.tsx   # AI assistant

data/
└── content.ts            # All profile data: projects, experience, education, skills
```

---

**Author:** Caleb Newton ([calebnewton.me](https://calebnewton.me))

All glory to God! ✝️❤️
