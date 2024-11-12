import { checkSchema } from "express-validator";

export const mongoIdValidator = {
  in: ["params"],
  isMongoId: {
    errorMessage: "Invalid product ID format. Must be a valid MongoDB ObjectId",
  },
};

export const mongoIdValidationSchema = checkSchema({
  id: mongoIdValidator,
});

export const paginationValidationSchema = checkSchema({
  page: {
    in: ["query"],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 1 },
      errorMessage: "Page must be a positive integer",
    },
    toInt: true,
  },
  limit: {
    in: ["query"],
    optional: { options: { nullable: true } },
    isInt: {
      options: { min: 1 },
      errorMessage: "Limit must be a positive integer",
    },
    toInt: true,
  },
});
