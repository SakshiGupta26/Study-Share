import mongoose from "mongoose";
import asyncHandle from "../utils/asyncHandle";
import Comment from "../models/Comment.model";

export const addComment = asyncHandle( async (req,res) => {
    const { noteId } = req.params;
    const { text } = req.body;
    
    if(!mongoose.isValidObjectId(noteId)){
        throw new apiError(400,"Invalid note id");
    }
    const note = await Note.findById(noteId);
    if(!note){
        throw new apiError(404,"Note not found");
    }
    const comment = await Comment.create({
        noteReference: noteId,
        userReference: req.user._id,
        text : text.trim()
    })

    const populatedComment = await comment.populate(
        "userReference",
        "name"
    );

    return res.status(201).json({
        success:true,
        message:"Comment added successfully",
        data : {
            comment : populatedComment,
        }
    })
})

export const getComment = asyncHandle( async (req,res) => {
    const { noteId} = res.params;

    if(!mongoose.isValidObjectId(noteId)){
        throw new apiError(400,"Invalid note id");
    }
    const comments = await Comment.find({
        noteReference: noteId,
    }).populate("userReference","name")
    .sort({ createdAt : -1});

    return res.status(200).json({
        success : true,
        message : "Comments fetched successfully",
        data : {
            comments,
        },
    });
});

export const deleteComment = asyncHandle( async (req,res) => {
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        throw new apiError(400,"Comment ID not found");
    }

    const comment = Comment.findById(id);

    if(!comment){
        throw new apiError(404,"Comment not found");
    }

    const isOwner = comment.userReference.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if(!isOwner && isAdmin){
        throw new apiError(403,"You are not allowed to delete this comment");
    }

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
        success : true,
        message : "Comment delete successfully"
    })
})