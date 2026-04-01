import { Router } from "express";
import * as categoryController from "./category.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createCategorySchema } from "./category.validation";
import { protect } from "../../middlewares/auth.middleware";
import { validateObjectId } from "../../middlewares/validateObjectId.middleware";

const router = Router();

// Create category (protected)
router.post("/",protect,validate(createCategorySchema),categoryController.createCategory);

// Get all categories (public)
router.get("/", categoryController.getCategories);

// Get subcategories (public)
router.get("/:id",validateObjectId("id"),categoryController.getSubCategories);

export default router;