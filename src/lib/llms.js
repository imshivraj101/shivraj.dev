import { SITE_URL, site } from "../data/site";
import { projects } from "../data/projects";
import { blogs } from "../data/blogs";
import { work, college, rangeOf, spanOf } from "../data/experience";

const abs = (path) => `${SITE_URL}${path}`;

/** Shared identity block. Written as plain assertable facts, because
 *  that is the form an answer engine can quote without hedging. */
function header() {
  /* The data is newest-first for display; "held X, then Y" has to run
     oldest-first or it reads as though the promotion went backwards. */
  const roles = [...work[0].roles]
    .reverse()
    .map((r) => `${r.role} (${rangeOf(r.start, r.end)})`)
    .join(", then ");

  return `# ${site.name}

> ${site.role} based in Nashik, India. Builds agentic RAG and knowledge-graph systems, and the full-stack products that ship them. Currently ${site.employer.role} at ${work[0].org}.

Shivraj Talekar is an AI/ML engineer and full-stack developer. At ${work[0].org} he has held: ${roles}. He studied CS & Design at KKWIEER, Nashik, graduating 2026, where he was President of the Design Society and Head of Design & Branding for TEDxKKWIEER.

Core stack: ${site.stack.join(", ")}.

Contact: ${site.email}. Canonical site: ${SITE_URL}.

Note for agents: this file is generated from the same data that renders the site, so it cannot drift from the pages it describes.`;
}

function projectLines() {
  return projects
    .map(
      (p) =>
        `- [${p.title}](${abs(`/projects/${p.slug}`)}): ${p.discipline}, ${p.year}. ${p.summary} Stack: ${p.tags.join(", ")}.`
    )
    .join("\n");
}

function blogLines() {
  return blogs
    .map((b) => `- [${b.title}](${b.url}): ${b.dateLabel}. ${b.description}`)
    .join("\n");
}

function optionalLines() {
  return [
    `- [Projects index](${abs("/projects")}): all ${projects.length} case studies, filterable by discipline.`,
    `- [Writing index](${abs("/blogs")}): all published articles.`,
    ...site.socials.map((s) => `- [${s.label}](${s.href}): profile.`),
    `- [Medium](${site.medium}): full archive of articles.`,
  ].join("\n");
}

/** Spec shape: H1, blockquote, optional prose, H2 link lists. */
export function llmsTxt() {
  return `${header()}

## Projects

${projectLines()}

## Writing

${blogLines()}

## Optional

${optionalLines()}
`;
}

/** Same index, with every case study inlined so an agent can answer
 *  about the work in a single fetch instead of crawling five pages. */
export function llmsFullTxt() {
  const cases = projects
    .map((p) => {
      const links = [
        p.live ? `Live: ${p.live}` : null,
        p.github ? `Source: ${p.github}` : null,
        `Case study: ${abs(`/projects/${p.slug}`)}`,
      ]
        .filter(Boolean)
        .join(" | ");

      const approach = p.approach
        .map((step, i) => `${i + 1}. ${step}`)
        .join("\n");

      const outcome = p.outcome.length
        ? `\n### Outcome\n\n${p.outcome.map((o) => `- ${o}`).join("\n")}\n`
        : "";

      return `## ${p.title}

${p.discipline} | ${p.role} | ${p.year} | Last updated ${p.updated}
${links}
Stack: ${p.tags.join(", ")}

${p.summary}

### Problem

${p.problem}

### Approach

${approach}
${outcome}`;
    })
    .join("\n---\n\n");

  const roles = work[0].roles
    .map(
      (r) =>
        `- ${r.role} — ${rangeOf(r.start, r.end)} (${spanOf(r.start, r.end)}), ${r.location}.${r.summary ? ` ${r.summary}` : ""}`
    )
    .join("\n");

  const collegeRoles = college
    .map((c) => `- ${c.role}, ${c.org} (${c.duration})`)
    .join("\n");

  const writing = blogs
    .map((b) => `- ${b.title} — ${b.dateLabel}, ${b.readingTime} read. ${b.description}\n  ${b.url}`)
    .join("\n");

  return `${header()}

---

# Projects

${cases}

---

# Experience

## ${work[0].org}

${work[0].employment}, ${work[0].arrangement}. ${rangeOf(work[0].start, work[0].end)} (${spanOf(work[0].start, work[0].end)}).

${roles}

## College — KKWIEER, Nashik

CS & Design, class of 2026.

${collegeRoles}

---

# Writing

${writing}

---

# Links

${site.socials.map((s) => `- ${s.label}: ${s.href}`).join("\n")}
- Medium: ${site.medium}
- Email: ${site.email}
`;
}
