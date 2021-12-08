const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(' | ')[1].split(' '))

const targetLengths = [2,3,4,7]

const result = input.reduce((s, l) => s + l.filter(c => targetLengths.includes(c.length)).length, 0)

console.log(result)