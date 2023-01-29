const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../db/user");

// const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw createError(401, "token type is not valid");
    }

    if (!token) {
      throw createError(401, "no token provided");
    }

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id);
      req.user = user;
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        throw createError(401, "jwt token is not valid");
      }
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { auth };
