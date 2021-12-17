const fs = require('fs')

const input = 
  fs.readFileSync('input.txt', 'utf8')

const [xRange, yRange] = input.slice(13).split(', ').map(p => p.slice(2).split('..').map(x=>+x))

Number.prototype.between = function ([a, b]) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return this >= min && this <= max;
};

const step = ([x, y], [vx, vy]) => {
  let newX = x + vx
  let newY = y + vy
  return [[newX, newY], [vx > 0 ? vx-1 : vx < 0 ? vx+1 : 0, vy-1]]
}

const willHit = (initialVs) => {
  let pos = [0, 0]
  let v = initialVs.map(x => +x)
  let inside = true
  let highestY = 0
  while (!pos[0].between(xRange) || !pos[1].between(yRange)) {
    [pos, v] = step(pos, v)
    highestY = Math.max(highestY, pos[1])
    if (pos[0] > xRange[1] || pos[1] < yRange[0]) {
      inside = false
      break
    }
  }
  return [inside, highestY, pos]
}

let c = 0

for (let x = 0; x <= xRange[1]; x++) {
  for (let y = yRange[0]; y <= -yRange[0]; y++) {
    const r = willHit([x, y])
    if (r[0]) c++
  }
}

console.log(c)
