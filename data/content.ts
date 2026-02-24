// ─── All content data ───────────────────────────────────────────────────────

export const profile = {
  name: "Caleb Newton",
  tagline: "CS + Applied Mathematics @ USC",
  location: "San Marino, CA",
  email: "calebnew@usc.edu",
  photo: "/assets/CalebAtBeachUSCHoodie.jpg",
  photoAlt: "/assets/Newton_Caleb_Photo.png",
  skills: ["Machine Learning", "Data Engineering", "Computer Vision"],
  bio: "Hello! I'm Caleb Newton, a follower of Jesus and USC freshman studying Computer Science + Applied Mathematics. I'm passionate about building AI systems that serve people, grounded in my Christian faith and commitment to human-centered technology. Currently diving deep into the technical foundations of machine learning: PyTorch, transformers, computer vision, and ranking systems. Outside of code, I'm into vinyl records, board games, hiking, baseball, and making learning joyful.",
  roles: [
    "Follower of Jesus",
    "Aspiring ML Engineer",
    "Data Engineer",
    "USC Student",
    "CS + Applied Mathematics",
  ],
};

export const social = {
  github: "https://github.com/calebnewtonusc",
  linkedin: "https://www.linkedin.com/in/caleb-newton-3680041a5/",
  youtube: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF",
  spotify: "https://open.spotify.com",
  letterboxd: "https://letterboxd.com/cnewt/",
  rateyourmusic: "https://rateyourmusic.com/~cnewt",
};

export const experience = [
  {
    id: "aina",
    title: "Software Engineer & Immersive Studio Production Assistant",
    company: "AINA Tech",
    period: "Sept 2025 – Present",
    year: "2026",
    logo: "",
    color: "#007AFF",
    website: "https://www.ainatech.ai/",
    description:
      "Building the future of holographic video through Gaussian Splatting, Neural Radiance Fields, and the coolest camera rig on Earth.",
    achievements: [
      "Developing AlgRun GUI automating volumetric pipeline (RED R3D decode, COLMAP, 4DGS) with Python/FastAPI backend, React/TypeScript frontend, and WebSocket monitoring processing 75-camera RED Komodo captures",
      "Building COLMAP validation tools with automated diagnostics, tiered storage (10TB cache + AWS S3), and WebGPU rendering",
      "Optimizing 4D Gaussian Splatting through GPU load balancing across 4 GPUs, CUDA profiling, and training convergence debugging",
      "Supporting 75-camera volumetric rig operations including setup, calibration, synchronization, and AWS cloud deployment",
    ],
    skills: ["Computer Vision", "Neural Radiance Fields", "Gaussian Splatting", "Python", "React"],
    photos: ["/assets/AinatechImages/Ainatechsetup.jpg", "/assets/AinatechImages/Ainatechgoats.jpg"],
  },
  {
    id: "usc-research",
    title: "Research Assistant",
    company: "USC",
    period: "2026 – Present",
    year: "2026",
    logo: "/assets/logos/usc.png",
    color: "#990000",
    website: "https://www.usc.edu",
    description: "Machine Learning Research Assistant — coming soon.",
    achievements: [],
    skills: ["Machine Learning", "Research"],
    photos: ["/assets/usc_research.jpg"],
  },
  {
    id: "fleurs",
    title: "Strategic Business Consultant",
    company: "Fleurs et Sel Cookies",
    period: "2025",
    year: "2025",
    logo: "/assets/fleursetsel_logo.png",
    color: "#FF9500",
    website: "https://www.fleursetsel.com/",
    description:
      "Produced scaling strategy for founder-led premium bakery without losing brand identity.",
    achievements: [
      "Delivered social media feed, packaging mockups, and implementation roadmap",
      "Built partnership recommendations using case studies (Sprinkles, Glossier) and corporate research (Marriott, Delta)",
      "Included QR-driven acquisition concepts",
    ],
    skills: ["Strategy", "Marketing", "Business Development"],
    photos: [],
  },
  {
    id: "sgv",
    title: "Co-Founder",
    company: "SGV Christian Club Collective",
    period: "Nov 2024 – June 2025",
    year: "2025",
    logo: "/assets/logos/sgv.png",
    color: "#34C759",
    website: "/sgchristianclubcollective",
    description:
      "Spearheaded formation of a coalition uniting 15+ high school Christian clubs across the San Gabriel Valley.",
    achievements: [
      "Pioneered a scalable framework for multi-school collaboration, media, and fundraising",
      "Hosted 'Chosen Event' (100 students) and 'Everything Night' (200+ students, 20 breakout sessions)",
    ],
    skills: ["Leadership", "Event Management", "Community Building"],
    photos: [
      "/assets/everything_night_main.jpg",
      "/assets/everythingnightplanning.jpg",
    ],
  },
  {
    id: "caltech",
    title: "Research Assistant",
    company: "Caltech",
    period: "Aug 2024 – June 2025",
    year: "2024",
    logo: "/assets/logos/caltech.png",
    color: "#FF6B35",
    website: "https://www.caltech.edu",
    description:
      "Collaborated with Taylan Kargin, Ph.D., on control theory research creating simulations for aerospace, autonomous systems, and robotics.",
    achievements: [
      "Built MATLAB and Python simulations comparing control models",
      "Created system models and plots to distill complex theory into actionable insights",
      "Supported evaluation for aerospace and robotics control strategies",
    ],
    skills: ["Python", "Control Theory", "Simulations", "MATLAB", "Data Visualization"],
    photos: ["/assets/caltech_research.jpg"],
  },
  {
    id: "impact360",
    title: "Leadership Development",
    company: "Impact 360 Institute",
    period: "June 2022 – July 2023",
    year: "2022-23",
    logo: "/assets/logos/impact360.png",
    color: "#AF52DE",
    website: "https://impact360institute.org",
    description:
      "Two summers of Christian leadership training focused on character, servant leadership, and communication.",
    achievements: [
      "Strengthened collaborative decision-making and communication skills",
      "Mission trip in Dominican Republic",
      "Servant leadership and character development",
    ],
    skills: ["Leadership", "Communication", "Teamwork", "Public Speaking"],
    photos: ["/assets/impact360_leadership.jpg", "/assets/dominican_republic.jpg"],
  },
];

