# Seclob Product Management Backend

A robust Node.js/Express backend built with TypeScript, managing authentication, products, categories, and wishlists.

## 🚀 Technologies

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **File Upload**: Multer + Cloudinary
- **Authentication**: JWT (JSON Web Tokens) with Cookies
- **Validation**: Zod
- **Logging**: Morgan

## 📦 Features

- **Authentication**: Secure login/signup with password hashing and JWT-based session management.
- **Category Management**: Hierarchical categories and subcategories.
- **Product Management**: 
    - Full CRUD operations.
    - Advanced filtering (by category, subcategory, and text search).
    - Variant support (e.g., RAM size, price, and stock per variant).
    - Multi-image upload and hosting.
- **Wishlist**: User-specific wishlist management (add/remove/fetch).
- **Security**: CORS protection, cookie-based tokens, and global error handling.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB connection string
- Cloudinary credentials

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (create a `.env` file):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### Running the App

- **Development**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

## 📡 API Routes

### Auth
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |
| POST | `/api/auth/logout` | Logout user |

### Products
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/product` | Get all products (supports filters: search, categoryId, subcategory) |
| GET | `/api/product/:id` | Get single product detail |
| POST | `/api/product` | Create new product (Auth required) |
| PUT | `/api/product/:id` | Update product (Auth required) |
| DELETE | `/api/product/:id` | Delete product (Auth required) |

### Categories
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/category` | Get all categories and subcategories |
| POST | `/api/category` | Create new category (Auth required) |

### Wishlist
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/wishlist` | Get user's wishlist (Auth required) |
| POST | `/api/wishlist` | Add item to wishlist (Auth required) |
| DELETE | `/api/wishlist/:productId` | Remove item from wishlist (Auth required) |

## 🏗️ Project Structure

```text
src/
├── config/         # Database and Environment configs
├── middlewares/    # Custom middlewares (auth, error, upload)
├── modules/        # Domain logic (Auth, Product, Category, Wishlist)
│   ├── controller.ts
│   ├── model.ts
│   ├── routes.ts
│   └── service.ts
├── utils/          # Utility functions
├── app.ts          # Express app configuration
└── server.ts       # Entry point
```
