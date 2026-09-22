import { projects } from "../data/projects";
import { blogs } from "../data/blogs";
import { SITE_URL } from "../data/site";

/* lastModified used to be new Date() on every URL, which stamped
   build time across the whole sitemap and told crawlers that
   everything changed on every deploy - a signal they learn to
   ignore. These are real content dates instead. */

const newestOf = (items, key) =>
  items.reduce(
    (latest, item) => {
      const d = new Date(item[key]);
      return d > latest ? d : latest;
    },
    new Date(0)
  );

export default function sitemap() {
  const projectsUpdated = newestOf(projects, "updated");
  const blogsUpdated = newestOf(blogs, "date");
  const siteUpdated = projectsUpdated > blogsUpdated ? projectsUpdated : blogsUpdated;

  return [
    {
      url: SITE_URL,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: projectsUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: blogsUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: new Date(p.updated),
      changeFrequency: "yearly",
      priority: p.slug === "astrobot" ? 0.9 : 0.7,
    })),
  ];
}
