'use strict'

function moveMine(i, j) {
    var currCellLocation =  gBoard[i][j]
    var currCell = currCellLocation
    currCell.isMine = false
    var freeCellLocation = getFreeCell()
    var freeCell = gBoard[freeCellLocation.i][freeCellLocation.j]
    freeCell.isMine = true
    setMinesNegsCount(gBoard)
}

function ShowMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine) {
                currCell.isShown = true
            }
        }
    }
}