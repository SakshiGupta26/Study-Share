import apiError from "../utils/apiError.js";

const notFound = (req,res,next) => {
    next(new apiError(404,`Route not found: ${req.originalUrl}`));
}

export default notFound;