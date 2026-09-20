import { body } from "express-validator";

export const noteValidator = [
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("sem").notEmpty().withMessage("Sem is required").isInt({min : 1,max : 8}).withMessage("Sem must be between 1 and 8")
]