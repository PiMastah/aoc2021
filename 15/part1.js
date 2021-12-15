const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split('').map(x => +x))

const grid = input.reduce((g, l, y) => l.reduce((o, v, x) => {
  o[`${x}-${y}`] = {risk: v, x, y, cost: Infinity}
  return o
}, g), {})

const explore = grid => (node, bestGuess) => {
  if (node.cost > bestGuess) return []

  const neighbors = [[node.x-1, node.y],[node.x+1, node.y],[node.x, node.y-1],[node.x, node.y+1]].filter(([x, y]) => grid[`${x}-${y}`] !== undefined)

  const toExplore = neighbors.map(([x, y]) => grid[`${x}-${y}`]).filter(n => node.cost + n.risk < n.cost)

  toExplore.forEach(n => n.cost = node.cost + n.risk)

  return toExplore
}

const fn = explore(grid)

grid['0-0'].cost = 0
guess = Infinity

const gridWidth = input.length-1

const q = [grid['0-0']]

while (q.length > 0) {
  q.sort((n1, n2) => n2.cost - n1.cost)
  const toExplore = fn(q.pop(), guess)
  const targetIndex = toExplore.indexOf(n => n.x == gridWidth && n.y == gridWidth)
  if (targetIndex > -1) guess = toExplore[targetIndex].cost
  q.push(...toExplore)
}

console.log(grid[gridWidth+'-'+gridWidth].cost)