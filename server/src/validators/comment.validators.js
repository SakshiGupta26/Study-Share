import { body } from "express-validator";

export const commentValidator = [
    body("text").trim().notEmpty().withMessage("Comment text is required"),
    
]