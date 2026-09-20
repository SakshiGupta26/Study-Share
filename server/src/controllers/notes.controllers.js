import mongoose from "mongoose";
import path from "path";
import Note from "../models/Notes.model.js";
import apiError from "../utils/apiError.js";
import asyncHandle from "../utils/asyncHandle.js";
 
export const createNote = asyncHandle( async (req,res) => {
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

export const getNotes = asyncHandle( async (req,res) => {
    const { subject , sem , q, sort} = req.query;
    const page = Math.max(Number(req.query.page) || 1,1);
    const limit = Math.min(Number(req.query.limit) || 10,50);
    const skip = (page -1) * limit;

    const filter = {
        status : "approved",
    };

    if(subject){
        filter.subject = subject;
    }
    if(sem){
        filter.sem =Number(sem);
    }
    if(q) {
        filter.$or = [
            {title : { $regex : q, $options: "i"}},
            { description: { $regex: q , $options: "i"}},
        ]
    }

    const total = await Note.countDocuments(filter);
    const totalPage = Math.ceil(total / limit);

    let notes; 
    if(sort === "popular"){
        notes = await Note.aggregate([
            {$match : filter},
            {
                $addFilter: {
                    likeCount : {$size : "$likes"}
                }
            },
            {
                $sort: {
                    downloads : -1,
                    likeCount : -1,
                }
            },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "users",
                    localField: "uploadedBy",
                    foreignField: "_id",
                    as : "uploadedBy"
                }
            },
            {
                $unwind: "$uploadedBy",
            },
            {
                $project: {
                    title : 1,
                    description: 1,
                    subject : 1,
                    sem : 1,
                    fileUrl : 1,
                    fileName : 1,
                    fileSize : 1,
                    status : 1,
                    downloads:1,
                    createAt: 1,
                    uploadAt : 1,
                    uploadBy : {
                        name : "$uploadedBy.name"
                    }
                }
            }
        ])
    } else{
        notes = await Note.find(filter).populate("uploadedBy","name -_id").sort({ createAt: -1}).skip(skip).limit(limit);
    }

    return res.status(200).json({
        success : true,
        message : "Notes fetched successfully",
        data : {
            notes,
            total,
            currentPage : page,
            totalPages,  
        }
    })
})

export const getNoteById = asyncHandle( async (req,res) => {
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)){
        throw new apiError(400, "Invalid note id");
    }

    const note = await Note.findById(id).populate("uploadedBy","name");

    if(!note){
        throw new apiError(404, "Note not found");
    }

    if(note.status !== "approved"){
        const isOwner = req.user && note.uploadedBy._id.toString() === req.user._id.toString();
        const isAdmin = req.user && req.user.role === "admin";

        if(!isOwner && !isAdmin){
            throw new apiError(403, "You are not allowed to view this note");
        }
        const likeCount = note.likes.length;

        const likedByUser = req.user ? note.likes.some(
            (like) => like.toString() === req.user._id.toString()
        ) :false;
    }
    return res.status(200).json({
        success : true,
        message : "Note fetched successfully",
        data : {
             note,
             likeCount,
             likedByUser
        }
    })
})

export const downloadNote = asyncHandler( async (req,res) => {
    const { id } = req.id;

    if(!mongoose.isValidObjectId(id)){
        throw new apiError(400, "Invalid note id");
    }

    const user = await Note.findById(id);

    if(!user){
        throw new apiError(404, "Note not found");
    }

    await Note.findByIdAndUpdate(id,{
        $inc : {downloads: 1},
    })

    const filePath = path.join(
        process.cwd(),
        note.fileUrl.replaced(/^[/\\]+/, "")
    );
    return res.download(filePath,note.fileName);
})