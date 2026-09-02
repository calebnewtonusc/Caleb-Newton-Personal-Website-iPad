// ─── All content data ───────────────────────────────────────────────────────

export const profile = {
  name: "Caleb Newton",
  tagline: "USC · Jimmy Iovine & Dr. Dre Young Innovation Academy",
  location: "San Marino, CA",
  email: "calebnew@usc.edu",
  photo: "/assets/CalebAtBeachUSCHoodie.jpg",
  photoAlt: "/assets/CalebAtUSC.jpg",
  skills: ["Python", "C++", "CUDA", "TypeScript", "Swift", "SQL"],
  bio: "Hello! I'm Caleb Newton, a follower of Jesus and a USC sophomore.\n\nFor most of my life, you think too much, kid was something people said to me as a criticism. I was diagnosed autistic my senior year of high school, and it reframed the whole thing. The systematic thinking was never the problem. It was the point.\n\nI pitched in high school until a hamstring injury took my velocity from 84 down to 70. I spent a year reading sports science papers and rebuilding my mechanics, and I got it back. That was the first time research stopped being homework and became something I could actually use.\n\nIn 2022 I played baseball in a junkyard in the Dominican Republic. The people there had close to nothing and were the most joyful I had ever met. It rearranged what I thought joy came from.\n\nSenior year I led a Christian club of 90+ students, then went looking for the other clubs like it. That turned into a coalition across 20+ schools in the San Gabriel Valley and one night where 200 students showed up.\n\nThese days I collect vinyl, beatbox in the car, take board games far too seriously, and have not paid retail in years. I care about building things that put people in the same room, and about telling the truth even when a softer version would land easier.",
  roles: [
    "Follower of Jesus",
    "Founder",
    "GTM & Product Engineer",
    "USC Student",
  ],
};

export const social = {
  github: "https://github.com/calebnewtonusc",
  linkedin: "https://linkedin.com/in/calebnewton-",
  youtube:
    "https://www.youtube.com/playlist?list=PLWhbpQ2inj_p13rmaV6mOdpLu3kTIi8XF",
  spotify: "https://open.spotify.com/user/rbfdtme07mst8eft5f4j8k2ll",
  letterboxd: "https://letterboxd.com/cnewt/",
  rateyourmusic: "https://rateyourmusic.com/~cnewt",
  x: "https://x.com/klubnootuhn",
};

