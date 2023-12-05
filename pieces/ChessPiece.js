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

}


module.exports = ChessPiece