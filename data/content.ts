// ─── All content data ───────────────────────────────────────────────────────

export const profile = {
  name: "Caleb Newton",
  tagline: "USC · Jimmy Iovine & Dr. Dre Young Innovation Academy",
  location: "San Marino, CA",
  email: "calebnew@usc.edu",
  photo: "/assets/CalebAtBeachUSCHoodie.jpg",
  photoAlt: "/assets/CalebAtUSC.jpg",
  skills: ["Python", "C++", "CUDA", "TypeScript", "Swift", "SQL"],
  bio: "Hello! I'm Caleb Newton, a follower of Jesus and a USC sophomore at the Iovine & Young Academy, studying machine learning engineering, entrepreneurship and design with a minor in neuroscience. Right now I'm Founding GTM & Product Lead at Amber Intelligence, a relationship and health AI startup. Before that I built GTM systems at Blue Modern Advisory and Nalana, volumetric capture tooling at AINA Tech, and control theory simulations at Caltech. Outside of work I'm into vinyl, beatboxing, improv, hiking, and thrifting.",
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
    logo: null,
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
    section: "Interests",
    icon: "film",
    items: [
      { label: "Spirituality", type: "toggle-on", detail: "The center of it" },
      { label: "Beatboxing", type: "info", detail: "Yes, really" },
      { label: "Improv", type: "info", detail: "Say yes, and" },
      { label: "Hiking", type: "toggle-on", detail: "Anywhere with elevation" },
      { label: "Electro Sleaze", type: "info", detail: "The genre, unapologetically" },
      { label: "Vinyl Records", type: "info", detail: "Collection growing steadily" },
      { label: "Thrifting", type: "toggle-on", detail: "Finds are undefeated" },
      {
        label: "Unconventional Icebreakers",
        type: "info",
        detail: "Is your mind more like a tower or a river?",
      },
      { label: "Fitness", type: "toggle-on", detail: "Active" },
    ],
  },
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
      { label: "Church", type: "info", detail: "GenCollege Christians @ USC" },
      {
        label: "Ministry",
        type: "info",
        detail: "Founder, SGV Christian Club Collective · Co-President, TTS",
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
        detail: "Team Captain · San Marino HS",
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
      { label: "Fitness", type: "toggle-on", detail: "Active" },
    ],
  },
  {
    section: "Film & Culture",
    icon: "film",
    items: [
      { label: "Letterboxd", type: "info", detail: "cnewt" },
      {
        label: "Favorites",
        type: "info",
        detail: "Peanut Butter Falcon · Inception · Dumb & Dumber · Toy Story",
      },
      {
        label: "Rating Style",
        type: "info",
        detail: "Generous. If it's good it's good",
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
        detail: "Non-fiction · theology · neuroscience",
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
      {
        label: "Brain Backup",
        type: "info",
        detail: "GitHub + Obsidian",
      },
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
        detail: "USC Sophomore OS 26.1.0",
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
    logo: "/assets/logos/ttslogo2026.png",
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
    logo: null,
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
    logo: null,
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
    logo: null,
    color: "#5856D6",
    description: "USC Christian student community.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "",
    category: "Involvements",
  },
  {
    id: "troy-philippines",
    name: "Troy Philippines",
    shortName: "Troy PH",
    role: "Member",
    period: "Current",
    logo: null,
    color: "#0038A8",
    description: "USC Filipino student organization.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "",
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
    logo: null,
    color: "#FF3B30",
    description: "USC dragon boat paddling team.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "",
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
    name: "Experience",
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
