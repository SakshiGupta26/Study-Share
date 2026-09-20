import Note from "../models/Notes.model";
import asyncHandle from "../utils/asyncHandle";

export const getStats = asyncHandle( async (req,res) => {
    const [approvedNotes,downloadResult,users,subjects] = await Promise.all([
        Note.countDocuments({status : "approved"}),
    
    Note.aggregate([
        { $match : {status:"approved"}},
        {
            $group: {
                _id: null,
                totalDownload: { $sum : "downloads"},
            }
        }
    ]),
    User.countDocuments(),
    Note.distinct("subject",{status:"approved"}),
     ]);
    
     return res.status(200).json({
        success:true,
        data : {
            approvedNotes,
            totalDownload: downloadResult[0]?.totalDownload || 0,
            users,
            distinctSubjects : subjects.length
        }
     })
})

