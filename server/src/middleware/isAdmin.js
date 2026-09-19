import apiError from "../utils/apiError";

const isAdmin = (req,res,next) => {
    if(!req.user || req.user.role !== "admin"){
        throw new apiError(403, "Access denied. Admin only.");
    }
    next();
};

export default isAdmin;