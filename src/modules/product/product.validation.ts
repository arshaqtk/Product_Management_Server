import { z } from "zod";
import { objectIdSchema } from "../../validators/common.validator";

export const createProductSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(2, "Title must be at least 2 characters long"),

  description: z.string().optional(),

  categoryId: objectIdSchema.refine(
    (val) => val,
    { message: "Invalid category ID" }
  ),

  subcategory: z
    .string({ message: "Subcategory is required" })
    .min(1, "Subcategory cannot be empty"),

  variants: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        throw new Error("Variants must be valid JSON");
      }
    }
    return val;
  },
    z.array(
      z.object({
        ram: z
          .string({ message: "RAM is required" })
          .min(1, "RAM cannot be empty"),

        price: z.preprocess(
          (val) => Number(val),
          z.number({ message: "Price must be a number" })
            .positive("Price must be greater than 0")
        ),

        qty: z.preprocess(
          (val) => Number(val),
          z.number({ message: "Quantity must be a number" })
            .int("Quantity must be an integer")
            .min(0, "Quantity cannot be negative")
        ),
      })
    ).min(1, "At least one variant is required")
  ),
});


export const updateProductSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters long")
    .optional(),

  description: z.string().optional(),

  categoryId: objectIdSchema.optional(),

  subcategory: z
    .string()
    .min(1, "Subcategory cannot be empty")
    .optional(),

  variants: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        throw new Error("Variants must be valid JSON");
      }
    }
    return val;
  },
    z.array(
      z.object({
        ram: z.string().min(1, "RAM cannot be empty"),
        price: z.preprocess(
          (val) => Number(val),
          z.number().positive("Price must be greater than 0")
        ),
        qty: z.preprocess(
          (val) => Number(val),
          z.number().int().min(0, "Quantity cannot be negative")
        ),
      })
    ).optional()
  ),
});