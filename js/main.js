'use strict'

const MINE = '💣'
const AVATAR = '😀'
const EMPTY = ''
const FLAG = '🎈'

var gBoard
var gInterval
var gStartTime
var gFirstClick = true
var gWin


var gBegginer = {
    SIZE: 4,
    MINES: 2
}
var gMedium = {
    SIZE: 8,
    MINES: 12
}
var gExpert = {
    SIZE: 12,
    MINES: 30
}

var gLevel = {
    SIZE: gBegginer.SIZE,
    MINES: gBegginer.MINES
}

var gGame = {    ///// work with this!!!!
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

document.addEventListener('contextmenu', event => event.preventDefault()) // disable rightclick

function initGame() {
    // console.log('start')
    gGame.isOn = true
    gBoard = buildBoard(gLevel)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}


function buildBoard() {
    var SIZE = gLevel.SIZE
    var board = []
    var randCellNums = getRandCellNums(gLevel.MINES)
    var count = 0
    // console.log(randCellNums)
    for (var i = 0; i < SIZE; i++) {
        board.push([])
        for (var j = 0; j < SIZE; j++) {
            // var currCellLocation = { i: i, j: j }
            var cell = {
                minesAroundCount: null, /////
                isShown: false,
                isMine: false,
                isMarked: false
            }
            if(randCellNums.includes(count)){
                cell.isMine = true
            }
            board[i][j] = cell
            count++
        }
    }
    // var res = getCells(board)
    // locateMinesRandomly(gLevel.MINES, board)
    return board;
}


function setMinesNegsCount(gBoard) {  ///////
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
    renderBoard(gBoard)
}


function cellClicked(event, elCell, i, j) {
    if(!gGame.isOn) return
    if (gFirstClick) {
        startTime()
        gFirstClick = false
    }
    if (event.button === 0) {
        if (!gBoard[i][j].isMarked) {
            if (gBoard[i][j].isMine) {
                lose()
            } else {
                gBoard[i][j].isShown = true 
                gGame.shownCount ++
                elCell.innerText = gBoard[i][j].minesAroundCount
            }
        }
    }
    if (event.button === 2) {
        // console.log(2)
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        gGame.markedCount ++
    }
    checkGameOver()
    renderBoard(gBoard)
}

function checkWin() { //// fix win lose
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (!(currCell.isShown && !currCell.isMine || currCell.isMine && currCell.isMarked)) {
                return false
            }
        }
    }
    return true
}

function lose() {  //// fix win lose
    console.log('lose')
    ShowMines()
    clearInterval(gInterval)
    gGame.isOn = false
    var elRestart = document.querySelector('.restart')
        elRestart.style.display = 'block'
}

function checkGameOver() {  /// fix win lose
    if (checkWin()) {
        console.log('win')
        clearInterval(gInterval)
        gGame.isOn = false
        var elRestart = document.querySelector('.restart')
        elRestart.style.display = 'block'
    }
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

function expandShown(board, elCell, i, j) {  // not done yet

}

function renderBoard(board) { // can improve
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = 'cell cell' + i + '-' + j;
            if (cell.isShown) { /// cell is shown
                className += ' isShown'  /// not too good
                if (cell.isMine) {
                    strHTML += '<td class="' + className + '"  onmousedown="cellClicked(event, this,' + i + ' ,' + j + ' )" >' + MINE + '</td>' /// can edit nicer
                } else if (cell.minesAroundCount > 0) {
                    strHTML += '<td class="' + className + '"  onmousedown="cellClicked(event, this ,' + i + ' ,' + j + ' )" >' + cell.minesAroundCount + '</td>'
                } else if (!cell.minesAroundCount) {
                    strHTML += '<td class="' + className + '"  onmousedown="cellClicked(event, this ,' + i + ' ,' + j + ' )" ></td>'
                }
                // cell is hidden
            } else if (cell.isMarked) {
                strHTML += '<td class="' + className + '"  onmousedown="cellClicked(event, this ,' + i + ' ,' + j + ' )" >' + FLAG + '</td>'
            } else {
                strHTML += '<td class="' + className + '"  onmousedown="cellClicked(event, this ,' + i + ' ,' + j + ' )" ></td>'
            }

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
}

function isMineCell(coord) {
    return (gBoard[coord.i][coord.j].isMine === true) 
}


function restart(){
    initGame()
    resetTime()
    gFirstClick = true
    var elRestart = document.querySelector('.restart')
        elRestart.style.display = 'none'
}
/// stopped at func & feat support 3 game lvl.. divs and gVars already in place 