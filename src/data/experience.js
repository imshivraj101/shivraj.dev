import isteLogo from "../assets/iste-logo.jpeg";
import desocLogo from "../assets/desoc-logo.jpg";
import tedxLogo from "../assets/tedx-logo.jpeg";
import whitespotLogo from "../assets/whitespot-logo.png";
import hackathonLogo from "../assets/innov.jpeg";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const parseYM = (s) => {
  const [y, m] = s.split("-").map(Number);
  return { y, m };
};

const monthLabel = (s) => {
  const { y, m } = parseYM(s);
  return `${MONTHS[m - 1]} ${y}`;
};

/** Inclusive month span, so Dec 2025 -> Mar 2026 reads as 4 mos. */
const monthsBetween = (start, end) => {
  const a = parseYM(start);
  const b = end ? parseYM(end) : null;
  const now = new Date();
  const bY = b ? b.y : now.getFullYear();
  const bM = b ? b.m : now.getMonth() + 1;
  return (bY - a.y) * 12 + (bM - a.m) + 1;
};

const lengthLabel = (months) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
};

/**
 * Computed at build time rather than hardcoded, so "7 mos" does not
 * quietly become wrong the month after this ships.
 */
export const rangeOf = (start, end) =>
  `${monthLabel(start)} — ${end ? monthLabel(end) : "Present"}`;

export const spanOf = (start, end) => lengthLabel(monthsBetween(start, end));

/** Professional roles. Nested so progression inside one employer shows. */
export const work = [
  {
    org: "ESDS Software Solution Limited",
    employment: "Full-time",
    arrangement: "On-site",
    start: "2025-12",
    end: null,
    current: true,
    roles: [
      {
        role: "Artificial Intelligence Product Engineer",
        start: "2026-03",
        end: null,
        location: "Maharashtra, India",
        current: true,
        summary:
          "Building AI products, platforms and innovation software.",
      },
      {
        role: "Cloud DevOps Engineer",
        start: "2025-12",
        end: "2026-03",
        location: "Nashik, Maharashtra, India",
      },
    ],
  },
];

/** Student leadership, kept as its own chapter rather than mixed into work. */
export const college = [
  {
    role: "President",
    org: "Design Society (DeSoc)",
    duration: "2024–25",
    logo: desocLogo,
    type: "co-curricular",
  },
  {
    role: "Head of Marketing & Secretariat",
    org: "Innov-Era 2025 (National Hackathon)",
    duration: "2025",
    logo: hackathonLogo,
    type: "co-curricular",
  },
  {
    role: "Master Student",
    org: "Indian Society for Technical Education (ISTE)",
    duration: "2024–25",
    logo: isteLogo,
    type: "co-curricular",
  },
  {
    role: "Core Committee Member",
    org: "Indian Society for Technical Education (ISTE)",
    duration: "2024–25",
    logo: isteLogo,
    type: "co-curricular",
  },
  {
    role: "Head of Design & Branding",
    org: "TEDxKKWIEER",
    duration: "2025",
    logo: tedxLogo,
    type: "extracurricular",
  },
  {
    role: "Writer & Director",
    org: "Whitespot Studios",
    duration: "Since 2024",
    logo: whitespotLogo,
    type: "extracurricular",
  },
  {
    role: "Best Formal Anchor & Co-Head",
    org: "Anchoring Committee",
    duration: "2025",
    logo: null,
    type: "extracurricular",
  },
];
