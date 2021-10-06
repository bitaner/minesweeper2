'use strict'


function safeClick() { /// bug can select shown cells and changes them to hidden
    gSafeClicked = true
    var randFreeCellLocation = getMarkCellLocation()
    var safeCell = gBoard[randFreeCellLocation.i][randFreeCellLocation.j]
    safeCell.isSafe = true
    var elCell = document.querySelector(`.cell${randFreeCellLocation.i}-${randFreeCellLocation.j}`)
    elCell.style.backgroundColor = 'blue'
    setTimeout(function () {
        elCell.style.backgroundColor = 'rgb(187, 108, 5)'
        gSafeClicked = false
        gGame.safeClicks--
        var safeClickDisplay = document.querySelector('.safeClick span')
        safeClickDisplay.innerHTML = gGame.safeClicks
    }, 2000)
}

function resetSafeClicks() {
    gGame.safeClicks = 3
    var safeClickDisplay = document.querySelector('.safeClick span')
    safeClickDisplay.innerHTML = gGame.safeClicks
}

function getMarkCellLocation() {
    var freeCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if ((!currCell.isMine) && (!currCell.isShown) && (!currCell.isMarked)) {
                freeCells.push({ i: i, j: j })
            }
        }
    }
    var randNum = getRandomInt(0, freeCells.length)
    var randFreeCellLocation = freeCells[randNum]
    return randFreeCellLocation
}