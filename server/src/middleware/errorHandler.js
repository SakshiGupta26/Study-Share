const errorHandle = (err,req,res,next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if(err.name === "CastError") {
        statusCode = 400;
        message = "Invalid MONGODB ID"
    }
    else if(err.code === 11000){
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0];
        message = `${field || "Data"} already exists`
    }
    else if(err.name === "MulterError"){
        statusCode = 400;
        message = err.message || "File upload error";
    }
    else if(err.name === "TokenExpiredError"){
        statusCode = 401;
        message = "Token expired";
    }
    else if(err.name === "JsonWebTokenError"){
        statusCode = 401;
        message = "Invalid token";
    }
    else if(!err.statusCode){
        statusCode = 500;
        message = "Internal Server Error";
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandle;