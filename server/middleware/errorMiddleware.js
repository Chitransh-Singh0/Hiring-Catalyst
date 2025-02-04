// ERROR middleware | Next function

const errorMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: 404,
        success: "failed",
        message: err,
    };

    if (err.name === "validationError") {
        defaultError.statusCode = 404;

        defaultError.message = Object.values(err, errors).map((el) => el.message).join(",");
    }

    // Duplicater Error
    if(err.code && err.code === 11000) {
        defaultError.statusCode = 404;
        defaultError.message = `${object.values(err.keyValue)} field has to be uniue!`;
    }


    res.status(defaultError.statusCode).json({
        success: defaultError.success,
        message: defaultError.message,
    });
};

export default errorMiddleware;