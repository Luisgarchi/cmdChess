const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class Bishop extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Bishop : chessPieces.black.Bishop 

        // Define the movement mechanics as a vector (magnitude & direction)
        // Bishops move along the diagonal
        const movement = [  
                            [1, 1],         // Vector for moving Bishop North East 
                            [1, -1],        // Vector for moving Bishop North West 
                            [-1, 1],        // Vector for moving Bishop South East 
                            [-1, -1]        // Vector for moving Bishop South West 
                        ]

        // Bishops can move any amount of squares along a diagonal
        const movementRestricted = false       

        // Set the Bishop properties in the superclass
        super('Bishop', colour, symbol, position, movement, movementRestricted)


        /* SET PROPERTIES FOR CURRENT Bishop CLASS */

        // Points of materials the piece is worth
        this.points = 3

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Bishop