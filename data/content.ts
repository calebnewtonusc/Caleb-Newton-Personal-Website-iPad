// ─── All content data ───────────────────────────────────────────────────────

export const profile = {
  name: "Caleb Newton",
  tagline: "USC · Jimmy Iovine & Dr. Dre Young Innovation Academy",
  location: "San Marino, CA",
  email: "calebnew@usc.edu",
  photo: "/assets/CalebAtBeachUSCHoodie.jpg",
  photoAlt: "/assets/CalebAtUSC.jpg",
  skills: ["Python", "C++", "CUDA", "TypeScript", "Swift", "SQL"],
  greeting: "What's up bro! I'm Caleb :)",
  aboutGroups: [
    {
      title: "Basics",
      items: [
        { label: "Born", type: "info", detail: "2006" },
        { label: "From", type: "info", detail: "San Marino, California" },
        {
          label: "School",
          type: "info",
          detail: "USC \u00b7 Jimmy Iovine & Dr. Dre Young Innovation Academy",
        },
        { label: "Year", type: "info", detail: "Sophomore" },
        {
          label: "Major",
          type: "info",
          detail: "Machine Learning Engineering, Entrepreneurship & Product Design",
        },
        { label: "Minor", type: "info", detail: "Neuroscience" },
        { label: "Autistic", type: "toggle-on", detail: "" },
        { label: "Jesus follower", type: "toggle-on", detail: "" },
      ],
    },
    {
      title: "What I am about",
      items: [
        { label: "Tech bro", type: "toggle-on", detail: "" },
        { label: "Tech hater", type: "toggle-on", detail: "" },
        {
          label: "War against the attention economy",
          type: "info",
          detail: "Life mission",
        },
        {
          label: "My weapons in this war",
          type: "info",
          detail: "Leadership, product sense, GTME, SWE, prayer, patience",
        },
        {
          label: "How long this will take",
          type: "info",
          detail: "My whole life",
        },
      ],
    },
    {
      title: "Where I'm at",
      items: [
        { label: "Starting companies", type: "toggle-on", detail: "" },
        { label: "Hungry to learn", type: "toggle-on", detail: "" },
        { label: "Growing in my walk with God", type: "toggle-on", detail: "" },
      ],
    },
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
    website: "https://www.amberintelligence.ai/",
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
    website: "https://www.bluemodernadvisory.com/",
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
    website: "https://www.nalana.io/",
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
    year: "2025",
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
    website: "https://iovine-young.usc.edu/",
    description:
      "A door I did not open myself. Seventy students a year, built for people who do not fit one department.",
    highlights: [] as string[],
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
    website: "https://www.sanmarinohs.org/",
    description:
      "Christian Club President (90+ members), Baseball Team Captain.",
    highlights: [
      "Christian Club President (90+ members)",
      "1570 SAT",
      "Baseball Team Captain",
    ],
  },
{
    id: "huntington",
    school: "Huntington Middle School",
    subtitle: "",
    degree: "The hard years",
    period: "Aug 2018 - Jun 2021",
    status: "Survived",
    logo: null,
    color: "#5856D6",
    website: "https://www.hehms.us/",
    description:
      "Got bullied. Learned early that being the smart kid and being liked were not the same thing.",
    highlights: [
      "Learned who actually shows up",
      "Stopped performing for rooms that were never going to clap",
      "Found the people who liked the real version",
    ],
  },
  {
    id: "carver",
    school: "Carver Elementary School",
    subtitle: "",
    degree: "Peak nerd era",
    period: "Aug 2012 - Jun 2018",
    status: "Unbothered",
    logo: null,
    color: "#34C759",
    website: "https://www.carverschool.us/",
    description:
      "Memorized 200 digits of pi at ten, solved Rubik's cubes, built Lego robotics. No self-consciousness about any of it.",
    highlights: [
      "200 digits of pi, age 10",
      "Rubik's cubes",
      "Lego robotics",
      "Asked why until adults ran out of answers",
    ],
  },
  {
    id: "stjohns",
    school: "St. John's Nursery School",
    subtitle: "Certified juice box connoisseur",
    degree: "Fundamentals of sharing and naptime negotiation",
    period: "Aug 2010 - Jun 2011",
    status: "Graduated with honors",
    logo: "/assets/stjohns.jpg",
    color: "#FF9500",
    website: "https://www.stjohnsnurseryla.com/",
    description:
      "Tested gravity with block towers, raced tricycles, and asked why roughly 47 times a day.",
    highlights: [
      "Block tower construction",
      "Tricycle racing league",
      "Story time enthusiast",
    ],
  },
];

