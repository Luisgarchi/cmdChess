const {fileToNum, numToFile, rankToNum, numToRank} = require('../utils')


class ChessPiece {

    constructor(type, colour, symbol, position, movement) {

        this._type     = type                           // the type of the chess piece
        this._colour   = colour                         // throw error if position does not match colour
        this._symbol   = symbol                         // utf-8 encoding of chess piece
        this._position = position                       // Position of piece on chess board
        this._movement = movement                       // Movement vectors of the piece
    }

    // Getters 
    get type(){
        return this._type
    }
    
    get position() {
        return this._position 
    }
    
    get symbol() {
        return this._symbol
    }

    get colour(){
        return this._colour
    }


    

    // Custom Setters
    updatePosition(newPosition) {
        this._position = newPosition
    }
    


    reachableSquares(){
        
        // Initialize a list where the reachable positions will be stored when found.
        const allReachablePositions = []

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < this._movement.length; i++){
            const vector = this._movement[i]
            const positionsAlongVector = vector.findPositionsAlongVector(this.position)
            
            allReachablePositions.push(...positionsAlongVector)
        }

        // Ensure array contains only unique positions
        return [... new Set(allReachablePositions)]
    }



    findMatchingVector(vector){

        // vector must be of type MoveVector

        /* method finds and returns the matching piece vector. Note this method is 
        required because a movement vector calculated from the start and end positions 
        does not include information on whether the movement is restricted or not. */

        // Step 1) check if the vector matches

        let matchingVector = this.#findVector(vector)

        if (matchingVector){
            return matchingVector
        }

        // Step 2) check if the unit vector matches
        const unitVector = vector.findUnitVector()
        
        return this.#findVector(unitVector)

    }

    #findVector(vector){

        for(let i = 0; i < this._movement.length; i++){

            // check if vector components match
            if ((vector.rankComponent == this._movement[i].rankComponent) &&
                (vector.fileComponent == this._movement[i].fileComponent)){
                    return this._movement[i]
            }
        }
        return null
    }


}


module.exports = ChessPiece