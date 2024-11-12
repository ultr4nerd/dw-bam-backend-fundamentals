import { Router } from "express";
import { validationResult } from "express-validator";
import passport from "passport";
import {
  mongoIdValidationSchema,
  paginationValidationSchema,
} from "../schemas/common.js";
import {
  createProductValidationSchema,
  updateProductValidationSchema,
} from "../schemas/products.js";
import Product from "../models/Product.js";

const router = Router();

// CREATE

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createProductValidationSchema,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const product = await Product.create(req.body);

    return res.json(product);
  }
);

// READ

router.get("/", paginationValidationSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;

  const products = await Product.find().skip(startIndex).limit(limit);
  const totalProducts = await Product.countDocuments();

  return res.json({
    page,
    limit,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
    products,
  });
});

router.get("/:id", mongoIdValidationSchema, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// UPDATE

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateProductValidationSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  }
);

// DELETE

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  mongoIdValidationSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct });
  }
);

export default router;
