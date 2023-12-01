class NoPieceFoundError extends Error {

    constructor(position){
        super(`No piece found at ${position} notation \n`)
    }
}

module.exports = NoPieceFoundError