class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            status: 'success',
            statusCode,
            message,
            data
        });
    }

    static error(res, error, message = 'Error', statusCode = 500) {
        return res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
            error: error instanceof Error ? error.message : error
        });
    }

    static validationError(res, errors, message = 'Validation Error', statusCode = 422) {
        return res.status(statusCode).json({
            status: 'fail',
            statusCode,
            message,
            errors
        });
    }

    static notFound(res, message = 'Not Found', statusCode = 404) {
        return res.status(statusCode).json({
            status: 'fail',
            statusCode,
            message
        });
    }
}

export default ApiResponse;
