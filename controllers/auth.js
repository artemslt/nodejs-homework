const User = require("../db/user");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`User with ${email} already exist`);
    }

    const hash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const savedUser = await User.create({
      email,
      password: hash,
      avatarURL,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const storedUser = await User.findOne({
      email,
    });
    console.log(storedUser);
    if (!storedUser) {
      return res.status(400).json({
        code: 400,
        message: "Invalid email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    console.log(password);
    console.log(storedUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        code: 400,
        message: "Invalid password",
      });
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    await User.findByIdAndUpdate(storedUser._id, { token });

    return res.json({
      data: {
        token,
        user: { email, subscription: "starter" },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrent(req, res, next) {
  console.log("user", req.user);
  try {
    const { subscription, email } = req.user;
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    console.log(req.user);
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json({
      status: "success",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    console.log(req.user);
    const { _id } = req.user;
    console.log(_id);
    await User.findByIdAndUpdate(_id, { subscription: req.body.subscription });

    res.json({
      status: "success",
      message: `Subscription is updated to ${req.body.subscription}`,
    });
  } catch (error) {
    next(error);
  }
}
async function updateAvatar(req, res, next) {
  const { _id } = req.user;
  const { filename, originalname } = req.file;

  const user = await User.findById(_id);

  const avatarName = `${_id}_${originalname}`;

  try {
    const tmpPath = path.resolve(__dirname, "../tmp", filename);

    const publicPath = path.resolve(__dirname, "../public/avatars", avatarName);
    try {
      const image = await Jimp.read(tmpPath);
      await image.resize(250, 250);
      await image.writeAsync(publicPath);
    } catch (error) {
      next(error);
    } finally {
      await fs.unlink(tmpPath);
    }

    user.avatarURL = `/avatars/${avatarName}`;
    await user.save();

    return res.json({
      data: {
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateStatus,
  updateAvatar,
};
