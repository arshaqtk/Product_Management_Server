import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const createSubCategorySchema = z.object({
  categoryId: z.string().min(2),
  subcategories: z.string().min(2),
});

export type CreateSubCategoryInput = z.infer<typeof createSubCategorySchema>;