const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('').map(x => +x))

const lowPointCoords = input.flatMap((l, y, arr) => l.flatMap((v, x) => 
  (x == 0 || l[x-1] > v)
  && (l[x+1] === undefined || l[x+1] > v)
  && (y == 0 || arr[y-1][x] > v)
  && (arr[y+1] === undefined || arr[y+1][x] > v)
  ? [[x, y]] : []
))

const areaSizes = []

lowPointCoords.map(p => {
  const q = [p]

  let visitedCount = 0

  const visited = new Set()

  while (q.length > 0) {
    const [x, y] = q.pop()
    if (visited.has(`${x}-${y}`)) continue
    visited.add(`${x}-${y}`)
    visitedCount += 1

    if (x > 0 && input[y][x-1] != 9) !visited.has(`${x-1}-${y}`) && q.push([x-1, y])
    if (input[y][x+1] !== undefined && input[y][x+1] != 9) !visited.has(`${x+1}-${y}`) && q.push([x+1, y])
    if (y > 0 && input[y-1][x] != 9) !visited.has(`${x}-${y-1}`) && q.push([x, y-1])
    if (input[y+1] !== undefined && input[y+1][x] != 9) !visited.has(`${x}-${y+1}`) && q.push([x, y+1])
  }

  areaSizes.push(visited.size)
})

console.log(areaSizes.sort((a, b) => b-a).slice(0, 3).reduce((p, c) => p * c, 1))