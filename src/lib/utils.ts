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

/**
 * Derives a display title from raw markdown content.
 *
 * Resolution order:
 *   1. First ATX heading (# through ######)
 *   2. First non-empty, non-heading line (truncated to 80 chars)
 *   3. null — no usable content
 *
 * Inline markdown (bold, italic, code, links, images) is stripped
 * so the title reads as clean plain text in the feed.
 */

const HEADING_RE = /^#{1,6}\s+(.+)$/m;

const INLINE_RULES: [RegExp, string][] = [
  [/!\[.*?\]\(.*?\)/g, ""], // images  (before links)
  [/\[(.+?)\]\(.*?\)/g, "$1"], // links   → keep label
  [/\*\*\*(.+?)\*\*\*/g, "$1"], // bold+italic
  [/\*\*(.+?)\*\*/g, "$1"], // bold
  [/\*(.+?)\*/g, "$1"], // italic
  [/___(.+?)___/g, "$1"], // bold+italic (underscores)
  [/__(.+?)__/g, "$1"], // bold
  [/_(.+?)_/g, "$1"], // italic
  [/~~(.+?)~~/g, "$1"], // strikethrough
  [/`(.+?)`/g, "$1"], // inline code
];

function stripInlineMarkdown(text: string): string {
  let result = text;
  for (const [pattern, replacement] of INLINE_RULES) {
    result = result.replace(pattern, replacement);
  }
  return result.trim();
}

export function deriveTitle(markdown: string): string | null {
  if (!markdown || !markdown.trim()) {
    return null;
  }

  // 1 — First ATX heading
  const headingMatch = markdown.match(HEADING_RE);
  if (headingMatch) {
    const raw = headingMatch[1].trim();
    const clean = stripInlineMarkdown(raw);
    return clean.slice(0, 255) || null;
  }

  // 2 — First non-empty line
  const firstLine = markdown
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0 && !l.startsWith("```"));

  if (firstLine) {
    const clean = stripInlineMarkdown(firstLine);
    return clean.slice(0, 80) || null;
  }

  // 3 — Nothing usable
  return null;
}
