import { Schema, model } from "mongoose";
import Category from "./enums/Category.js";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: Object.values(Category),
  },
});

export default model("Product", productSchema);
