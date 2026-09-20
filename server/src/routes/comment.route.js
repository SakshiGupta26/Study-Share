import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.controller";
import { commentValidator } from "../validators/comment.validators";
import auth from "../middleware/auth.js";
import ValidationResult from "../middleware/validate.js";

const router = express.Router();

router.get("/notes/:noteId/comments",getComment);

router.post("/notes/:noteId/comments",auth,commentValidator,ValidationResult,addComment);

router.delete("/comments/:id",auth,deleteComment);

export default router;