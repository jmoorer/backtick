import { query, command } from "$app/server";

import { EXPIRY_MS, PasteFormDataSchema } from "$lib/schemas/paste";
import { z } from "zod";
import { db, tables } from "./server/db";
import { nanoid } from "nanoid";
import { deriveTitle, generateDeleteToken, generateShortId } from "./utils";
import { eq } from "drizzle-orm";
import { ExpiredError, NotFoundError } from "./errors";

// export const pastes = query(() => listPastes());

export const getPaste = query(z.string(), async (id) => {
  const paste = await db.query.pastes.findFirst({
    where: (x) => eq(x.short_id, id),
  });
  if (!paste) {
    throw new NotFoundError("paste", id);
  }
  if (paste.expires_at && paste.expires_at < new Date()) {
    throw new ExpiredError(id);
  }
  return paste;
});

export const createPaste = command(PasteFormDataSchema, async (data) => {
  const expiredIn = EXPIRY_MS[data.expiry] ?? null;
  const title = deriveTitle(data.content) ?? data.title ?? "Untitled";
  try {
    const result = await db
      .insert(tables.pastes)
      .values({
        id: crypto.randomUUID(),
        short_id: generateShortId(),
        content: data.content,
        title,
        expires_at: expiredIn ? new Date(Date.now() + expiredIn) : null,
        created_at: new Date(),
        updated_at: new Date(),
        delete_token: generateDeleteToken(),
      })
      .returning();
    if (result.length === 0) throw new Error("Failed to create paste");
    return result[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const remove = command(z.string(), (id) => {
  //   const deleted = deletePaste(id);
  //   if (!deleted) throw new Error(`Paste ${id} not found`);``
});
