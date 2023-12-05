const MoveVector = require('../MoveVector')
const {fileToNum, numToFile, rankToNum, numToRank, gcd} = require('../utils')


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
    

    // Setters
    set updatedPosition(newPosition) {
        this._position = newPosition
    }
    


    reachableSquares(){
        
        // Initialize a list where the reachable positions will be stored when found.
        const allReachablePositions = []

        // Iterate over all vectors, find and storing all positions along that vector
        for (let i = 0; i < this._movement.length; i++){
            const positionsAlongVector = this.findPositionsAlongVector(this._movement[i])
            allReachablePositions.push(...positionsAlongVector)
        }
        
        return allReachablePositions
    }


    findPositionsAlongVector(vector) {

        // vector must be of type MoveVector
        // This method finds all the sqaures that can be reached along a given vector for the piece

        const vectorReachablePositions = []

        // get the file and rank of the current position
        const currentPosition = this._position
        let file = fileToNum(currentPosition[0])
        let rank = rankToNum(currentPosition[1])

        // Get the file and rank components of the vector
        const vectorRank = vector.rankComponent
        const vectorFile = vector.fileComponent

        // Add the vector to the file and rank
        do {
            file += vectorFile
            rank += vectorRank
            
            // Chess if the new rank and file still lie on the board
            if (((rank <= 8) && (rank >= 1)) && ((file <= 8) && (file >= 1))){

                // Concat the file and rank into a new position and save it to the vectorReachablePositions
                const fileStr = numToFile(file)
                const rankStr = numToRank(rank)
                const position = fileStr + rankStr
                vectorReachablePositions.push(position)
            }
            // Stop if the piece's movement is restricted. Otherwise keep looping until...
            // the new position of the piece is off the board.
        } while ((!vector.restricted) && (((rank <= 8) && (rank >= 1)) && ((file <= 8) && (file >= 1)))) 

        return vectorReachablePositions
    }


    findMatchingVector(vector){

        // vector must be of type MoveVector

        // Get the file and rank components of the vector
        const vectorRank = vector.rankComponent
        const vectorFile = vector.fileComponent


        // Step 1) get the unit vector
        let unitVector

        // Check for horizontal movement in rank, true: set vector = [+/- 1, 0] 
        if (vectorFile == 0){
            unitVector = MoveVector(vectorRank / Math.abs(vectorRank), 0) 
        } 
        // Check for horizontal movement in file: true set vector = [0, +/- 1]
        else if (vectorRank == 0){
            unitVector = MoveVector(0, vectorFile / Math.abs(vectorFile))
        }
        // Otherwise there are two components to vector.
        else {
            // Find the unit vector by dividing by the greatest common denominator (GCD)
            const divideByGCD = gcd(vectorFile, vectorRank)
            unitVector = MoveVector(vectorRank/divideByGCD , vectorFile/divideByGCD)
        }


        // Step 2) find and return the matching piece vector. 

        for(i = 0; i < this._movement.length; i++){

            // check if
            unitVector.rankComponent == this._movement[i].rankComponent
            // and
            unitVector.fileComponent == this._movement[i].fileComponent

            return this._movement[i]


        }

        // not found 
        throw new Error()




        /* Note this step is required because a movement vector calculated from the start and end
        positions does not include information concerning if the movement is restricted or not. */

    }


}


module.exports = ChessPiece