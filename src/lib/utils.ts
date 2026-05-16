import { nanoid } from "nanoid";
import { DELETION_TOKEN_LENGTH, SHORT_ID_LENGTH } from "./constants";
import type z from "zod";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateShortId = () => nanoid(SHORT_ID_LENGTH);
export const generateDeleteToken = () => nanoid(DELETION_TOKEN_LENGTH);

export const createStorage = <Z extends z.ZodTypeAny>(
  prefix: string,
  schema: Z,
) => {
  return {
    set: (key: string, value: z.infer<Z>) => {
      const parsed = schema.parse(value);
      try {
        localStorage.setItem(prefix + key, JSON.stringify(parsed));
      } catch (e) {
        console.error("Failed to serialize data for storage", e);
      }
    },
    get: (key: string): z.infer<Z> | null => {
      const item = localStorage.getItem(prefix + key);
      if (!item) return null;
      try {
        const parsed = JSON.parse(item);
        return schema.parse(parsed);
      } catch (e) {
        console.error("Failed to parse data from storage", e);
        return null;
      }
    },
  };
};
