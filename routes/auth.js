const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateStatus,
} = require("../controllers/auth");
const { auth } = require("../middleware/authMiddleware");
const { userValidation } = require("../middleware/userValidation");
// const { updateStatus } = require("../controllers/user");

const authRouter = express.Router();

authRouter.post("/signup", userValidation, register);
authRouter.post("/login", userValidation, login);
authRouter.get("/current", auth, getCurrent);
authRouter.post("/logout", auth, logout);
authRouter.patch("/", auth, updateStatus);

module.exports = authRouter;
