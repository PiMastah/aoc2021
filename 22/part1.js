const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').map((c, i) => {
    if (i == 0) return c
    const coords = c.split(',').map(s => s.slice(2).split('..').map(x => +x))
    return coords
  }))

const grid = input.reduce((g, instruction) => {
  const [type, coords] = instruction

  const [[minX, maxX], [minY, maxY], [minZ, maxZ]] = coords

  if (-50 <= maxX && minX <= 50 && -50 <= maxY && minY <= 50 && -50 <= maxZ && minZ <= 50) {
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          g[`${x}//${y}//${z}`] = type == 'on' ? 1 : 0
        }
      }    
    }
  }

  return g
}, {})

console.log(Object.values(grid).filter(x => x == 1).length)