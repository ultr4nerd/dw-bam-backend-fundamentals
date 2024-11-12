import { checkSchema } from "express-validator";
import Product from "../models/Product.js";
import Category from "../models/enums/Category.js";
import { mongoIdValidator } from "./common.js";

export const createProductValidationSchema = checkSchema({
  name: {
    trim: true,
    escape: true,
    custom: {
      options: async (name) => {
        const productExists = await Product.findOne({
          name: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (productExists) {
          throw new Error("Product with that name already exists.");
        }
      },
      bail: true,
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Name must be at least 2 characters long.",
    },
    in: ["body"],
    exists: { errorMessage: "Product name is required." },
  },
  price: {
    exists: { errorMessage: "Price is required." },
    isFloat: {
      options: { min: 0.0 },
      errorMessage: "Price must be a positive number.",
    },
    in: ["body"],
  },
  stock: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Stock must be a non-negative integer.",
    },
    in: ["body"],
  },
  category: {
    exists: { errorMessage: "Category is required." },
    isIn: {
      options: [Object.values(Category)],
      errorMessage: `Category is invalid. Options are ${Object.values(Category)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
});

export const updateProductValidationSchema = checkSchema({
  id: mongoIdValidator,
  name: {
    optional: true,
    trim: true,
    escape: true,
    custom: {
      options: async (name, { req }) => {
        const productExists = await Product.findOne({
          _id: { $ne: req.params.id },
          name: { $regex: new RegExp(`^${name}$`, "i") },
        });

        if (productExists) {
          throw new Error("Product with that name already exists.");
        }
      },
      bail: true,
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Name must be at least 2 characters long.",
    },
    in: ["body"],
  },
  price: {
    optional: true,
    isFloat: {
      options: { min: 0.0 },
      errorMessage: "Price must be a positive number.",
    },
    in: ["body"],
  },
  stock: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "Stock must be a non-negative integer.",
    },
    in: ["body"],
  },
  category: {
    optional: true,
    isIn: {
      options: [Object.values(Category)],
      errorMessage: `Category is invalid. Options are ${Object.values(Category)
        .map((v) => `'${v}'`)
        .join(", ")}`,
    },
    trim: true,
    in: ["body"],
  },
});
