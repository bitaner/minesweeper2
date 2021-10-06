'use strict'

/// problem with returning to first move and then clicking again

function saveCurrState() {
    var board = copy(gBoard)
    var game =  Object.assign({}, gGame)
    var CurrState = {
        board: board,
        game: game
    }
    gLog.push(CurrState)

}

function undo() {
    if(gLog.length < 2){
        saveCurrState()
        return
    }
    gLog.pop()

    gBoard = gLog[gLog.length-1].board
    gGame = gLog[gLog.length-1].game
    renderBoard(gBoard)
    /// hints
    var elHints = document.querySelector('.hints')
    var hintsStr = `<div class="hint" onclick="hint(this)">🔍</div>`
    elHints.innerHTML = hintsStr.repeat(gGame.hints)
    // life
    life()
    // safeClick
    var safeClickDisplay = document.querySelector('.safeClick span')
    safeClickDisplay.innerHTML = gGame.safeClicks

}

function copy(aObject) {
    if (!aObject) {
      return aObject;
    }
  
    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? copy(v) : v;
    }
  
    return bObject;
}