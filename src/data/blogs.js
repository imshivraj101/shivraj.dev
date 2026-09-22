import blog1 from "../assets/blog1.webp";
import blog2 from "../assets/blog2.webp";
import blog3 from "../assets/blog3.webp";

export const blogs = [
  {
    title: "X to Y: Mapping My Life with Machine Learning",
    url: "https://medium.com/@shivrajtalekar101/x-to-y-mapping-my-life-with-machine-learning-06b01814cc65",
    date: "2025-07-24",
    dateLabel: "Jul 24, 2025",
    readingTime: "5 min",
    description:
      "Reflecting on personal growth and career choices through the lens of machine learning, emphasizing the importance of data and algorithms in decision-making.",
    image: blog1,
  },
  {
    title: "The Guide to Cloud Computing: With a Cup of Coffee",
    url: "https://medium.com/@shivrajtalekar101/the-guide-to-cloud-computing-with-a-cup-of-coffeeask-c-2290762a61b8",
    date: "2025-08-09",
    dateLabel: "Aug 9, 2025",
    readingTime: "7 min",
    description:
      "A beginner-friendly introduction to cloud computing, using the coffee shop analogy to explain the client-server model and AWS's evolution.",
    image: blog2,
  },
  {
    title: "AWS Regions, Infrastructure as Code and McAloo Tikkis",
    url: "https://medium.com/@shivrajtalekar101/aws-regions-infrastructure-as-code-and-mcaloo-tikkis-1dd84de0642d",
    date: "2025-08-11",
    dateLabel: "Aug 11, 2025",
    readingTime: "6 min",
    description:
      "Exploring AWS's global infrastructure and how Infrastructure as Code (IaC) ensures high availability and fault tolerance, using the McAloo Tikki analogy.",
    image: blog3,
  },
].sort((a, b) => new Date(b.date) - new Date(a.date));
