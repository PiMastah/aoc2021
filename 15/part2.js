const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split('').map(x => +x))

const gw = input.length

const grid = input.reduce((g, l, y) => l.reduce((o, v, x) => {
  for (let j = 0; j<5;j++){
    for (let i = 0; i<5;i++){
      o[`${x+gw*i}-${y+gw*j}`] = {risk: (v + i + j - 1) % 9 + 1, x: x+gw*i, y: y+gw*j, cost: Infinity}
    }
  }
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

const q = [grid['0-0']]
const gridWidth = gw * 5 - 1

let cfn = (n1, n2) => n2.x + n2.y - n1.x - n1.y
const cfn2 = (n1, n2) => n2.cost - n1.cost

while (q.length > 0) {
  q.sort(cfn)
  const toExplore = fn(q.pop(), guess)
  const targetIndex = toExplore.indexOf(n => n.x == gridWidth && n.y == gridWidth)
  if (targetIndex > -1) (guess = toExplore[targetIndex].cost) && (cfn = cfn2)
  q.push(...toExplore)
}

for (let j = 0; j<5;j++){
  let out = ''
  for (let i = 0; i<5;i++){
    out += grid[`${2+i*10}-${0+j*10}`].risk
  }
}

console.log(grid[gridWidth+'-'+gridWidth].cost)
