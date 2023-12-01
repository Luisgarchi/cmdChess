class PieceMovementError extends Error {

    constructor(piece){

        // Error requires a Piece object 
        super(`Invalid movement for piece of type ${piece.type} at position ${piece.position}\n`)
    }
}

module.exports = PieceMovementError