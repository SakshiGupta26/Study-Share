import express from "express";

import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  approveNote,
  rejectNote,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(auth);
router.use(isAdmin);

router.patch("/notes/:id/approve", approveNote);
router.patch("/notes/:id/reject", rejectNote);

export default router;