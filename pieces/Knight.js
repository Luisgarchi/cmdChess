const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class Knight extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Knight : chessPieces.black.Knight 

        // Define the movement mechanics as a vector (magnitude & direction)
        // Knights move along 2 squares and then 1 square perpendicular to it
        const movement = [  
                            [2, 1], [1, 2],     // Vectors for moving Knight North East 
                            [2, -1], [1, -2],   // Vectors for moving Knight North West
                            [-2, 1], [-1, 2],   // Vectors for moving Knight South East
                            [-2, -1], [-1, -2]  // Vectors for moving Knight South West
                        ]
        
        // Knights can only "hop" one vector at a time
        const movementRestricted = true         

        // Set the Bishop properties in the superclass
        super('Knight', colour, symbol, position, movement, movementRestricted)


        /* SET PROPERTIES FOR CURRENT Knight CLASS */

        // Points of materials the piece is worth
        this.points = 3

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Knight