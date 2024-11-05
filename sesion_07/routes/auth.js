const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email: rawEmail, password } = req.body; // TODO: Falta express-validator

  const email = normalizeEmail(rawEmail);

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials." });
  }

  const authenticated = await user.checkPassword(password);

  if (authenticated) {
    const token = jwt.sign(
      { sub: user._id, name: user.name, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ sucess: true, token });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials." });
});

router.post("/signup", async (req, res) => {
  const { email: rawEmail, password, name } = req.body;

  const email = normalizeEmail(rawEmail);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists." });
  }

  const user = await User.create({ email, password, name });

  return res.status(201).json({
    success: true,
    message: `User with ID ${user._id} has been created.`,
  });
});

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

module.exports = router;
