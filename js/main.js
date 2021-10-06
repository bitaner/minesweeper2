'use strict'

// hello dear METARGEL!

// i stopped at the safe click part

// i have a major problem in my code:
// i am useing render board at each turn...
// by the time i noticed it was after alot of phases and i cant figure out how to revarse it
// with out starting from the top....
// i tried for half a day and then gave up and kept moving forward
// tommorow is a new day and i hope to fix it by then....
// besides that the game logic works perfect as far as i can see
//  ...i tried my best to keep things in order and easy to understand the flow
// hope you enjoy going over it and playing...

// THANK YOU! 2 MONTHS AGO I DIDN'T KNOW WHAT CONSOLE.LOG MEANS :) 


/// recursion     -----  dddddoooonnnnneeeeee
/// 7boom    -----   dddddoooonnnnneeeeee 
/// mannualy place mines   -----   dddooonnneeee
/// safeClick   -----   ddddooooonnnneeeee 
/// high score    -----  dddddooooonnnnneeee
/// css ok for me.... nothing fancy
/// undo not perfect
/// go through code and re organize - short ifs, smarter funcs, no repeats on code 


///     consts


const MINE = '💣'
const AVATAR = '😀'
const LOSER = '😓'
const WINNER = '😎'
const EMPTY = ''
const FLAG = '🚩'
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
var gSafeClicked
var gLog = []
var gDiy
var gDiyCount = 0


var gLevel = {
    SIZE: 4,
    MINES: 2,
    HIGHSCORE: parseInt(localStorage.getItem('1 HIGH SCORE')),
    HIGHSCORENAME: localStorage.getItem('1 BEST PLAYER NAME')
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3,
    hints: 3,
    safeClicks: 3,
    score: 0
}

///     funcs


function initGame() {
    gGame.isOn = true
    gBoard = buildBoard(gLevel)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    life()
    resetHints()
    showHScore()
    saveCurrState()
}


function buildBoard() {
    var SIZE = gLevel.SIZE
    var board = []
    var randCellNums = getRandCellNums(gLevel.MINES)
    var count = 0
    for (var i = 0; i < SIZE; i++) {
        board.push([])
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false,
                isSafe: false
            }
            if (randCellNums.includes(count)) {
                cell.isMine = true
                var idxOfCount = randCellNums.indexOf(count) ////
            }
            board[i][j] = cell
            count++
        }
    }
    return board
}

function cellClicked(event, elCell, i, j) {
    var location = { i: i, j: j }
    if (gDiy) {
        if (gDiyCount === gLevel.MINES) {
            gDiy = false
            start()
            return
        }
        gBoard[i][j].isMine = true
        renderBoard(gBoard)
        gDiyCount++


    }
    if (!gGame.isOn || gBoard[i][j].isShown || gSafeClicked) return
    if (gFirstClick) {
        startTime()
        gFirstClick = false
        if (gBoard[i][j].isMine) {
            moveMine(i, j)
        }
    }
    if (gIsHint) {
        hintCell(i, j)
    }
    if (event.button === 0) {
        if (!gBoard[i][j].isMarked) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isShown = true
                gGame.lives--
                gGame.score -= 5
                life()
                if (gGame.lives === 0) {
                    lose()
                    gGame.score = 0
                }
            } else {
                if (gBoard[i][j].minesAroundCount === 0) {
                    // console.log(' no one here')
                    gBoard[i][j].isShown = true
                    showNegs(i, j)
                    gGame.shownCount++
                    gGame.score++ ///////

                } else {
                    gBoard[i][j].isShown = true
                    gGame.shownCount++
                    gGame.score++
                    elCell.innerText = gBoard[i][j].minesAroundCount // do i need this?
                }
            }
        }
    }
    if (event.button === 2) {
        markCell(i, j)

    }
    if (checkWin()) {
        gGame.score += 10
        Win()
    }
    score()
    renderBoard(gBoard)
    saveCurrState()
}


function expandShown(board, elCell, i, j) {  // not used at all

}


function renderBoard(board) { // big problem
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = 'cell cell' + i + '-' + j
            if (cell.isShown) { /// cell is shown
                className += ' isShown'
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
    strHTML += '</tbody></table>'
    var elContainer = document.querySelector('.board-container')
    elContainer.addEventListener('contextmenu', event => event.preventDefault())
    elContainer.innerHTML = strHTML
}


function restart() {
    var elRestart = document.querySelector('.restart')
    elRestart.innerText = AVATAR
    gGame.lives = 3
    gGame.hints = 3
    gGame.markedCount = 0
    gGame.shownCount = 0
    gGame.secsPassed = 0
    gFirstClick = true
    gGame.score = 0
    resetSafeClicks()
    initGame()
    resetTime()
    score()
}


function changeLevel(elBtn) {
    switch (elBtn.innerText) {
        case 'Beginner':
            gLevel = {
                SIZE: 4,
                MINES: 2,
                HIGHSCORE: parseInt(localStorage.getItem('1 HIGH SCORE')),
                HIGHSCORENAME: localStorage.getItem('1 BEST PLAYER NAME')
            }
            break
        case 'Medium':
            gLevel = {
                SIZE: 8,
                MINES: 12,
                HIGHSCORE: parseInt(localStorage.getItem('2 HIGH SCORE')),
                HIGHSCORENAME: localStorage.getItem('2 BEST PLAYER NAME')
            }
            break
        case 'Expert':
            gLevel = {
                SIZE: 12,
                MINES: 30,
                HIGHSCORE: parseInt(localStorage.getItem('3 HIGH SCORE')),
                HIGHSCORENAME: localStorage.getItem('3 BEST PLAYER NAME')
            }
    }
    restart()
}

function life() {
    var lifeBar = document.querySelector('.lives')
    lifeBar.innerText = LIFE.repeat(gGame.lives)
}

function markCell(i, j) {
    if (gBoard[i][j].isMarked) { /// unmark cell
        gBoard[i][j].isMarked = false
        gGame.markedCount--
    } else if (gGame.markedCount === gLevel.MINES) {
        alert('NO FLAGS LEFT')
        return
    } else {
        gBoard[i][j].isMarked = true /// mark cell
        gGame.markedCount++
        gGame.score += 5
    }
}

var scoreDisplay = document.querySelector('.scoreDis')
scoreDisplay.innerText = gGame.score /// where should i place this?

