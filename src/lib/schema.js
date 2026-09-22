import { SITE_URL, site } from "../data/site";
import { projects } from "../data/projects";
import { blogs } from "../data/blogs";
import { work } from "../data/experience";

/* Stable @id anchors so every page's JSON-LD links into ONE entity
   graph instead of repeating disconnected copies of the same person.
   Answer engines resolve these references; duplicated literals with
   no @id read as unrelated entities. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#esds`;

const personRef = { "@id": PERSON_ID };

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "ESDS Software Solution Limited",
    url: "https://www.esds.co.in/",
  };
}

export function person() {
  const current = work[0]?.roles?.[0];

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: "Shivraj",
    url: SITE_URL,
    email: `mailto:${site.email}`,
    image: `${SITE_URL}/sne.png`,
    jobTitle: site.employer.role,
    description:
      "Engineers AI products end to end - the systems, infrastructure and intelligence behind them, from idea to production. Works on agentic RAG and knowledge-graph systems, and the full-stack products that ship them.",
    worksFor: { "@id": ORG_ID },
    ...(current && {
      hasOccupation: {
        "@type": "Occupation",
        name: current.role,
        occupationLocation: {
          "@type": "City",
          name: "Nashik",
        },
        skills: site.stack.join(", "),
      },
    }),
    knowsAbout: [
      "Agentic RAG",
      "Retrieval Augmented Generation",
      "Knowledge Graphs",
      "Neo4j",
      "Machine Learning",
      "Full Stack Engineering",
      "Next.js",
      "FastAPI",
      "Cloud and DevOps",
      "UI/UX Design",
    ],
    knowsLanguage: ["en", "hi", "mr"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "K. K. Wagh Institute of Engineering Education and Research (KKWIEER)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashik",
        addressCountry: "IN",
      },
    },
    sameAs: site.socials.map((s) => s.href).concat(site.medium),
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: `${site.name} - Portfolio`,
    description:
      "Portfolio of Shivraj Talekar: AI/ML engineering case studies, full-stack builds and writing.",
    inLanguage: "en",
    publisher: personRef,
    author: personRef,
  };
}

export function profilePage() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: `${site.name} - ${site.role}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personRef,
    about: personRef,
  };
}

/** Tags that name an actual language/runtime, for programmingLanguage. */
const LANGUAGE_TAGS = new Set([
  "Python",
  "ReactJS",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "CSS",
  "FastAPI",
  "Neo4j",
]);

export function projectSchema(project) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  const languages = project.tags.filter((t) => LANGUAGE_TAGS.has(t));

  return {
    "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.title,
    headline: project.title,
    description: project.summary,
    abstract: project.problem,
    dateModified: project.updated,
    datePublished: `${project.year}-01-01`,
    inLanguage: "en",
    author: personRef,
    creator: personRef,
    keywords: project.tags.join(", "),
    image: `${SITE_URL}${project.image.src}`,
    isPartOf: { "@id": WEBSITE_ID },
    ...(project.github && { codeRepository: project.github }),
    ...(languages.length && { programmingLanguage: languages }),
    ...(project.live && {
      subjectOf: {
        "@type": "WebSite",
        url: project.live,
        name: `${project.title} (live)`,
      },
    }),
  };
}

export function breadcrumbs(trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function projectList() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/projects#list`,
    name: "Projects by Shivraj Talekar",
    numberOfItems: projects.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
    })),
  };
}

export function blogSchema() {
  return {
    "@type": "Blog",
    "@id": `${SITE_URL}/blogs#blog`,
    url: `${SITE_URL}/blogs`,
    name: `Writing by ${site.name}`,
    inLanguage: "en",
    author: personRef,
    publisher: personRef,
    blogPost: blogs.map((b) => ({
      "@type": "BlogPosting",
      headline: b.title,
      url: b.url,
      datePublished: b.date,
      description: b.description,
      author: personRef,
      image: `${SITE_URL}${b.image.src}`,
      isAccessibleForFree: true,
    })),
  };
}

/** Wraps nodes in a single @graph so the @id references resolve. */
export function graph(...nodes) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat().filter(Boolean),
  };
}
