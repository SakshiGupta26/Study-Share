import Note from "../models/Notes.model";
import apiError from "../utils/apiError";
import asyncHandle from "../utils/asyncHandle";

export const getMyNotes = asyncHandle( async (req,res) => {
    const notes = await Note.find({
        uploadedBy : req.user._id,
    }).populate("uploadedBy","name")
    .sort({ createAt : -1});

    if(!notes){
        throw new apiError(404,"Notes not found")
    }
    return res.status(200).json({
        success : true,
        message : "Your notes fetched successfully",
        data : {
            notes,
        }
    })
})

export const getMyProfile = asyncHandle(async (req,res) => {
    const user = await userModel.findById(req.user._id)
    .select("name email role createAt uploadedAt");

    if(!user){
        throw new apiError(404,"User not found")
    }

    return res.status(200).json({
        success: true,
        message : "Profile fetched successfully",
        data : {
            user,
        }
    })
})