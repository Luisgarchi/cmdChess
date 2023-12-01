class InvalidNotationError extends Error {

    constructor(notation){
        super(`Invalid Syntax for ${notation} notation\n`)
    }
}

module.exports = InvalidNotationError