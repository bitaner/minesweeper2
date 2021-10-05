'use strict'


//// page not connected
// shownCount: 0,
//     markedCount: 0,
//     secsPassed: 0,
//     lives: 3,
//     hints: 3


function checkWin() { //// fix win lose law about count cells = -mines - shown + lives
  var cellCount = gLevel.SIZE**2
  if (gGame.markedCount+gGame.shownCount + 3 === cellCount + gGame.lives){
      return true
  } else return false
}

function Win() { 
    var elRestart = document.querySelector('.restart')
        elRestart.innerText = WINNER
        clearInterval(gInterval)
        gGame.isOn = false
        var elRestart = document.querySelector('.restart')
        elRestart.style.display = 'block'
}

function lose() { 
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = LOSER
    clearInterval(gInterval)
    gGame.isOn = false
    ShowMines()
}

