const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL+EOL).map(s => s.split(EOL).slice(1).map(c => c.split(',').map(x => +x)))

const rotations = [[[1,0,0],[0,0,1],[0,-1,0]],[[0,0,1],[0,1,0],[-1,0,0]],[[0,1,0],[-1,0,0],[0,0,1]],[[1,0,0],[0,-1,0],[0,0,-1]],[[0,0,1],[-1,0,0],[0,-1,0]],[[0,1,0],[0,0,1],[1,0,0]],[[0,-1,0],[0,0,1],[-1,0,0]],[[-1,0,0],[0,1,0],[0,0,-1]],[[0,1,0],[0,0,-1],[-1,0,0]],[[-1,0,0],[0,-1,0],[0,0,1]],[[1,0,0],[0,0,-1],[0,1,0]],[[0,0,1],[0,-1,0],[1,0,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[-1,0,0],[0,0,-1]],[[-1,0,0],[0,0,-1],[0,-1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,0,-1],[0,-1,0],[-1,0,0]],[[0,0,-1],[0,1,0],[1,0,0]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,-1,0],[0,0,-1],[1,0,0]],[[0,0,-1],[-1,0,0],[0,1,0]],[[0,0,-1],[1,0,0],[0,-1,0]],[[1,0,0],[0,1,0],[0,0,1]]]

const multiply = (m, [x,y,z]) => {
  return [
    m[0][0]*x+m[0][1]*y+m[0][2]*z,
    m[1][0]*x+m[1][1]*y+m[1][2]*z,
    m[2][0]*x+m[2][1]*y+m[2][2]*z,
  ]
}

const translationVector = ([xTo, yTo, zTo], [xFrom, yFrom, zFrom]) => [xTo-xFrom,yTo-yFrom,zTo-zFrom]

const translate = (points, [xO, yO, zO]) => points.map(([x,y,z]) => [x+xO,y+yO,z+zO])

const matchScannerOrientations = scannerList => {
  let possibleOrigins = [scannerList[0]]

  const toMatch = scannerList.slice(1)

  while (toMatch.length > 0) {
    const candidate = toMatch.pop().slice(0)
    let match = false
    for (o in possibleOrigins) {
      const origin = possibleOrigins[o]
      for (i in rotations) {
        const r = rotations[i]
        const rotated = candidate.map(p => multiply(r, p))

        for (j in rotated) {
          const p1 = rotated[j]
          for (k in origin) {
            const p2 = origin[k]
            const v = translationVector(p2, p1)
            const testPoints = translate(rotated, v)

            match = testPoints.filter(([x,y,z]) => origin.find(([x2,y2,z2]) => x == x2 && y == y2 && z == z2)).length > 11

            if (match) {
              possibleOrigins.unshift(testPoints)
              break
            }
          }
          if (match) break
        }
        if (match) break
      }
      if (match) break
    }
    if (!match) toMatch.unshift(candidate)
  }

  return possibleOrigins
}

const pointGroups = matchScannerOrientations(input)

console.log(pointGroups.reduce((points, candidates) => {
  return candidates.reduce((s, [x,y,z]) => {
    s.add(`${x}/${y}/${z}`)
    return s
  }, points)
}, new Set()).size)