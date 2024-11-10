class ApiError extends Error{
    constructor(
        statusCode,
        message = " Default error message",
        errors = [],
    ){
        //yaha message kyu pass kiye pata karna, baaki sab kyu nahi
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
    }
}

export {ApiError}