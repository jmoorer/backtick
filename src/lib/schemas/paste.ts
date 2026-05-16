import { z } from "zod";

export const Visibility = z.enum(["public", "private"]);
export type Visibility = z.infer<typeof Visibility>;

export const PasteSchema = z.object({
  id: z.string(),
  title: z.string().max(200).optional(),
  content: z.string().min(1).max(500_000),
  extension: z.string().max(20).optional(),
  visibility: Visibility.default("public"),
  /** Unix timestamp (ms) when the paste expires, or null for never */
  expiresAt: z.number().int().positive().nullable().default(null),
  createdAt: z.number().int().positive(),
});

export type Paste = z.infer<typeof PasteSchema>;

/** Input for creating a new paste — server assigns id/createdAt */
export const CreatePasteSchema = PasteSchema.omit({
  id: true,
  createdAt: true,
});
export type CreatePasteInput = z.infer<typeof CreatePasteSchema>;

/** Input for updating a paste */
export const UpdatePasteSchema = CreatePasteSchema.partial();
export type UpdatePasteInput = z.infer<typeof UpdatePasteSchema>;

export const EXPIRY_OPTIONS = [
  { label: "10 min", value: "10m" },
  { label: "1 hour", value: "1h" },
  { label: "1 day", value: "1d" },
  { label: "1 week", value: "1w" },
  { label: "2 weeks", value: "2w" },
  { label: "1 month", value: "1mo" },
  { label: "6 months", value: "6mo" },
  { label: "1 year", value: "1y" },
  { label: "Never", value: "never" },
] as const;

export const ExpiryOption = z.enum(EXPIRY_OPTIONS.map((o) => o.value));
export type ExpiryOption = z.infer<typeof ExpiryOption>;

/** Maps each expiry option to its duration in milliseconds (null = never expires) */
export const EXPIRY_MS: Record<ExpiryOption, number | null> = {
  "10m": 10 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
  "2w": 14 * 24 * 60 * 60 * 1000,
  "1mo": 30 * 24 * 60 * 60 * 1000,
  "6mo": 182 * 24 * 60 * 60 * 1000,
  "1y": 365 * 24 * 60 * 60 * 1000,
  never: null,
};

export const PasteFormDataSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().min(1).max(500_000),
  extension: z.string().max(20).optional(),
  visibility: Visibility.default("public"),
  password: z.string().max(100).optional(),
  expiry: ExpiryOption.default("1d"),
});

export type PasteFormData = z.infer<typeof PasteFormDataSchema>;
