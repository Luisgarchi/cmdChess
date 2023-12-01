box = {
    // Lines
    horizontal        : '━',
    vertical          : '┃',

    // Corners
    cornerTopLeft     : '┏',
    cornerTopRight    : '┓',
    cornerBottomLeft  : '┗',
    cornerBottomRight : '┛',

    // Edges
    edgeTop           : '┳',
    edgeBottom        : '┻',
    edgeRight         : '┫',
    edgeLeft          : '┣',

    // Cross 
    cross             : '╋',
}

chessPieces = {
    white: {
        // White Pieces
        King   : '♔',
        Queen  : '♕',
        Rook   : '♖',
        Bishop : '♗',
        Knight : '♘',
        Pawn   : '♙',
    },

    black: {
        // Black Pieces
        King    : '♚',
        Queen   : '♛',
        Rook    : '♜',
        Bishop  : '♝',
        Knight  : '♞',
        Pawn    : '♟︎',
    },
}

fileToNumData =  {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8
}

function fileToNum(letter){
    return fileToNumData[letter]
}


numToFileData =  {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h'
}

function numToFile(number){
    return numToFileData[number]
}


function rankToNum(numberString){
    return Number(numberString)
}

function numToRank(number){
    return String(number)
}


function createBoardDimensionObject(minFile, maxFile, minRank, maxRank) {

    // factory function creates and returns object withmax and min board properties

    const boardDimensionObj = {
        file : {
            min : minFile,
            max : maxFile
        },
        rank : {
            min : minRank,
            max : maxRank
        }
    }

    return boardDimensionObj
}

function gcd(a, b){

    // A recursive function that returns the Greates Common Denominator using Euclids algorithm
    return (!b) ? a : gcd(b, a%b)
}



module.exports = {box, chessPieces, fileToNum, numToFile, rankToNum, numToRank, createBoardDimensionObject, gcd}