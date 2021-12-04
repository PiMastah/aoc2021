const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const numbers = input[0].split(',').map(x => +x)

const re = new RegExp('[0-9]+', 'g')

const boards = input.slice(1).reduce((boards, line) => {
  if (line == '') {
    boards.push([])
  } else {
    boards[boards.length-1].push(line.match(re).map(x => +x))
  }
  return boards
}, [])

const checkBingo = board => {
  return board.find(row => row.every(number => number == -1))
  || board[0].map((_, colIndex) => board.map(row => row[colIndex])).find(row => row.every(number => number == -1))
}

const checkBingoTurns = numbers => board => {
  let b = board
  let i
  for (i=0; i<numbers.length; i++) {
    const n = numbers[i]
    b = b.map(row => row.map(x => x == n ? -1 : x))
    if (checkBingo(b)) break    
  }
  return [i + 1, b]
}

const fn = checkBingoTurns(numbers)

const result = boards.map(b => fn(b))

const maxTurns = Math.max(...result.map(x => x[0]))
const maxBoard = result.find(e => e[0] === maxTurns)

console.log(numbers[maxTurns-1] * maxBoard[1].flatMap(x => x).filter(x => x >=0).reduce((s, c)=>s+c, 0))