import { Request, Response, NextFunction } from "express";
import * as wishlistService from "./wishlist.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { isValidObjectId } from "mongoose";

export const addToWishlist = asyncHandler(async (req: any, res: Response) => {

    const { productId } = req.body;
    if(!productId||!isValidObjectId(productId)){
      throw new Error("Product ID is required");
    }
    const userId = req.user.userId;
    const wishlist = await wishlistService.addToWishlist(
      userId,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
      data: wishlist
    });

})

export const removeFromWishlist = asyncHandler(async (req: any, res: Response) => {

    const { productId } = req.params;
    const userId = req.user.userId;
    const wishlist = await wishlistService.removeFromWishlist(
      userId,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      data: wishlist
    });

})

export const getWishlist = asyncHandler(async (req: any, res: Response) => {
 
    const wishlist = await wishlistService.getWishlist(req.user.userId);

    res.status(200).json({
      success: true,
      data: wishlist
    });
})