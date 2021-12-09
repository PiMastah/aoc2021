const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('').map(x => +x))

const lowPointValues = input.flatMap((l, y, arr) => l.filter((v, x) => 
  (x == 0 || l[x-1] > v)
  && (l[x+1] === undefined || l[x+1] > v)
  && (y == 0 || arr[y-1][x] > v)
  && (arr[y+1] === undefined || arr[y+1][x] > v)
))

console.log(lowPointValues.reduce((sum, c) => sum + c + 1, 0))