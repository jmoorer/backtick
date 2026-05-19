import { ExpiredError, NotFoundError } from "$lib/errors.js";
import { getPaste } from "$lib/pastes.remote.js";
import { db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ params }) {
  const { shortId } = params;

  const paste = await db.query.pastes.findFirst({
    where: (x) => eq(x.short_id, shortId),
  });

  if (!paste) {
    error(404, { message: "Paste not found" });
  }
  if (paste.expires_at && paste.expires_at < new Date()) {
    error(410, {
      message: `Paste "${shortId}" has expired`,
      pasteShortId: shortId,
      pasteTitle: paste.title,
      pasteCreatedAt: paste.created_at.toISOString(),
      pasteExpiresAt: paste.expires_at.toISOString(),
    });
  }
  return { paste };
}
