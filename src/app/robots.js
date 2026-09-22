import { SITE_URL } from "../data/site";

/* Every known AI agent gets an explicit Allow rather than being left
   to infer permission from the wildcard rule. Several of these
   crawlers only look for a block matching their own token, so an
   explicit entry is the difference between being cited and being
   skipped. Split by purpose purely for readability - all are allowed. */

const ANSWER_ENGINES = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
  "Kagibot",
];

const DATASET_CRAWLERS = ["CCBot", "Diffbot", "Timpibot", "omgili", "omgilibot"];

const SEARCH_ENGINES = [
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "YandexBot",
  "Baiduspider",
  "SeznamBot",
  "MojeekBot",
  "BraveBot",
  "Qwantbot",
  "PetalBot",
  "Teoma",
];

const host = new URL(SITE_URL).host;

export default function robots() {
  const allowAll = [
    ...SEARCH_ENGINES,
    ...ANSWER_ENGINES,
    ...DATASET_CRAWLERS,
  ].map((userAgent) => ({ userAgent, allow: "/" }));

  return {
    rules: [{ userAgent: "*", allow: "/" }, ...allowAll],
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host,
  };
}
