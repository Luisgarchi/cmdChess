const ChessPiece = require('./ChessPiece')
const {chessPieces} = require('../utils')


class Pawn extends ChessPiece {

    constructor(colour, position) {

        /* SET PROPERTIES FOR SUPER CLASS */


        // Get the correct utf-8 encoding to use as the piece symbol
        const symbol = (colour == "white") ? chessPieces.white.Pawn : chessPieces.black.Pawn 

        // Define the movement mechanics
        // Pawns only move forward 
        const movement = [
                            [1,0],           // Vector for moving Pawn North one square 
                            [2,0],           // Vector for moving Pawn North two square *
                            [1,1],           // Vector for moving Pawn diagonally capture right **
                            [1, -1],         // Vector for moving Pawn diagonally capture left  ** 
        ]            
        // * Movement is only possible if the pawn has not moved (i.e. it is in its initial rank)
        // ** these apply to generic pawn captures as well as en passant.
        // Both of the above scenarios must be handled during a chess game (in the ChessBoard class)

        // Pawns can *GENERALLY* only move along a movement vector once
        const movementRestricted = true     

        // Set the Pawn properties in the superclass
        super(colour, symbol, position, movement, movementRestricted)

    
        /* SET PROPERTIES FOR CURRENT Rook CLASS */

        // Points of materials the piece is worth
        this.points = 1

        // Boolean to check if the piece is currently pinned to the King
        this.pinned = false
    }

}

module.exports = Pawn