let successResponse = (res, data) => {
    return res.status(200).json(
        {
            status: true,
            data,
            error: null
        }
    );
}

let errorResponse = (res, statusCode, error) => {
    return res.status(statusCode).json(
        {
            status: false,
            data: null,
            error
        }
    );
}

module.exports = {
    successResponse,
    errorResponse
};