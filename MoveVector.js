const {gcd, fileToNum, rankToNum, numToFile, numToRank} = require('./utils')


class MoveVector {

    constructor(rankComponent, fileComponent, jump, restricted, maxMoveRestricted = undefined){

        // Board dimensions
        this.minRank = 1
        this.maxRank = 8
        this.minFile = 1
        this.maxFile = 8

        // Vector Components
        this._rankComponent = rankComponent
        this._fileComponent = fileComponent

        // Movement Mechanics
        this._jump = jump

        if ((!restricted) && (maxMoveRestricted)){
            throw new Error('Unbounded movement cant not have a maximum movement parameter')
        }
        
        this._restricted = restricted
        this._maxMoveRestricted = maxMoveRestricted
    }

    get restricted(){
        return this._restricted
    }
    
    /**
     * @param {any} restrictionType
     */
    set updateRestricted(restrictionType){
        this._restricted = restrictionType
    }

    findUnitVector(){

        const vectorRank = this.rankComponent
        const vectorFile = this.fileComponent
        
        // Check for horizontal movement in rank, true: set vector = [+/- 1, 0] 
        if (vectorFile == 0){
            return new MoveVector(vectorRank / Math.abs(vectorRank), 0, false, true) 
        } 
        // Check for horizontal movement in file: true set vector = [0, +/- 1]
        else if (vectorRank == 0){
            return new MoveVector(0, vectorFile / Math.abs(vectorFile), false, true)
        }
        // Otherwise there are two components to vector.
        else {
            // Find the unit vector by dividing by the greatsest common denominator (GCD)
            const divideByGCD = gcd(vectorFile, vectorRank)
            return new MoveVector(vectorRank/divideByGCD , vectorFile/divideByGCD, false, true)
        }
    }
    

    findPositionsAlongVector(startPosition) {

        // Finds all the sqaures that can be reached along a vector. 

        const vectorReachablePositions = []

        // get the file and rank of the current position
        const fileStart = fileToNum(startPosition[0])
        const rankStart = rankToNum(startPosition[1])

        // Set the min and max coordinates for ranks and files
        let minRank = this.minRank
        let maxRank = this.maxRank
        let minFile = this.minFile
        let maxFile = this.maxFile


        // Get the file and rank components of the vector
        const vectorRank = vector.rankComponent
        const vectorFile = vector.fileComponent

        // let file and rank initially be equal to the starting positions
        let file = fileStart
        let rank = rankStart

        // Add the vector to the file and rank
        do {
            file += vectorFile
            rank += vectorRank
            
            // Chess if the new rank and file still lie on the board
            if ((rank <= maxRank) && (rank >= minRank) && (file <= maxFile) && (file >= minFile)){

                    // Concat the file and rank into a new position and save it
                    const fileStr = numToFile(file)
                    const rankStr = numToRank(rank)
                    const position = fileStr + rankStr
                    vectorReachablePositions.push(position)
            }
            /* 3) Stop if the movement is restricted. Otherwise the move vector is unbounded
            and it keeps looping until the new position is off of the board 
            (endPosition is undefined) or it reaches the end of the endPosition required (1)*/
        } while (
            (!vector.restricted) && 
            (rank <= maxRank) && (rank >= minRank) && (file <= maxFile) && (file >= minFile)) 

        return vectorReachablePositions
    }





    findPositionsAlongVector(startPosition, endPosition = undefined) {

        /* Finds all the sqaures that can be reached along a vector. 
        
        This function takes into account three paramters 
        1) whether endPosition is provided as an argument or not,
        2) if the move vector (this) can "jump" (this.jump),
        3) if the move vector's (this) movement is restricted (this.restricted) */

        const vectorReachablePositions = []

        // get the file and rank of the current position
        const fileStart = fileToNum(startPosition[0])
        const rankStart = rankToNum(startPosition[1])

        // Set the min and max coordinates for ranks and files
        let minRank = this.minRank
        let maxRank = this.maxRank
        let minFile = this.minFile
        let maxFile = this.maxFile

        /* 1) If optional argument "endPosition" is supplied, it marks the last position 
        along the vector that needs to be found, otherwise terminate at the max/min edges */

        if (endPosition){

            // get the file and rank of the end position
            const fileEnd = fileToNum(endPosition[0])
            const rankEnd = rankToNum(endPosition[1])

            // Get the rank and file directions (either + or -), can be expressed as a boolean
            const isRankPositive = rankEnd > rankStart
            const isFilePositive = fileEnd > fileStart

            // Set the maximum rank and file if their respective directions are positive
            maxRank = (isRankPositive) ? rankEnd : maxRank
            maxFile = (isFilePositive) ? fileEnd : maxFile

            // Set the minimum rank and file if their respective directions are negative
            minRank = (!isRankPositive) ? rankEnd : minRank
            minFile = (!isFilePositive) ? fileEnd : minFile

            /* N.B. the case for if rank/file.End == rank/file.Start does not need to be 
            explicitly handled since it is incorporated in the false conditional and the 
            boolean operators in the remainder of the function include equality (>= or <=).
            
            (This is equivalent to either vectorRank or vectorFile being zero, therefore each 
            iteration will not change the value and they will still evaluate to true) */
        }
        
        /* 2) If a move vector "jumps" it does not pass through any of the positions along 
        a vector. I.e. the smallest unit of movement is the vector itself. 
        
        Otherwise the vector passes through all positions along the move vector. These 
        positions can be found by finding the move vector's respective "unit" vector */

        let vector 
        if(this.jumps){
            vector = this
        }
        else {
            vector = this.findUnitVector()
            vector.updateRestricted = false
        }

        // Get the file and rank components of the vector
        const vectorRank = vector.rankComponent
        const vectorFile = vector.fileComponent

        // let file and rank initially be equal to the starting positions
        let file = fileStart
        let rank = rankStart

        // Add the vector to the file and rank
        do {
            file += vectorFile
            rank += vectorRank
            
            // Chess if the new rank and file still lie on the board
            if ((rank <= maxRank) && (rank >= minRank) && (file <= maxFile) && (file >= minFile)){

                    // Concat the file and rank into a new position and save it
                    const fileStr = numToFile(file)
                    const rankStr = numToRank(rank)
                    const position = fileStr + rankStr
                    vectorReachablePositions.push(position)
            }
            /* 3) Stop if the movement is restricted. Otherwise the move vector is unbounded
            and it keeps looping until the new position is off of the board 
            (endPosition is undefined) or it reaches the end of the endPosition required (1)*/
        } while (
            (!vector.restricted) && 
            (rank <= maxRank) && (rank >= minRank) && (file <= maxFile) && (file >= minFile)) 

        return vectorReachablePositions
    }



}

module.exports = MoveVector