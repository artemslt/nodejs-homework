const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateStatus,
  updateAvatar,
  verify,
  resendVerifyMail,
} = require("../controllers/auth");
const { auth } = require("../middleware/authMiddleware");
const { emailValidation } = require("../middleware/emailValidation");
const { upload } = require("../middleware/mutler");
const { userValidation } = require("../middleware/userValidation");

const authRouter = express.Router();

authRouter.post("/signup", userValidation, register);
authRouter.get("/verify/:verificationToken", verify);
authRouter.get("/verify", emailValidation, resendVerifyMail);

authRouter.post("/login", userValidation, login);
authRouter.get("/current", auth, getCurrent);
authRouter.post("/logout", auth, logout);
authRouter.patch("/", auth, updateStatus);
authRouter.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = authRouter;
