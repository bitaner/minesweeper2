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


function initGame() {
    gGame.isOn = true
    gBoard = buildBoard(gLevel)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    life()
    resetHints()
}


function buildBoard() { 
    var SIZE = gLevel.SIZE
    var board = []
    var randCellNums = getRandCellNums(gLevel.MINES)
    var count = 0
    for (var i = 0; i < SIZE; i++) {
        board.push([])
        for (var j = 0; j < SIZE; j++) {
            // console.log('count' , count)
            var cell = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            if (randCellNums.includes(count)) {
                cell.isMine = true
                var idxOfCount = randCellNums.indexOf(count)
                // console.log('idx', idxOfCount)

            }
            board[i][j] = cell
            count++
        }
    }
    // var res = getCells(board)
    // locateMinesRandomly(gLevel.MINES, board)
    return board;
}


function cellClicked(event, elCell, i, j) { 
    if (!gGame.isOn || gBoard[i][j].isShown ) return
    if (gFirstClick) {
        startTime()
        gFirstClick = false
        if (gBoard[i][j].isMine) {
            moveMine( i, j)
        }
    }
    if (gIsHint) {
        hintCell(i, j)
    }
    if (event.button === 0) {
        if (!gBoard[i][j].isMarked) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isShown = true
                // console.log(gGame.lives)
                gGame.lives--
                life()
                if (gGame.lives === 0) {
                    lose()
                }
            } else {
                if (gBoard[i][j].minesAroundCount === 0) {
                    // console.log(' no one here')
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
    if(checkWin()){
        Win()
    }
    renderBoard(gBoard)
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
    elContainer.addEventListener('contextmenu', event => event.preventDefault())
    elContainer.innerHTML = strHTML;
}


function restart() {
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = AVATAR
    gGame.lives = 3
    gGame.hints = 3
    gGame.markedCount= 0
    gGame.shownCount= 0
    gGame.secsPassed = 0
    gFirstClick = true
    initGame()
    resetTime()
}


function changeLevel(elBtn) {
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

function life() { 
    var lifeBar = document.querySelector('span')
    lifeBar.innerText = LIFE.repeat(gGame.lives)
}
