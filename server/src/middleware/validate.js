import { validationResult } from "express-validator";
import fs from "fs/promises";

const ValidationResult = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    if(req.file?.path){
      try{
        await fs.unlike(req.file.path);
      } catch (error){
         console.error("Failed to delete uploaded file:", error.message);
      }
    }
    return res.status(400).json({
      success: false,
      message: errors.array().map((error) => error.msg),
    });
  }

  next();
};

export default ValidationResult;