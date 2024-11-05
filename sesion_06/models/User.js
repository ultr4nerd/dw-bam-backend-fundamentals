const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { encrypt, decrypt } = require("../utils/security");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: false,
      get: (v) => (v ? decrypt(v) : null),
      set: (v) => (v ? encrypt(v) : null),
    },
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function () {
  if (this.isModified("password") || (this.isNew && this.password)) {
    this.password = await this.model("User").hashPassword(this.password);
  }
});

module.exports = mongoose.model("User", userSchema);
