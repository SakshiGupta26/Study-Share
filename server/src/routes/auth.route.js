import express from "express";

import {
  registerUser,
  loginUser,
  refreshController,
  logoutUser,
} from "../controllers/auth.controllers.js";

import {
  registerValidator,
 loginValidator,
} from "../validators/auth.validators.js";

import validate from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidator,
  validate,
  loginUser
);

router.post("/refresh", refreshController);

router.post("/logout", logoutUser);

export default router;