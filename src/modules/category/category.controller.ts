import { Request, Response, NextFunction } from "express";
import * as categoryService from "./category.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const createCategory =asyncHandler( async (
  req: Request,
  res: Response,
) => { 
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });}
)

export const createSubCategory =asyncHandler( async (
  req: Request,
  res: Response,
) => { 
    const category = await categoryService.createSubCategory(req.body);

    res.status(201).json({
      success: true,
      message: "SubCategory added successfully",
      data: category
    });}
)

export const getCategories =asyncHandler( async (
  req: Request,
  res: Response,
) => {
    const categories = await categoryService.getCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } 
)

export const getSubCategories =asyncHandler( async (
  req: Request,
  res: Response,
) => {
    const id=req.params.id as string
    const category = await categoryService.getSubCategories(id);
    res.status(200).json({
      success: true,
      data: category
    });
  } 
)