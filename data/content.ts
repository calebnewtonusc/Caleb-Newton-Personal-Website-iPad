// ─── All content data ───────────────────────────────────────────────────────

export const profile = {
  name: "Caleb Newton",
  tagline: "USC · Jimmy Iovine & André Young Academy",
  location: "San Marino, CA",
  email: "calebnew@usc.edu",
  photo: "/assets/CalebAtBeachUSCHoodie.jpg",
  photoAlt: "/assets/CalebAtUSC.jpg",
  skills: ["Machine Learning", "Data Engineering", "Computer Vision"],
  bio: "Hello! I'm Caleb Newton, a follower of Jesus and USC freshman. I'm passionate about building AI systems that serve people, grounded in my Christian faith and commitment to human-centered technology. Currently diving deep into the technical foundations of machine learning: PyTorch, transformers, computer vision, and ranking systems. Outside of code, I'm into vinyl records, board games, hiking, skateboarding, baseball, and making learning joyful.",
  roles: [
    "Follower of Jesus",
    "Aspiring AI Engineer",
    "Aspiring Data Engineer",
    "USC Student",
  ],
};

export const social = {
  github: "https://github.com/calebnewtonusc",
  linkedin: "https://www.linkedin.com/in/caleb-newton-3680041a5/",
  youtube:
    "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF",
  spotify: "https://open.spotify.com/user/rbfdtme07mst8eft5f4j8k2ll",
  letterboxd: "https://letterboxd.com/cnewt/",
  rateyourmusic: "https://rateyourmusic.com/~cnewt",
  x: "https://x.com/klubnootuhn",
};

