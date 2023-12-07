const ChessPiece = require('./ChessPiece')
const MoveVector = require('../MoveVector')
const {chessPieces} = require('../utils')


class Pawn extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */


        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Pawn : chessPieces.black.Pawn 

        // Define the movement mechanics

        /* The direction is included since pawn movement vectors are not symetric.
        By adding this variable, it establishes the directions black and white pawns move in*/
        const direction = (colour == "white") ? 1 : -1
    
        // Pawns can not jump over pieces
        const jump = false

        // Pawns can *GENERALLY* only move along a vector once
        const movementRestricted = true

        // Lets get the correct vertical Pawn movement vector
        const verticalVector = getPawnVerticalMovement(colour, position)

        const movement = [
                            // Vector for moving Pawn vertically along files
                            verticalVector,
                            // Vector for moving Pawn diagonally capture right *
                            new MoveVector((direction * 1),  1, jump, movementRestricted),
                            // Vector for moving Pawn diagonally capture left  * 
                            new MoveVector((direction * 1),  -1, jump, movementRestricted),
        ]

        // * these apply to generic pawn captures as well as en passant.

        // Set the Pawn properties in the superclass
        super('Pawn', colour, symbol, position, movement)

    
        /* SET PROPERTIES FOR CURRENT Pawn CLASS */

        // Points of materials the piece is worth
        this.points = 1

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }


    // GETTERS 
    updatePosition(newPosition){

        // Getter that additionall updates Pawn movement mechanics
        this._position = newPosition
        this.configurePawnVerticalMovement()
    }


    getPawnVerticalMovement(colour, position) {

        // This function returns one of two possible Pawn movement vectors along a File

        // Get the direction 
        const direction = (colour == "white") ? 1 : -1
        const jump = false
        
        // A Pawn can only move 2 squares along a file if it is in it's starting rank
        const startingRank = position[1]
        if (
            // Starting rank for white Pawn is 2nd rank
            ((colour == "white") && (startingRank == '2')) || 
            // Starting rank for black Pawn is 7th rank
            ((colour == "black") && (startingRank == '7'))){

            // Define a movement vector that can move up to 2 squares vertically
            return new MoveVector((direction * 1),  0, jump, false, 2)
        }
        // otherwise return a vector that can move only 1 square vertically
        return new MoveVector((direction * 1),  0, jump, true)
    }


    configurePawnVerticalMovement(){

        // Find the current vertical movement vector for a pawn and update it 

        let index = undefined

        // Iterate over the Pawns movement vectors
        for (let i = 0;  i < this._movement.length; i++){
            const checkVector = this._movement[i]
            if ((Math.abs(checkVector.rankComponent == 1)) && 
                (checkVector.fileComponent == 0))
            index = undefined
        }

        // Set it to the appropriate vector
        this._movement[index] = this.getPawnVerticalMovement(this._colour, this._position)
    }



    reachableSquares(){

        // Method overwrites chessPiece method to include pawn movement 
        // of 2 squares from starting rank
        
        // Initialize a list where the reachable positions will be stored when found.
        const allReachablePositions = []

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < this._movement.length; i++){

            const vector     = this._movement[i]
            const vectorRank = vector.rankComponent
            const vectorFile = vector.fileComponent
            
            // Check that the pawn is still on the starting rank
            if ((Math.abs(vectorRank) == 2) && (vectorFile == 0)){

                // get the starting rank depending on the colour of the pawn
                const startRank = (this._colour == 'white') ? '2' : '7'
                if (startRank == this._position[1]){

                    // Get the end position
                    const endFile = this._position[0]
                    const endRank = (this._colour == 'white') ? '4' : '5'
                    const endPosition = endFile + endRank
                    
                    // Get the start position
                    const startPosition = this._position

                    // Find positions
                    const positionsAlongVector = vector.findPositionsAlongVector(startPosition, endPosition)
                    allReachablePositions.push(...positionsAlongVector)

                }
                else {
                    // if the ranks do not match we skip this vector
                    continue
                }
            }
            const positionsAlongVector = vector.findPositionsAlongVector(this.position)
            allReachablePositions.push(...positionsAlongVector)

        }
        
        return [... new Set(allReachablePositions)]
    }

}


module.exports = Pawn