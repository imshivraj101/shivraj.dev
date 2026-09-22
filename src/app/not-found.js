import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap-narrow" style={{ textAlign: "center" }}>
        <p className="eyebrow">Error 404</p>
        <h1 className="section-title outline" style={{ marginBlock: "1rem" }}>
          Page not found
        </h1>
        <p className="section-lede" style={{ marginInline: "auto" }}>
          That link has gone missing. The work is still where you left it.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <Link href="/projects" className="btn">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
