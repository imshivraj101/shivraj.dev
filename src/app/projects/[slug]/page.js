import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, entryNoOf } from "../../../data/projects";
import { TYPE_CLASS } from "../../../components/ProjectCard";
import { graph, projectSchema, breadcrumbs } from "../../../lib/schema";
import styles from "./case.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} - ${project.role}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Shivraj Talekar`,
      description: project.summary,
      images: [{ url: project.image.src }],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = graph(
    projectSchema(project),
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.title, path: `/projects/${project.slug}` },
    ])
  );

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="wrap-narrow">
        <Link href="/projects" className={styles.back}>
          <span aria-hidden="true">&larr;</span> All projects
        </Link>

        <header className={styles.head}>
          <div className={styles.entryBar}>
            <span className="entry-no">
              No.<b>{entryNoOf(project.slug)}</b>
            </span>
            <span
              className={`type-chip ${TYPE_CLASS[project.discipline] ?? ""}`}
            >
              {project.discipline}
            </span>
            <span className={styles.status}>
              <span
                className={`led ${project.live ? "led-on" : ""}`}
                aria-hidden="true"
              />
              {project.live ? "Live" : "Source"}
            </span>
          </div>

          <p className="eyebrow">
            {project.role} &middot; {project.year}
          </p>
          <h1 className={`${styles.title} outline`}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>

          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {project.live && (
              <a
                className="btn btn-primary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                View live
                <span aria-hidden="true">&#8599;</span>
              </a>
            )}
            {project.github && (
              <a
                className="btn"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
                <span aria-hidden="true">&#8599;</span>
              </a>
            )}
          </div>
        </header>
      </div>

      <div className={styles.shotWrap}>
        <div className="wrap">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            className={styles.shot}
            sizes="(max-width: 1139px) 92vw, 1100px"
            placeholder="blur"
            priority
          />
        </div>
      </div>

      <div className="wrap-narrow">
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>
            <span className={styles.num}>01</span> The problem
          </h2>
          <p className={styles.prose}>{project.problem}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockTitle}>
            <span className={styles.num}>02</span> Approach
          </h2>
          <ol className={styles.steps}>
            {project.approach.map((step, i) => (
              <li key={i} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={styles.prose}>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {project.outcome.length > 0 && (
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>03</span> Outcome
            </h2>
            <ul className={styles.outcome}>
              {project.outcome.map((o, i) => (
                <li key={i} className={styles.prose}>
                  {o}
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className={styles.next} aria-label="Next project">
          <span className={styles.nextLabel}>Next project</span>
          <Link href={`/projects/${next.slug}`} className={styles.nextLink}>
            {next.title}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
