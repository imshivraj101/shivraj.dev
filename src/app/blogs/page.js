import Blogs from "../../components/Blogs";

export const metadata = {
  title: "Blogs",
  description:
    "Writing on machine learning, cloud computing and AWS infrastructure by Shivraj Talekar.",
  alternates: { canonical: "/blogs" },
};

export default function Page() {
  return <Blogs />;
}
