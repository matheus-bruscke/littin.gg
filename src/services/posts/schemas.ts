import { z } from "zod";

const multiSelectSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
  })
);

type MultiSelect = z.infer<typeof multiSelectSchema>;

const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  status: z.string(),
  headline: z.string(),
  tags: multiSelectSchema.optional(),
  cover: z.string().optional(),
});

type Post = z.infer<typeof postSchema>;

export type { MultiSelect, Post };
export { postSchema, multiSelectSchema };
