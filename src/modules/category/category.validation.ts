import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  subcategories: z.array(z.string()).optional()
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;