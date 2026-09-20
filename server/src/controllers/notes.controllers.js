import Note from "../models/Notes.model.js";
import apiError from "../utils/apiError.js";
import asyncHandle from "../utils/asyncHandle.js";

export default createNote = asyncHandle( async (req,res) => {
    if(!req.file){
        throw new apiError(400,"PDF is required");
    }
    const { title , description , subject , sem} = req.body;

    const note = await Note.create({
        title,
        description,
        subject,
        sem,
        fileUrl : `/upload/pdfs/${req.file.filename}`,
        fileName : req.file.originalname,
        fileSize : req.file.size,
        uploadBy : req.user._id
    });

    return res.status(201).json({
        success : true,
        message :  "Note uploaded successfully",
        data : {
            note,
        }
    })
})