export const health = {
  details: [
    { label: "Height", value: "6 ft 1" },
    { label: "Weight", value: "200 lb" },
    { label: "Overall health", value: "Pretty good" },
  ],
  intro:
    "The most important lesson in my education so far has been the terrifying, awesome reality of infinite paths in college.",
  chapters: [
    {
      id: "straight-line",
      title: "The straight line",
      color: "#8E8E93",
      quote: "It did not take creativity. It only took discipline.",
      body: "At my academically intense high school, the path to success looked like a straight line, because variability was not on offer. Every nerd took the same AP classes. There was no reason to discern what I actually cared about, because the culture around me had already decided how my time would be spent. I never developed any real agency from my education. I led my baseball team and cold-called schools until we had a twenty school Christian club coalition, but even that was ambition running down a siloed path. It did not take creativity. It only took discipline.",
    },
    {
      id: "obvious-fit",
      title: "The obvious fit",
      color: "#007AFF",
      quote: "I remember looking forward to that freedom without having any idea what it weighed.",
      body: "So getting into the Iovine and Young Academy felt like a no brainer. I knew I wanted to use redemptive, faith-based entrepreneurship to fight the attention economy and help people, and I was a naturally ambitious leader. It seemed like the obvious fit.\n\nWhat I did not understand was that being a naturally ambitious leader was not enough. For the first time, I had to choose the direction myself. The ball was in my court on how to define my own reality, and I remember looking forward to that freedom without having any idea what it weighed.",
    },
    {
      id: "lead-what",
      title: "Lead what?",
      color: "#5856D6",
      quote: "Being a leader turned out to be the starting line, not the answer.",
      body: "College has no defined rules and no correct way to channel ambition. There are pre-set paths, doctor and lawyer and engineer, but even those you have to choose on purpose. Being in IYA, I already knew I was choosing not to have a traditional job. What I had not counted on was how much security and identity I would need to build before I could actually immerse myself in the world around me. Being a leader turned out to be the starting line, not the answer. Lead what? Lead how? Which skills, which opportunities, which direction, starting where.",
    },
    {
      id: "one-door",
      title: "The one door",
      color: "#FF9500",
      quote: "What was I supposed to do when the one door I believed in had closed?",
      body: "Facing all of that at once, my brain reached for the only pattern it knew and decided that getting into an entrepreneurship club was the right next step. The freedom was sitting right there and I refused to use it. I still could not accept that the world was not binary. So when every club rejected me, it felt like the end of everything. What was I supposed to do when the one door I believed in had closed?",
    },
    {
      id: "spiral",
      title: "The spiral",
      color: "#636366",
      quote: "That was the beginning of a spiral into depression, and it ended in hospitalization.",
      body: "I started losing track of who I was, because I had poured so much of my identity into pointing ambition at a track. With no track in front of me for the first time in my life, I was so used to being low agency that I could not fathom how blessed I was to have none. That was the beginning of a spiral into depression, and it ended in hospitalization.",
    },
    {
      id: "mania",
      title: "Mania",
      color: "#FF3B30",
      quote: "In mania, everything feels right.",
      body: "Even then, I did not learn. I came back in the spring on a dosage that was too high, and it sent me into mania. In mania, everything feels right. I said insane things with total confidence and did insane things with total confidence, and once again I never had to discern my own path. The chemicals did it for me. Medication brought me down from the mania, back through depression, and finally to steady ground going into sophomore year.",
    },
    {
      id: "steady-ground",
      title: "Steady ground",
      color: "#34C759",
      quote: "I can finally let my brain think for itself.",
      body: "Praise the Lord, I have finally learned it. A year ago people told me I did not need to do this, that I had plenty of time for that, that I should spend this season figuring out who I am. It went in one ear and out the other, because I could not let go of my rigidity. Now, after all of it, I know there was never another option. Life is not what it looked like in high school, and it never will be again.\n\nThat lesson is reshaping how I see everything. I can finally let my brain think for itself. I have stopped mining other people's lives for a path to copy. Best of all, I am enjoying the work of defining myself instead of missing the years when my environment did it for me.",
    },
    {
      id: "life-is-awesome",
      title: "Life is awesome",
      color: "#FF2D55",
      quote: "It took a hospitalization and a manic episode to teach me, and I would not trade it.",
      body: "It took a hospitalization and a manic episode to teach me, and I would not trade it. I am grateful for the outlook God gave me through all of it, and I am still terrified of what is coming. Life is awesome.",
    },
  ],
  categories: [
    {
      id: "history",
      icon: "history",
      name: "History",
      color: "#FF9500",
      blurb: "What my body used to do",
      items: [
        {
          label: "Baseball",
          value: "On pace for D1",
          detail: "I was on pace to pitch Division I as a sophomore, and then my arm gave out. I spent the next year rebuilding my mechanics and never got all of it back. I believe God used that injury to redirect me, and I would not be doing what I am doing now without it. I am grateful for everything pitching taught me, and for everything being a teammate taught me.",
        },
        {
          label: "Other sports I tried",
          value: "Wrestling, football",
          detail: "Two years on the wrestling mat, where I won the Grit Award, which tells you roughly how the matches themselves went. Football before that.",
        },
      ],
    },
    {
      id: "mental",
      icon: "brain",
      name: "Mental Wellbeing",
      color: "#5E5CE6",
      blurb: "The freshman year article",
      items: [
        { label: "How I'm feeling rn", value: "Grateful", detail: "" },
      ],
    },
    {
      id: "sleep",
      icon: "bed",
      name: "Sleep",
      color: "#32ADE6",
      blurb: "9 PM to 5 AM",
      items: [
        { label: "Sleep Schedule", value: "9 PM - 5 AM", detail: "" },
      ],
    },
    {
      id: "activity",
      icon: "rings",
      name: "Activity",
      color: "#FA114F",
      blurb: "Recovery over volume",
      items: [
        { label: "Lyons gym", value: "6 AM daily", detail: "" },
        {
          label: "Hiking",
          value: "Still going",
          detail: "Anywhere with elevation",
        },
        {
          label: "WHOOP",
          value: "Worn",
          detail: "Recovery score is the only metric I trust",
        },
      ],
    },
    {
      id: "mindfulness",
      icon: "mindful",
      name: "Mindfulness",
      color: "#00C7BE",
      blurb: "Two hours at a time",
      items: [
        {
          label: "Deep Work Blocks",
          value: "2 hr",
          detail: "Everything else closed",
        },
        {
          label: "Coffee",
          value: "Daily",
          detail: "Critical dependency, no fallback path",
        },
      ],
    },
  ],
};

