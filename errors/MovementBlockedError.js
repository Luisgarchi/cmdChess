class MovementBlockedError extends Error {

    constructor(pieceToMove, pieceBlocking, startSquare, targetSquare){

        // Error requires a Piece object 
        super(`${pieceToMove.colour} ${pieceToMove.type} on ${pieceToMove.position} is blocked from moving to ${targetSquare} by the ${pieceBlocking.colour} ${pieceBlocking.type} on ${pieceBlocking.position}\n`)
    }
}

module.exports = MovementBlockedError