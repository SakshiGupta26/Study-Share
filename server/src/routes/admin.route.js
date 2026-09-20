import express from "express";
import auth from "../middleware/auth";
import isAdmin from "../middleware/isAdmin";
import { approvedNote, rejectNote } from "../controllers/admin.controller";

const router = express.Router();

router.use(auth);
router.use(isAdmin);

router.patch("/notes/:id/approve",approvedNote);
router.patch("/notes/:id/reject",rejectNote);

export default router;