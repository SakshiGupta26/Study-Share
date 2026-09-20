import Note from "../models/Notes.model.js";
import userModel from "../models/User.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandle from "../utils/asyncHandle.js";

export const getMyNotes = asyncHandle(async (req, res) => {
  const notes = await Note.find({
    uploadedBy: req.user._id,
  })
    .populate("uploadedBy", "name")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Your notes fetched successfully",
    data: {
      notes,
    },
  });
});

export const getMyProfile = asyncHandle(async (req, res) => {
  const user = await userModel
    .findById(req.user._id)
    .select("name email role createdAt updatedAt");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: {
      user,
    },
  });
});