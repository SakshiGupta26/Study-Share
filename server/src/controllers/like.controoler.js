import mongoose from "mongoose";
import asyncHandle from "../utils/asyncHandle";
import apiError from "../utils/apiError";

export const toggleLike = asyncHandle( async (req,res) => {
    const { id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        throw new apiError(400,"Invalid note id");
    }

    const note = await Note.findById(id);

    if(!note){
        throw new apiError(404,"Note not found");
    }

    const userId = req.user._id;
    const alreadyLike = note.likes.some(
        (like) => like.toString() === userId.toString()
    )
    if(alreadyLike){
        note.likes.pull(userId);
    } else{
        note.likes.push(userId);
    }
    await note.save();

    return res.status(200).json({
        success : true,
        message : alreadyLike? "Note unliked successfully" : "Note liked successfully",
        data : {
            likeCount : note.likes.length,
            likeByUser : !alreadyLike
        },
    });
})

