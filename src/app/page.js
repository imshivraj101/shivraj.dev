import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Experience from "../components/Experience";

export default function Page() {
  return (
    <>
      <Hero />
      <Projects limit={3} />
      <Experience />
      <Blogs limit={3} />
    </>
  );
}
