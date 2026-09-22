import Hero from "../components/Hero";
import { graph, profilePage } from "../lib/schema";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Experience from "../components/Experience";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(profilePage())) }}
      />
      <Hero />
      <Projects limit={3} />
      <Experience />
      <Blogs limit={3} />
    </>
  );
}
