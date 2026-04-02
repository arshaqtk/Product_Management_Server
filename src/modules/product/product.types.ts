import { IVariant } from "./product.model";

export interface CreateProductInput {
  categoryId: string;
  subcategory: string;
  variants: any[];
  [key: string]: any;
}

export interface GetProductsQuery {
  search?: string;
  categoryId?: string;
  subcategory?: string;
  page?: string | number;
  limit?: string | number;
}



export interface productResponse {
  _id: string;
  title: string;
  categoryId: string;
  subcategory: string;
  image: string;
  price: number;
  variants: IVariant[];
}