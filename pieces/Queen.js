const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class Queen extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Queen : chessPieces.black.Queen 

        // Define the movement mechanics as a vector (magnitude & direction)
        // Queens move horizonatlly or vertically along ranks and files as well as along diagonals
        const movement = [  
                            [1,  0],         // Vector for moving Queen North
                            [-1, 0],         // Vector for moving Queen South
                            [0,  1],         // Vector for moving Queen East 
                            [0, -1],         // Vector for moving Queen West 
                            [1,  1],         // Vector for moving Queen North East
                            [1, -1],         // Vector for moving Queen North West
                            [-1, 1],         // Vector for moving Queen South East
                            [-1,-1],         // Vector for moving Queen South West
                        ]

        // Queens can move any amount along ranks, files or diagonals
        const movementRestricted = false

        // Set the Bishop properties in the superclass
        super('Queen', colour, symbol, position, movement, movementRestricted)

        
        /* SET PROPERTIES FOR CURRENT Rook CLASS */

        // Points of materials the piece is worth
        this.points = 9

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Queen