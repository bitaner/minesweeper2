'use strict'

var gCellId = 0  // check if needed
const MINE = '💣'
const AVATAR = '😀'
const EMPTY = ''
const FLAG = '🎈'

var gBoard
var gInterval
var gStartTime
var gFirstClick = true
var gWin

// A Matrix 
// containing cell objects:
// Each cell: {
//  minesAroundCount: 4,
//  isShown: true,
//  isMine: false,
//  isMarked: true //// change this!
var gBegginer = {
    SIZE:4,
    MINES: 2
}
var gMedium = {
    SIZE:8,
    MINES: 12
}
var gExpert = {
    SIZE:12,
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

// document.addEventListener("contextmenu", function(e){
//     e.preventDefault();
// }, false);

function initGame() {
    console.log('start')
    gBoard = buildBoard(gBegginer)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}


function buildBoard() {
    var SIZE = gLevel.SIZE
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                cellId: gCellId,
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            // if (i === 1 && j === 1 || i === 3 && j === 3) {
            //     cell.isMine = true
            // }
            board[i][j] = cell
            gCellId++ // check if necess
        }
    }
    locateMinesRandomly(gLevel.MINES, board)
    return board;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (currCell.isMine) { // check double ()
                continue
            }
            var currCellLocation = { i: i, j: j }
            // console.log(currCell)
            var currCellNegsCount = countNegs(currCellLocation)
            // console.log(currCellNegsCount)
            var howMany = currCellNegsCount.length   /// fix this to count no need for  []
            // console.log(howMany)
            currCell.minesAroundCount = howMany
            // var elCurrCell = document.querySelector(`.cell${i}-${j}`)
            // if (howMany > 0) {
            //     elCurrCell.innerText = howMany
            // }
        }
    }
    renderBoard(gBoard)
}



function cellClicked(event, elCell, i, j) {
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
                elCell.innerText = gBoard[i][j].minesAroundCount
            }
        }
    }
    if (event.button === 2) {
        // console.log(2)
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    }
    checkGameOver()
    renderBoard(gBoard)
}

function checkWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            // win === currcell isShown + !isMine && currCell ismine is marked
            if (!(currCell.isShown && !currCell.isMine || currCell.isMine && currCell.isMarked)) {
                return false
            }
        }
    }
    return true
}

function lose(){
    console.log('lose')
    ShowMines()
    clearInterval(gInterval)
}

function checkGameOver() {
    if (checkWin()) {
        console.log('win')
        clearInterval(gInterval)
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

function expandShown(board, elCell, i, j) {

}


function renderBoard(board) {
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

function locateMinesRandomly(num, board) { /// mines can combine... fix!
    for (var i = 0; i < num; i++) {
        var currCellLocation = getRandomFreeCellLocation(board)
        var currCell = board[currCellLocation.i][currCellLocation.j]
        currCell.isMine = true
        // console.log(currCell)
    }
}

// function changeLevel(elBtn){
//     console.log('restart')
//     var txt =g elBtn.innerText
//     gBoard = buildBoard('g'+txt)
//     setMinesNegsCount(gBoard)
//     renderBoard(gBoard)
// }