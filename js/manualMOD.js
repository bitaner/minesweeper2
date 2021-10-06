'use strict'

function placeMines() {
    gDiy = true
    restart()
    noMines()
    showBoard()
}

function start() {
    hideBoard()
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    life()
    resetHints()
    showHScore()
    saveCurrState()
}

function noMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            currCell.isMine = false
            currCell.minesAroundCount = null
        }
    }
    renderBoard(gBoard)
}

function showBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            currCell.isShown = true
        }
    }
    renderBoard(gBoard)
}

function hideBoard() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            currCell.isShown = false
        }
    }
    renderBoard(gBoard)
}