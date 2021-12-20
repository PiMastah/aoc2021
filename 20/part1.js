const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL+EOL)

const [lookup, inputImage] = input

let base = '.'

let grid = inputImage.split(EOL).reduce((grid, line, y) => {
  return line.split('').reduce((g, c, x) => {
    if (g[`${x}/${y}`] !== base) g[`${x}/${y}`] = c
    return g
  }, grid)
}, {})

let turns = 0

const getPixelAt = g => (x, y) => {
  let n = ''
  for (let j = y-1; j < y+2; j++) {
    for (let i = x-1; i < x+2; i++) {
      n += (g[`${i}/${j}`] || base) === '#' ? '1' : '0' 
    }
  }
  return lookup[parseInt(n, 2)]
}

const step = g => {
  const fn = getPixelAt(g)
  return Object.keys(g).reduce((newGrid, p) => {
    const [x, y] = p.split('/').map(x => +x)
    if (g[`${x}/${y}`] !== base) {
      for (let j = y-1; j < y+2; j++) {
        for (let i = x-1; i < x+2; i++) {
          if (!newGrid[`${i}/${j}`]) newGrid[`${i}/${j}`] = fn(i, j)
        }
      }      
    } 
    return newGrid
  }, {})
}

while (turns++ < 2) {
  grid = step(grid)
  if (base == '.' && lookup[0] == '#') {
    base = '#'
  } else if (base == '#' && lookup[511] == '.') {
    base = '.'
  }
}

console.log(Object.values(grid).filter(c => c == '#').length)
