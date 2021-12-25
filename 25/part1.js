const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const maxY = input.length
const maxX = input[0].length

const step = g => {
  let newG = new Map()
  let moveCount = 0

  g.forEach((val, key) => {
    if (val == 'v') {
      newG.set(key, val)
      return
    }
    const [x, y] = key.split('/')
    const newX = (+x + 1) % maxX
    const k = `${newX}/${y}`
    if (!g.has(k)) {
      newG.set(k, val)
      moveCount++
    } else {
      newG.set(key, val)      
    }
  })

  g = newG
  newG = new Map()

  g.forEach((val, key) => {
    if (val == '>') {
      newG.set(key, val)
      return
    }
    const [x, y] = key.split('/')
    const newY = (+y + 1) % maxY
    const k = `${x}/${newY}`
    if (!g.has(k)) {
      newG.set(k, val)
      moveCount++
    } else {
      newG.set(key, val)      
    }
  })

  return [newG, moveCount]
}

let grid = input.reduce((m, l, y) => {  
  return l.split('').reduce((map, c, x) => {
    if (c == '.') return map
    map.set(`${x}/${y}`, c)
    return map
  }, m)
}, new Map())

let turn = 1


const print = g => {
  for (let y=0;y<maxY;y++) {
    let l = ''
    for (let x=0;x<maxX;x++) {
      if (g.has(`${x}/${y}`)) {
        l += g.get(`${x}/${y}`)
      } else {
        l += '.'
      }
    }
    console.log(l)
  }
}


while (true) {
  const res = step(grid)

  if (res[1] == 0) {
    console.log(turn)
    break
  }

  grid = res[0]

  turn++
}