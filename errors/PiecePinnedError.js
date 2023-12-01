class PiecePinnedError extends Error {

    constructor(piece, pinnedAlongType, pinNumber){

        // the pinVector describes the direction the piece is pinned along 
        // either 'Rank', 'File' or 'Diagonal'

        // Error requires a Piece object 
        super(`${piece.type} can not be moved because it is pinned along the ${pinnedAlongType} ${pinNumber}\n`)
    }
}

module.exports = PiecePinnedError