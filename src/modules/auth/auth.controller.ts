import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  accessTokenCookieOptions,
  clearTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../config/cookie";

export const signup =asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  
    const user = await authService.signupService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
})

export const login =asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  
    const result = await authService.loginService(req.body);

    res
  .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
  .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
  .status(200)
  .json({
    success: true,
    message: "Login successful",
    user: result.user
  });
  
})


export const refreshToken =asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  
    const token = req.cookies.refreshToken;
    if(!token){
      throw new Error("Unauthorized");
    }
    const result = await authService.refreshTokenService(token);

    res
  .cookie("accessToken", result.accessToken, accessTokenCookieOptions)
  .cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions)
    res.status(200).json({
      success: true,
      message: "Token refreshed",
      user: result.user
    });
  
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", clearTokenCookieOptions);
  res.clearCookie("refreshToken", clearTokenCookieOptions);
  
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getMeService(req.user?.id as string);
  res.status(200).json({
    success: true,
    user
  });
});
