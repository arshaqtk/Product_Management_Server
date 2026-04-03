import type { CookieOptions } from "express";
import { env } from "./env";

const sameSite = env.COOKIE_SAME_SITE as CookieOptions["sameSite"];
const secure = env.NODE_ENV === "production" || sameSite === "none";

if (sameSite === "none" && !secure) {
  throw new Error('COOKIE_SAME_SITE="none" requires secure cookies');
}

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  secure,
  sameSite,
};

export const accessTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: 15 * 60 * 1000,
};

export const refreshTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearTokenCookieOptions: CookieOptions = {
  ...baseCookieOptions,
};
