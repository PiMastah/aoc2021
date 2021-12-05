const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(' -> ').map(p => p.split(',').map(x => +x)))

const result = input
  .reduce((points, [[x, y], [a, b]]) => {
    if (x == a && y != b) {
      if (!points[x]) points[x] = {}
      const bigger = y > b ? y : b
      const smaller = y > b ? b : y
      for (let i=smaller; i <= bigger; i++) {
        if (!points[x][i]) points[x][i] = 0
        points[x][i] += 1
      }
    } else if (y == b && x != a) {
      const bigger = x > a ? x : a
      const smaller = x > a ? a : x
      for (let i=smaller; i <= bigger; i++) {
        if (!points[i]) points[i] = {}
        if (!points[i][y]) points[i][y] = 0
        points[i][y] += 1
      }
    } else {
      const xDir = x > a ? -1 : 1
      const yDir = y > b ? -1 : 1
      for (let i = x, j = y; i != a + xDir; i += xDir, j += yDir) {
        if (!points[i]) points[i] = {}
        if (!points[i][j]) points[i][j] = 0
        points[i][j] += 1
      }
    }
    return points
  }, {})

console.log(Object.values(result).flatMap(a => Object.values(a)).filter(x => x > 1).length)