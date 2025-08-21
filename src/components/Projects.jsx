import "./Projects.css";

// Import images for build-ready paths
import travelloreImg from "../assets/travellore.png";
import trailerparkImg from "../assets/trailerpark.png";
import radiusImg from "../assets/radius.png";
import stoicImg from "../assets/stoic.png";

const projects = [
  {
    title: "Travellore",
    role: "UI/UX Research & Design",
    description:
      "An AI-powered solo travel planner for intuitive and personalized itineraries.",
    tags: ["Figma", "ReactJS", "Vite", "CSS", "Vercel"],
    image: travelloreImg,
    live: "https://travellore-case-study.vercel.app/",
    github: "https://github.com/yourusername/travellore",
  },
  {
    title: "Trailer-Park",
    role: "UI/UX Development",
    description:
      "Netflix trailer clone using TMDB API for seamless trailer browsing.",
    tags: ["ReactJS", "TMDB API", "Vite", "CSS", "Vercel"],
    image: trailerparkImg,
    live: "https://trailer-park-tau.vercel.app/",
    github: "https://github.com/yourusername/trailer-park",
  },
  {
    title: "Radius",
    role: "UI/UX Research & Design",
    description:
      "A hyperlocal social app with custom user flows and backend-ready concepts.",
    tags: ["Figma", "ReactJS", "Vite", "CSS", "Vercel"],
    image: radiusImg,
    live: "https://radius-case-study.vercel.app/",
    github: "https://github.com/yourusername/radius",
  },
  {
  "title": "Stoiric",
  "role": "UI/UX Flow Design",
  "description": "A gamified self-growth journaling app based on Stoic principles, featuring daily goal tracking, private journaling, and quote-based reflections. Focused on clean UI, user motivation, and data privacy.",
  "tags": ["Figma", "Balsamiq", "Canva"],
  "image": stoicImg,
  "live": "https://stoiric.vercel.app/",
  "github": "https://github.com/yourusername/stoiric"
}
];

export default function Projects() {
  return (
    <section className="projects-section">
      <h2 className="projects-title">Notable Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <div className="project-content">
              <div>
                <h3 className="project-name">{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag-tools">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Live
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-more">
        <a href="/projects" className="view-more-bton">
          View More Projects
        </a>
      </div>
    </section>
  );
}
