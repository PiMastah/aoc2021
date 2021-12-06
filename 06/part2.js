const fs = require('fs')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(',')

const fish = input.reduce((o, c) => {
    if (!o[c]) o[c] = 0
    o[c] += 1
    return o
  }, {})

const days = '012345678'.split('')

const day = fish => {
  const newFish = {}

  days.forEach((d, i) => {
    newFish[((i+8)%9).toString()] = fish[d] || 0
  })

  newFish['6'] += fish['0'] || 0

  return newFish
}

let d = 0
let f = Object.assign({}, fish)

while (d < 256) {
  f = day(f)
  d++
}

console.log(Object.values(f).reduce((s, a) => s+a, 0))