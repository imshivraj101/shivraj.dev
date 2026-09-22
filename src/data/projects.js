import astrobotImg from "../assets/astrobot.webp";
import travelloreImg from "../assets/travellore.webp";
import trailerparkImg from "../assets/trailerpark.webp";
import radiusImg from "../assets/radius.webp";
import stoicImg from "../assets/stoic.webp";

export const projects = [
  {
    slug: "astrobot",
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
