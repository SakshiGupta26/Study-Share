import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads/pdfs");
    },
     filename: (req, file, cb) => {
    const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
     },
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "application/pdf") {
        cb(null,true);
    } else {
        cb(new Error("Only PDF files are allowed"),false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits : {
        fileSize : 10 * 1024 * 1024,
    },
});

export default upload;