'use strict'


///     consts


const MINE = '💣'
const AVATAR = '😀'
const LOSER = '😓'
const WINNER = '😎'
const EMPTY = ''
const FLAG = '🎈'
const LIFE = '🦾'
const HINT = '🔍'
const HINTCLICKED = '🔎'

///     global vars

var gBoard
var gInterval
var gStartTime
var gFirstClick = true
var gWin
var gIsHint
var gHintClicked


var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {    ///// work with this!!!!
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3,
    hints: 3
}

///     funcs

document.addEventListener('contextmenu', event => event.preventDefault()) // disable rightclick
// maybe on html itself?

function initGame() {
    // console.log('start')
    gGame.isOn = true
    gBoard = buildBoard(gLevel)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    lives()
}


function buildBoard() { /// problem with mine creation // first click is never a mine
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
            if (randCellNums.includes(count)) {
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


function cellClicked(event, elCell, i, j) { /// check for cahnge to cell marked func cellMarked(elCell) 
    if (!gGame.isOn) return
    if (gIsHint) {
        hintCell(i, j)
    }
    if (gFirstClick) {
        startTime()
        gFirstClick = false
    }
    if (event.button === 0) {
        if (!gBoard[i][j].isMarked) {
            if (gBoard[i][j].isMine) {
                gGame.lives--
                gBoard[i][j].isShown = true
                console.log(gGame.lives)
                lives()
                if (gGame.lives === 0) {
                    lose()
                }
            } else {
                if (gBoard[i][j].minesAroundCount === 0) {
                    console.log(' no one hear')
                    gBoard[i][j].isShown = true
                    showNegs(i, j)
                    gGame.shownCount++ ///////

                } else {
                    gBoard[i][j].isShown = true
                    gGame.shownCount++
                    elCell.innerText = gBoard[i][j].minesAroundCount
                }
            }
        }
    }
    if (event.button === 2) {
        // console.log(2)
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        gGame.markedCount++
    }
    checkGameOver()
    renderBoard(gBoard)
}

function checkWin() { //// fix win lose law about count cells = -mines - shown + lives
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
    elRestart.innerText = LOSER
}

function checkGameOver() {  /// fix win lose
    if (checkWin()) {
        console.log('win')
        var elRestart = document.querySelector('.restart')
        elRestart.innerText = WINNER
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


function restart() {
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = AVATAR
    gGame.lives = 3
    gFirstClick = true
    initGame()
    resetTime()
}
 

function changeLevel(elBtn) {
    // console.log(elBtn.innerText)
    switch (elBtn.innerText) {
        case 'Beginner':
            console.log(1)
            gLevel = {
                SIZE: 4,
                MINES: 2
            }
            break
        case 'Medium':
            console.log(2)
            gLevel = {
                SIZE: 8,
                MINES: 12
            }
            break
        case 'Expert':
            console.log(3)
            gLevel = {
                SIZE: 12,
                MINES: 30
            }
    }
    restart()
}

function lives() { // not too good need to reset when restart
    console.log('life')
    var lifeBar = document.querySelector('span')
    lifeBar.innerText = LIFE.repeat(gGame.lives)
}