export const experience = [
  {
    id: "nalana",
    title: "GTM & Product Engineer",
    company: "Nalana",
    period: "Mar 2026 - Present",
    year: "2026",
    logo: "/assets/logos/nalana.jpeg",
    color: "#1a4a2e",
    website: "https://nalana.vercel.app/",
    description:
      "3D AI design startup building a voice-driven Blender workflow for 3D designers.",
    achievements: [
      "Building the Nalana IDE, a voice-driven Blender tool for 3D designers, powered by a multi-agent workflow that combines local speech recognition, rules-based parsing, and LLM fallback with live scene context",
      "Built Nalana's outbound GTM stack, generating a 16,000-contact pipeline across 9 footwear brands from public 3D tooling signals and uncovering warm Nike intros for fundraising and partnership outreach",
    ],
    skills: [
      "TypeScript",
      "Python",
      "Blender",
      "LLMs",
      "Speech Recognition",
      "GTM",
    ],
    photos: [],
  },
  {
    id: "loop-message",
    title: "GTM & Product Engineer",
    company: "Loop Message",
    period: "Mar 2026 - Present",
    year: "2026",
    logo: "/assets/logos/loopmessage.svg",
    color: "#5856D6",
    website: "",
    description:
      "iMessage platform for developers. Built Loop's SDK and brokered a strategic partnership with Amber.",
    achievements: [
      "Built Loop Message's fully typed TypeScript SDK in Bun and Node.js, spanning 20+ methods across 6 resource areas and 4 messaging channels, with typed webhooks, async pagination, and retry logic that streamlined customer integrations",
      "Brokered and closed a strategic partnership between Loop Message and Amber, converting Amber's student onboarding funnel into a developer acquisition and distribution channel for Loop's iMessage platform",
    ],
    skills: ["TypeScript", "Bun", "Node.js", "SDK", "Webhooks", "Partnerships"],
    photos: [],
  },
  {
    id: "amber",
    title: "Founding Engineer",
    company: "Amber",
    period: "Feb 2026 - Present",
    year: "2026",
    logo: null,
    color: "#F59E0B",
    website: "",
    description:
      "The first decentralized digital health network. Architecting backend, intelligence, and trust infrastructure across Apple platforms, hardware, and web.",
    achievements: [
      "Architected and shipped 2 production backend services on Railway using Fastify and Node.js 20, powering Amber across Apple platforms, hardware, and web; built 14 REST route groups and 48+ modules across auth, data, and external services",
      "Built and deployed a Python coding-agent service on GCP with Docker-sandboxed execution, turning iMessage into a code-execution and deployment channel for building and shipping projects over text",
      "Built Amber's intelligence layer for a 6-dimension health graph, combining 4 ingestion pipelines, NLP-based relationship graph extraction, workflow orchestration, and nightly training jobs over core AI systems",
      "Designed Amber's trust and platform layer across verifiable identity, KYC, and immutable graph infrastructure; also sourced and negotiated founder-level partnerships for App Store publishing and iMessage delivery",
    ],
    skills: [
      "Fastify",
      "Node.js",
      "Python",
      "GCP",
      "Docker",
      "NLP",
      "Solana",
      "Privy",
    ],
    photos: [],
  },
  {
    id: "silo",
    title: "Founder & CTO",
    company: "Silo",
    period: "Feb 2026 - Present",
    year: "2026",
    logo: null,
    color: "#16A34A",
    website: "",
    description:
      "Food marketplace startup for home-cooked meals. Built and shipped the MVP to the App Store as sole engineer.",
    achievements: [
      "Built and launched Silo's MVP to the App Store as sole engineer, developing the full mobile and backend stack for a home-cooked meal marketplace with payments, pickup verification, and phone-based authentication",
      "Won 1st place at USC Marshall's High Tech Association New Venture Pitch Competition alongside CEO Shirley Park; led Silo's regulatory architecture, monetization model, and technical roadmap ahead of investor outreach",
    ],
    skills: [
      "Swift",
      "iOS",
      "Mobile",
      "Payments",
      "Marketplace",
      "Authentication",
    ],
    photos: [],
  },
  {
    id: "pallas-care",
    title: "Data Analytics & Financial Consultant",
    company: "Pallas Care",
    period: "Feb 2026 - Present",
    year: "2026",
    logo: "/assets/logos/pallas.png",
    color: "#5856D6",
    website: "https://www.pallas.care/",
    description:
      "Home care services company. Built analytics models surfacing caregiver-message patterns from 11 months of CareQB data.",
    achievements: [
      "Built 10 features from 11 months of CareQB data (24,391 messages, 2,318 shifts), including an urgency classifier, disruption taxonomy, and response-time model linking caregiver messages to shift outcomes",
      "Found family-emergency messages had a 1.6x higher callout rate (9.82% vs 6.05%) and that 97% of inbound messages were low-urgency AI-draftable; recommended a 5-point triage plan to cut critical response delays",
    ],
    skills: [
      "Python",
      "Data Analytics",
      "NLP",
      "Statistics",
      "Financial Modeling",
    ],
    photos: [],
  },
  {
    id: "aina",
    title: "Software Engineer & Production Assistant",
    company: "AINA Tech",
    period: "Sep 2025 - Present",
    year: "2026",
    logo: "/assets/icons/aina.png",
    color: "#007AFF",
    website: "https://www.ainatech.ai/",
    description:
      "Volumetric AI & immersive media company. Building a 4D Gaussian Splatting pipeline producing photorealistic human rendering from real-world volumetric capture.",
    achievements: [
      "Contributing to a 4D Gaussian Splatting pipeline trained on real-world volumetric capture from a 75-camera RED Komodo array, producing photorealistic human rendering beyond synthetic-data baselines",
      "Architected AlgoRun, an internal orchestration platform that automates a 72-100+ hour multi-stage 3D reconstruction workflow across GPU VMs, replacing manual SSH coordination and improving visibility, consistency, and reliability across the production pipeline",
      "Built validation, storage, distribution, and agentic knowledge infrastructure for multi-terabyte FSx Lustre datasets and a 35+ repository codebase, improving accessibility across teams and enabling natural-language architecture and pipeline queries via a three-tier retrieval protocol",
    ],
    skills: [
      "Computer Vision",
      "4D Gaussian Splatting",
      "COLMAP",
      "FastAPI",
      "CUDA",
      "Python",
      "React",
    ],
    photos: [
      "/assets/AinatechImages/Ainatechsetup.jpg",
      "/assets/AinatechImages/Ainatechgoats.jpg",
    ],
  },
  {
    id: "cosasco",
    title: "UI/UX + AI Consultant",
    company: "Cosasco",
    period: "Feb 2026 - Mar 2026",
    year: "2026",
    logo: "/assets/logos/cosasco.png",
    color: "#0f2a4a",
    website: "https://cosasco.vercel.app",
    description:
      "Rohrback Cosasco Systems: a 70+ year industrial company operating in 110+ countries. Designed and shipped a full Next.js website weeks ahead of schedule.",
    achievements: [
      "Built a 66-page Next.js 15 site from scratch covering 11 industry verticals and 10 product lines for a 70+ year industrial company operating in 110+ countries; shipped an AI-powered chatbot alongside structured support pathways including a searchable FAQ, SLA-tiered support form, 3-step RMA wizard, and software activation portal all wired to live API routes",
      "Redesigned Find-a-Rep as a 7-region interactive accordion directory covering 110+ countries with per-rep email routing; ran 5 audit passes eliminating 100+ UX, accessibility, content, and technical issues before first client presentation",
    ],
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "AI Integration",
      "Vercel",
      "REST APIs",
    ],
    photos: [],
  },
  {
    id: "fleurs",
    title: "Growth Consultant",
    company: "Fleurs et Sel Cookies",
    period: "Sep 2025 - Oct 2025",
    year: "2025",
    logo: "/assets/fleursetsel_logo.png",
    color: "#FF9500",
    website: "https://www.fleursetsel.com/",
    description:
      "Produced a scaling strategy for a founder-led premium bakery without losing brand identity.",
    achievements: [
      "Produced a scaling strategy for a founder-led premium bakery without losing brand identity; delivered social media feed and packaging mockups plus an implementation roadmap",
      "Built partnership and marketing recommendations using case studies (Sprinkles, Glossier) and corporate partnership research (Marriott, Delta), including QR-driven acquisition concepts",
    ],
    skills: ["Strategy", "Marketing", "Business Development"],
    photos: [],
  },
  {
    id: "sgvccc-exp",
    title: "Founder",
    company: "SGV Christian Club Collective",
    period: "Nov 2024 - Jun 2025",
    year: "2025",
    logo: "/assets/logos/sgvchristiancc.png",
    color: "#34C759",
    website: "",
    description:
      "Built a coalition of 18+ high school Christian clubs across the San Gabriel Valley and ran Everything Night, a regional 200+ student event.",
    achievements: [
      "Built a coalition of 18+ high school Christian clubs across the San Gabriel Valley, creating a scalable model for collaboration, fundraising, media coordination, and sustained regional community-building across separate groups",
      "Conceived and executed a regional event attracting 200+ students to 20 breakout sessions by curating, refining, and integrating student-led ideas into a cohesive, high-impact program centered on faith, connection, and community",
    ],
    skills: ["Leadership", "Community Building", "Event Coordination", "Faith"],
    photos: [
      "/assets/everything_night_main.jpg",
      "/assets/everything_night_poster.jpg",
      "/assets/everything_night_band.jpg",
      "/assets/everything_night_crowd.jpg",
      "/assets/everything_night_dinner.jpg",
      "/assets/everything_night_dodgeball.jpg",
      "/assets/everything_night_picnic.jpg",
      "/assets/everythingnightplanning.jpg",
      "/assets/chosen_team.jpg",
      "/assets/chosen_crowd.jpg",
      "/assets/chosen_dab.jpg",
    ],
  },
  {
    id: "caltech",
    title: "Control Theory Research Assistant",
    company: "Caltech Electrical Engineering",
    period: "Aug 2024 - Jun 2025",
    year: "2025",
    logo: "/assets/logos/caltech.png",
    color: "#FF6B35",
    website: "https://www.caltech.edu",
    description:
      "Collaborated with Taylan Kargin, Ph.D., on control theory research for aerospace, autonomous systems, and robotics.",
    achievements: [
      "Built MATLAB and Python simulations comparing Taylan Kargin's control model against three alternatives; produced analyses and visualizations to evaluate stability, efficiency, and scalability trade-offs across different control approaches",
      "Created system models and plots to support evaluation of aerospace and robotics control strategies across operating conditions",
    ],
    skills: [
      "Python",
      "MATLAB",
      "Control Theory",
      "Simulations",
      "Data Visualization",
    ],
    photos: ["/assets/caltech_research.jpg"],
  },
];

