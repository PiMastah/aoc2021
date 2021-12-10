const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const pairs = new RegExp('<>|{}|\\(\\)|\\[\\]', 'g')

const closingChars = ['>', '}', ']', ')']

const invalid = input.map(l => {
  let c = l
  let last = ''
  while (c !== last) {
    last = c
    c = c.replace(pairs, '')
  }
  return [l, c]
}).filter(([l, c]) => c != '' && closingChars.some(t => c.indexOf(t) > -1))

const score = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137
}

console.log(invalid.map(([l, s]) => s[s.search(/\]|\)|}|>/)]).reduce((s, c) => s+score[c], 0))