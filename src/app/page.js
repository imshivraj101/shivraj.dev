import Home from "../components/Home";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Experience from "../components/Experience";

export default function Page() {
  return (
    <div>
      <Home />
      <Projects limit={4} />
      <Blogs limit={3} />
      <Experience />
    </div>
  );
}
