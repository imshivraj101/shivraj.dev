import { notFound } from "next/navigation";

/* IndexNow verification: the protocol expects a file at
   /<key>.txt whose body is the key itself. Served dynamically from
   the env var so the key never lands in the repo. Any other path
   falls through to a 404, so this catch-all stays inert. */

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const key = process.env.INDEXNOW_KEY;
  const { indexnow } = await params;

  if (!key || indexnow !== `${key}.txt`) notFound();

  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
