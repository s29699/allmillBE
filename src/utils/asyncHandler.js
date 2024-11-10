const asyncHandler = (fnToBeWrappedAndReturned) => {
    return (req, res, next) => {
        Promise
        .resolve(fnToBeWrappedAndReturned(req, res, next))
        .catch((error) => next(error))
    }
}

export {asyncHandler}