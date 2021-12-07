const fs = require('fs')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(',')
  .map(x => +x)

let i = Math.min(...input)

let lastCost = Infinity
let currentCost = input.reduce((s, n) => {
    const f = Math.abs(n-i)
    return s + (f*f +f)/2;
}, 0);

while (lastCost >= currentCost) {
  lastCost = currentCost
  currentCost = input.reduce((s, n) => {
      const f = Math.abs(n-i)
      return s + (f*f +f)/2;
  }, 0);
  i++
}

console.log(lastCost)