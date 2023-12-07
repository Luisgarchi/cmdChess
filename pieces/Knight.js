const ChessPiece = require('./ChessPiece')
const MoveVector = require('../MoveVector')
const {chessPieces} = require('../utils')


class Knight extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */

        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Knight : chessPieces.black.Knight 

        // Define the movement mechanics as a vector (magnitude & direction)

        // Knights can only "hop" one vector at a time
        const movementRestricted = true         

        /* Knights are "said" to be able to jump over pieces. 

        While there are no "discrete" (the centre of a square) squares on a chess board 
        directly along the vector a knight moves in, a knight is still able to move even 
        if boxed in by by other pieces (such as the case when a Knight is the first piece 
        to move in a chess match), therefore technically we say a Knigth can jump */
        const jump = true 

        // Knights move along 2 squares and then 1 square perpendicular to it
        const movement = [  
                            // Vectors for moving Knight North North East 
                            new MoveVector(2, 1, jump, movementRestricted), 
                            // Vectors for moving Knight North East East 
                            new MoveVector(1, 2, jump, movementRestricted), 
                            // Vectors for moving Knight North North West
                            new MoveVector(2, -1, jump, movementRestricted), 
                            // Vectors for moving Knight North West West
                            new MoveVector(1, -2, jump, movementRestricted),
                            // Vectors for moving Knight South South East
                            new MoveVector(-2, 1, jump, movementRestricted), 
                            // Vectors for moving Knight South East East
                            new MoveVector(-1, 2, jump, movementRestricted),
                            // Vectors for moving Knight South South West
                            new MoveVector(-2, -1, jump, movementRestricted),
                            // Vector for moving Knight South West West
                            new MoveVector(-1, -2, jump, movementRestricted)
                        ]
    

        // Set the Bishop properties in the superclass
        super('Knight', colour, symbol, position, movement)


        /* SET PROPERTIES FOR CURRENT Knight CLASS */

        // Points of materials the piece is worth
        this.points = 3

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Knight