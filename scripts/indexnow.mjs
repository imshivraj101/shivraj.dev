#!/usr/bin/env node
/**
 * Ping IndexNow with every URL in the sitemap.
 *
 * One POST notifies Bing, Yandex, Seznam, Naver and Yep at once -
 * the cheapest way to cover "every search engine" without a console
 * login for each. Google does not participate; it uses the sitemap.
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow.mjs
 */

const KEY = process.env.INDEXNOW_KEY;
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shivraj-dev-eta.vercel.app";

if (!KEY) {
  console.error(
    "INDEXNOW_KEY is not set.\n" +
      "Generate one at https://www.bing.com/indexnow (any 8-128 hex chars),\n" +
      "set it in Vercel, then re-run."
  );
  process.exit(1);
}

const host = new URL(SITE).host;

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) {
  console.error(`Could not read ${SITE}/sitemap.xml (HTTP ${res.status})`);
  process.exit(1);
}

const urlList = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1]
);

if (urlList.length === 0) {
  console.error("Sitemap contained no <loc> entries.");
  process.exit(1);
}

const submit = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted; 422 usually means the key file is
// not reachable at keyLocation yet.
if (submit.ok) {
  console.log(`Submitted ${urlList.length} URLs to IndexNow (${submit.status}).`);
  urlList.forEach((u) => console.log("  " + u));
} else {
  console.error(`IndexNow returned ${submit.status}: ${await submit.text()}`);
  process.exit(1);
}
