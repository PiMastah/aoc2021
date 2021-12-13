const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)

const splits = input.map((p, i) => p.split(EOL))

const points = splits[0].map(l => l.split(',').map(x => +x))
const folds = splits[1].map(l => l.substr(11).split('=').map((x, i) => i > 0 ? +x : x))

const [dir, val] = folds[0]

const newPoints = points.map(([x, y]) => {
  let newX = x
  let newY = y
  if (dir == 'x' && val < x) {
    newX = x - 2 * Math.abs(x - val)
  }
  if (dir == 'y' && val < y) {
    newY = y - 2 * Math.abs(y - val)
  }
  return [newX, newY]
}).filter(([x, y], i, arr) => {
  return arr.findIndex(([a,b]) => a == x && b == y) == i
})

console.log(newPoints.length)