import { Request, Response } from "express";
import * as productService from "./product.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) {
  throw new Error("At least one product image is required");
}

  const imageUrls = files?.map(file => file.path) || [];
  if (req.body.variants) {
    req.body.variants = JSON.parse(req.body.variants);
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

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  const files = req.files as Express.Multer.File[] | undefined;

  let imageUrls: string[] | undefined;

  if (files && files.length > 0) {
    imageUrls = files.map(file => file.path);
  }


  if (req.body.variants) {
    req.body.variants = JSON.parse(req.body.variants);
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


