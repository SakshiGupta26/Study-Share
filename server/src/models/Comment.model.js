import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    noteReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },

    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;