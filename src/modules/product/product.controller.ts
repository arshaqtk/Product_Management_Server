import { Request, Response } from "express";
import * as productService from "./product.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) {
  throw new Error("At least one product image is required");
}

  const imageUrls = files?.map(file => file.path) || [];
  if (typeof req.body.variants === "string") {
    try {
      req.body.variants = JSON.parse(req.body.variants);
    } catch (e) {
      const error: any = new Error("Invalid variants format. Must be a valid JSON string.");
      error.status = 400;
      throw error;
    }
  }
  const product = await productService.createProduct({
    ...req.body,
    images: imageUrls,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await productService.getProducts(req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getProductById =asyncHandler(async (req: Request,res: Response) => {
    const { id } = req.params;
    const product = await productService.getProductById(id as string);

    res.status(200).json({
      success: true,
      data: product
    });
})

export const getVariantDetails = asyncHandler(async (req: Request, res: Response) => {
  const { productId, ram } = req.params;

  const details = await productService.getVariantDetails(productId as string, ram as string);

  res.status(200).json({
    success: true,
    data: details
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  const files = req.files as Express.Multer.File[] | undefined;

  let imageUrls: string[] | undefined;

  if (files && files.length > 0) {
    imageUrls = files.map(file => file.path);
  }


  if (typeof req.body.variants === "string") {
    try {
      req.body.variants = JSON.parse(req.body.variants);
    } catch (e) {
      const error: any = new Error("Invalid variants format. Must be a valid JSON string.");
      error.status = 400;
      throw error;
    }
  }

  const updatedProduct = await productService.updateProduct(productId, {
    ...req.body,
    ...(imageUrls && { images: imageUrls }),
  });

  res.status(200).json({
    success: true,
    data: updatedProduct,
  });
});


export const getProductSuggestions = asyncHandler(async (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.json([]);
  }

  const keyword = q.trim();

  const suggestions = await productService.getProductSuggestions(keyword);
  res.json(suggestions);
});

