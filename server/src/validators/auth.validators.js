import { body } from "express-validator";

export const registerValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().notEmpty().withMessage("Email is require").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required").isLength({min : 6}).withMessage("Password must be at least 6 characters"),
];

export const LoginValidator = [
    body("email").trim("").notEmpty().withMessage("Email is required").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
];