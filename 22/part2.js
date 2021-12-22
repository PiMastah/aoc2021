const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split(' ').map((c, i) => {
    if (i == 0) return c
    const coords = c.split(',').map(s => s.slice(2).split('..').map(x => +x)).reduce((o, c, i) => {
      let axis
      if (i == 0) axis = 'x'
      if (i == 1) axis = 'y'
      if (i == 2) axis = 'z'

      o[axis] = {
        'min': c[0],
        'max': c[1],
      }
      return o
    }, {})

    return coords
  }))

const overlap1D = (min1, max1, min2, max2) => [Math.max(min1, min2), Math.min(max1, max2)]
const v = c => (c.x.max - c.x.min + 1) * (c.y.max - c.y.min + 1) * (c.z.max - c.z.min + 1)

const overlapArea = (candidate, processed) => processed.map(cuboid => {
  const [xMin, xMax] = overlap1D(candidate.x.min, candidate.x.max, cuboid.x.min, cuboid.x.max)
  const [yMin, yMax] = overlap1D(candidate.y.min, candidate.y.max, cuboid.y.min, cuboid.y.max)
  const [zMin, zMax] = overlap1D(candidate.z.min, candidate.z.max, cuboid.z.min, cuboid.z.max)

  if (xMax - xMin >= 0 && yMax - yMin >= 0 && zMax - zMin >= 0) {
    const matchingCuboid = { x: { min: xMin, max: xMax }, y: { min: yMin, max: yMax }, z: { min: zMin, max: zMax } }

    return v(matchingCuboid) - overlapArea(matchingCuboid, processed.slice(1 + processed.indexOf(cuboid)))
  } else {
    return 0
  }
}).reduce((s, c) => s+c, 0)

const res = input.reverse().reduce((res, l) => {
  const [type, cuboid] = l
  let [processedCuboids, vol] = res

  if (type == 'on') {
    vol += v(cuboid) - overlapArea(cuboid, processedCuboids)
  }
  processedCuboids.push(cuboid)

  return [processedCuboids, vol]
}, [[], 0])

console.log(res[1])