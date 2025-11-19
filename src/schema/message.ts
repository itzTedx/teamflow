import { z } from "zod";

export const messageSchema = z.object({
  channelId: z.string("Invalid channel ID"),
  content: z.string().min(1, "Message content is required"),
  imageUrl: z.url("Invalid image URL").optional(),
});

export type MessageType = z.infer<typeof messageSchema>;
