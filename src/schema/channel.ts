import { z } from "zod";

export const transformChannelName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const channelSchema = z.object({
  name: z
    .string()
    .min(2, "Channel name must be at least 2 characters")
    .max(72, "Channel name must be less than 72 characters")
    .transform((name, ctx) => {
      const transformed = transformChannelName(name);
      if (transformed.length < 2) {
        ctx.addIssue({
          code: "custom",
          message: "Channel name must be at least 2 characters",
        });

        return z.NEVER;
      }
      return transformed;
    }),
});

export type ChannelSchema = z.infer<typeof channelSchema>;
