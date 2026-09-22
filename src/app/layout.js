import { Oswald, Plus_Jakarta_Sans, Silkscreen } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { site } from "../data/site";
import { graph, person, organization, website } from "../lib/schema";

const display = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/* Bitmap face for UI chrome only - tabs, entry numbers, stat labels,
   type pills. Prose stays in Plus Jakarta: pixel fonts are genuinely
   hard to read at paragraph length and recruiters skim these. */
const pixel = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Shivraj Talekar - AI/ML Engineer | Portfolio",
    template: "%s | Shivraj Talekar",
  },
  description:
    "Portfolio of Shivraj Talekar - AI/ML engineer building agentic RAG and knowledge-graph systems. Artificial Intelligence Product Engineer at ESDS. Case studies in Python, FastAPI, Neo4j and React.",
  keywords: [
    "Shivraj Talekar",
    "AI/ML Engineer",
    "Machine Learning Engineer",
    "Agentic RAG",
    "Knowledge Graph",
    "Neo4j",
    "FastAPI",
    "LLM",
    "Python",
    "ESDS",
    "Full Stack Engineer",
    "ReactJS",
    "Figma",
    "Portfolio",
    "KKWIEER",
    "DeSoc",
    "TEDxKKWIEER",
    "Innov-Era",
    "Hackathon",
    "Nashik",
    "AI-Driven Design",
    "Creative Technologist",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shivraj Talekar | AI/ML Engineer",
    description:
      "Agentic RAG, knowledge graphs and the systems to serve them. AI Product Engineer at ESDS.",
    url: site.url,
    siteName: "Shivraj Talekar Portfolio",
    images: [
      {
        url: "/sne.png",
        width: 1200,
        height: 630,
        alt: "Shivraj Talekar - AI/ML Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivraj Talekar | AI/ML Engineer",
    description:
      "Agentic RAG, knowledge graphs and the systems to serve them. AI Product Engineer at ESDS.",
    creator: "@lord_shivraj",
    images: ["/sne.png"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      // Bing Webmaster Tools. Bing also feeds Yahoo, DuckDuckGo and Ecosia.
      ...(process.env.BING_SITE_VERIFICATION && {
        "msvalidate.01": process.env.BING_SITE_VERIFICATION,
      }),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#14141a" },
  ],
  colorScheme: "light dark",
};

/* One linked graph shared by every page, rather than a standalone
   Person literal repeated per route. */
const jsonLd = graph(person(), organization(), website());

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${pixel.variable}`}
      /* The pre-paint script below sets data-theme before React
         hydrates, so this element's attributes legitimately differ
         from the server output. Scoped to <html> only - it does not
         suppress warnings anywhere in the subtree. */
      suppressHydrationWarning
    >
      <head>
        <script
          // Runs before first paint so a stored dark preference never
          // flashes white. Falls through to the CSS media query when
          // nothing is stored, and is a no-op if storage throws.
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
