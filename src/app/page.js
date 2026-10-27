import { Anton, Italiana } from "next/font/google";
import Story from "../components/story/Story";
import Avatar from "../components/story/Avatar";
import { graph, profilePage } from "../lib/schema";

const chunk = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-chunk",
  display: "swap",
});

const serif = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--f-serif",
  display: "swap",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(profilePage())) }}
      />
      <Story fonts={`${chunk.variable} ${serif.variable}`} avatar={<Avatar />} />
    </>
  );
}
