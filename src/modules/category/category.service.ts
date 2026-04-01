import { Category } from "./category.model";
import { CreateCategoryInput } from "./category.validation";

export const createCategory = async (data: CreateCategoryInput) => {
  const existing = await Category.findOne({ name: data.name });

  if (existing) {
    throw new Error("Category already exists");
  }

  const category = await Category.create(data);
  return category;
};

export const getCategories = async () => {
  return await Category.find();
};

export const getSubCategories = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category.subcategories;
};