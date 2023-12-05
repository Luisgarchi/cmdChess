const ChessPiece = require('./ChessPiece')
const MoveVector = require('../MoveVector')
const {chessPieces} = require('../utils')


class Bishop extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Bishop : chessPieces.black.Bishop 

        // Define the movement mechanics as a vector (magnitude & direction)

        // Bishops can move any amount of squares
        const movementRestricted = false       

        // Bishops only move along diagonals
        const movement = [  
                            // Vector for moving Bishop North East
                            new MoveVector(1, 1, movementRestricted),
                            // Vector for moving Bishop North West
                            new MoveVector(1, -1, movementRestricted),
                            // Vector for moving Bishop South East
                            new MoveVector(-1, 1, movementRestricted),
                            // Vector for moving Bishop South West
                            new MoveVector(-1, -1, movementRestricted)
                        ]

        // Set the Bishop properties in the superclass
        super('Bishop', colour, symbol, position, movement)


        /* SET PROPERTIES FOR CURRENT Bishop CLASS */

        // Points of materials the piece is worth
        this.points = 3

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Bishop