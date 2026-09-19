
import userModel from "../models/User.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandle from "../utils/asyncHandle.js";
import { generateToken, verifyRefreshToken  } from "../utils/auth.js";

export const registerUser = asyncHandle(async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    throw new ApiError(409, "User already exists");
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
  });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    accessToken,
  });
});

export const loginUser = asyncHandle(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
  });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    accessToken,
  });
});

export const refreshController = asyncHandle(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(
      401,
      "Unauthorized, invalid or expired refresh token"
    );
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await userModel.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "Unauthorized, user not found");
  }

  if (refreshToken !== user.refreshToken) {
    user.refreshToken = null;
    await user.save();

    throw new ApiError(401, "Unauthorized, refresh token mismatch");
  }

  const { accessToken, refreshToken: newRefreshToken } = generateToken({
    userId: user._id,
  });

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    accessToken,
  });
});

export const logoutUser = asyncHandle(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await userModel.findById(decoded.id);

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});