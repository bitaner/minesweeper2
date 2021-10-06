'use strict'

function showHScore() {
  var highScoreDisplay = document.querySelector('.Hscore')
  highScoreDisplay.innerText = gLevel.HIGHSCORE
  var bestPlayerNameDisplay = document.querySelector('.Hname')
  bestPlayerNameDisplay.innerText = gLevel.HIGHSCORENAME
}

function score() {
  var scoreDisplay = document.querySelector('.scoreDis')
  scoreDisplay.innerText = gGame.score
}

function highScore() {
  switch (gLevel.SIZE + '') {
    case '4':
      if (gGame.score >= gLevel.HIGHSCORE) {
        var highScoreLocalStorage = ''
        localStorage.setItem("1 BEST PLAYER NAME", prompt('best score! type your name please'))
        document.querySelector('.Hname').innerText = localStorage.getItem('1 BEST PLAYER NAME')
        gLevel.HIGHSCORE = gGame.score
        highScoreLocalStorage += gLevel.HIGHSCORE
        localStorage.setItem("1 HIGH SCORE", highScoreLocalStorage)
        var highScoreDisplay = document.querySelector('.Hscore')
        highScoreDisplay.innerText = localStorage.getItem('1 HIGH SCORE')
      }
      break
    case '8':
      console.log('2')
      if (gGame.score >= gLevel.HIGHSCORE) {
        var highScoreLocalStorage = ''
        localStorage.setItem("2 BEST PLAYER NAME", prompt('best score! type your name please'))
        document.querySelector('.Hname').innerText = localStorage.getItem('2 BEST PLAYER NAME')
        gLevel.HIGHSCORE = gGame.score
        highScoreLocalStorage += gLevel.HIGHSCORE
        localStorage.setItem("2 HIGH SCORE", highScoreLocalStorage)
        var highScoreDisplay = document.querySelector('.Hscore')
        highScoreDisplay.innerText = localStorage.getItem('2 HIGH SCORE')
      }
      break
    case '12':
      console.log('3')
      if (gGame.score >= gLevel.HIGHSCORE) {
        var highScoreLocalStorage = ''
        localStorage.setItem("3 BEST PLAYER NAME", prompt('best score! type your name please'))
        document.querySelector('.Hname').innerText = localStorage.getItem('3 BEST PLAYER NAME')
        gLevel.HIGHSCORE = gGame.score
        highScoreLocalStorage += gLevel.HIGHSCORE
        localStorage.setItem("3 HIGH SCORE", highScoreLocalStorage)
        var highScoreDisplay = document.querySelector('.Hscore')
        highScoreDisplay.innerText = localStorage.getItem('3 HIGH SCORE')
      }
  }
}

