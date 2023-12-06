const ChessPiece = require('./ChessPiece')
const MoveVector = require('../MoveVector')
const {chessPieces} = require('../utils')


class Queen extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Queen : chessPieces.black.Queen 

        // Define the movement mechanics as a vector (magnitude & direction)

        // Queens can move any amount of squares
        const movementRestricted = false

        // Queens move horizonatlly or vertically along ranks and files as well as along diagonals
        const movement = [
                            // Vector for moving Queen North
                            new MoveVector(1, 0, movementRestricted),
                            // Vector for moving Queen South
                            new MoveVector(-1, 0, movementRestricted),
                            // Vector for moving Queen East
                            new MoveVector(0, 1, movementRestricted),
                            // Vector for moving Queen West 
                            new MoveVector(0, -1, movementRestricted),        
                            // Vector for moving Queen North East
                            new MoveVector(1, 1, movementRestricted),
                            // Vector for moving Queen North West
                            new MoveVector(1, -1, movementRestricted),
                            // Vector for moving Queen South East
                            new MoveVector(-1, 1, movementRestricted),
                            // Vector for moving Queen South West
                            new MoveVector(-1, -1, movementRestricted)
                        ]


        // Set the Bishop properties in the superclass
        super('Queen', colour, symbol, position, movement)

        
        /* SET PROPERTIES FOR CURRENT Queen CLASS */

        // Points of materials the piece is worth
        this.points = 9

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Queen