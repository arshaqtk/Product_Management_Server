import { Router } from "express";
import * as wishlistController from "./wishlist.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validateObjectId } from "../../middlewares/validateObjectId.middleware";

const router = Router();

router.post("/", protect, wishlistController.addToWishlist);
router.delete("/:productId",protect,validateObjectId("productId"),wishlistController.removeFromWishlist);
router.get("/", protect, wishlistController.getWishlist);

export default router;