export const projects = [
  {
    id: "isaac-newton",
    title: "I.N.S.",
    logo: "/assets/ventures/isaac-newton.png",
    logoBg: "white",
    live: "https://isaacnewtonstudios.com/",
    color: "#1a1a2e",
  },
  {
    id: "serutnev",
    title: "serutneV",
    logo: "/assets/ventures/serutnev.png",
    logoBg: "white",
    live: "https://serutnev.co/",
    color: "#0f0f23",
  },
  {
    id: "fiduciaryos",
    title: "FiduciaryOS",
    logo: null,
    live: "https://fiduciary.cash/",
    color: "#0a3d55",
  },
  {
    id: "nalana",
    title: "Nalana",
    logo: "/assets/ventures/nalana.svg",
    live: "https://nalana.vercel.app/",
    color: "#1a4a2e",
  },
  {
    id: "clearout",
    title: "ClearOut",
    logo: null,
    live: "https://clearout.xyz/",
    color: "#3a1a4a",
  },
  {
    id: "astroshockdiaper",
    title: "Astro Overnight",
    logo: null,
    live: "https://astroovernight.com/",
    color: "#1a2a4a",
    comingSoon: false,
  },
  {
    id: "vapedestroyer",
    title: "VapeDestroyer",
    logo: null,
    live: "https://vapedestroyer.com/",
    color: "#1a4a1a",
    comingSoon: false,
  },
  {
    id: "marrow",
    title: "Marrow",
    logo: null,
    live: "https://marrow.love/",
    color: "#8b1a1a",
    comingSoon: false,
  },
  {
    id: "amber",
    title: "Amber",
    logo: null,
    live: "#",
    color: "#7a4a0a",
    comingSoon: true,
  },
  // Page 2
  {
    id: "civicq",
    title: "CivicQ",
    logo: null,
    live: "https://civicq.vote/",
    color: "#1a3a5c",
    comingSoon: false,
    page: 2,
  },
];

