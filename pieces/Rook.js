const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class Rook extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Rook : chessPieces.black.Rook 

        // Define the movement mechanics as a vector (magnitude & direction)
        // Rooks move horizonatlly or vertically along ranks and files
        const movement = [  
                            [1, 0],         // Vector for moving Rook North 
                            [-1, 0],        // Vector for moving Rook South 
                            [0, 1],         // Vector for moving Rook East 
                            [0, -1]         // Vector for moving Rook West 
                        ]

        // Rooks can move any amount along rank or file
        const movementRestricted = false

        // Set the Bishop properties in the superclass
        super(colour, symbol, position, movement, movementRestricted)
        

        /* SET PROPERTIES FOR CURRENT Rook CLASS */

        // Points of materials the piece is worth
        this.points = 5

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Rook