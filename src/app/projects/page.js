import ProjectsIndex from "../../components/ProjectsIndex";
import { projects } from "../../data/projects";
import { graph, projectList, breadcrumbs } from "../../lib/schema";

export const metadata = {
  title: "Projects",
  description:
    "AI/ML, product design and front-end case studies by Shivraj Talekar - Astrobot, Travellore, Radius, Trailer-Park and Stoiric.",
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return (
    <section className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(
            projectList(),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ])
          )) }}
      />
      <div className="wrap">
        <header className="section-head">
          <p className="eyebrow">{projects.length} case studies</p>
          <h1 className="section-title outline">Projects</h1>
          <p className="section-lede">
            Each one written up as problem, approach and outcome &mdash; the
            thinking, not just the screenshots.
          </p>
        </header>

        <ProjectsIndex />
      </div>
    </section>
  );
}
