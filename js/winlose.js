'use strict'


function checkWin() {
    var cellCount = gLevel.SIZE ** 2
    if (gGame.markedCount + gGame.shownCount + 3 === cellCount + gGame.lives) {
        return true
    } else return false
}

function Win() {
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = WINNER
    clearInterval(gInterval)
    gGame.isOn = false
    highScore()
    // elRestart.style.display = 'block'
}

function lose() {
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = LOSER
    clearInterval(gInterval)
    gGame.isOn = false
    ShowMines()
}

