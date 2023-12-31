const Board = require('./Board')
const {Pawn, Bishop, Knight, Rook, Queen, King} = require('../pieces/index')
const MoveVector = require('../MoveVector')
const {
    MovementBlockedError, 
    PieceMovementError, 
    NoPieceFoundError, 
    InvalidPositionError, 
    InvalidNotationError
} = require('../errors/index')
const {fileToNum, rankToNum, createBoardDimensionObject}  = require('../utils')


class ChessBoard extends Board {

    constructor(heightRows, heightColumns, notationMoves, testing = false) {

        // Chess board has 8 rows known as ranks
        const rows = 8

        // Chess board has 8 columns known as files
        const columns = 8

        // Create a chess board by calling the super class
        super(rows, columns, heightRows, heightColumns)

        // Initialize chess pieces as an array of objects
        this._pieces = (!testing) ? this.#initializePieces() : testing
        this._capturedPieces = []

        // Initialize the board starting position
        this.#initializeBoard()

        // Conigure chess notation setup - (Standard) Avectorlgebraic Notion
        this._notationMoves = notationMoves
        this._boardLabels = createBoardDimensionObject('a', 'h', '1', '8')
    }

    // Getters
    get pieces(){
        return this._pieces
    }

    get capturedPieces(){
        return this._capturedPieces
    }


    #initializePieces(){

        // Method that instantiates all the peieces required at the start of a chess game

        // Define Array to contain all pieces
        const pieces = []

        // Initialize white's Pawns on the second rank
        const whitePawns = [new Pawn("white", "a2"), new Pawn("white", "b2"), 
                            new Pawn("white", "c2"), new Pawn("white", "d2"), 
                            new Pawn("white", "e2"), new Pawn("white", "f2"), 
                            new Pawn("white", "g2"), new Pawn("white", "h2")]
        
        // Initialize black's Pawns on the seventh rank
        const blackPawns = [new Pawn("black", "a7"), new Pawn("black", "b7"), 
                            new Pawn("black", "c7"), new Pawn("black", "d7"), 
                            new Pawn("black", "e7"), new Pawn("black", "f7"), 
                            new Pawn("black", "g7"), new Pawn("black", "h7")]
        
        
        // Initialize white's Minor and Major Pieces on the first rank 
        const whiteMajorMinor =    [new Rook("white", "a1"), new Knight("white", "b1"), 
                                    new Bishop("white", "c1"), new Queen("white", "d1"), 
                                    new King("white", "e1"), new Bishop("white", "f1"), 
                                    new Knight("white", "g1"), new Rook("white", "h1")]

        // Initialize black's Minor and Major Pieces on the eigth rank 
        const blackMajorMinor =    [new Rook("black", "a8"), new Knight("black", "b8"), 
                                    new Bishop("black", "c8"), new Queen("black", "d8"), 
                                    new King("black", "e8"), new Bishop("black", "f8"), 
                                    new Knight("black", "g8"), new Rook("black", "h8")]
        
        // Save the initialized pieces
        pieces.push(... whitePawns)
        pieces.push(... blackPawns)
        pieces.push(... whiteMajorMinor)
        pieces.push(... blackMajorMinor)

