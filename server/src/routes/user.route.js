import express from "express";

import auth from "../middleware/auth.js";

import {
  getMyNotes,
  getMyProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me/notes", auth, getMyNotes);

router.get("/me", auth, getMyProfile);

export default router;