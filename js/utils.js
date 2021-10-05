'use strict'

/// try creating astand alone neg func to add conditions too


function showNegs(i, j) {
    for (var k = i - 1; k <= i + 1; k++) {
        for (var l = j - 1; l <= j + 1; l++) {
            if (k < 0 || k > gBoard.length - 1 || l < 0 || l > gBoard[k].length - 1) continue
            if (k === i && l === j) continue
            var coord = { k: k, l: l };
            var currCell = gBoard[coord.k][coord.l]
            currCell.isShown = true
            gGame.shownCount++
        }
    }
}


function countNegs(cellCoord) {
    var negCount = 0
    for (var i = cellCoord.i - 1; i <= cellCoord.i + 1; i++) {
        for (var j = cellCoord.j - 1; j <= cellCoord.j + 1; j++) {
            if (i < 0 || i > gBoard.length - 1 || j < 0 || j > gBoard[i].length - 1) continue
            if (i === cellCoord.i && j === cellCoord.j) continue
            var coord = { i: i, j: j };
            // console.log('coord',coord);
            if (!gBoard[coord.i][coord.j].isMine) continue;
            negCount++
        }
    }
    return negCount
}

function getRandomCellLocations(board) { /// problem with combining cells
    var cellLocations = []

    var row = getRandomInt(0, board.length)
    var col = getRandomInt(0, board[row].length)
    // console.log('col , row',col , row)
    currCell = board[row][col]
    var currCellLocation = { i: row, j: col }
    return currCellLocation
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function startTime() {
    var elTimer = document.querySelector(".timer")
    gStartTime = Date.now()
    gInterval = setInterval(function () {
        var secCount = Math.floor((Date.now() - gStartTime) / 1000)
        if (secCount < 10) {
            elTimer.innerText = '00' + Math.floor((Date.now() - gStartTime) / 1000)
        } else if (secCount < 100) {
            elTimer.innerText = '0' + Math.floor((Date.now() - gStartTime) / 1000)
        } else {
            elTimer.innerText = Math.floor((Date.now() - gStartTime) / 1000)
        }
        gGame.secsPassed++
    }, 1)
}


function resetTime() {
    clearInterval(gInterval)
    var elTimer = document.querySelector(".timer")
    elTimer.innerText = '000'
    // elTimer.style.display = 'none'
}

function getRandCellNums(howmany) {
    var randCellNums = []
    var count = gLevel.SIZE * gLevel.SIZE
    for (var i = 0; i < howmany; i++) {
        var num = getRandomInt(0, count - 1)
        randCellNums.push(num)
        console.log(randCellNums.length)
        console.log(randCellNums)
    }
    return randCellNums
}
