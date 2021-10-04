'use strict'

function countNegs(cellCoord) {
    var res = []
    for(var i = cellCoord.i-1 ; i <= cellCoord.i+1 ; i++){ 
        for(var j = cellCoord.j -1 ; j <= cellCoord.j+1 ; j++){ 
            if(i < 0 || i > gBoard.length-1 || j < 0 || j > gBoard[i].length-1 ) continue
            if( i === cellCoord.i && j === cellCoord.j ) continue
            var coord = { i: i, j: j };
            // console.log('coord',coord);
            if (!isMineCell(coord)) continue;
            res.push(coord);
        }
    } 
    return res
}

function isMineCell(coord) {
    return (gBoard[coord.i][coord.j].isMine === true) 
}


function getRandomFreeCellLocation(board) {
    var currCell = null
    var row = getRandomInt(0, board.length)
    var col = getRandomInt(0, board[row].length)
    // console.log('col , row',col , row)
    currCell = board[row][col]
    var currCellLocation = { i: row, j: col }
    return currCellLocation
}

function getRandomInt(min, max){
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min) + min);
}



function startTime() {
    var elTimer = document.querySelector(".timer")
    gStartTime = Date.now()
    gInterval = setInterval(function () {
        var secCount = Math.floor((Date.now() - gStartTime)/1000)
        if(secCount< 10){
            elTimer.innerText ='00' + Math.floor((Date.now() - gStartTime)/1000)
        } else if(secCount < 100) {
            elTimer.innerText ='0' + Math.floor((Date.now() - gStartTime)/1000)
        } else {
            elTimer.innerText =Math.floor((Date.now() - gStartTime)/1000)
        } 
    } , 1)
}


function resetTime() {
    var elTime = document.getElementById("time")
    var elTimer = document.querySelector('.timer')
    clearInterval(gInterval)
    elTime.innerText = 0
    elTimer.style.display = 'none'
}