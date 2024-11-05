const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Rutas
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address.")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
    body("name").trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists." });
    }

    await User.create(req.body);

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().notEmpty().normalizeEmail(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Wrong credentials." });
    }

    const isMatch = await user.checkPassword(password);

    if (isMatch) {
      return res.json({
        success: true,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          cardNumber: user.cardNumber,
        },
      });
    }

    return res
      .status(400)
      .json({ success: false, error: "Wrong credentials." });
  }
);

module.exports = router;
