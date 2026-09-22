import Blogs from "../../components/Blogs";
import { graph, blogSchema, breadcrumbs } from "../../lib/schema";

export const metadata = {
  title: "Blogs",
  description:
    "Writing on machine learning, cloud computing and AWS infrastructure by Shivraj Talekar.",
  alternates: { canonical: "/blogs" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(
            blogSchema(),
            breadcrumbs([
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
            ])
          )) }}
      />
      <Blogs />
    </>
  );
}