        return pieces
    }
    


    #initializeBoard() {

        // Method that initializes the boards starting position
        
        for(let i = 0; i < this._pieces.length; i++) {

            // get the piece
            const piece = this._pieces[i]

            // get the piece's symbol and position
            const symbol = piece.symbol
            const position = piece.position

            // get file and rank
            const intPosition = this.#splitPosition(position)
            
            // place the symbol of the piece on the board
            this._addCharacter(symbol, intPosition.rank, intPosition.file)
        }
    }

    #splitPosition(position){

        /* Takes a position in Standard Algebraic Notation and return a decomposed 
        object containing numeric representations of the file and rank */

        // get file and rank
        const file = position[0]
        const rank = position[1]

        // convert file and rank in an integer
        const intFile = fileToNum(file)
        const intRank = rankToNum(rank)

        // return as object properties
        return {file: intFile, rank: intRank}
    }



    isValidBoardPosition(position) {

        /* This method takes a string with two characters and checks if it is a valid
        position/square for the board notation specified in this._notationBoard. It returns 
        an object with properties: 1) validStatus (boolean) 2) errorMessages (object 
        containing descriptors of any errors, it is an empty if validStatus is true) */

        // Decompose the position into file and rank
        const file = position[0]
        const rank = position[1]

        let status = true
        const errors = {}

        // Check file lower limit 
        if (file < this._boardLabels.file.min){
            errors.file = `File exceeds the minimum board value of '${this._boardLabels.file.min}'`
            status = false
        }

        // Check file upper limit
        else if (file > this._boardLabels.file.max) {
            errors.file = `File exceeds the maximum board value of '${this._boardLabels.file.max}'`
            status = false
        }

        // Check rank lower limit
        if (rank < this._boardLabels.rank.min){
            errors.rank = `Rank exceeds the minimum board value of '${this._boardLabels.rank.min}'`
            status = false
        }

        // Check rank upper limit
        else if (rank > this._boardLabels.rank.max) {
            errors.rank = `Rank exceeds the maximum board value of '${this._boardLabels.rank.max}'`
            status = false
        }

        // return an object with the status and any error messages
        return {status, errors}
    }
    


    getPieceAt(position){
        
        /* Find and return the piece located at provided position
        If there is no piece present return null */

        // Iterate over all the piece on the board
        for (let i = 0; i < this._pieces.length; i++) {

            // Check if a piece matches is on the required position
            if (this._pieces[i].position == position) {
                return this._pieces[i]
            }
        }
        return null
    }



    checkMoveUnimpeded(piece, targetPosition){

        /* Checks that a piece can move from its starting position to the targetPosition. 
        returns an object about the status of the blocking piece */

        // First get the vector along which the piece is intending to move
        const initialPosition = piece.position
        const vector = this._calculateVector(initialPosition, targetPosition)

        // Use this vector to find the matching piece vector
        const matchingPieceVector = piece.findMatchingVector(vector)

        // Find all other squares that lie on this vector not including piece.position.
        const squaresAlongVector = matchingPieceVector.findPositionsAlongVector(initialPosition, targetPosition)

        // Check if any of the pieces on the board block the piece from moving to targetPosition
        for (let i = 0; i < this._pieces.length; i++){
            
            /* If a different piece is blocking it will lie along the vector of sqaures from the
            piece's original position (not included) to the targetPosition (included). However...
            
            There are two exceptions: 
            - If the blocking piece is an opposing coloured piece ON THE TARGET POSITION,
              the move is not considered invalid because said piece may be captured.
            - Pawns are not able to capture an opposing coloured piece on the targetPosition 
              if the intended move is along the same file. 

            Variable "includeLastSquare" and boolean "exceptions" implement the above logic */

            const movementAlongFile = (vector.fileComponent == 0)
            const exceptions = (
                (this._pieces[i].colour == piece.colour) ||          
                ((piece.type == 'Pawn') && (movementAlongFile))
                )

            const includeLastSquare = (exceptions) ? 0 : -1

            if((squaresAlongVector                                             
                    .slice(0, squaresAlongVector.length + includeLastSquare)      // slice to account for exception
                    .includes(this._pieces[i].position))){                          // check if blocking or not
                        return {isBlocked: true, blockingPiece :this._pieces[i]}
            }
        }

        // There is not piece blocking
        return {isBlocked: false, blockingPiece :{}}
    }

    _calculateVector(startPosition, endPosition){
        
        // Takes two positions and finds the vector between the two

        // Decompose into file and rank
        const intPositionA = this.#splitPosition(startPosition)
        const intPositionB = this.#splitPosition(endPosition)
        
        // Calculate direction components
        const fileVector = intPositionB.file - intPositionA.file  
        const rankVector = intPositionB.rank - intPositionA.rank 

        // Compose vector
        return new MoveVector(rankVector, fileVector)

    }

    canPawnCapture(pawn, vector){

        /* Method checks if the specified pawn moving along a specified DIAGONAL vector is
        a legal pawn capture. This function enforces that a player can not move a pawn 
        diagonally if there is not an enemy pawn present in the diagonal square to be captured*/

        // Get position of enemy piece for legal capture along specified vector
        const positionEnemyPiece = piece.findPositionsAlongVector(vector)[0]

        // Check the board for enemy piece at the required location 
        for(let i = 0; i < this._pieces.length; i++){

            // In order for a piece to be captured it must be of a different colour
            // as well as being in the diagonal vector position
            if ((this._pieces[i].colour != pawn.colour) &&
                (this._pieces[i].position == positionEnemyPiece)){  
                    return true
            }
        }

        // no enemy piece was found in the required position so return false
        return false
    }



    makeMove(move){

        // Since validation of moves throws errors wrap in a try-catch block  
        try {
            /*
            // separate cases for different input notation.
            if (this._notationMoves == 'SAN'){
                // convert SAN to UCI
                // const moveUCI = this.convertSANtoUCI(move)
                // this.makeMove(moveUCI)
            }
            */
            if (this._notationMoves == 'UCI'){
                const {piece, startPosition, endPosition} = this.validateUCI(move)
                this.movePiece(piece, startPosition, endPosition)
            }
            
        } catch(error) {
            
            // throw the error again for the controller to handle it
            throw(error)
        }
    }



    validateUCI(move) {

        // 1) First check the notation syntax (must be of length 4-5). Throw error if wrong
        const validLengths = [4, 5]
        if (!validLengths.includes(move.length)){
            throw new InvalidNotationError(this._notationMoves)
        }

        // 2) Check the start position is in valid notation
        const startPosition = move.slice(0, 2)
        const startPositionValid = this.isValidBoardPosition(startPosition)
        if (!startPositionValid){
            throw new InvalidPositionError(startPosition, startPositionValid.errors)
        }

        // 3) Check the end position is in valid notation
        const endPosition = move.slice(2, 4)
        const endPositionValid = this.isValidBoardPosition(endPosition)
        if (!endPositionValid){
            throw new InvalidPositionError(endPosition, endPositionValid.errors)
        }

        // 4) Check if there is a piece at the starting position
        const piece = this.getPieceAt(startPosition)
        if (!piece){
            throw new NoPieceFoundError(startPosition)
        }

        // 5) Check that the piece is not pinned
        /* FINISH THIS LATEERRRR */

        // 6) Check if the piece can move to the end position
        const reachableSquares = piece.reachableSquares()
        if (!reachableSquares.includes(endPosition)) {
            throw new PieceMovementError(piece)
        }

        // 6.5) Extra logic for Pawn capture movement

        const unitVector = this._calculateVector(startPosition, endPosition).findUnitVector()

        const isDiagonalVector = (
            (Math.abs(unitVector.rankComponent) == 1) && 
            (Math.abs(unitVector.fileComponent) == 1))

        if ((piece.type == 'Pawn')      &&                       // Only Pawns
            (isDiagonalVector)          &&                       // Diagonal moves 
            (!this.canPawnCapture(piece, unitVector))){          // Check capture 
                throw new PieceMovementError(piece)
        }

        // 7) Check that the piece is not blocked by another piece 
        const {isBlocked, blockingPiece} = this.checkMoveUnimpeded(piece, endPosition)
        if (isBlocked) {
            throw new MovementBlockedError(piece, blockingPiece, startPosition, endPosition)
        }

        // the move has passed all the conditions and is validated

        return {piece, startPosition, endPosition}
    }


    movePiece(piece, startPosition, endPosition){

        // DESCRIPTION

        // Handle case for enemy piece captured by moving to the endPosition
        this.#handleCapture(piece, endPosition) 

        // Move the piece on the representation of the board
        const intStartPosition = this.#splitPosition(startPosition)
        const intEndPosition = this.#splitPosition(endPosition)
        this._moveCharacter(intStartPosition.rank, intStartPosition.file, intEndPosition.rank, intEndPosition.file)

        // Update the piece object position
        piece.updatedPosition(endPosition)
    }

    #handleCapture(endPosition){

        /* Loop over the pieces on the board and check if a piece's position matches
        the position specified in the argument (endPosition).

        * Note that this function assumes the necessary checks have been carried out:
        - movement is valid and thus there is no need to check that another piece 
        is blocking...
        - And therefore any piece located at endPosition will be a different colour. */

        let isCaptured = false
        let capturedIndex
        for (let i = 0; i < this._pieces.length; i++){
            if ((this._pieces[i].position == endPosition)){
                // When we find a piece stop and save the index of the piece
                this._capturedPieces.push(this.this._pieces[i])
                capturedIndex = i
                isCaptured = true
                break
            }
        }

        if(isCaptured){

            // If a piece is captured add it to the "captured" array 
            this._capturedPieces.push(this._pieces[capturedIndex])

            // and remove it from the pieces array
            this._pieces.splice(capturedIndex, 1)
        }
    }


}



module.exports = ChessBoard



const move = 'e3e5'
const startPieces = [
    new Pawn("white", "e3"),        // Piece being moved
]
testBoard = new ChessBoard(1,5, 'UCI', startPieces)

testBoard.buildBoard()
testBoard.display()
testBoard.makeMove(move)
testBoard.buildBoard()
testBoard.display()