export const projects = [
  {
    id: "modellab",
    title: "ModelLab",
    subtitle: "ML Experiment Tracking Platform",
    description:
      "Built production ML experiment tracking platform with dataset versioning (SHA-256 checksums), git commit tracking, and reproducibility ZIP exports. Engineered comprehensive Python EvalHarness computing ROC-AUC, PR-AUC, calibration metrics, and bootstrap confidence intervals.",
    tech: ["React", "Express", "PostgreSQL", "Python", "Docker", "Vercel"],
    live: "https://modellab.studio",
    github: "https://github.com/calebnewtonusc/Model-Lab",
    image: "/assets/projects/modellab.jpg",
    color: "#007AFF",
    year: "Jan 2026",
    category: "ML Platform",
  },
  {
    id: "tech16",
    title: "16 Tech Personalities",
    subtitle: "Developer Assessment Framework",
    description:
      "Built rule-based career matching platform with 40-question quiz across 5 behavioral spectrums generating 16 personality types. Engineered hybrid algorithm combining 16 custom type-specific models (100% test accuracy, +24.7% vs. distance-only baseline). Matches users to 42 tech roles.",
    tech: ["React", "styled-components", "Supabase", "PostgreSQL", "Recharts"],
    live: "https://16techpersonalities.com",
    github: "https://github.com/calebnewtonusc/16TechPersonalities",
    image: "/assets/projects/tech16personalities.jpg",
    color: "#AF52DE",
    year: "Dec 2025",
    category: "Web App",
  },
  {
    id: "foodvision",
    title: "Food Vision",
    subtitle: "Computer Vision Classifier",
    description:
      "Built 97.20% accurate food classifier (F1=0.972, ECE=0.015) using EfficientNetB2 transfer learning with PyTorch + FastAPI + React. Optimized model to 29.65MB weights with comprehensive evaluation harness including confusion matrices and calibration plots.",
    tech: ["PyTorch", "EfficientNetB2", "FastAPI", "React", "Hugging Face"],
    live: "https://foodvis.in",
    github: "https://github.com/calebnewtonusc/FoodVisionMini",
    image: "/assets/projects/foodvision.jpg",
    color: "#FF9500",
    year: "Nov 2025",
    category: "ML / Computer Vision",
  },
  {
    id: "la-healthcare",
    title: "LA Healthcare Access",
    subtitle: "Geospatial Analytics Platform",
    description:
      "Full-stack geospatial analytics platform analyzing healthcare facility access across 2,498 LA County census tracts serving 9.9M residents. Identified 80,831 access desert residents. Generated $645M investment opportunity with 539% projected ROI.",
    tech: ["Python", "Next.js", "FastAPI", "GeoPandas", "Census API", "Folium"],
    live: "https://la-healthcare-access-mapping.vercel.app/",
    github: "https://github.com/calebnewtonusc/la-healthcare-access-mapping",
    image: "/assets/projects/la-healthcare.png",
    color: "#34C759",
    year: "Oct 2025",
    category: "Data Science",
  },
  {
    id: "nba",
    title: "NBA Performance Prediction",
    subtitle: "Sports Analytics ML System",
    description:
      "Enterprise-grade ML system for predicting NBA game outcomes. Built production dashboard with 6 trained models achieving 72.3% accuracy. Features real-time predictions, player search (200+ players), and data explorer (2,788+ games).",
    tech: ["Python", "scikit-learn", "FastAPI", "Next.js", "PostgreSQL"],
    live: "https://nba-performance-prediction.vercel.app",
    github: "https://github.com/calebnewtonusc/NBA-Performance-Prediction",
    image: "/assets/projects/nba-prediction.png",
    color: "#FF3B30",
    year: "Oct 2025",
    category: "ML Platform",
  },
  {
    id: "usc-cook",
    title: "USC Cooked Scale",
    subtitle: "AI Schedule Difficulty Analyzer",
    description:
      "AI-powered schedule difficulty analyzer for USC students. Features RateMyProfessors integration, Reddit scraping from r/USC, intelligent professor matching, and Claude Sonnet 4.5 analysis. Generates 0-100 difficulty scores with survival tips.",
    tech: ["React", "TypeScript", "Claude AI", "Node.js", "Express", "Vite"],
    live: "https://usc-cook-scale.vercel.app",
    github: "https://github.com/calebnewtonusc/usc-cook-scale",
    image: "/assets/projects/usc-cook-scale.png",
    color: "#FF2D55",
    year: "Jan 2026",
    category: "Web App",
  },
  {
    id: "the-lines",
    title: "The Lines",
    subtitle: "STEM Education Music Project",
    description:
      "Educational STEM music videos combining mathematical concepts with creative songwriting. Created engaging content to make calculus and science more accessible and fun for students.",
    tech: ["Music", "Video Production", "Education", "STEM", "YouTube"],
    live: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF",
    github: "",
    image: "/assets/projects/thelines.jpg",
    color: "#5AC8FA",
    year: "Sep 2023 – Jan 2025",
    category: "Education",
  },
];

