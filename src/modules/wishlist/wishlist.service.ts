import { IProduct } from "../product/product.model";
import { productResponse } from "../product/product.types";
import { Wishlist } from "./wishlist.model";
import mongoose from "mongoose";

type ProductId = mongoose.Types.ObjectId;

export const addToWishlist = async (userId: string, productId: ProductId) => {
    return await Wishlist.findOneAndUpdate(
        { userId },
        { $addToSet: { products: productId } },      // add product only if not already in array
        {
            new: true,    // return the updated document instead of the original
            upsert: true  // if no wishlist found for this user, create one automatically
        }
    );
};


export const removeFromWishlist = async (userId: string, productId: ProductId) => {
    return await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { products: productId } },
        { new: true }
    );
};


export const getWishlist = async (userId: string) => {
    const wishlist = await Wishlist.findOne({ userId })
        .populate({
            path: "products",
            select: "title categoryId subcategory images variants"
        })
        .lean();

    if (!wishlist) return [];

    const formatted = (wishlist.products as unknown as IProduct[]).map((product) => {
        const minPrice = Math.min(...product.variants.map((v) => v.price));

        return {
            _id: product._id,
            title: product.title,
            categoryId: product.categoryId,
            subcategory: product.subcategory,
            image: product.images?.[0],
            price: minPrice
        };
    });

    return formatted;
};