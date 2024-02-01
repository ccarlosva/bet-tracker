const { constants } =require("../constants.js")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 502;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ 
                title: "Validation Error", 
                Message: err.message, 
                stackTrace: err.stack 
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                Message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                Message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                Message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: "Internal Server Error",
                Message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.json({
                title: "502",
                Message: err.message,
                stackTrace: err.stack
            });
        break;
    }
};

module.exports = errorHandler