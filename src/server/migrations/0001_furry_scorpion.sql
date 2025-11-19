CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"image_url" text,
	"author_id" text NOT NULL,
	"author_email" text NOT NULL,
	"author_name" text NOT NULL,
	"author_avatar" text NOT NULL,
	"channel_id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "messages_author_id_idx" ON "messages" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "messages_author_email_idx" ON "messages" USING btree ("author_email");--> statement-breakpoint
CREATE INDEX "messages_channel_id_idx" ON "messages" USING btree ("channel_id");