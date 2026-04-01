import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { signupSchema, loginSchema } from "./auth.validator";
import { authRateLimiter } from "../../middlewares/rateLimiter.middleware";

const router = Router();

router.post("/signup",validate(signupSchema), authController.signup);
router.post("/login",authRateLimiter, validate(loginSchema), authController.login);
router.post("/refresh",authController.refreshToken);

export default router;