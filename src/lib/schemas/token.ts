import { DELETION_TOKEN_LENGTH } from "$lib/constants";
import z from "zod";

export const tokenSchema = z.object({
  deletionToken: z
    .string()
    .length(DELETION_TOKEN_LENGTH, "Invalid deletion token"),
  createdAt: z.number(),
});

export type Token = z.infer<typeof tokenSchema>;
