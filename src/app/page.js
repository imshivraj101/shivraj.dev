import Hero from "../components/Hero";
import DexDevice from "../components/DexDevice";
import { graph, profilePage } from "../lib/schema";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(profilePage())) }}
      />
      <Hero />
      <DexDevice />
    </>
  );
}
