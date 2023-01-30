const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const item = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      unique: true,
      required: [true, "User name required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email required"],
    },
    phone: {
      type: String,
      default: false,
      unique: true,
      required: [true, "User phone required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const contact = mongoose.model("contact", item);

module.exports = contact;
