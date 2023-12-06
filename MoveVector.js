const {gcd} = require('./utils')


class MoveVector {

    constructor(rankVectorComponent, fileVectorComponent, restricted = undefined){
        this.rankComponent = rankVectorComponent
        this.fileComponent = fileVectorComponent
        this.restricted = restricted
    }

    findUnitVector(){

        const vectorRank = this.rankComponent
        const vectorFile = this.fileComponent
        
        // Check for horizontal movement in rank, true: set vector = [+/- 1, 0] 
        if (vectorFile == 0){
            return new MoveVector(vectorRank / Math.abs(vectorRank), 0) 
        } 
        // Check for horizontal movement in file: true set vector = [0, +/- 1]
        else if (vectorRank == 0){
            return new MoveVector(0, vectorFile / Math.abs(vectorFile))
        }
        // Otherwise there are two components to vector.
        else {
            // Find the unit vector by dividing by the greatsest common denominator (GCD)
            const divideByGCD = gcd(vectorFile, vectorRank)
            return new MoveVector(vectorRank/divideByGCD , vectorFile/divideByGCD)
        }
    }


    findPositionsAlongVector(startPosition) {

        // vector must be of type MoveVector
        // This method finds all the sqaures that can be reached along a given vector for the piece

        const vectorReachablePositions = []

        // get the file and rank of the current position
        let file = fileToNum(startPosition[0])
        let rank = rankToNum(startPosition[1])

        // Get the file and rank components of the vector
        const vectorRank = this.rankComponent
        const vectorFile = this.fileComponent

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
        } while ((!this.restricted) && (((rank <= 8) && (rank >= 1)) && ((file <= 8) && (file >= 1)))) 

        return vectorReachablePositions
    }
}

module.exports = MoveVector