export const education = [
  {
    id: "usc",
    school: "University of Southern California",
    subtitle: "Viterbi School of Engineering",
    degree: "Bachelor of Science — Mathematics & Computer Science",
    period: "Aug 2025 – May 2029",
    status: "Current · Freshman",
    logo: "/assets/logos/usc.png",
    color: "#990000",
    website: "https://www.usc.edu",
    description:
      "Currently taking Multivariable Calculus, Linear Algebra, C++, and Discrete Methods. Member of Alpha Gamma Omega (Christian fraternity).",
    highlights: [
      "CSCI 103 — Introduction to Programming (C++)",
      "CSCI 170 — Discrete Methods",
      "MATH 226 — Multivariable Calculus",
      "MATH 225 — Linear Algebra",
    ],
  },
  {
    id: "smhs",
    school: "San Marino High School",
    subtitle: "",
    degree: "High School Diploma",
    period: "Aug 2021 – June 2025",
    status: "Graduated · GPA 4.0+",
    logo: "/assets/education/smhs.png",
    color: "#007AFF",
    website: "https://www.sanmarinohs.org",
    description: "AP Scholar with Distinction. National Merit Commended Student.",
    highlights: [
      "Promethean Award — Highest honor for graduating student",
      "AP Scholar with Distinction",
      "National Merit Commended Student",
      "ACTS Christian Club President (12th grade)",
      "Baseball, Wrestling, Football",
    ],
  },
  {
    id: "berkeley",
    school: "UC Berkeley",
    subtitle: "College of Engineering",
    degree: "Summer Program — Computer Science",
    period: "June 2024",
    status: "Completed",
    logo: "/assets/education/berkeley.png",
    color: "#FFC107",
    website: "https://precollege.berkeley.edu/summer-computer-science-academy",
    description:
      "Intensive BJC-based course in abstraction, recursion, algorithms, and introductory ML through Snap! and Python.",
    highlights: ["Algorithms & Recursion", "Introductory Machine Learning", "Python"],
  },
  {
    id: "cnsi",
    school: "California Nanosystems Institute at UCLA",
    subtitle: "",
    degree: "Summer Program — Nanotechnology & Entrepreneurship",
    period: "July 2023",
    status: "Completed",
    logo: "/assets/education/ucla_logo.png",
    color: "#2563EB",
    website: "https://cnsi.ucla.edu/applications-of-nanoscience-summer-program/",
    description:
      "Built AquaShield (hydrophobic water bottle) in two-week STEM + entrepreneurship program. Pitched to investors, applied MATLAB for analysis.",
    highlights: ["Nanotechnology", "Entrepreneurship", "MATLAB", "Investor Pitch"],
  },
  {
    id: "stjohns",
    school: "St. John's Nursery School",
    subtitle: "🎓 Certified Juice Box Connoisseur",
    degree: "Fundamentals of Sharing & Naptime Negotiation",
    period: "Aug 2010 – June 2011",
    status: "Graduated with Honors",
    logo: "/assets/stjohns.jpg",
    color: "#FF9500",
    website: "https://www.stjohnsnurseryla.com",
    description: "Built early STEM skills by testing gravity with block towers, racing tricycles, and asking 'why?' 47 times a day.",
    highlights: [
      "Block Tower Construction Club",
      "Tricycle Racing League",
      "Story Time Enthusiasts",
    ],
  },
];

