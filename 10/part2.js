const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const pairs = new RegExp('<>|{}|\\(\\)|\\[\\]', 'g')

const closingChars = ['>', '}', ']', ')']

const incomplete = input.map(l => {
  let c = l
  let last = ''
  while (c !== last) {
    last = c
    c = c.replace(pairs, '')
  }
  return [l, c]
}).filter(([l, c]) => c != '' && !closingChars.some(t => c.indexOf(t) > -1))

const score = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4
}

const scores = incomplete.map(([l, c]) => c.split('').reverse().reduce((sum, c) => 5 * sum + score[c], 0)).sort((a,b) => a-b)

console.log(scores[Math.floor(scores.length / 2)])