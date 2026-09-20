import mongoose from "mongoose";
import Note from "../models/Notes.model";
import asyncHandle from "../utils/asyncHandle";
import apiError from "../utils/apiError";
import path from "path";

export const getPendingNotes = asyncHandle( async (req,res) => {
    const notes = await Note.find({status : "pending"})
    .populate("uploadedBy","name email")
    .sort({createdAt : -1});

    return res.status(200).json({
        success : true,
        message : "Pending notes fetched successfully",
        data : {
            notes
        }
    })
}) 

export const approvedNote = asyncHandle( async (req,res) => {
    const { id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        throw new apiError(400,"Invalid note id");
    }
    const notes = await Note.findByIdAndUpdate(id,
        {status:"approved"},
        {new : true},
    ).populate("uploadedBy","name email");

    if(!note){
        throw new apiError(404, "Note not found");
    }
    return res.status(200).json({
        success: true,
        message : "Note approved successfully",
        data : {
            note,
        }
    })
});

export const rejectNote = asyncHandle( async (req,res) => {
    const { id} = req.params;
    if(!mongoose.isValidObjectId(id)){
        throw new apiError(400,"Invalid note id");
    }
    const note = await Note.findByIdAndUpdate(
        id,
        {status : "rejected"},
        { new : true}
    ).populate("uploadedBy","name email");

    if(!note){
        throw new apiError(404,"Note not found");
    }

    return res.status(200).json({
        success : true,
        message : "Note rejected successfully",
        data : {
            note,
        }
    })
})

export const removeNote = asyncHandle( async (req,res) => {
    const { id} = req.params;

    if(mongoose.isValidObjectId(id)){
        throw new apiError(400,"Invalid note id");
    }

    const note = await Note.findById(id);

    if(!note){
        throw new apiError(404,"Note is not found");
    }

    const filePath = path.join(
        process.cwd(),
        note.fileUrl.replace(/^[/\\]+/, "")
    );
    try{
        await fs.unlink(filePath);
    }catch(error){
         console.error("Failed to delete file:", error.message);
    }
    return res.status(200).json({
        status : true,
        message : "Note deleted successfullly"
    })
})