export const skills = {
  languages: [
    { name: "Python", level: 95, color: "#3776AB" },
    { name: "TypeScript", level: 88, color: "#3178C6" },
    { name: "C++", level: 72, color: "#00599C" },
    { name: "JavaScript", level: 90, color: "#F7DF1E" },
    { name: "MATLAB", level: 65, color: "#E16737" },
    { name: "SQL", level: 82, color: "#336791" },
  ],
  frameworks: [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Next.js", level: 85, color: "#000000" },
    { name: "PyTorch", level: 80, color: "#EE4C2C" },
    { name: "FastAPI", level: 85, color: "#009688" },
    { name: "Node.js", level: 82, color: "#339933" },
    { name: "Tailwind CSS", level: 88, color: "#06B6D4" },
  ],
  tools: [
    { name: "Docker", level: 78, color: "#2496ED" },
    { name: "Git", level: 92, color: "#F05032" },
    { name: "AWS", level: 65, color: "#FF9900" },
    { name: "Vercel", level: 90, color: "#000000" },
    { name: "Supabase", level: 80, color: "#3ECF8E" },
    { name: "PostgreSQL", level: 80, color: "#336791" },
  ],
  domains: [
    "Machine Learning",
    "Computer Vision",
    "Data Engineering",
    "Full-Stack Development",
    "Neural Networks",
    "Geospatial Analytics",
    "API Design",
    "Holographic Video (4DGS)",
  ],
};