export const experience = [
  {
    id: "amber-intelligence",
    title: "Founding GTM & Product Lead",
    company: "Amber Intelligence",
    period: "Jul 2026 - Present",
    year: "2026",
    location: "Remote",
    logo: "/assets/logos/amber.png",
    color: "#F59E0B",
    website: "",
    description: "Relationship & Health AI Startup.",
    achievements: [
      "Led Amber's strategic repositioning around user-owned contact data, making it the company's core product differentiation & fundraising thesis; opened 12 VC conversations & sustained 4+ investor & partner meetings weekly.",
      "Unified 6 siloed data sources into Amber's core relationship graph & integrated it with Claude & Perplexity; built PeopleRank, a 3-stage retrieval engine that ranks relationships even when underlying data is incomplete.",
    ],
    skills: [
      "GTM",
      "Product",
      "Fundraising",
      "Relationship Graph",
      "Retrieval",
      "Claude",
      "Perplexity",
    ],
    photos: [],
  },
  {
    id: "bma",
    title: "GTM Engineer",
    company: "Blue Modern Advisory",
    period: "May 2026 - Jul 2026",
    year: "2026",
    location: "New York City, NY",
    logo: "/assets/logos/bluemodern.png",
    color: "#0A66C2",
    website: "",
    description: "Official Perplexity & Clay Partner Agency.",
    achievements: [
      "Rebuilt the firm's outbound engine across 147,000+ monthly emails, increasing booked meetings 6.3x, generating $350K+ pipeline & 193 opportunities across 8 clients, & cutting costs 66% while leading 4 interns.",
      "Built the GTM unit-economics model behind a pricing renegotiation that tripled a healthcare client's monthly contract value.",
      "Owned product for Togari, turning the firm's live GTM workflows into product requirements & directing engineering toward commercializing an internal CRM used by 8+ teammates.",
      "Built the firm's technical recruiting function from scratch as its first intern, sourcing ML engineers & quants nationwide, flying finalists to San Francisco & converting 5 finalists into the firm's entire intern class.",
    ],
    skills: [
      "GTM Engineering",
      "Clay",
      "Perplexity",
      "Outbound",
      "Unit Economics",
      "Product",
      "Recruiting",
    ],
    photos: [],
  },
  {
    id: "nalana",
    title: "GTM Engineer",
    company: "Nalana",
    period: "Feb 2026 - Jun 2026",
    year: "2026",
    location: "Remote",
    logo: "/assets/logos/nalana.jpeg",
    color: "#1a4a2e",
    website: "https://nalana.vercel.app/",
    description: "Cursor for Blender.",
    achievements: [
      "Built Nalana's GTM infrastructure across sourcing, enrichment, outbound, CRM & onboarding, reaching 3,200+ prospects, booking 150+ demos, & activating 40 customers for its 3D AI platform.",
    ],
    skills: ["GTM", "Enrichment", "Outbound", "CRM", "Onboarding", "3D AI"],
    photos: [],
  },
  {
    id: "aina",
    title: "Software Engineer",
    company: "AINA Tech",
    period: "Sep 2025 - Dec 2025",
    year: "2026",
    location: "Santa Monica, CA",
    logo: "/assets/icons/aina.png",
    color: "#007AFF",
    website: "https://www.ainatech.ai/",
    description: "Spatial AI & Volumetric Computing Startup.",
    achievements: [
      "Built AlgoRun, replacing manual coordination of 72-100+ hour GPU reconstruction jobs for a 75-camera volumetric capture system & built tooling to manage multi-terabyte datasets across 35+ repositories.",
    ],
    skills: [
      "Python",
      "CUDA",
      "GPU Pipelines",
      "Volumetric Capture",
      "FastAPI",
      "React",
    ],
    photos: [
      "/assets/AinatechImages/Ainatechsetup.jpg",
      "/assets/AinatechImages/Ainatechgoats.jpg",
    ],
  },
  {
    id: "caltech",
    title: "Control Theory Research Assistant",
    company: "Caltech Electrical Engineering Department",
    period: "Aug 2024 - Jun 2025",
    year: "2025",
    location: "Pasadena, CA",
    logo: "/assets/logos/caltech.png",
    color: "#FF6B35",
    website: "https://www.caltech.edu",
    description: "Control theory research under Ph.D. Taylan Kargin.",
    achievements: [
      "Built 18 MATLAB/Python simulations across 3 controller configurations to stress-test Caltech research on reliable autonomy under uncertainty & compare controller performance across operating conditions.",
      "Produced visualizations presented in Kargin's 2025 doctoral thesis defense & to JPL, informed by 4 industry experts.",
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
    subtitle: "Jimmy Iovine & Dr. Dre Young Innovation Academy",
    degree:
      "B.S. Machine Learning Engineering, Entrepreneurship & Design | Minor in Neuroscience",
    period: "May 2029",
    status: "GPA 4.00/4.00",
    logo: "/assets/logos/usc.png",
    color: "#990000",
    website: "https://www.usc.edu",
    description:
      "Involvements: GenCollege Christians, Troy Philippines, Flavors Food Culture, Dragon Boat, SC Board Games, Marshall AI Biotech.",
    highlights: [
      "GenCollege Christians",
      "Troy Philippines",
      "Flavors Food Culture",
      "Dragon Boat",
      "SC Board Games",
      "Marshall AI Biotech",
    ],
  },
  {
    id: "smhs",
    school: "San Marino High School",
    subtitle: "",
    degree: "High School Diploma",
    period: "Aug 2021 - Jun 2025",
    status: "1570 SAT",
    logo: "/assets/education/smhs.png",
    color: "#007AFF",
    website: "https://www.sanmarinohs.org",
    description:
      "Christian Club President (90+ members), Baseball Team Captain, Screen Time League Founder.",
    highlights: [
      "Christian Club President (90+ members)",
      "1570 SAT",
      "Baseball Team Captain",
      "Screen Time League Founder",
    ],
  },
];

export const skills = {
  languages: [
    { name: "Python", level: 95, color: "#3776AB" },
    { name: "C++", level: 80, color: "#00599C" },
    { name: "CUDA", level: 72, color: "#76B900" },
    { name: "TypeScript/JavaScript", level: 90, color: "#3178C6" },
    { name: "Swift", level: 75, color: "#FA7343" },
    { name: "SQL", level: 85, color: "#336791" },
    { name: "Bash", level: 80, color: "#4EAA25" },
  ],
  frameworks: [] as { name: string; level: number; color: string }[],
  tools: [
    { name: "Excel", level: 88, color: "#217346" },
    { name: "PowerPoint", level: 88, color: "#D24726" },
    { name: "Adobe Creative Cloud", level: 75, color: "#FF0000" },
    { name: "Figma", level: 85, color: "#F24E1E" },
    { name: "Clay", level: 90, color: "#6C47FF" },
  ],
  domains: [
    "Spirituality",
    "Beatboxing",
    "Improv",
    "Hiking",
    "Electro Sleaze",
    "Vinyl Records",
    "Thrifting",
    "Unconventional Icebreakers",
    "Fitness",
  ],
};

export const personalSettings = [
  {
    section: "Family",
    icon: "family",
    items: [
      {
        label: "Siblings",
        type: "info",
        detail: "Three younger. Two sisters, one brother",
      },
      {
        label: "Oldest Of Four",
        type: "toggle-on",
        detail: "Comes with a job description",
      },
      { label: "Heritage", type: "info", detail: "Half Filipino, half White" },
      {
        label: "Trojan Family, Literally",
        type: "info",
        detail: "Dad and Uncle Chad are USC alumni",
      },
      {
        label: "Family Group Chat",
        type: "toggle-on",
        detail: "Chaotic. Never muted",
      },
      {
        label: "Sunday Lunch After Church",
        type: "toggle-on",
        detail: "Standing appointment",
      },
      {
        label: "Coaches His Siblings",
        type: "toggle-on",
        detail: "Whether or not they asked",
      },
      {
        label: "Sibling Names",
        type: "toggle-off",
        detail: "Kept off the internet on purpose",
      },
    ],
  },
  {
    section: "Bluetooth",
    icon: "bluetooth",
    items: [
      { label: "Bluetooth", type: "toggle-on", detail: "On" },
      {
        label: "AirPods Pro",
        type: "toggle-on",
        detail: "Connected · in constantly",
      },
      {
        label: "WHOOP",
        type: "toggle-on",
        detail: "Connected · knows how bad the sleep is",
      },
      {
        label: "JBL Speaker",
        type: "toggle-on",
        detail: "Connected · the one everyone borrows",
      },
      {
        label: "Honda Accord",
        type: "toggle-on",
        detail: "CarPlay · aux privileges are earned",
      },
    ],
  },
  {
    section: "Screen Time",
    icon: "screentime",
    items: [
      { label: "App Limits", type: "toggle-on", detail: "Set, and actually kept" },
      { label: "Social Media", type: "toggle-off", detail: "All of it. On purpose" },
      { label: "Safari", type: "toggle-off", detail: "The browser is blocked too" },
      { label: "Notifications", type: "toggle-off", detail: "Nearly all of them" },
      {
        label: "Basically A Flip Phone",
        type: "toggle-on",
        detail: "That is the goal",
      },
      {
        label: "Phone In Another Room",
        type: "toggle-on",
        detail: "During deep work",
      },
      { label: "Doomscrolling", type: "toggle-off", detail: "Nothing good is down there" },
      {
        label: "Screen Time League",
        type: "info",
        detail: "Founded one in high school",
      },
    ],
  },
  {
    section: "Faith & Identity",
    icon: "faith",
    items: [
      { label: "Follower of Jesus", type: "toggle-on", detail: "Non-negotiable" },
      {
        label: "Favorite Verse",
        type: "info",
        detail: "1 Thessalonians 5:17, pray without ceasing",
      },
      {
        label: "Rejoice Always",
        type: "info",
        detail: "1 Thessalonians 5:16",
      },
      {
        label: "Give Thanks In All Circumstances",
        type: "info",
        detail: "1 Thessalonians 5:18",
      },
      {
        label: "Praying In Tongues",
        type: "toggle-on",
        detail: "1 Corinthians 14:15, I will pray with my spirit",
      },
      {
        label: "Spiritual Gifts",
        type: "toggle-on",
        detail: "Still being given. 1 Corinthians 12",
      },
      {
        label: "Five-Fold Ministry",
        type: "info",
        detail: "Ephesians 4:11, how he built the ACTS cabinet",
      },
      { label: "Church", type: "info", detail: "GenCollege Christians @ USC" },
      { label: "In The Word Daily", type: "toggle-on", detail: "An hour or more, every day" },
      { label: "Sunday Mornings", type: "toggle-on", detail: "Already booked" },
      {
        label: "Talks About It Unprompted",
        type: "toggle-off",
        detail: "Only if you ask. But please ask",
      },
      {
        label: "Questions Welcome",
        type: "toggle-on",
        detail: "A faith you can't question isn't much of one",
      },
      {
        label: "Boldness",
        type: "toggle-on",
        detail: "Will stand against the crowd when it matters",
      },
      {
        label: "Human-Centered Technology",
        type: "toggle-on",
        detail: "Tech should serve people, not farm them",
      },
      { label: "IRL Connection > Social Media", type: "toggle-on", detail: "Always" },
    ],
  },
  {
    section: "Music",
    icon: "music",
    items: [
      {
        label: "Stevie Wonder Is The Ceiling",
        type: "toggle-on",
        detail: "This is not up for debate",
      },
      {
        label: "Electro Sleaze",
        type: "toggle-on",
        detail: "The genre, unapologetically",
      },
      { label: "Concert-Goer", type: "toggle-on", detail: "LA has good venues" },
      { label: "Skipping The Intro", type: "toggle-off", detail: "Let the song breathe" },
      { label: "Genres", type: "info", detail: "Jazz · Hip-Hop · Gospel · R&B · Indie" },
      { label: "RateYourMusic", type: "info", detail: "~cnewt" },
    ],
  },
  {
    section: "Hobbies",
    icon: "sports",
    items: [
      {
        label: "Baseball",
        type: "toggle-off",
        detail: "Team Captain, San Marino HS. Retired",
      },
      { label: "Wrestling", type: "toggle-off", detail: "Two years. Grit Award" },
      { label: "Dragon Boat", type: "toggle-on", detail: "Paddling with Troy" },
      { label: "Hiking", type: "toggle-on", detail: "Anywhere with elevation" },
      { label: "Fitness", type: "toggle-on", detail: "Active" },
      {
        label: "Board Games",
        type: "toggle-on",
        detail: "Serious about this. Arguably too serious",
      },
      {
        label: "Losing Gracefully",
        type: "toggle-off",
        detail: "It is a work in progress",
      },
      { label: "Down For Pickup Anything", type: "toggle-on", detail: "Just text me" },
      { label: "Beatboxing", type: "toggle-on", detail: "Yes, really" },
      { label: "Guitar", type: "toggle-on", detail: "Learning worship songs" },
      { label: "Vinyl Records", type: "toggle-on", detail: "Collection growing steadily" },
      { label: "Thrifting", type: "toggle-on", detail: "Finds are undefeated" },
      { label: "Improv", type: "toggle-on", detail: "Say yes, and" },
      { label: "Paying Retail", type: "toggle-off", detail: "Not in years" },
    ],
  },
  {
    section: "Interests",
    icon: "film",
    items: [
      { label: "Letterboxd", type: "info", detail: "cnewt" },
      {
        label: "Favorites",
        type: "info",
        detail: "Peanut Butter Falcon · Inception · Dumb & Dumber · Toy Story",
      },
      {
        label: "Generous Ratings",
        type: "toggle-on",
        detail: "If it's good it's good",
      },
      {
        label: "Strong Film Opinions",
        type: "toggle-on",
        detail: "Will share unprompted",
      },
      {
        label: "Reading",
        type: "info",
        detail: "Non-fiction · theology · neuroscience",
      },
    ],
  },
  {
    section: "Daily Runtime",
    icon: "runtime",
    items: [
      {
        label: "Sleep Schedule",
        type: "toggle-on",
        detail: "9 PM to 5 AM. Yes, on purpose",
      },
      { label: "Boot Time", type: "info", detail: "5 AM. The alarm is a formality" },
      { label: "Snooze Button", type: "toggle-off", detail: "Uninstalled" },
      {
        label: "Peak Hours",
        type: "info",
        detail: "Before the group chat wakes up",
      },
      {
        label: "Coffee",
        type: "toggle-on",
        detail: "Critical dependency, no fallback path",
      },
      {
        label: "Deep Work Blocks",
        type: "toggle-on",
        detail: "Two hours, no tabs, no exceptions",
      },
      {
        label: "Hyperfocus",
        type: "toggle-on",
        detail: "Cannot be scheduled, only survived",
      },
      {
        label: "Context Switching",
        type: "toggle-off",
        detail: "Please do not do this to me",
      },
      {
        label: "Weekly Shipping",
        type: "toggle-on",
        detail: "Something merged every week. Non-negotiable",
      },
      {
        label: "Replies Same Day",
        type: "toggle-off",
        detail: "It was read. That was the entire event",
      },
      {
        label: "Texts After 9 PM",
        type: "toggle-off",
        detail: "Genuinely asleep, not ignoring you",
      },
      {
        label: "Meal Prep",
        type: "toggle-off",
        detail: "Dining hall, and I have made peace with it",
      },
    ],
  },
  {
    section: "Preferences",
    icon: "system",
    items: [
      { label: "Em Dashes", type: "toggle-off", detail: "Never. Not once" },
      { label: "Emojis In Commit Messages", type: "toggle-off", detail: "Absolutely not" },
      {
        label: "Saying I Don't Know",
        type: "toggle-on",
        detail: "Beats guessing confidently",
      },
      { label: "Hype", type: "toggle-off", detail: "Show me the thing working" },
      {
        label: "Vague Feedback",
        type: "toggle-off",
        detail: "Tell me the actual problem",
      },
      {
        label: "Reads The Docs First",
        type: "toggle-on",
        detail: "Then complains about the docs",
      },
      { label: "Do Not Disturb", type: "toggle-off", detail: "People keep texting" },
      {
        label: "Public GitHub, Private Thoughts",
        type: "toggle-on",
        detail: "Both on purpose",
      },
      { label: "Brain Backup", type: "info", detail: "GitHub + Obsidian" },
    ],
  },
  {
    section: "About This Device",
    icon: "device",
    items: [
      { label: "Edition", type: "info", detail: "2006 (Caleb Newton)" },
      { label: "Personality", type: "info", detail: "ENTJ-A · Commander" },
      { label: "Origin", type: "info", detail: "San Marino, CA → USC" },
      { label: "Software Version", type: "info", detail: "USC Sophomore OS 26.1.0" },
      { label: "Serial Number", type: "info", detail: "calebnew@usc.edu" },
      {
        label: "Contrarian Mode",
        type: "toggle-on",
        detail: "Enabled by default, cannot be disabled",
      },
      { label: "Small Talk", type: "toggle-off", detail: "Ask me something real" },
      {
        label: "Favorite Question",
        type: "info",
        detail: "Is your mind more like a tower or a river?",
      },
      { label: "Battery", type: "info", detail: "Charged by faith and coffee" },
      { label: "Storage", type: "info", detail: "∞ Curiosity · 20TB Work Ethic" },
      {
        label: "Background Process",
        type: "info",
        detail: "Head-bobbing may occur during vinyl sessions",
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
    caption: "Bought a guitar, learning worship songs",
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
    id: "usctts",
    name: "Trojan Technology Solutions",
    shortName: "TTS",
    role: "Co-President",
    period: "Aug 2025 - Present",
    logo: "/assets/logos/tts.jpg",
    color: "#990000",
    description:
      "USC technology consulting organization. Rebuilt from dormant into a 30+ member team running AI & strategy engagements for external clients.",
    achievements: [
      "Rebuilt USC's dormant technology consulting organization into a 30+ member team in 3 months, recruiting & leading project teams, winning external clients, & directing AI & strategy engagements for organizations serving 10,000+ people.",
      "Founded T Combinator, pairing top USC builders with venture-backed startups; secured 7 YC-backed clients for Spring 2027 & built the system for sourcing, scoping & staffing engagements.",
    ],
    photos: [] as string[],
    link: "https://usctts.com",
    category: "Leadership",
  },
  {
    id: "echo-ai",
    name: "Echo AI",
    shortName: "Echo AI",
    role: "Co-Founder",
    period: "Jan 2026 - May 2026",
    logo: "/assets/logos/echo.jpg",
    color: "#5856D6",
    description: "Assistive AI & wearable technology, Los Angeles, CA.",
    achievements: [
      "Co-founded an EMG wearable translating ASL into speech & spoken responses into text; built a 1,900-sample proprietary dataset & gesture-recognition system achieving 99.5% accuracy, winning the Marshall AI Summit & attracting investor interest.",
    ],
    photos: [] as string[],
    link: "",
    category: "Leadership",
  },
  {
    id: "sgvccc",
    name: "San Gabriel Valley Christian Club Collective",
    shortName: "SGV CCC",
    role: "Founder",
    period: "Nov 2024 - Jun 2025",
    logo: "/assets/logos/sgvchristiancc.png",
    color: "#34C759",
    description:
      "A coalition of 20+ high school Christian clubs across the San Gabriel Valley, Pasadena, CA.",
    achievements: [
      "Founded & scaled a coalition of 20+ high school Christian clubs, coordinating cross-school leadership, fundraising & programming & culminating in a 200+ student summit with 20 breakout sessions.",
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
    category: "Leadership",
  },
  {
    id: "okb-hope",
    name: "The OKB Hope Foundation",
    shortName: "OKB Hope",
    role: "Strategy & Development Consultant",
    period: "May 2026 - Jul 2026",
    logo: "/assets/logos/okb.png",
    color: "#FF9500",
    description: "Youth development nonprofit, remote.",
    achievements: [
      "Built the foundation's corporate & philanthropic growth engine, sourcing 700+ decision-makers, automating personalized outreach, & developing partnership proposals targeting Ford, Toyota, Samsung & other enterprises.",
    ],
    photos: [] as string[],
    link: "",
    category: "Volunteering",
  },
  {
    id: "youth-baseball",
    name: "Youth Baseball & Community Service",
    shortName: "Youth Baseball",
    role: "Mission Team Member & Ambassador",
    period: "Jan 2022 - May 2025",
    logo: "/assets/logos/littleleaguechallenger.jpeg",
    color: "#34C759",
    description: "Pasadena, CA.",
    achievements: [
      "Led local & international youth baseball initiatives, coaching athletes with physical & developmental disabilities, running clinics in the Dominican Republic & organizing a community-wide equipment drive for underserved players.",
    ],
    photos: ["/assets/dominican_republic.jpg"],
    link: "",
    category: "Volunteering",
  },
  {
    id: "gencollege",
    name: "GenCollege Christians",
    shortName: "GenCollege",
    role: "Member",
    period: "Current",
    logo: "/assets/logos/gencollege.jpg",
    color: "#5856D6",
    description: "Generations LA's college ministry at USC.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.generationsla.org/collegeministryusc",
    category: "Involvements",
  },
  {
    id: "troy-philippines",
    name: "Troy Philippines",
    shortName: "Troy PH",
    role: "Member",
    period: "Current",
    logo: "/assets/logos/troyphi.png",
    color: "#0038A8",
    description: "USC Filipino student organization.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.troyphi.org/",
    category: "Involvements",
  },
  {
    id: "flavors",
    name: "Flavors Food Culture",
    shortName: "Flavors",
    role: "Member",
    period: "Current",
    logo: "/assets/logos/uscflavors.png",
    color: "#FF9500",
    description: "USC food culture club.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.uscflavors.com/",
    category: "Involvements",
  },
  {
    id: "dragon-boat",
    name: "Dragon Boat",
    shortName: "Dragon Boat",
    role: "Member",
    period: "Current",
    logo: "/assets/logos/dragonboat.jpg",
    color: "#FF3B30",
    description: "USC dragon boat paddling team.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.instagram.com/uscdragonboat",
    category: "Involvements",
  },
  {
    id: "boardgames",
    name: "SC Board Games",
    shortName: "SC Board Games",
    role: "Member",
    period: "Current",
    logo: "/assets/logos/trojanboardgames.png",
    color: "#990000",
    description: "USC board game club.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.instagram.com/trojanboardgames/",
    category: "Involvements",
  },
  {
    id: "maai",
    name: "Marshall AI Biotech",
    shortName: "MAAI",
    role: "Biotech Team",
    period: "Current",
    logo: "/assets/logos/maai.png",
    color: "#FF6B35",
    description:
      "USC Marshall AI association, biotech department. AI applications in life sciences.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.uscmaia.com/",
    category: "Involvements",
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
    name: "Work",
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
    external: "https://linkedin.com/in/calebnewton-",
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
