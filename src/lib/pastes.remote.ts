import { query, command } from "$app/server";

import { EXPIRY_MS, PasteFormDataSchema } from "$lib/schemas/paste";
import { z } from "zod";
import { db, tables } from "./server/db";
import { nanoid } from "nanoid";
import { generateDeleteToken, generateShortId } from "./utils";

// export const pastes = query(() => listPastes());

// export const paste = query(z.string(), (id) => getPaste(id));

export const createPaste = command(PasteFormDataSchema, async (data) => {
  const expiredIn = EXPIRY_MS[data.expiry] ?? null;
  try {
    const result = await db
      .insert(tables.pastes)
      .values({
        id: crypto.randomUUID(),
        short_id: generateShortId(),
        content: data.content,
        title: data.title,
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