export const personalSettings = [
  {
    section: "Faith & Identity",
    icon: "✝️",
    items: [
      { label: "Follower of Jesus", type: "toggle-on", detail: "Non-negotiable" },
      { label: "Alpha Gamma Omega (AGO)", type: "toggle-on", detail: "Christian fraternity @ USC" },
      { label: "Human-Centered Technology", type: "toggle-on", detail: "Core design philosophy" },
      { label: "IRL Connection > Social Media", type: "toggle-on", detail: "Always" },
    ],
  },
  {
    section: "Music",
    icon: "🎵",
    items: [
      { label: "Vinyl Collector", type: "toggle-on", detail: "Growing steadily" },
      { label: "Concert-Goer", type: "toggle-on", detail: "LA has good venues" },
      { label: "Genres", type: "info", detail: "Jazz · Hip-Hop · Gospel · R&B · Indie" },
      { label: "All-Time Favorite", type: "info", detail: "Stevie Wonder" },
      { label: "Current Rotation", type: "info", detail: "Little Simz, Quadeca, Will Reagan" },
      { label: "Plays Guitar", type: "toggle-on", detail: "Learning worship songs" },
    ],
  },
  {
    section: "Sports & Activities",
    icon: "⚾",
    items: [
      { label: "Baseball", type: "toggle-on", detail: "Pitcher · San Marino HS" },
      { label: "Hiking", type: "toggle-on", detail: "Hollywood Hills & beyond" },
      { label: "Board Games", type: "toggle-on", detail: "Serious about this" },
      { label: "Spikeball", type: "toggle-on", detail: "& Pickleball" },
      { label: "Wrestling", type: "toggle-on", detail: "High school" },
    ],
  },
  {
    section: "Film & Culture",
    icon: "🎬",
    items: [
      { label: "Letterboxd Active", type: "toggle-on", detail: "cnewt" },
      { label: "RateYourMusic Active", type: "toggle-on", detail: "~cnewt" },
      { label: "Has Opinions About Movies", type: "toggle-on", detail: "Strong ones" },
    ],
  },
  {
    section: "About This Device",
    icon: "📱",
    items: [
      { label: "Name", type: "info", detail: "Caleb Newton" },
      { label: "Location", type: "info", detail: "San Marino, CA → USC" },
      { label: "Software Version", type: "info", detail: "USC Freshman OS 25.1.0" },
      { label: "Storage", type: "info", detail: "∞ Curiosity · 20TB Work Ethic" },
      { label: "Battery", type: "info", detail: "Charged by faith & coffee" },
      { label: "Serial Number", type: "info", detail: "calebnew@usc.edu" },
      { label: "Model", type: "info", detail: "Human (Caleb Edition)" },
    ],
  },
];

export const photos = [
  {
    src: "/assets/vinyl_collection.jpg",
    caption: "Vinyl collection growing (Stevie to The Strokes)",
    date: "Ongoing",
    location: "Los Angeles, CA",
    rotation: -3,
  },
  {
    src: "/assets/baseball_pitching.jpg",
    caption: "Pitched in high school — loved the competition and strategy",
    date: "May 2025",
    location: "San Marino, CA",
    rotation: 2,
  },
  {
    src: "/assets/baseball_with_family.jpg",
    caption: "I have 3 younger siblings",
    date: "Ongoing",
    location: "San Marino, CA",
    rotation: -1.5,
  },
  {
    src: "/assets/hike.jpg",
    caption: "Hikes above the Hollywood sign",
    date: "November 2024",
    location: "Hollywood, CA",
    rotation: 3,
  },
  {
    src: "/assets/board_game.jpg",
    caption: "Board game nights with friends",
    date: "Ongoing",
    location: "Los Angeles, CA",
    rotation: -2,
  },
  {
    src: "/assets/alpha_gamma_omega.jpg",
    caption: "Alpha Gamma Omega pledge challenge — 4x4 burger and 4 donuts",
    date: "November 2025",
    location: "Los Angeles, CA",
    rotation: 1.5,
  },
  {
    src: "/assets/concert.jpg",
    caption: "Concert nights with friends",
    date: "Ongoing",
    location: "Los Angeles, CA",
    rotation: -2.5,
  },
  {
    src: "/assets/guitar.jpg",
    caption: "Recently bought guitar — learning worship songs",
    date: "December 2025",
    location: "Los Angeles, CA",
    rotation: 2,
  },
  {
    src: "/assets/premed_friends.jpg",
    caption: "Premed friends at dinner — one of the few times we're not studying lol",
    date: "Fall 2025",
    location: "Los Angeles, CA",
    rotation: -1,
  },
];

