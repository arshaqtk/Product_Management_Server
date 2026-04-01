import mongoose, { Document, Schema } from "mongoose";

interface IVariant {
  ram: string;
  price: number;
  qty: number;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  subcategory: string;
  variants: IVariant[];
  images: string[];
}

const variantSchema = new Schema<IVariant>({
  ram: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true }
});

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    subcategory: { type: String, required: true },

    variants: [variantSchema],

    images: [{ type: String }]
  },
  { timestamps: true }
);
productSchema.index({ title: 1, categoryId: 1, subcategory: 1 },{ unique: true });
export const Product = mongoose.model<IProduct>("Product", productSchema);
