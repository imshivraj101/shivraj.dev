import { SITE_URL, site } from "../../data/site";
import { projects } from "../../data/projects";
import { blogs } from "../../data/blogs";

export const dynamic = "force-static";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function GET() {
  const items = [
    ...projects.map((p) => ({
      title: `${p.title} - ${p.role}`,
      link: `${SITE_URL}/projects/${p.slug}`,
      date: new Date(p.updated),
      description: p.summary,
      category: p.discipline,
    })),
    ...blogs.map((b) => ({
      title: b.title,
      link: b.url,
      date: new Date(b.date),
      description: b.description,
      category: "Writing",
    })),
  ].sort((a, b) => b.date - a.date);

  const body = items
    .map(
      (i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="true">${esc(i.link)}</guid>
      <pubDate>${i.date.toUTCString()}</pubDate>
      <category>${esc(i.category)}</category>
      <description>${esc(i.description)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} - ${esc(site.role)}</title>
    <link>${SITE_URL}</link>
    <description>Projects and writing by ${esc(site.name)}.</description>
    <language>en</language>
    <lastBuildDate>${items[0]?.date.toUTCString() ?? new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${body}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
