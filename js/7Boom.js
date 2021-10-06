'use strict'

function sevenBoom() {
    var count = 1
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (!(count % 7 === 0)) {
                currCell.isMine = false
            } else {
                currCell.isMine = true
            }
            count++
        }
    }
    renderBoard(gBoard)
}


