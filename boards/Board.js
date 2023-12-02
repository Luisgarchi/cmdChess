const {box} = require('../utils')

class Board {

    // PRIVATE PROPERTIES
    #rows
    #columns
    #heightRows
    #heightColumns
    #board


    // CONSTRUCTOR METHOD   

    constructor(rows, columns, heightRows, heightColumns) {

        // set the attributes of the board
        this.#rows = rows                            // number of rows
        this.#columns = columns                      // number of columns
        this.#heightRows = heightRows                // relative character size of rows
        this.#heightColumns = heightColumns          // relative character size of columns

        // Horizonal spacing between board squares
        const horizontalSpacing = box.horizontal.repeat(this.#heightColumns)

        /* Repeating patterns for individual squares, each square is from 
        the left most edge (not included) up to an including the rightmost 
        edge separating the current square from the next square */
        const edgeTopSquare = horizontalSpacing + box.edgeTop                   // ━━━━━┳
        const edgeBottomSquare = horizontalSpacing + box.edgeBottom             // ━━━━━┻
        const edgeInbetweenSquare = horizontalSpacing + box.cross               // ━━━━━╋
        const emptySquare = ' '.repeat(this.#heightColumns) + box.vertical       //      ┃
        
        /* Using the above repeating patterns for a single square create all the 
        necessary horizontal lines of a grid necessary to build an empty board */

        // Top most edge of grid/board.     E.g. ┏━━━━━┳━━━━━┳━━...━━━┓
        this.boardEdgeTop       = box.cornerTopLeft + 
                                    edgeTopSquare.repeat(this.#columns - 1) + 
                                    horizontalSpacing + box.cornerTopRight

        // Bottom most edge of grid/board.  E.g. ┗━━━━━┻━━━━━┻━━...━━━┛
        this.boardEdgeBottom    = box.cornerBottomLeft + 
                                    edgeBottomSquare.repeat(this.#columns - 1) + 
                                    horizontalSpacing + box.cornerBottomRight

        // Central edges of grid/board.     E.g. ┣━━━━━╋━━━━━╋━━...━━━┫
        this.boardEdgeInbetween = box.edgeLeft + 
                                    edgeInbetweenSquare.repeat(this.#columns - 1) + 
                                    horizontalSpacing + box.edgeRight
        
        // Square centre in grid/board.     E.g. ┃     ┃     ┃  ...   ┃
        this.emptyRow           = box.vertical + 
                                    emptySquare.repeat(this.#columns - 1) + 
                                    emptySquare

        // Create a board represented as a 2d array
        this.#board = Array.from(Array(this.#rows), _ => Array(this.#columns).fill(' '))
        
        /* Initialise empty array. Each entry in visualBoard will be a string 
        representing a row of the board that will be printed in the command line */
        this._visualBoard = []
    }


    // METHODS FOR BUILDING THE VISUAL CMD BOARD

    buildBoard() {

        // Place the top edge of the board
        this._visualBoard.push(this.boardEdgeTop)

        // Handle all rows inbetween top and bottom edge of board
        this.#buildRows()

        // Place bottom edge of board
        this._visualBoard.push(this.boardEdgeBottom)
    }


    #buildRows(){

        //  for each row in .board
        for(let i = 0; i < this.#board.length - 1; i++){

            /* each row (except last) will consist of the formated .board data sandwiched
            between any padding resulting from the board aspect ratio (#heightRows) */ 
            this.#buildPadding()
            this.#buildRowData(this.#board[i])
            this.#buildPadding()

            // add bottom edge of board grid to the row
            this._visualBoard.push(this.boardEdgeInbetween) 
        }
        
        /* Handle last row separetly since boardEdgeBottom is required instead 
        of boardEdgeInbetween and is included already in #buildBoard */
        this.#buildPadding()
        this.#buildRowData(this.#board[this.#board.length - 1])
        this.#buildPadding()
    }


    #buildPadding(){

        // funuction builds padding for above and below a row containing board data.

        // Substract 1 for board data, divide by 2 since padding is added above and below board data
        const repeatPadding = (this.#heightRows - 1) / 2 

        // Push the string represnetation to visual board
        for (let i = 0; i < repeatPadding; i ++) {
            this._visualBoard.push(this.emptyRow)
        } 
    }
 

    #buildRowData(row){
        
        // construct the string representation of a row containing board data (argument)

        // string representation build from scratch since JS strings are immutables
        let boardRow = ''

        // Set the horizontal padding
        const padding = (this.#heightColumns - 1) / 2

        // for each column in row add the padding around the data, prepend a vertical line
        for(let i = 0; i < row.length; i++) {
            boardRow = boardRow + box.vertical + ' '.repeat(padding) + row[i] + ' '.repeat(padding)
        }

        // add final vertical line
        boardRow = boardRow + box.vertical

        // Push the string represnetation to visual board
        this._visualBoard.push(boardRow)
    }

    #formatRow(row){
        
        /* subtract 1 from row because board is represented as an array (starts at zero index)
        subtract from #rows since we want lower rows displayed at the bottom of the console instead of at top*/ 
        return (this.#rows - 1) - (row - 1)
    }


    #formatColumn(column){

        // zero index columns
        return column - 1
    }


    _addCharacter(character, row, column){
 
        // Format row and columns
        const rowIndex = this.#formatRow(row)
        const columnIndex = this.#formatColumn(column)

        // add to board
        this.#board[rowIndex][columnIndex] = character
    }


    _removeCharacter(row, column){

        // Format row and columns
        const rowIndex = this.#formatRow(row)
        const columnIndex = this.#formatColumn(column)

        // Add to board
        this.#board[rowIndex][columnIndex] = " "
    }

    
    _moveCharacter(startRow, startColumn, endRow, endColumn){

        // Get the symbol of the character we want to move
        const startRowIndex = this.#formatRow(row)
        const startColumnIndex = this.#formatColumn(column)
        const symbol = this.#board[startRowIndex][startColumnIndex]

        // Remove the character from the starting position
        this._removeCharacter(startRow, startColumn)

        // Add the symbol at the end position
        this._addCharacter(symbol,  endRow, endColumn)
    }



    // PRINT THE BOARD TO THE CMD 

    display(){
        // print the visual representation of the board to the console
        for (let i = 0; i < this._visualBoard.length; i++) {
            console.log(this._visualBoard[i])
        }
    }

    get board() {
        return this.#board
    }

    


}

module.exports = Board


/*
myboard = new Board(8,8,1,5)
myboard.buildBoard()
myboard.display()
*/