import React from "react";
import "./Blogs.css";

import blog1 from "../assets/blog1.webp";
import blog2 from "../assets/blog2.webp";
import blog3 from "../assets/blog3.webp";
const blogs = [
  {
    title: "X to Y: Mapping My Life with Machine Learning",
    url: "https://medium.com/@shivrajtalekar101/x-to-y-mapping-my-life-with-machine-learning-06b01814cc65",
    date: "Jul 24, 2025",
    description:
      "Reflecting on personal growth and career choices through the lens of machine learning, emphasizing the importance of data and algorithms in decision-making.",
    image: blog1,
  },
  {
    title: "The Guide to Cloud Computing: With a Cup of Coffee",
    url: "https://medium.com/@shivrajtalekar101/the-guide-to-cloud-computing-with-a-cup-of-coffeeask-c-2290762a61b8",
    date: "Aug 9, 2025",
    description:
      "A beginner-friendly introduction to cloud computing, using the coffee shop analogy to explain the client-server model and AWS's evolution.",
    image: blog2,
  },
  {
    title: "AWS Regions, Infrastructure as Code and McAloo Tikkis",
    url: "https://medium.com/@shivrajtalekar101/aws-regions-infrastructure-as-code-and-mcaloo-tikkis-1dd84de0642d",
    date: "Aug 11, 2025",
    description:
      "Exploring AWS's global infrastructure and how Infrastructure as Code (IaC) ensures high availability and fault tolerance, using the McAloo Tikki analogy.",
    image: blog3,
  },
];

const Blogs = () => (
  <section className="blogs-section">
    <h1 className="blogs-title">Latest Blogs</h1>
    <div className="blogs-list">
      {blogs.map((blog, index) => (
        <div key={index} className="blog-card">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-content">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-date">{blog.date}</p>
            <p className="blog-description">{blog.description}</p>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>

    <div className="view-more-wrapper">
      <a
        href="https://medium.com/@shivrajtalekar101"
        target="_blank"
        rel="noopener noreferrer"
        className="view-more-btn"
      >
        View All Blogs
      </a>
    </div>
  </section>
);

export default Blogs;