export const music = {
  currentlyPlaying: {
    title: "Praise",
    artist: "Various Artists",
    spotifyUrl: "https://open.spotify.com/track/",
  },
  favoriteNewAlbums: [
    { artist: "Little Simz", album: "Drop 7", image: null },
    { artist: "The Hellp", album: "Latest", image: null },
    { artist: "Will Reagan", album: "Latest", image: null },
    { artist: "Quadeca", album: "From Bird's Eye View", image: null },
  ],
  favoriteOldAlbums: [
    { artist: "Stevie Wonder", album: "Songs in the Key of Life", image: null },
    { artist: "Parliament", album: "Mothership Connection", image: null },
    { artist: "Lauryn Hill", album: "The Miseducation of Lauryn Hill", image: null },
    { artist: "John Coltrane", album: "A Love Supreme", image: null },
  ],
};

// ─── App Definitions ─────────────────────────────────────────────────────────

export type AppId =
  | "about"
  | "work"
  | "projects"
  | "education"
  | "skills"
  | "music"
  | "photos"
  | "contact"
  | "settings"
  | "youtube"
  | "github"
  | "linkedin"
  | "spotify"
  | "letterboxd"
  | "rateyourmusic";

export interface AppDef {
  id: AppId;
  name: string;
  emoji: string;
  gradient: [string, string];
  external?: string;
}

export const apps: AppDef[] = [
  { id: "about", name: "About", emoji: "👤", gradient: ["#007AFF", "#0051D5"] },
  { id: "work", name: "Work", emoji: "💼", gradient: ["#AF52DE", "#7B2D8B"] },
  { id: "projects", name: "Projects", emoji: "💻", gradient: ["#FF9500", "#FF5E00"] },
  { id: "education", name: "Education", emoji: "🎓", gradient: ["#FF3B30", "#C0392B"] },
  { id: "skills", name: "Skills", emoji: "⚡", gradient: ["#FFCC00", "#FF9500"] },
  { id: "music", name: "Music", emoji: "🎵", gradient: ["#FF2D55", "#D60030"] },
  { id: "photos", name: "Photos", emoji: "📷", gradient: ["#34C759", "#248A3D"] },
  { id: "contact", name: "Contact", emoji: "💬", gradient: ["#5AC8FA", "#007AFF"] },
  { id: "settings", name: "Settings", emoji: "⚙️", gradient: ["#8E8E93", "#636366"] },
  { id: "youtube", name: "YouTube", emoji: "▶️", gradient: ["#FF0000", "#C0392B"], external: "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF" },
  { id: "github", name: "GitHub", emoji: "🐙", gradient: ["#24292E", "#000000"], external: "https://github.com/calebnewtonusc" },
  { id: "linkedin", name: "LinkedIn", emoji: "in", gradient: ["#0A66C2", "#004182"], external: "https://www.linkedin.com/in/caleb-newton-3680041a5/" },
  { id: "spotify", name: "Spotify", emoji: "🎧", gradient: ["#1DB954", "#157A37"], external: "https://open.spotify.com" },
  { id: "letterboxd", name: "Letterboxd", emoji: "🎬", gradient: ["#FF8000", "#E55C00"], external: "https://letterboxd.com/cnewt/" },
  { id: "rateyourmusic", name: "RYM", emoji: "🎼", gradient: ["#ED1C24", "#A8001B"], external: "https://rateyourmusic.com/~cnewt" },
];

export const dockApps: AppId[] = ["about", "projects", "contact", "settings"];