export const education = [
  {
    id: "usc",
    school: "University of Southern California",
    subtitle: "Jimmy Iovine & André Young Academy",
    degree: "Bachelor of Science",
    period: "Aug 2025 – May 2029",
    status: "Current · Freshman",
    logo: "/assets/logos/usc.png",
    color: "#990000",
    website: "https://www.usc.edu",
    description:
      "Currently taking Multivariable Calculus, Linear Algebra, C++, and Discrete Methods.",
    highlights: [
      "CSCI 103 -Introduction to Programming (C++)",
      "CSCI 170 -Discrete Methods",
      "MATH 226 -Multivariable Calculus",
      "MATH 225 -Linear Algebra",
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
    description:
      "AP Scholar with Distinction. National Merit Commended Student.",
    highlights: [
      "Promethean Award -Highest honor for graduating student",
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
    degree: "Summer Program -Computer Science",
    period: "June 2024",
    status: "Completed",
    logo: "/assets/education/berkeley.png",
    color: "#FFC107",
    website: "https://precollege.berkeley.edu/summer-computer-science-academy",
    description:
      "Intensive BJC-based course in abstraction, recursion, algorithms, and introductory AI through Snap! and Python.",
    highlights: [
      "Algorithms & Recursion",
      "Introductory Machine Learning",
      "Python",
    ],
  },
  {
    id: "cnsi",
    school: "California Nanosystems Institute at UCLA",
    subtitle: "",
    degree: "Summer Program -Nanotechnology & Entrepreneurship",
    period: "July 2023",
    status: "Completed",
    logo: "/assets/education/ucla_logo.png",
    color: "#2563EB",
    website:
      "https://cnsi.ucla.edu/applications-of-nanoscience-summer-program/",
    description:
      "Built AquaShield (hydrophobic water bottle) in two-week STEM + entrepreneurship program. Pitched to investors, applied MATLAB for analysis.",
    highlights: [
      "Nanotechnology",
      "Entrepreneurship",
      "MATLAB",
      "Investor Pitch",
    ],
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
    description:
      "Built early STEM skills by testing gravity with block towers, racing tricycles, and asking 'why?' 47 times a day.",
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
    icon: "faith",
    items: [
      {
        label: "Follower of Jesus",
        type: "toggle-on",
        detail: "Non-negotiable",
      },
      { label: "Favorite Verse", type: "info", detail: "1 Thessalonians 5:17" },
      { label: "Church", type: "info", detail: "ACTS2 Fellowship @ USC" },
      {
        label: "Ministry",
        type: "info",
        detail: "President, ACTS · Co-Founder, SGV Christian Club Collective",
      },
      {
        label: "Recharge Location",
        type: "info",
        detail: "Sunday service + community",
      },
      {
        label: "Joy Source",
        type: "info",
        detail: "Lasting community, watching others thrive",
      },
      {
        label: "Dominican Republic",
        type: "info",
        detail: "Mission trip - joy doesn't come from wealth",
      },
      {
        label: "Boldness",
        type: "toggle-on",
        detail: "Will stand against the crowd when it matters",
      },
      {
        label: "Human-Centered Technology",
        type: "toggle-on",
        detail: "Tech should serve people, not enslave them",
      },
      {
        label: "IRL Connection > Social Media",
        type: "toggle-on",
        detail: "Always",
      },
    ],
  },
  {
    section: "Music",
    icon: "music",
    items: [
      { label: "Vinyl Collector", type: "info", detail: "Growing steadily" },
      { label: "Concert-Goer", type: "info", detail: "LA has good venues" },
      {
        label: "Genres",
        type: "info",
        detail: "Jazz · Hip-Hop · Gospel · R&B · Indie",
      },
      { label: "All-Time Favorite", type: "info", detail: "Stevie Wonder" },
      {
        label: "Current Rotation",
        type: "info",
        detail: "Little Simz, Quadeca, Will Reagan",
      },
      { label: "Plays Guitar", type: "info", detail: "Learning worship songs" },
    ],
  },
  {
    section: "Sports & Activities",
    icon: "sports",
    items: [
      {
        label: "Baseball",
        type: "toggle-off",
        detail: "Retired · Pitcher · San Marino HS",
      },
      {
        label: "Wrestling",
        type: "toggle-off",
        detail: "Retired · San Marino HS",
      },
      {
        label: "Hiking",
        type: "toggle-on",
        detail: "Hollywood Hills, mountains, anywhere",
      },
      { label: "Board Games", type: "toggle-on", detail: "Serious about this" },
      { label: "Spikeball & Pickleball", type: "toggle-on", detail: "Active" },
    ],
  },
  {
    section: "Film & Culture",
    icon: "film",
    items: [
      { label: "Letterboxd", type: "info", detail: "cnewt · 55 films logged" },
      {
        label: "Favorites",
        type: "info",
        detail: "Peanut Butter Falcon · Inception · Dumb & Dumber · Toy Story",
      },
      {
        label: "Rating Style",
        type: "info",
        detail: "Generous - 59% five stars. If it's good it's good",
      },
      { label: "On Watchlist", type: "info", detail: "Parasite · Dune" },
      {
        label: "Film Opinions",
        type: "info",
        detail: "Strong ones - will share unprompted",
      },
      {
        label: "RateYourMusic",
        type: "info",
        detail: "~cnewt · jazz & hip-hop deep cuts",
      },
      { label: "Thrifting", type: "toggle-on", detail: "Finds are undefeated" },
      {
        label: "Style",
        type: "info",
        detail: "Clean fits, thrifted - never paying retail",
      },
      {
        label: "Reading",
        type: "info",
        detail: "Non-fiction · theology · AI alignment",
      },
    ],
  },
  {
    section: "Daily Runtime",
    icon: "runtime",
    items: [
      { label: "Sleep Schedule", type: "info", detail: "Cooked" },
      { label: "Coffee Dependency", type: "info", detail: "Critical" },
      { label: "Peak Coding Hours", type: "info", detail: "11 PM – 3 AM" },
      {
        label: "Meal Prep",
        type: "toggle-off",
        detail: "Dining hall (for now)",
      },
      { label: "Social Battery", type: "info", detail: "Recharges at church" },
      { label: "Reply Time (iMessage)", type: "info", detail: "Eventually" },
      { label: "Biohacking Protocol", type: "info", detail: "Active" },
    ],
  },
  {
    section: "System Preferences",
    icon: "system",
    items: [
      {
        label: "Do Not Disturb",
        type: "toggle-off",
        detail: "People keep texting",
      },
      { label: "Location", type: "info", detail: "Leavey Library" },
      {
        label: "Brain Backup",
        type: "info",
        detail: "GitHub + Todoist + Poke Agent",
      },
      { label: "Dictation", type: "info", detail: "WillowVoice - goes faster" },
      {
        label: "Privacy",
        type: "info",
        detail: "Public GitHub, private thoughts",
      },
    ],
  },
  {
    section: "About This Device",
    icon: "device",
    items: [
      { label: "Edition", type: "info", detail: "2006 (Caleb Newton)" },
      { label: "Personality", type: "info", detail: "ENTJ-A · Commander" },
      { label: "Location", type: "info", detail: "San Marino, CA → USC" },
      {
        label: "Software Version",
        type: "info",
        detail: "USC Freshman OS 25.1.0",
      },
      { label: "Serial Number", type: "info", detail: "calebnew@usc.edu" },
      {
        label: "Optimal State",
        type: "info",
        detail: "Deep work + good music + strong coffee",
      },
      {
        label: "Social Mode",
        type: "info",
        detail: "Meaningful conversations > small talk",
      },
      {
        label: "Background Process",
        type: "info",
        detail: "Head-bobbing may occur during vinyl sessions",
      },
      { label: "Battery", type: "info", detail: "Charged by faith & coffee" },
      {
        label: "Storage",
        type: "info",
        detail: "∞ Curiosity · 20TB Work Ethic",
      },
      {
        label: "Favorite Question",
        type: "info",
        detail: "Is your mind more like a tower or a river?",
      },
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
    caption: "Pitched in high school -loved the competition and strategy",
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
    src: "/assets/concert.jpg",
    caption: "Concert nights with friends",
    date: "Ongoing",
    location: "Los Angeles, CA",
    rotation: -2.5,
  },
  {
    src: "/assets/guitar.jpg",
    caption: "Recently bought guitar -learning worship songs",
    date: "December 2025",
    location: "Los Angeles, CA",
    rotation: 2,
  },
  {
    src: "/assets/premed_friends.jpg",
    caption:
      "Premed friends at dinner -one of the few times we're not studying lol",
    date: "Fall 2025",
    location: "Los Angeles, CA",
    rotation: -1,
  },
];

export const organizations = [
  {
    id: "acts2",
    name: "ACTS2 Fellowship",
    shortName: "ACTS2",
    role: "Member",
    period: "Fall 2025 - Present",
    logo: "/assets/logos/acts2.png",
    color: "#5856D6",
    description:
      "USC Christian student organization rooted in Acts 2. Community, faith, and fellowship on campus.",
    link: "https://usc.acts2fellowship.org/",
    category: "Faith",
  },
  {
    id: "usctts",
    name: "USC Trojan Technology Solutions",
    shortName: "TTS",
    role: "President",
    period: "Fall 2025 - Present",
    logo: "/assets/logos/ttslogo2026.png",
    color: "#990000",
    description:
      "Founded & scaled a student organization combining venture building, pro bono consulting, & technical education; grew membership to 100+ across engineering, design, & business through a structured recruiting & self-selection model. Delivered 5 pro bono technology engagements for USC departments & Los Angeles startups while building a 20+ person advisory network & launching a speaker series that expanded student mentorship & access to industry operators.",
    link: "https://usctts.com",
    category: "Professional",
  },
  {
    id: "ktp",
    name: "Kappa Theta Pi",
    shortName: "KTP",
    role: "Pledge & Consultant",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/ktp.png",
    color: "#6C47FF",
    description:
      "Professional technology fraternity. Currently working on client projects in AI and data analytics.",
    link: "https://ktp-website-2026.vercel.app/",
    category: "Professional",
  },
  {
    id: "datasc",
    name: "DataSC",
    shortName: "DataSC",
    role: "Project Member",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/datasc.png",
    color: "#007AFF",
    description:
      "USC data science club exploring AI, analytics, and data-driven projects.",
    link: "https://www.datasc.org/",
    category: "Professional",
  },
  {
    id: "maai",
    name: "Marshall AI Association",
    shortName: "MAAI",
    role: "Biotech Team Dept.",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/maai.png",
    color: "#FF6B35",
    description:
      "USC Marshall AI association bridging business and AI. Member of the Biotech department - exploring AI applications in life sciences.",
    link: "https://www.uscmaia.com/",
    category: "Professional",
  },
  {
    id: "cyborg",
    name: "CybOrg Consulting",
    shortName: "CybOrg",
    role: "Consultant",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/cyborg.png",
    color: "#FF3B30",
    description:
      "USC consulting organization focused on Physics, Neuroscience, and Cinematography.",
    link: "https://usccyb.org/",
    category: "Professional",
  },
  {
    id: "avenues",
    name: "Avenues Consulting",
    shortName: "Avenues",
    role: "Tech Consultant",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/avenues.png",
    color: "#0A66C2",
    description:
      "USC student-run consulting club delivering real strategy projects to real clients.",
    link: "https://www.uscavenues.org/",
    category: "Professional",
  },
  {
    id: "flavors",
    name: "Flavors",
    shortName: "Flavors",
    role: "Member",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/uscflavors.png",
    color: "#FF9500",
    description:
      "USC food culture club celebrating cuisine, community, and culinary exploration.",
    link: "https://www.uscflavors.com/",
    category: "Social",
  },
  {
    id: "boardgames",
    name: "Trojan Board Games",
    shortName: "TBG",
    role: "Member",
    period: "Spring 2026 - Present",
    logo: "/assets/logos/trojanboardgames.png",
    color: "#990000",
    description:
      "USC board game club. Strategy games, tabletop RPGs, and game nights on campus.",
    link: "https://www.instagram.com/trojanboardgames/",
    category: "Social",
  },
  {
    id: "impact360",
    name: "Impact 360 Institute",
    shortName: "Impact 360",
    role: "Leadership Participant",
    period: "June 2022 – July 2023",
    logo: "/assets/logos/impact360.png",
    color: "#AF52DE",
    description:
      "Two summers of Christian leadership development training -character formation, servant leadership, and communication. Includes a mission trip to the Dominican Republic.",
    achievements: [
      "Mission trip in Dominican Republic -hands-on international service",
      "Strengthened collaborative decision-making and communication skills",
      "Deep servant leadership and character development curriculum",
    ],
    photos: [
      "/assets/impact360_leadership.jpg",
      "/assets/dominican_republic.jpg",
    ],
    link: "https://impact360institute.org",
    category: "Faith",
  },
  {
    id: "sgvccc",
    name: "SGV Christian Club Collective",
    shortName: "SGV CCC",
    role: "Co-Founder",
    period: "Nov 2024 - June 2025",
    logo: "/assets/logos/sgvchristiancc.png",
    color: "#34C759",
    description:
      "Co-founded a coalition uniting 15+ high school Christian clubs across the San Gabriel Valley - launched from a vision to break down walls between isolated campus ministries. Also served as President of ACTS Christian Club at San Marino High School, where this vision first took root. Built real community between students who never would have met otherwise.",
    achievements: [
      "Spearheaded formation of a coalition uniting 15+ high school Christian clubs across the San Gabriel Valley",
      "Conceived and executed Everything Night - a first-of-its-kind regional event attracting 200+ students to 20 breakout sessions",
      "Exercised visionary leadership by filtering and curating the strongest student-led ideas into a cohesive program that maximized impact",
      "Pioneered a scalable framework for multi-school collaboration, media, and fundraising that created a replicable model for regional impact",
    ],
    photos: [
      "/assets/everything_night_main.jpg",
      "/assets/everything_night_poster.jpg",
      "/assets/everything_night_band.jpg",
      "/assets/everything_night_crowd.jpg",
      "/assets/everything_night_dinner.jpg",
      "/assets/everything_night_dodgeball.jpg",
      "/assets/everything_night_picnic.jpg",
      "/assets/everythingnightplanning.jpg",
      "/assets/chosen_team.jpg",
      "/assets/chosen_crowd.jpg",
      "/assets/chosen_dab.jpg",
    ],
    link: "",
    category: "Faith",
  },
  {
    id: "baseball-coach",
    name: "South Pasadena Little League",
    shortName: "SPLL",
    role: "Volunteer Baseball Coach",
    period: "Feb 2023 - Present",
    logo: "/assets/logos/littleleaguechallenger.jpeg",
    color: "#34C759",
    description:
      "Volunteer coach for the Challenger Division - youth athletes with physical and developmental disabilities. Leading practices and creating an empowering, inclusive environment.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.littleleague.org/play-little-league/challenger/",
    category: "Volunteering",
  },
  {
    id: "mission-trip",
    name: "World Baseball Academy",
    shortName: "WBA",
    role: "Mission Trip Team Member",
    period: "Jul 2022",
    logo: "/assets/logos/worldbaseballacademy.png",
    color: "#007AFF",
    description:
      "Led youth baseball clinics and outreach programs in Jarabacoa, Dominican Republic. Combined sport and ministry to support under-resourced communities.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.worldbaseballacademy.com/",
    category: "Volunteering",
  },
  {
    id: "scoutfitters",
    name: "SC Outfitters",
    shortName: "SCO",
    role: "Member",
    period: "2025 - Present",
    logo: "/assets/logos/scoutfitters.png",
    color: "#34C759",
    description:
      "USC's hiking and outdoors club. Getting outside, exploring trails, and building community with fellow Trojans.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.scoutfitters.org/",
    category: "Social",
  },
  {
    id: "ambassador",
    name: "Turn Two for Youth",
    shortName: "T2Y",
    role: "Ambassador",
    period: "Apr 2022 - Jun 2022",
    logo: "/assets/logos/turn2foryouth.png",
    color: "#FF9500",
    description:
      "Organized a community-wide baseball equipment drive and delivered gear to underserved youth in the Dominican Republic. Poverty alleviation through sport.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.turn2foryouth.com/",
    category: "Volunteering",
  },
];

export const music = {
  currentlyPlaying: {
    title: "Praise",
    artist: "Various Artists",
    spotifyEmbed:
      "https://open.spotify.com/embed/track/7Ee6XgP8EHKDhTMYLIndu9?utm_source=generator",
  },
  favoriteNewAlbums: [
    {
      artist: "Little Simz",
      album: "Drop 7",
      embedUrl:
        "https://open.spotify.com/embed/album/4nOym5RKE8Opauf3rMxPAW?utm_source=generator",
    },
    {
      artist: "The Hellp",
      album: "Latest",
      embedUrl:
        "https://open.spotify.com/embed/album/7r0oaJO4WR0KLgg1rZu6kg?utm_source=generator",
    },
    {
      artist: "Will Reagan",
      album: "Latest",
      embedUrl:
        "https://open.spotify.com/embed/album/06BotF7CerCXpcm5Km2uX7?utm_source=generator",
    },
    {
      artist: "Quadeca",
      album: "From Bird's Eye View",
      embedUrl:
        "https://open.spotify.com/embed/album/6o6VAIetIFOsaOa0qt7w9u?utm_source=generator",
    },
  ],
  favoriteOldAlbums: [
    {
      artist: "Stevie Wonder",
      album: "Songs in the Key of Life",
      embedUrl:
        "https://open.spotify.com/embed/album/6YUCc2RiXcEKS9ibuZxjt0?utm_source=generator",
    },
    {
      artist: "Parliament",
      album: "Mothership Connection",
      embedUrl:
        "https://open.spotify.com/embed/album/4q1HNSka8CzuLvC8ydcsD2?utm_source=generator",
    },
    {
      artist: "Lauryn Hill",
      album: "The Miseducation of Lauryn Hill",
      embedUrl:
        "https://open.spotify.com/embed/album/1BZoqf8Zje5nGdwZhOjAtD?utm_source=generator",
    },
    {
      artist: "John Coltrane",
      album: "A Love Supreme",
      embedUrl:
        "https://open.spotify.com/embed/album/3JRgE1OqN7A8wrYqFxDfJO?utm_source=generator",
    },
  ],
};

// ─── App Definitions ─────────────────────────────────────────────────────────

export type AppId =
  | "work"
  | "projects"
  | "education"
  | "files"
  | "photos"
  | "contact"
  | "settings"
  | "youtube"
  | "github"
  | "linkedin"
  | "spotify"
  | "letterboxd"
  | "rateyourmusic"
  | "x"
  | "substack"
  | "calebgpt"
  | "bible"
  | "calendar";

export interface AppDef {
  id: AppId;
  name: string;
  emoji: string;
  icon?: string;
  gradient: [string, string];
  external?: string;
}

export const apps: AppDef[] = [
  {
    id: "settings",
    name: "About",
    emoji: "S",
    icon: "/assets/icons/settingsapp.png",
    gradient: ["#8E8E93", "#636366"],
  },
  {
    id: "work",
    name: "Docs",
    emoji: "W",
    icon: "/assets/icons/googledocs.png",
    gradient: ["#4285F4", "#2962FF"],
  },
  {
    id: "projects",
    name: "Ideas",
    emoji: "I",
    icon: "/assets/icons/ideas.png",
    gradient: ["#FF9500", "#FF5E00"],
    external: "https://calebsideas.com/",
  },
  {
    id: "education",
    name: "Education",
    emoji: "E",
    icon: "/assets/icons/notes.png",
    gradient: ["#FF3B30", "#C0392B"],
  },
  {
    id: "files",
    name: "Organizations",
    emoji: "F",
    icon: "/assets/icons/organizations.png",
    gradient: ["#007AFF", "#5AC8FA"],
  },
  {
    id: "photos",
    name: "Photos",
    emoji: "P",
    icon: "/assets/icons/photos.webp",
    gradient: ["#34C759", "#248A3D"],
  },
  {
    id: "contact",
    name: "Mail",
    emoji: "C",
    icon: "/assets/icons/mailapp.png",
    gradient: ["#5AC8FA", "#007AFF"],
  },
  {
    id: "spotify",
    name: "Spotify",
    emoji: "S",
    icon: "/assets/icons/spotify.png",
    gradient: ["#1DB954", "#157A37"],
  },
  {
    id: "bible",
    name: "Bible",
    emoji: "B",
    icon: "/assets/icons/bibleapp.png",
    gradient: ["#D4A017", "#A0770F"],
  },
  {
    id: "calebgpt",
    name: "CalebGPT",
    emoji: "C",
    icon: "/assets/icons/chatgpt.png",
    gradient: ["#10A37F", "#1A7F64"],
  },
  {
    id: "youtube",
    name: "YouTube",
    emoji: "Y",
    icon: "/assets/icons/youtubeapplogo.png",
    gradient: ["#FF0000", "#C0392B"],
    external: "https://www.youtube.com/@caleebnewtown",
  },
  {
    id: "github",
    name: "GitHub",
    emoji: "G",
    icon: "/assets/icons/github.webp",
    gradient: ["#24292E", "#000000"],
    external: "https://github.com/calebnewtonusc",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    emoji: "L",
    icon: "/assets/icons/linkedin.jpg",
    gradient: ["#0A66C2", "#004182"],
    external: "https://www.linkedin.com/in/caleb-newton-3680041a5/",
  },
  {
    id: "letterboxd",
    name: "Letterboxd",
    emoji: "L",
    icon: "/assets/icons/letterboxd.png",
    gradient: ["#FF8000", "#E55C00"],
    external: "https://letterboxd.com/cnewt/",
  },
  {
    id: "rateyourmusic",
    name: "RYM",
    emoji: "R",
    icon: "/assets/icons/rym.png",
    gradient: ["#ED1C24", "#A8001B"],
    external: "https://rateyourmusic.com/~cnewt",
  },
  {
    id: "x",
    name: "X",
    emoji: "X",
    icon: "/assets/icons/x.jpg",
    gradient: ["#000000", "#14171A"],
    external: "https://x.com/klubnootuhn",
  },
  {
    id: "substack",
    name: "Substack",
    emoji: "S",
    icon: "/assets/icons/substack.png",
    gradient: ["#FF6719", "#E05C0A"],
    external: "https://substack.com/@calebnewton",
  },
  {
    id: "calendar",
    name: "Calendar",
    emoji: "C",
    icon: "/assets/icons/calendar_ios.png",
    gradient: ["#FF3B30", "#FF2D55"],
    external: "https://calendly.com/calebnew-usc/30min",
  },
];

export const dockApps: AppId[] = [
  "calendar",
  "projects",
  "linkedin",
  "github",
  "youtube",
  "substack",
  "x",
  "letterboxd",
  "rateyourmusic",
];
