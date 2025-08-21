import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Projects/>
      <Blogs />
      <Experience />
      <Footer/>
    </>
  );
}
