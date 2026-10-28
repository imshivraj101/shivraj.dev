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
      <script
        // The story always opens on the avatar. Runs before first paint,
        // so neither the browser's scroll restoration nor a leftover
        // #hash can drop a reload (soft or hard) mid-story.
        dangerouslySetInnerHTML={{
          __html:
            "try{history.scrollRestoration='manual';if(location.hash)history.replaceState(null,'',location.pathname+location.search);window.scrollTo(0,0)}catch(e){}",
        }}
      />
      <Story fonts={`${chunk.variable} ${serif.variable}`} avatar={<Avatar />} />
    </>
  );
}
