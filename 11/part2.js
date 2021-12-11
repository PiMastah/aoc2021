const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .reduce((a, l, y) => {
    l.split('').reduce((o, c, x) => {
      o[`${x}-${y}`] = [+c, false]
      return o
    }, a)
    return a
  }, {})

const splash = (o, x, y) => {
  o[`${x}-${y}`][1] = true
  for (let a = Math.max(0, x-1); a <= Math.min(x+1, 9); a++) {
    for (let b = Math.max(0, y-1); b <= Math.min(y+1, 9); b++) {
      o[`${a}-${b}`][0] += 1
      if (o[`${a}-${b}`][0] > 9 && !o[`${a}-${b}`][1]) {
        splash(o, a, b)
      }
    }
  }
}

const step = c => o => {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      o[`${x}-${y}`][0] += 1
      if (o[`${x}-${y}`][0] > 9 && !o[`${x}-${y}`][1]) {
        splash(o, x, y)
      }
    }
  }
  if (Object.values(o).every(x => x[1])) {
    c.allFlash = true
  }
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (o[`${x}-${y}`][0] > 9) {
        c.total += 1;
        o[`${x}-${y}`][0] = 0
        o[`${x}-${y}`][1] = false
      }
    }
  }
}

const count = {total: 0, allFlash: false}

const fn = step(count)

let grid = input
let steps = 0

while (!count.allFlash) {
  steps++
  fn(grid)
}

console.log(steps)