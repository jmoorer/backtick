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

/** Formats a Date as "May 10, 2026" or "May 10, 2026, 3:42 PM" when `time` is true. */
export function formatDate(date: Date, time = false): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(time && { hour: "numeric", minute: "2-digit" }),
  });
}

/** Returns a compact TTL label for a paste's expiry date.
 *  null → "∞"  |  past → "expired"  |  future → "6d" / "23h" / "45min" */
export function formatTtl(expiresAt: Date | null): string {
  if (!expiresAt) return "∞";
  const ms = expiresAt.getTime() - Date.now();
  if (ms <= 0) return "expired";
  const min = Math.floor(ms / 60_000);
  const h = Math.floor(ms / 3_600_000);
  const d = Math.floor(ms / 86_400_000);
  if (d >= 1) return `${d}d`;
  if (h >= 1) return `${h}h`;
  return `${min}min`;
}
export function getContentLength(content: string) {
  const bytes = new TextEncoder().encode(content).byteLength;
  return formatBytes(bytes);
}
export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
