import apiError from "../utils/apiError";
import asyncHandle from "../utils/asyncHandle";
import { verifyAccessToken } from "../utils/auth";

const auth = asyncHandle( async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new apiError(401, "Access token is required");
    }
    const token = authHeader.split(" ")[1];

    if(!token){
        throw new apiError(401, "Access token is required");
    }
    let decoded = verifyAccessToken(token);
    if(!decoded){
        throw new ApiError(401, "Invalid or expired access token");
    }
    const user = await userModel.findById(decoded.id);
    if(!user){
        throw new ApiError(401, "User not found");
    }
    req.user = user;
    next();
})

export default auth;