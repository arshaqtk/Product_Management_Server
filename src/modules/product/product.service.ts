import { Product } from "./product.model";
import { Category } from "../category/category.model";
import { CreateProductInput, GetProductsQuery } from "./product.types";


export const createProduct = async (data: CreateProductInput) => {
  const { categoryId, subcategory, variants } = data;

  // Validate category
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }

  const existingProduct = await Product.findOne({
  title: data.title,
  categoryId: data.categoryId,
  subcategory: data.subcategory.toLowerCase().trim(),
});

if (existingProduct) {
  throw new Error("Product already exists in this category");
}

  // Normalize subcategory
  const normalizedSub = subcategory.toLowerCase().trim();

  const isValidSubcategory = category.subcategories.some(
    (sub: string) => sub.toLowerCase() === normalizedSub
  );

  if (!isValidSubcategory) {
    throw new Error("Invalid subcategory for this category");
  }

  // Validate variants
  if (!variants || variants.length === 0) {
    throw new Error("At least one variant is required");
  }

  // Normalize before saving
  data.subcategory = normalizedSub;

  const product = await Product.create(data);
  return product;
};

export const getProducts = async (query: GetProductsQuery) => {
  let { search, categoryId, subcategory, page = 1, limit = 10 } = query;
console.log(query)
  // Normalize pagination
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;

  const filter: any = {};

  // Search (case-insensitive)
  if (search) {
    filter.title = { $regex: search.trim(), $options: "i" };
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  if (subcategory) {
    filter.subcategory = subcategory.toLowerCase().trim();
  }

  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const updateProduct = async (productId: string, data: any) => {

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Validate category
  if (data.categoryId) {
    const category = await Category.findById(data.categoryId);
    if (!category) {
      throw new Error("Category not found");
    }

    // validate subcategory if provided
    if (data.subcategory) {
      const isValidSub = category.subcategories.some(
        (sub: string) =>
          sub.toLowerCase() === data.subcategory.toLowerCase().trim()
      );

      if (!isValidSub) {
        throw new Error("Invalid subcategory for this category");
      }
    }
  }

  // Duplicate check (if title changed)
  if (data.title) {
    const existing = await Product.findOne({
      _id: { $ne: productId },
      title: { $regex: `^${data.title.trim()}$`, $options: "i" },
      categoryId: data.categoryId || product.categoryId,
      subcategory:data.subcategory.toLowerCase().trim()||product.subcategory,
    });

    if (existing) {
      throw new Error("Product with same title already exists");
    }
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: data },
    { new: true, runValidators: true }
  );

  return updatedProduct;
};