CREATE TABLE "pastes" (
	"id" text PRIMARY KEY NOT NULL,
	"short_id" text NOT NULL,
	"content" text NOT NULL,
	"title" text,
	"is_public" integer DEFAULT 1 NOT NULL,
	"password_hash" text,
	"delete_token" text NOT NULL,
	"expires_at" timestamp with time zone,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pastes_short_id_unique" UNIQUE("short_id")
);
