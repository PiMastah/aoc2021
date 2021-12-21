const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(s => +s.slice(-1))

let [p1Pos, p2Pos] = input

let d = 1
let p1Score = 0
let p2Score = 0

let rolls = 0

let isPlayer1 = true

while (p1Score < 1000 && p2Score < 1000) {
  const roll = d + (d) % 100 + (d+1) % 100 + 2
  rolls += 3
  if (isPlayer1) {
    p1Pos = (p1Pos + roll - 1) % 10 + 1
    p1Score += p1Pos
  } else {
    p2Pos = (p2Pos + roll - 1) % 10 + 1    
    p2Score += p2Pos
  }
  d = (d + 2) % 100 + 1
  isPlayer1 = !isPlayer1
}

console.log(Math.min(p1Score, p2Score) * rolls)