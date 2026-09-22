import { projects } from "../data/projects";
import { site } from "../data/site";

export default function sitemap() {
  const now = new Date();

  const routes = ["", "/projects", "/blogs"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const cases = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...routes, ...cases];
}
