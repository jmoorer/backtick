import { error } from "@sveltejs/kit";
import { db, tables } from "$lib/server/db";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
  const paste = await db
    .select({
      shortId: tables.pastes.short_id,
      content: tables.pastes.content,
      expiresAt: tables.pastes.expires_at,
      passwordHash: tables.pastes.password_hash,
    })
    .from(tables.pastes)
    .where((t) => eq(t.shortId, params.shortId))
    .limit(1);

  if (!paste.length) throw error(404, "Paste not found");

  const p = paste[0];

  if (p.expiresAt && p.expiresAt < new Date()) {
    throw error(410, "Paste expired");
  }

  if (p.passwordHash) {
    throw error(403, "This paste is password-protected");
  }

  return new Response(p.content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
