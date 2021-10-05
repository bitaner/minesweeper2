

function hint(elBtn) {
    gIsHint = true
    console.log(elBtn)
    elBtn.innerText = HINTCLICKED
    gHintClicked = elBtn
}

function hintGone(elBtn) {
    elBtn.style.display = 'none'

}

function hintCell(i, j) {
    var currCellsCondition = []
    for (var k = i - 1; k <= i + 1; k++) {
        for (var l = j - 1; l <= j + 1; l++) {
            if (k < 0 || k > gBoard.length - 1 || l < 0 || l > gBoard[k].length - 1) continue
            var coord = { k: k, l: l };
            var currCell = gBoard[coord.k][coord.l]
            currCellsCondition.push({ isShown: currCell.isShown, i: k, j: l })
            currCell.isShown = true
        }
    }
    console.log(currCellsCondition)
    setTimeout(returnCellToNormal, 1000, i, j, currCellsCondition)
    setTimeout(hintGone, 2000, gHintClicked)
    gIsHint = false
}

function returnCellToNormal(i, j, currCellsCondition) {
    for (var k = i - 1; k <= i + 1; k++) {
        for (var l = j - 1; l <= j + 1; l++) {
            if (k < 0 || k > gBoard.length - 1 || l < 0 || l > gBoard[k].length - 1) continue
            // var coord = { k: k, l: l }
            var currCell = gBoard[k][l]
            currCell.isShown = currCellsCondition[0].isShown
            currCellsCondition.splice(0, 1)
        }
    }
    renderBoard(gBoard)
}