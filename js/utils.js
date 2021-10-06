'use strict'

/// try creating astand alone neg func to add conditions too

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
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
}

function getRandCellNums(howmany) {
    var randCellNums = []
    var count = gLevel.SIZE ** 2
    while (randCellNums.length < howmany) {
        var num = getRandomInt(0, count)
        if (!randCellNums.includes(num)) {
            randCellNums.push(num)
        }
    }
    return randCellNums
}

function getFreeCellLocation() {
    var freeCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (!currCell.isMine) {
                freeCells.push({ i: i, j: j })
            }
        }
    }
    var randNum = getRandomInt(0, freeCells.length)
    var randFreeCellLocation = freeCells[randNum]
    return randFreeCellLocation
}



