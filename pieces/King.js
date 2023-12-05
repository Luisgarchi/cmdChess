const ChessPiece = require('./ChessPiece')
const MoveVector = require('../MoveVector')
const {chessPieces} = require('../utils')


class King extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.King : chessPieces.black.King 

        // Define the movement mechanics as a vector (magnitude & direction)
        
        // Kings can move one square
        const movementRestricted = true

        // Kings move horizonatlly, vertically and along diagonals
        const movement = [  
                            // Vector for moving King North
                            new MoveVector(1, 0, movementRestricted),
                            // Vector for moving King South
                            new MoveVector(-1, 0, movementRestricted),
                            // Vector for moving King East
                            new MoveVector(0, 1, movementRestricted),
                            // Vector for moving King West 
                            new MoveVector(0, -1, movementRestricted),
                            // Vector for moving King North East
                            new MoveVector(1, 1, movementRestricted),
                            // Vector for moving King North West
                            new MoveVector(1, -1, movementRestricted),
                            // Vector for moving King South East
                            new MoveVector(-1, 1, movementRestricted),
                            // Vector for moving King South West
                            new MoveVector(-1, -1, movementRestricted)
                        ]

        // Set the Bishop properties in the superclass
        super('King', colour, symbol, position, movement)

        
        /* SET PROPERTIES FOR CURRENT King CLASS */
    }

}

module.exports = King