const ChessBoard = require('./ChessBoard')
const {Pawn, Bishop, Knight, Rook, Queen, King} = require('../pieces/index')
const {PieceMovementError, MovementBlockedError} = require('../errors/index')


nameToClass = {
    'Pawn': Pawn, 
    'Bishop': Bishop, 
    'Knight': Knight,
    'Rook' : Rook,
    'Queen' : Queen,
    'King' : King
}



const piecePropertiesTest = function(piece) {
    return expect.objectContaining({position: piece.position, colour : piece.colour, type: piece.type})
} 


function createEndPieceArray(startPieces, moveStart, moveEnd){

    let index
    let found = false

    // Iterate over all the piece on the board
    for (let i = 0; i < startPieces.length; i++) {

        // Check if a piece matches is on the required position
        if (startPieces[i].position == moveStart){
            if (!found) {
                index = i
                found = true
            }
            else {
                throw new Error('Two or more chess pieces have the same starting position')
            }
        }
    }

    if (!found) {
        throw new Error(`No piece at starting position ${moveStart}`)
    }

    const endPieces = []

    for (let i = 0; i < startPieces.length; i++){

        const pieceClass = nameToClass[startPieces[i].type]
        const colourVal =  startPieces[i].colour

        if (i == index){
            endPieces.push(new pieceClass(colourVal, moveEnd))
        }
        else {
            const positionVal = startPieces[i].position
            endPieces.push(new pieceClass(colourVal, positionVal))
        }
    }

    return endPieces
}


function setupBoardTest(startPieces, move){

    // Get start and End
    const moveStart = move.slice(0,2)
    const moveEnd = move.slice(2, 4)
    
    // Get the same pieces after moving the starting piece
    const endPieces = createEndPieceArray(startPieces, moveStart, moveEnd)

    // Initialise board
    const testBoard = new ChessBoard(1,1, 'UCI', startPieces)

    return {endPieces, testBoard}
}




describe('Pawn', () => {

    // BASIC PAWN MOVEMENT SUCCESS
    describe('Movement', () => {

        // MOVE FORWARD 1 SQUARE

        test('White Pawn moves 1 square', () => {

            // Define starting position of all pieces and move to test
            const move = 'a2a3'
            const startPieces = [
                new Pawn("white", "a2"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {endPieces, testBoard} = setupBoardTest(startPieces, move)

            // Make the move
            testBoard.makeMove(move)
                
            // Execute tests: 1) Board positions match, 2) No missing or additional pieces
            expect(testBoard.pieces).toEqual(expect.arrayContaining(endPieces.map(piecePropertiesTest)))
            expect(testBoard.pieces.length).toEqual(endPieces.length)
        })


        test('Black Pawn moves 1 square', () => {

            // Define starting position of all pieces and move to test
            const move = 'e7e6'
            const startPieces = [
                new Pawn("black", "e7"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {endPieces, testBoard} = setupBoardTest(startPieces, move)
            
            // Make the move
            testBoard.makeMove(move)

            // Execute tests: 1) Board positions match, 2) No missing or additional pieces
            expect(testBoard.pieces).toEqual(expect.arrayContaining(endPieces.map(piecePropertiesTest)))
            expect(testBoard.pieces.length).toEqual(endPieces.length)
        })


        // MOVE FORWARD 2 SQUARES

        test('White Pawn moves 2 square', () => {

            // Define starting position of all pieces and move to test
            const move = 'c2c4'
            const startPieces = [
                new Pawn("white", "c2"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {endPieces, testBoard} = setupBoardTest(startPieces, move)
        
            // Make the move
            testBoard.makeMove(move)

            // Execute tests: 1) Board positions match, 2) No missing or additional pieces
            expect(testBoard.pieces).toEqual(expect.arrayContaining(endPieces.map(piecePropertiesTest)))
            expect(testBoard.pieces.length).toEqual(endPieces.length)
        })


        test('Black Pawn moves 2 square', () => {

            // Define starting position of all pieces and move to test
            const move = 'f7f5'
            const startPieces = [
                new Pawn("black", "f7"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {endPieces, testBoard} = setupBoardTest(startPieces, move)
            
            // Make the move
            testBoard.makeMove(move)

            // Execute tests: 1) Board positions match, 2) No missing or additional pieces
            expect(testBoard.pieces).toEqual(expect.arrayContaining(endPieces.map(piecePropertiesTest)))
            expect(testBoard.pieces.length).toEqual(endPieces.length)
        })
    })


    // PAWN MOVEMENT ERROR

    describe('Movement Error', () => {

        // ONLY MOVE 2 SQUARES IF ON START RANK

        test('White Pawn cannot move 2 squares if not on rank 2', () => {

            // Define starting position of all pieces and move to test
            const move = 'e3e5'
            const startPieces = [
                new Pawn("white", "e3"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(PieceMovementError)
        })


        test('Black Pawn cannot move 2 squares if not on rank 7', () => {

            // Define starting position of all pieces and move to test
            const move = 'd4d2'
            const startPieces = [
                new Pawn("black", "d4"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(PieceMovementError)
        })


        // PAWNS CANNOT MOVE BACKWARDS

        test('White Pawn cannot move backwards', () => {

            // Define starting position of all pieces and move to test
            const move = 'h6h5'
            const startPieces = [
                new Pawn("white", "h6"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(PieceMovementError)
        })


        test('Black Pawn cannot move backwards', () => {

            // Define starting position of all pieces and move to test
            const move = 'c4c5'
            const startPieces = [
                new Pawn("black", "c4"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(PieceMovementError)
        })


        // BLOCKED BY SAME COLOURED PIECE

        test('White Pawn is blocked from moving 1 square by piece of same colour', () => {

            // Define starting position of all pieces and move to test
            const move = 'c3c4'
            const startPieces = [
                new Knight("white", "c4"),
                new Pawn("white", "c3"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(MovementBlockedError)
        })


        test('Black Pawn is blocked from moving 1 square by piece of same colour', () => {

            // Define starting position of all pieces and move to test
            const move = 'd7d6'
            const startPieces = [
                new Bishop("black, d6"),
                new Pawn("black", "d7"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(MovementBlockedError)
        })

        test('White Pawn is blocked from moving 2 square by piece of same colour', () => {

            // Define starting position of all pieces and move to test
            const move = 'f2f4'
            const startPieces = [
                new Knight("white", "f3"),
                new Pawn("white", "f2"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(MovementBlockedError)
        })


        test('Black Pawn is blocked from moving 2 square by piece of same colour', () => {

            // Define starting position of all pieces and move to test
            const move = 'd7d5'
            const startPieces = [
                new Bishop("black, d5"),
                new Pawn("black", "d7"),        // Piece being moved
            ]

            // Get the end Position of pieces and the board after making a move
            const {testBoard} = setupBoardTest(startPieces, move)

            // Execute tests: 1) Throws a PieceMovementError
            expect(() => testBoard.makeMove(move)).toThrow(MovementBlockedError)
        })




    })






    // Capture


    // Promotion


})