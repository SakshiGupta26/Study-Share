import { validationResult } from "express-validator";

const ValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((error) => error.msg),
    });
  }

  next();
};

export default ValidationResult;