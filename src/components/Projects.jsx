import Link from "next/link";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import DexFrame from "./DexFrame";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import styles from "./Projects.module.css";

export default function Projects({ limit }) {
  const shown = limit ? projects.slice(0, limit) : projects;
  const hasMore = Boolean(limit) && projects.length > limit;

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title outline">Notable projects</h2>
          <p className="section-lede">
            AI/ML systems, product design and front-end builds &mdash; each
            written up as a short case study rather than a screenshot.
          </p>
        </Reveal>

        <DexFrame
          label="Project Index"
          entry={`${shown.length} / ${projects.length}`}
        >
          <RevealGroup className={styles.grid}>
            {shown.map((project, i) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} priority={i < 2} />
              </RevealItem>
            ))}
          </RevealGroup>
        </DexFrame>

        {hasMore && (
          <div className={styles.more}>
            <Link href="/projects" className="btn">
              All {projects.length} projects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
