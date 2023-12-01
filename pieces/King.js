const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class King extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.King : chessPieces.black.King 

        // Define the movement mechanics as a vector (magnitude & direction)
        // Kings move horizonatlly or vertically along ranks and files as well as along diagonals
        const movement = [  
                            [1, 0],         // Vector for moving King North
                            [-1, 0],        // Vector for moving King South
                            [0, 1],         // Vector for moving King East 
                            [0, -1],        // Vector for moving King West 
                            [1, 1],         // Vector for moving King North East
                            [1, -1],        // Vector for moving King North West
                            [-1, 1],        // Vector for moving King South East
                            [-1, -1]        // Vector for moving King South West
                        ]

        // Kings can move one square at a time along a rank, file or diagonal
        const movementRestricted = true

        // Set the Bishop properties in the superclass
        super('King', colour, symbol, position, movement, movementRestricted)

        
        /* SET PROPERTIES FOR CURRENT King CLASS */
    }

}

module.exports = King