export const personalSettings = [
  {
    section: "Family",
    icon: "family",
    items: [
      { label: "Trojan dad", type: "toggle-on", detail: "" },
      { label: "Bruin mom", type: "toggle-on", detail: "" },
      {
        label: "Siblings",
        type: "info",
        detail: "Two younger sisters and a younger brother",
      },
      {
        label: "At their games and shows",
        type: "toggle-on",
        detail: "",
      },
      { label: "Heritage", type: "info", detail: "Half Filipino and half White" },
      {
        label: "Sunday night family dinner",
        type: "toggle-on",
        detail: "",
      },
    ],
  },
  {
    section: "Screen Time",
    icon: "screentime",
    items: [
      {
        label: "Screen Time Reduction League",
        type: "info",
        detail: "Started one in high school",
      },
      {
        label: "App limits",
        type: "toggle-on",
        detail: "",
      },
      {
        label: "Social media",
        type: "toggle-off",
        detail: "",
      },
      {
        label: "Safari",
        type: "toggle-off",
        detail: "",
      },
      {
        label: "Notifications",
        type: "toggle-off",
        detail: "",
      },
      {
        label: "Phone in another room",
        type: "toggle-on",
        detail: "",
      },
      {
        label: "Doomscrolling",
        type: "toggle-off",
        detail: "",
      },
    ],
  },
  {
    section: "Faith & Identity",
    icon: "faith",
    items: [
      { label: "Jesus", type: "info", detail: "My firm foundation" },
      {
        label: "Talking to God",
        type: "info",
        detail: "Constantly",
      },
      {
        label: "Psalm 1:3",
        type: "info",
        detail: "Like a tree planted by water, whose delight is in the law of the Lord",
      },
      {
        label: "Genesis 32:26",
        type: "info",
        detail: "I will not let you go unless you bless me",
      },
      {
        label: "Praying in tongues",
        type: "info",
        detail: "1 Corinthians 14:15",
      },
      {
        label: "Spiritual gifts",
        type: "info",
        detail: "1 Corinthians 12",
      },
      { label: "Church", type: "info", detail: "GenCollege Christians at USC" },
      {
        label: "In the Word",
        type: "toggle-on",
        detail: "",
      },
      { label: "Sunday mornings", type: "toggle-on", detail: "" },
    ],
  },
  {
    section: "Interests",
    icon: "film",
    items: [
      {
        label: "Unconventional icebreakers",
        type: "toggle-on",
        detail: "",
      },
      {
        label: "Board games",
        type: "toggle-on",
        detail: "",
      },
      { label: "Beatboxing", type: "toggle-on", detail: "" },
      { label: "Guitar", type: "toggle-on", detail: "" },
      { label: "Vinyl records", type: "toggle-on", detail: "" },
      { label: "Thrifting", type: "toggle-on", detail: "" },
      { label: "Improv", type: "toggle-on", detail: "" },
      { label: "Dragon boat", type: "toggle-on", detail: "" },
      { label: "Hiking", type: "toggle-on", detail: "" },
      { label: "Concerts", type: "toggle-on", detail: "" },
      {
        label: "Dodger games",
        type: "toggle-on",
        detail: "",
      },
      {
        label: "Favorite films",
        type: "info",
        detail: "Peanut Butter Falcon, Inception, Dumb and Dumber, Cars 2",
      },
      {
        label: "Favorite books",
        type: "info",
        detail: "The Great Divorce by C.S. Lewis, and Hug",
      },
    ],
  },
  {
    section: "About This Device",
    icon: "device",
    items: [
      { label: "Personality", type: "info", detail: "ENTJ-A" },
      {
        label: "Asking why",
        type: "toggle-on",
        detail: "",
      },
      {
        label: "Small talk",
        type: "toggle-off",
        detail: "",
      },
      {
        label: "Big talk",
        type: "toggle-on",
        detail: "",
      },
      {
        label: "Favorite question",
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
      "Christian clubs across the San Gabriel Valley all had the same problem, which was that each of them was small and none of them knew each other. I cold-called schools until twenty of them agreed to stop running separately, then built the leadership, fundraising and programming to hold a coalition of that size together.",
      "Everything Night was the point of all of it. Over 200 students from schools that had never been in a room together came for one night: a live worship band, twenty breakout sessions, dinner, dodgeball, and a lot of kids realizing their club was not the only one. Planning it took months and it is still the best thing I have been part of.",
      "I ran ACTS alongside it, our own club, and grew it past 90 members.",
      "Ephesians 4:11 gave me the model I still lead by. Apostles, prophets, evangelists, shepherds and teachers, five different gifts and not one of them optional. I stopped trying to be all five and started building teams where other people carried what I could not.",
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
    role: "Coach, Mission Team Member & Ambassador",
    period: "Jan 2022 - May 2025",
    logo: "/assets/logos/littleleaguechallenger.jpeg",
    color: "#34C759",
    description: "Pasadena, CA and Jarabacoa, Dominican Republic.",
    achievements: [
      "Little League Challenger is the division for kids with physical and developmental disabilities, and I coached it for three years. Nobody on that field is playing for a scholarship. They are playing because it is fun, which is the thing high school baseball had slowly trained out of me.",
      "In July 2022 I went to Jarabacoa in the Dominican Republic with World Baseball Academy to run clinics. We played on a field cut out of a junkyard. The kids had almost no equipment and were, without exaggeration, the most joyful people I had ever been around. It rearranged what I thought joy was supposed to come from, and I have not really recovered from it.",
      "So I came home and ran an equipment drive with Turn Two for Youth, collecting gear across the community and getting it back down to the players who needed it.",
    ],
    photos: ["/assets/dominican_republic.jpg"],
    link: "",
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
    description: "USC's hiking and outdoors club.",
    achievements: [] as string[],
    photos: [] as string[],
    link: "https://www.scoutfitters.org/",
    category: "Involvements",
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

export const musicTaste = [
  { label: "Favorite artist", value: "Stevie Wonder" },
  { label: "Genres", value: "Jazz · Hip-Hop · Gospel · R&B · Indie" },
  { label: "Guilty pleasure", value: "Electro sleaze" },
  { label: "Live shows", value: "As many as I can get to" },
  { label: "RateYourMusic", value: "~cnewt" },
];

export const mentors = [
  {
    id: "nick-boyer",
    name: "Nick Boyer",
    role: "Spiritual mentor",
    color: "#007AFF",
    gratitude:
      "One of the people I am most grateful for, and one of the reasons I did not go through last year alone.",
    link: "",
    linkLabel: "",
  },
  {
    id: "erik-fish",
    name: "Erik Fish",
    role: "Spiritual mentor",
    color: "#FF9500",
    gratitude:
      "Thirty years of mentoring leaders and multiplying movements, and he still made room for me when I had nowhere else to be. Most of what I believe about calling I got from watching him work.",
    link: "https://erikfish.com",
    linkLabel: "erikfish.com",
  },
  {
    id: "sagar-tiwari",
    name: "Sagar Tiwari",
    role: "Professional mentor",
    color: "#F59E0B",
    gratitude:
      "Handed me real responsibility long before I had done anything to earn it, then expected me to rise to it. Most of what I know about building for actual users, I learned standing next to him.",
    link: "",
    linkLabel: "",
  },
  {
    id: "joel-george",
    name: "Joel George",
    role: "Spiritual mentor",
    color: "#5856D6",
    gratitude:
      "Has walked with me through the parts of my life that never make it onto a resume.",
    link: "",
    linkLabel: "",
  },
  {
    id: "duncan-inganji",
    name: "Duncan Inganji",
    role: "Spiritual mentor",
    color: "#34C759",
    gratitude:
      "Asks the question underneath the question, and waits for the honest answer.",
    link: "",
    linkLabel: "",
  },
  {
    id: "lorenzo-ametrano",
    name: "Lorenzo Ametrano",
    role: "IYA mentor",
    color: "#AF52DE",
    gratitude:
      "When I insisted I was not a design kid or a tech kid or a business kid, he told me to keep saying leadership. That one word gave me somewhere to stand.",
    link: "",
    linkLabel: "",
  },
  {
    id: "jet-jadeja",
    name: "Jet Jadeja",
    role: "IYA mentor",
    color: "#0A84FF",
    gratitude:
      "Someone whose way of building taught me a lot, and who quietly raised my sense of what was possible.",
    link: "",
    linkLabel: "",
  },
  {
    id: "daniel-murakami",
    name: "Daniel Murakami",
    role: "Spiritual mentor",
    color: "#30B0C7",
    gratitude:
      "An architect who has been a steady older-brother presence through the years I needed one most.",
    link: "",
    linkLabel: "",
  },
  {
    id: "josh-patingo",
    name: "Josh Patingo",
    role: "Spiritual mentor",
    color: "#FF3B30",
    gratitude:
      "One of the people I am most grateful for, and one of the reasons I did not go through last year alone.",
    link: "",
    linkLabel: "",
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
  | "health"
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
  | "mentors"
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
    id: "health",
    name: "Health",
    emoji: "H",
    icon: "/assets/icons/healthapp.png",
    gradient: ["#FF2D55", "#FF375F"],
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
    id: "mentors",
    name: "Mentors",
    emoji: "M",
    icon: "/assets/icons/mentors.png",
    gradient: ["#FF9500", "#FF3B30"],
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
