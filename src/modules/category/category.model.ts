import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  subcategories: string[];
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    subcategories: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { timestamps: true }
);
categorySchema.index({ name: 1 });
export const Category = mongoose.model<ICategory>("Category", categorySchema);