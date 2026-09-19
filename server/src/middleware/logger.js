const logger = (req,res,next) => {
    const startTimer = Date.now();

    res.on("finish",() => {
        const time = Date.now() - startTimer;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${time}ms`);
    });
    next();
}

export default logger;