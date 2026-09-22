import Image from "next/image";
import { blogs } from "../data/blogs";
import { site } from "../data/site";
import styles from "./WritingPanel.module.css";

export default function WritingPanel({ compact }) {
  return (
    <div className={styles.panel} data-compact={compact || undefined}>
      <ul className={styles.list}>
        {blogs.map((post) => (
          <li key={post.url} className={styles.row}>
            <a
              className={styles.link}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.thumb}>
                <Image
                  src={post.image}
                  alt=""
                  className={styles.thumbImg}
                  sizes="96px"
                  placeholder="blur"
                />
              </span>

              <span className={styles.body}>
                <span className={styles.meta}>
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingTime} read</span>
                </span>
                <span className={styles.title}>{post.title}</span>
                <span className={styles.excerpt}>{post.description}</span>
              </span>

              <span className={styles.arrow} aria-hidden="true">
                &#8599;
              </span>
              <span className="visually-hidden">
                (opens on Medium in a new tab)
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <a
          className="btn"
          href={site.medium}
          target="_blank"
          rel="noopener noreferrer"
        >
          All writing on Medium <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    </div>
  );
}
