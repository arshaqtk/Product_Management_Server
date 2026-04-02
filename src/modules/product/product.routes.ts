import { Router } from "express";
import * as productController from "./product.controller";
import { protect } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { validateObjectId } from "../../middlewares/validateObjectId.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

// Create
router.post("/",protect, upload.array("images", 5),validate(createProductSchema),productController.createProduct);

// Get all
router.get("/", productController.getProducts);

router.get("/:id",validateObjectId("id"),productController.getProductById);

//Get suggestions
router.get("/suggestions", productController.getProductSuggestions);

//Update
router.put("/:id",protect,validateObjectId("id"),upload.array("images", 5),validate(updateProductSchema),productController.updateProduct);


export default router;