import { Category } from "./category.model";
import { CreateCategoryInput, CreateSubCategoryInput } from "./category.validation";

export const createCategory = async (data: CreateCategoryInput) => {
  const existing = await Category.findOne({name:{$regex:`^${data.name}$`,$options:"i"}});

  if (existing) {
    throw new Error("Category already exists");
  }
  
  const category = await Category.create({name:data.name,subcategories:[]});
  return category;
};

export const getCategories = async () => {
  return await Category.find();
};

export const createSubCategory = async (data: CreateSubCategoryInput) => {
  const category = await Category.findById(data.categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  const subCategoryName = data.subcategories.toLowerCase().trim();

  const isExists = category.subcategories.some(
    (sub: string) => sub.toLowerCase() === subCategoryName
  );

  if (isExists) {
    throw new Error("Subcategory already exists");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    data.categoryId,
    { $push: { subcategories: subCategoryName } },
    { new: true }
  );

  return updatedCategory;
};

export const getSubCategories = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category.subcategories;
};