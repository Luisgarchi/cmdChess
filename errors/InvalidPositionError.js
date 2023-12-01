class InvalidPositionError extends Error {

    constructor(position, errorDescriptionObject){
        super(`Invalid board position ${position}\n`, errorDescriptionObject)
    }
}

module.exports = InvalidPositionError