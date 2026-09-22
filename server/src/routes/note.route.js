import express from "express";

import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { noteValidator } from "../validators/note.validators.js";
import ValidationResult from "../middleware/validate.js";
import { createNote } from "../controllers/note.controller.js";

const router = express.Router();

router.post(
  "/notes",
  auth,
  upload.single("file"),
  noteValidator,
  ValidationResult,
  createNote
);

export default router;