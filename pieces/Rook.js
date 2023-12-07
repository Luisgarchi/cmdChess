const ChessPiece = require('./ChessPiece')
const MoveVector = require('../MoveVector')
const {chessPieces} = require('../utils')


class Rook extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Rook : chessPieces.black.Rook 

        // Define the movement mechanics as a vector (magnitude & direction)

        // Rooks can move any amount of squares
        const movementRestricted = false

        // Rooks can not jump over pieces
        const jump = false

        // Rooks move horizonatlly or vertically along ranks and files
        const movement = [  
                            // Vector for moving Rook North
                            new MoveVector(1, 0, jump, movementRestricted),
                            // Vector for moving Rook South
                            new MoveVector(-1, 0, jump, movementRestricted),
                            // Vector for moving Rook East
                            new MoveVector(0, 1, jump, movementRestricted),
                            // Vector for moving Rook West 
                            new MoveVector(0, -1, jump, movementRestricted),        
                        ]
        

        // Set the Bishop properties in the superclass
        super('Rook', colour, symbol, position, movement)
        

        /* SET PROPERTIES FOR CURRENT Rook CLASS */

        // Points of materials the piece is worth
        this.points = 5

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Rook