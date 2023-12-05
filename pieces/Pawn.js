const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class Pawn extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */


        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Pawn : chessPieces.black.Pawn 

        // Define the movement mechanics
        // Pawns only move forward 

        /* The direction is included since pawn movement vectors are not symetric.
        By adding this variable, it establishes the directions black and white pawns move in*/
        const direction = (colour == "white") ? 1 : -1

        const movement = [
                            [(direction * 1),  0],         // Vector for moving Pawn along file one square 
                            [(direction * 2),  0],         // Vector for moving Pawn along file two square *
                            [(direction * 1),  1],         // Vector for moving Pawn diagonally capture right **
                            [(direction * 1), -1],         // Vector for moving Pawn diagonally capture left  ** 
        ]     

        // * Movement is only possible if the pawn has not moved (i.e. it is in its initial rank)
        // ** these apply to generic pawn captures as well as en passant.
        // Both of the above scenarios must be handled during a chess game (in the ChessBoard class)

        // Pawns can *GENERALLY* only move along a movement vector once
        const movementRestricted = true     

        // Set the Pawn properties in the superclass
        super('Pawn', colour, symbol, position, movement, movementRestricted)

    
        /* SET PROPERTIES FOR CURRENT Rook CLASS */

        // Points of materials the piece is worth
        this.points = 1

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }


    reachableSquares(){

        // Method overwrites chessPiece method to include pawn movement 
        // of 2 squares from starting rank
        
        // Initialize a list where the reachable positions will be stored when found.
        const allReachablePositions = []

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < this._movement.length; i++){

            const vector     = this._movement[i]
            const vectorFile = vector[1]
            const vectorRank = vector[0]
            
            // Check that the pawn is still on the starting rank
            if ((Math.abs(vectorRank) == 2) && (vectorFile == 0)){

                // get the starting rank depending on the colour of the pawn
                const startingRank = (this._colour == 'white') ? '2' : '7'
                if (startingRank != this._position[1]){
                    // if the ranks do not match we skip this vector
                    continue
                }
            }
            
            const positionsAlongVector = this.findPositionsAlongVector(this._movement[i])
            allReachablePositions.push(...positionsAlongVector)
        }
        
        return allReachablePositions
    }

}

module.exports = Pawn