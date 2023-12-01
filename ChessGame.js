const prompt = require('prompt-sync')()
const ChessBoard = require('./boards/ChessBoard')
const {fileToNum, numToFile, rankToNum, numToRank} = require('../utils')
const {InvalidNotationError, InvalidPositionError, NoPieceFoundError, PieceMovementError, MovementBlockedError} = require('./errors/index')

class ChessGame {

    #board
    
    constructor() {

        // Request the player(s) which notation type they want to use as input each move
        this.#inputNotation = this.#promptInputNotation()

        // Get the board notation associated with the input notation
        const boardNotation = this.#setBoardNotation()

        // Create the ChessBoard instance
        this.#board = new ChessBoard(1, 5, boardNotation)
    }


    #promptInputNotation(){

        // Prompts the player(s) the chess notation to use for duration of the match

        // Define supported notation
        const notation = ['UCI', 'SAN']

        // Define errorr messages
        const selectNotationMessage = "Please select chess notation to use by typing one of the following: \n1) UCI \n2) SAN \n3) ICCF \n"
        const invalidNotationMessage = "\nInvalid Notation \n"

        // Prompt the player(s) to enter the chess notation to use during a game
        console.log(selectNotationMessage)
        let notatitonToUse = prompt("Enter Notation: ")

        // Continue to prompt the player(s), until they select a supported notation
        while (!notation.includes(notatitonToUse)){
            console.log(invalidNotationMessage)
            console.log(selectNotationMessage)
            notatitonToUse = prompt("Enter Notation: ")
        }

        return notatitonToUse
    }



    makeMove(){
        let move
        let success = false

        while (!success){
            try {
                move = prompt('Move: ')
                success = this.#board.validateMove(move)
            } 
            catch(error){
                console.log(error)
            }
        }
    }
    


    startGame(){
        return 'xxx'
    }
}




game = new ChessGame()


module.exports = ChessGame