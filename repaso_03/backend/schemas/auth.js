import { checkSchema } from "express-validator";
import User from "../models/User.js";

export const loginValidationSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
    normalizeEmail: true,
    exists: {
      errorMessage: "Email is required",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    exists: {
      errorMessage: "Password is required",
    },
  },
});

export const signupValidationSchema = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
    normalizeEmail: true,
    custom: {
      options: async (email) => {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email is already in use.");
        }
      },
      bail: true,
    },
    exists: {
      errorMessage: "Email is required",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
    exists: {
      errorMessage: "Password is required",
    },
  },
  name: {
    in: ["body"],
    isLength: {
      options: { min: 2 },
      errorMessage: "Name must be at least 2 characters long",
    },
    trim: true,
    escape: true,
    exists: {
      errorMessage: "Name is required",
    },
  },
});
