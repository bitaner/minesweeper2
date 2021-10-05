'use strict'


function safeClick() {
    console.log('hello')
    gSafeClicked = true
    var randFreeCellLocation = getFreeCellLocation()
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
