'use strict'


function setMinesNegsCount(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine) {
                continue
            }
            var currCellLocation = { i: i, j: j }
            var currCellNegsCount = countNegs(currCellLocation)
            currCell.minesAroundCount = currCellNegsCount
        }
    }
}


function showNegs(i, j) {
    for (var k = i - 1; k <= i + 1; k++) {
        for (var l = j - 1; l <= j + 1; l++) {
            if (k < 0 || k > gBoard.length - 1 || l < 0 || l > gBoard[k].length - 1) continue
            if (k === i && l === j) continue
            var coord = { k: k, l: l }
            var currCell = gBoard[coord.k][coord.l]
            if (!currCell.isShown) {
                currCell.isShown = true
                // renderCell({i:k,j:l})
                gGame.shownCount++
            }
        }
    }
    renderBoard(gBoard)
}


function countNegs(cellCoord) {
    var negCount = 0
    for (var i = cellCoord.i - 1; i <= cellCoord.i + 1; i++) {
        for (var j = cellCoord.j - 1; j <= cellCoord.j + 1; j++) {
            if (i < 0 || i > gBoard.length - 1 || j < 0 || j > gBoard[i].length - 1) continue
            if (i === cellCoord.i && j === cellCoord.j) continue
            var coord = { i: i, j: j }
            if (!gBoard[coord.i][coord.j].isMine) continue
            negCount++
        }
    }
    return negCount
}