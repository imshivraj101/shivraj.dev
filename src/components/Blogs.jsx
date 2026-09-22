import Image from "next/image";
import { blogs } from "../data/blogs";
import { site } from "../data/site";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";
import styles from "./Blogs.module.css";

export default function Blogs({ limit }) {
  const shown = limit ? blogs.slice(0, limit) : blogs;

  return (
    <section id="writing" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Writing</p>
          <h2 className="section-title outline-cool">Latest blogs</h2>
          <p className="section-lede">
            Explaining machine learning and cloud infrastructure with the
            analogies I wish someone had used on me.
          </p>
        </Reveal>

        <RevealGroup className={styles.list}>
          {shown.map((post) => (
            <RevealItem key={post.url}>
              <article className={`card ${styles.card}`}>
                <a
                  className={styles.media}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={post.image}
                    alt=""
                    className={styles.image}
                    sizes="(max-width: 767px) 92vw, 260px"
                    placeholder="blur"
                  />
                </a>

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <time dateTime={post.date}>{post.dateLabel}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime} read</span>
                  </div>

                  <h3 className={styles.title}>
                    <a
                      className={styles.titleLink}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                      <span className="visually-hidden">
                        {" "}
                        (opens on Medium in a new tab)
                      </span>
                    </a>
                  </h3>

                  <p className={styles.excerpt}>{post.description}</p>

                  <span className={styles.more} aria-hidden="true">
                    Read on Medium &#8599;
                  </span>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className={styles.all}>
          <a
            className="btn"
            href={site.medium}
            target="_blank"
            rel="noopener noreferrer"
          >
            All writing on Medium
            <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
