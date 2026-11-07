import astrobotImg from "../assets/astrobot.webp";
import travelloreImg from "../assets/travellore.webp";
import trailerparkImg from "../assets/trailerpark.webp";
import radiusImg from "../assets/radius.webp";
import stoicImg from "../assets/stoic.webp";
import pulseImg from "../assets/pulse.webp";
import trilokImg from "../assets/trilok.webp";
import tacticosImg from "../assets/tacticos.webp";

export const projects = [
  {
    slug: "tacticos",
    updated: "2026-11-07",
    title: "TacticOS",
    role: "Product & AI Engineering",
    year: "2026",
    discipline: "AI/ML",
    summary:
      "A multi-agent football recruitment platform: describe a player in plain English, approve a shortlist and get a fact-checked report.",
    tags: ["LangGraph", "Python", "FastAPI", "DuckDB", "Gemini", "JavaScript", "Render"],
    image: tacticosImg,
    live: "https://ai-scout-lb7e.onrender.com",
    github: null,
    problem:
      "Recruitment is a filtering problem where mistakes are expensive. A club needs a specific profile at a specific price, the evidence is spread across market, match and event data, and a chatbot will happily invent a stat that sounds right. TacticOS had to let a scout ask in plain English while every figure stayed traceable to the data and a person kept the final call.",
    approach: [
      "Built each scouting run as a LangGraph state graph. A Brief Interpreter turns the request into filters, code searches the database, a Chief Scout picks a shortlist, analysts fan out in parallel with one per player, a Head of Recruitment writes the report, and a Fact-Checker tests its claims and sends weak ones back for a rewrite.",
      "Put a person in the loop. The graph pauses at the shortlist with a LangGraph interrupt, and nothing moves on until the user approves it or redirects the search.",
      "Kept the facts in code. Shortlist IDs are checked against the search results so invented players can't get through, budget sums never go through the model, and a follow-up like \"why was this player left out?\" is tested against the run's real filters before the AI answers.",
      "Built the data layer on DuckDB from Transfermarkt open datasets and StatsBomb open event data. xA is derived from the shots a pass set up and xT is calculated from the same events. Players link across the two sources only when the match is unambiguous, and charts say so when data is missing.",
      "Added boards that need no model call: league table, form, last XI and squad depth come straight from results and line-ups. The transfer planner takes one total budget and returns packages that fit it, from one statement signing to cover across several spots.",
      "Shipped it as an open demo on a free tier. FastAPI streams every agent step to a plain JavaScript and SVG front end, a daily limit protects the shared Gemini key, and visitors can add their own key, which stays in their browser tab.",
    ],
    outcome: [
      "Live public demo covering 22,000+ active players across 32 leagues, with full agent runs open to explore without using any AI.",
      "32 chart types in the Lab, from radars to xG shot maps and passing networks, plus club and team performance boards.",
      "Data limits are shown openly: season data runs to June 2026, and xG comes from 383 StatsBomb open matches ending in July 2024, so it reads as a past sample rather than current form.",
    ],
  },
  {
    slug: "trilok",
    updated: "2026-11-01",
    title: "TRILOK",
    role: "Game Design & Development",
    year: "2026",
    discipline: "Game Dev",
    summary:
      "A 2D arcade fighter where gods and kings of history clash, playable in the browser with online rooms.",
    tags: ["JavaScript", "HTML5 Canvas", "WebRTC", "PeerJS", "Web Audio", "Python", "Vercel"],
    image: trilokImg,
    live: "https://trilok-pi.vercel.app",
    github: null,
    problem:
      "Fighting games are unforgiving to build. Frame timing decides whether a hit feels fair, and online play only works if two machines agree on every frame. TRILOK also had to run in a browser tab with no install, on a keyboard, an Xbox controller or a phone, with no engine to lean on and one person producing the art, music and voices for the whole roster.",
    approach: [
      "Wrote the game in plain JavaScript on HTML5 Canvas with no engine. Logic runs at a fixed 60 fps in a 960x540 virtual space, while the canvas renders at the device's real resolution.",
      "Built eight fighters from Thor and Indra to Alexander and Genghis Khan, each with a home stage, specials and a scripted super. Attacks are spaced by a 12-frame gap with input buffering, a shared lock stops special spam, and the CPU opponent uses the full move set.",
      "Added private online rooms over WebRTC, joined with a 5-letter code or invite link. Delay-based lockstep means only inputs travel: input delay is set per match from the measured ping, the host sends periodic checksums to catch drift, and a TURN relay covers networks that block direct connections.",
      "Ran the assets as a pipeline. Sprites and stages came from AI image generation on a magenta key, and a Python slicer keys them out, splits the poses and writes per-frame anchors. AI-generated music and voice lines were cut with scripts and wired into the game.",
      "Put keyboard, gamepad and touch behind the same controls, with on-screen hints that follow the device. A build step converts images to WebP and compresses the music before deploying to Vercel.",
    ],
    outcome: [
      "Live in the browser with no install: VS CPU, local two-player and private online rooms.",
      "Eight fighters and eight arenas, with music, voice lines and two power modes (Balanced and Realistic).",
      "Online rooms held identical game state with no drift or stalls in a two-window test.",
    ],
  },
  {
    slug: "pulse",
    updated: "2026-10-28",
    status: "In development",
    title: "PULSE",
    role: "Product & AI Engineering",
    year: "2026",
    discipline: "AI/ML",
    summary:
      "A personal AI information feed: finite daily briefings, story fusion and source-grounded summaries. More signal, less noise.",
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "Redis", "LLM"],
    image: pulseImg,
    live: null,
    github: null,
    problem:
      "Staying informed has turned into staying online. The same story arrives ten times from ten feeds, ranking is tuned for time spent rather than understanding, and AI summaries sound confident whether or not anything backs them. The result is more content and less clarity.",
    approach: [
      "Treat the feed as finite by design: a daily briefing of five to ten stories with a real end state, a reading budget, and no infinite scroll, autoplay or streaks.",
      "Ingest from RSS, Hacker News and arXiv through one connector interface that respects rate limits and source terms, then normalise everything into a single content model that never loses the original URL.",
      "Use embeddings to remove near-duplicates and fuse coverage of the same event into one story card: what happened, why it matters, where sources disagree and what is still unconfirmed, with citations next to the claims they support.",
      "Rank with a transparent weighted model (relevance, novelty, freshness, source quality, diversity and explicit feedback) instead of raw engagement, and explain every recommendation in a line.",
      "Keep it a modular monolith: Next.js on the front, FastAPI and Python workers behind it, PostgreSQL with pgvector and Redis underneath, all running locally in Docker.",
    ],
    outcome: [],
  },
  {
    slug: "astrobot",
    updated: "2026-09-21",
    title: "Astrobot",
    role: "AI/ML Engineering",
    year: "2026",
    discipline: "AI/ML",
    summary:
      "An agentic RAG and knowledge-graph engine for Vedic astrology, built so the model cannot invent facts.",
    tags: ["Python", "FastAPI", "Neo4j", "Swiss Ephemeris", "RAG", "LLM"],
    image: astrobotImg,
    live: null,
    github: "https://github.com/imshivraj101/astrobot",
    problem:
      "Ask a language model about a birth chart and it will happily produce planetary positions that were never computed. At the data layer none of this is a matter of opinion — positions come out of an ephemeris, and the rules that combine them are a fixed body of knowledge. A model left to free-associate over that produces confident, unfalsifiable nonsense, and the user has no way to tell the difference.",
    approach: [
      "Split the system in two. Swiss Ephemeris computes the chart deterministically, and the language model is never placed in a position where it could produce a number.",
      "Modelled the interpretive rules as a Neo4j knowledge graph, so the relationships between planets, houses and signs are traversable structure rather than text the model has to recall correctly.",
      "Made retrieval agentic: the system reasons about which parts of the graph a given question actually needs, instead of stuffing a fixed context window and hoping the relevant rule survived.",
      "Served it behind FastAPI so the deterministic layer and the generative layer stay separately testable — the part that must be exactly right is not entangled with the part that only has to read well.",
    ],
    outcome: [],
  },
  {
    slug: "travellore",
    updated: "2025-04-24",
    title: "Travellore",
    role: "UI/UX Research & Design",
    year: "2025",
    discipline: "Design",
    summary:
      "An AI-powered solo travel planner for intuitive and personalized itineraries.",
    tags: ["Figma", "ReactJS", "Vite", "CSS", "Vercel"],
    image: travelloreImg,
    live: "https://travellore-case-study.vercel.app/",
    github: "https://github.com/imshivraj101/travellore",
    problem:
      "Planning a solo trip means holding a dozen browser tabs in your head at once — flights in one, stays in another, a half-written list of places someone recommended in a third. The planning cost is high enough that people default to the safe, generic itinerary.",
    approach: [
      "Mapped the end-to-end solo-travel journey to find where planning actually breaks down, rather than designing around the booking step everyone else optimises.",
      "Built the interface around a single evolving itinerary object, so every AI suggestion lands somewhere concrete instead of in a chat log the traveller has to re-read.",
      "Designed for low-confidence input: the planner produces a usable draft from a destination and a date range alone, then sharpens as the traveller adds constraints.",
      "Prototyped in Figma, then shipped the case study as a live React build so the interaction model could be judged in the browser, not as flat screens.",
    ],
    outcome: [],
  },
  {
    slug: "trailer-park",
    updated: "2025-07-20",
    title: "Trailer-Park",
    role: "UI/UX Development",
    year: "2024",
    discipline: "Development",
    summary:
      "Netflix trailer clone using TMDB API for seamless trailer browsing.",
    tags: ["ReactJS", "TMDB API", "Vite", "CSS", "Vercel"],
    image: trailerparkImg,
    live: "https://trailer-park-tau.vercel.app/",
    github: "https://github.com/imshivraj101/netflix-clone",
    problem:
      "Streaming interfaces make browsing feel effortless, and that ease hides a lot of engineering: paginated API data, lazy-loaded artwork, and row-based navigation that has to stay smooth on a slow connection.",
    approach: [
      "Rebuilt the row-and-rail browsing pattern against the live TMDB API, treating it as an exercise in matching a production-grade interaction model rather than a static visual copy.",
      "Handled the unglamorous states real catalogues produce — missing artwork, absent trailers, empty result sets — so the grid never collapses on incomplete data.",
      "Kept trailer playback inline so browsing momentum survives a click, which is the whole point of the pattern.",
    ],
    outcome: [],
  },
  {
    slug: "radius",
    updated: "2025-07-20",
    title: "Radius",
    role: "UI/UX Research & Design",
    year: "2025",
    discipline: "Design",
    summary:
      "A hyperlocal social app with custom user flows and backend-ready concepts.",
    tags: ["Figma", "ReactJS", "Vite", "CSS", "Vercel"],
    image: radiusImg,
    live: "https://radius-case-study.vercel.app/",
    github: "https://github.com/imshivraj101/Radius_Case_Study",
    problem:
      "Social apps scale by making distance irrelevant, which is exactly what makes them useless for the thing happening two streets away. A hyperlocal network inverts that assumption, and the inversion breaks most of the standard social UI patterns along with it.",
    approach: [
      "Treated physical proximity as the primary sort key and reworked feed, discovery and profile flows around it instead of retrofitting a location filter onto a conventional feed.",
      "Designed the flows to be backend-ready — defined entities and state transitions explicitly, so the prototype maps onto a real data model rather than stopping at screens.",
      "Worked through the trust and safety surface that proximity creates, since a hyperlocal product exposes users in ways a global one does not.",
    ],
    outcome: [],
  },
  {
    slug: "stoiric",
    updated: "2024-12-01",
    title: "Stoiric",
    role: "UI/UX Flow Design",
    year: "2024",
    discipline: "Design",
    summary:
      "A gamified self-growth journaling app based on Stoic principles.",
    tags: ["Figma", "Balsamiq", "Canva"],
    image: stoicImg,
    live: "https://stoiric.vercel.app/",
    github: null,
    problem:
      "Journaling apps have a retention problem: the habit is valuable precisely because it is effortful, and most products respond by gamifying the effort away until the practice is hollow.",
    approach: [
      "Grounded the daily loop in Stoic practice — morning intention, evening review — so the structure carries the meaning rather than a streak counter carrying it.",
      "Used game mechanics to mark reflection that actually happened instead of rewarding raw frequency, keeping the incentive pointed at depth.",
      "Wireframed in Balsamiq before committing to visual design, to settle the flow while it was still cheap to change.",
    ],
    outcome: [],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort();

/** Zero-padded dex number from canonical order, not filtered order. */
export const entryNoOf = (slug) =>
  String(projects.findIndex((p) => p.slug === slug) + 1).padStart(3, "0");
