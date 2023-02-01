const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateStatus,
  updateAvatar,
} = require("../controllers/auth");
const { auth } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/mutler");
const { userValidation } = require("../middleware/userValidation");

const authRouter = express.Router();

authRouter.post("/signup", userValidation, register);
authRouter.post("/login", userValidation, login);
authRouter.get("/current", auth, getCurrent);
authRouter.post("/logout", auth, logout);
authRouter.patch("/", auth, updateStatus);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = authRouter;
