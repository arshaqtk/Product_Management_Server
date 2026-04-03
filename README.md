# Seclob Backend

TypeScript + Express backend for authentication, categories, products, and wishlists.

## Stack

- TypeScript
- Express
- MongoDB with Mongoose
- JWT auth with HTTP-only cookies
- Zod validation
- Cloudinary uploads via Multer
- Morgan request logging

## Features

- User signup, login, logout, refresh, and current-user lookup
- Category and subcategory management
- Product creation, listing, search suggestions, detail view, and update
- Wishlist add, remove, and fetch
- Environment validation with Zod
- Centralized auth cookie configuration

## Prerequisites

- Node.js 18+
- MongoDB connection string
- Cloudinary account credentials

## Installation

```bash
npm install
```

## Environment Variables

Create `server/.env` with:

```env
MONGO_URI=mongodb://localhost:27017/seclob
PORT=5000
NODE_ENV=development

ACCESS_SECRET=your_access_secret
REFRESH_SECRET=your_refresh_secret
ACCESS_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
COOKIE_SAME_SITE=lax
```

## Cookie Configuration

Auth cookies are configured centrally in `src/config/cookie.ts`.

- `COOKIE_SAME_SITE` must be one of `lax`, `strict`, or `none`
- `secure` cookies are enabled automatically in production
- if `COOKIE_SAME_SITE=none`, cookies are forced to `secure`

Recommended values:

- local development: `COOKIE_SAME_SITE=lax`
- same-site production frontend/backend: `COOKIE_SAME_SITE=lax` or `strict`
- cross-site production frontend/backend: `COOKIE_SAME_SITE=none`

## Scripts

```bash
npm run dev
npm run build
npm start
```

## Run Locally

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## API Base URL

All routes are prefixed with:

```text
/api
```

## Routes

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in and set auth cookies |
| POST | `/api/auth/refresh` | Refresh access and refresh tokens |
| POST | `/api/auth/logout` | Clear auth cookies |
| GET | `/api/auth/me` | Get current authenticated user |

### Category

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/category` | Fetch all categories |
| POST | `/api/category` | Create a category |
| POST | `/api/category/sub` | Add a subcategory to a category |
| GET | `/api/category/:id` | Get subcategories for a category |

### Product

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/product` | Fetch products with pagination and filters |
| GET | `/api/product/suggestions` | Fetch search suggestions |
| GET | `/api/product/:id` | Fetch product detail |
| POST | `/api/product` | Create a product with images |
| PUT | `/api/product/:id` | Update a product |

### Wishlist

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/wishlist` | Fetch the authenticated user's wishlist |
| POST | `/api/wishlist` | Add a product to wishlist |
| DELETE | `/api/wishlist/:productId` | Remove a product from wishlist |

## Project Structure

```text
src/
|-- config/
|   |-- cloudinary.ts
|   |-- cookie.ts
|   |-- db.ts
|   `-- env.ts
|-- middlewares/
|-- modules/
|   |-- auth/
|   |-- category/
|   |-- product/
|   `-- wishlist/
|-- types/
|-- utils/
|-- validators/
|-- app.ts
`-- server.ts
```

## Notes

- CORS is restricted to `CLIENT_URL` and uses credentials
- Product image uploads go through Cloudinary
- Request logging is enabled in development only
- Backend config is validated during startup, so missing required env vars will fail fast
