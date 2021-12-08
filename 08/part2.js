const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split(' | '))
  .map(([combos, outputs]) => [combos.split(' '), outputs.split(' ')])

const numbersToSegments = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',  
}

const segmentsToNumbers = Object.entries(numbersToSegments).reduce((o, [x, y]) => {
  o[y] = x
  return o
}, {})

const segmentFrequencies = {
  'a': 8,
  'b': 6,
  'c': 8,
  'd': 7,
  'e': 4,
  'f': 9,
  'g': 7
}

const fn = i => Object.values(i).flatMap(v => v.split('')).reduce((o, c) => {
  if (!o[c]) o[c] = 0
  o[c]+=1
  return o
}, {})

const result = input.reduce((sum, [patterns, numbers]) => {
  const lettersPerCount = Object.entries(fn(patterns)).reduce((o, [l, c]) => {
    if (!o[c]) o[c]=[]
    o[c].push(l)
    return o
  }, {})

  const segmentMapping = {
    'a': '',
    'b': lettersPerCount['6'][0],
    'c': '',
    'd': '',
    'e': lettersPerCount['4'][0],
    'f': lettersPerCount['9'][0],
    'g': ''
  }

  const coCounts7 = lettersPerCount['7'].map(l => fn(Object.values(patterns).filter(x => x.includes(l)).flatMap(x => x))[segmentMapping['e']])

  coCounts7.forEach((c, i) => {
    if (c == 3) segmentMapping['d'] = lettersPerCount['7'][i]
    if (c == 4) segmentMapping['g'] = lettersPerCount['7'][i]
  })

  const coCounts8 = lettersPerCount['8'].map(l => fn(Object.values(patterns).filter(x => x.includes(l)).flatMap(x => x))[segmentMapping['b']])

  coCounts8.forEach((c, i) => {
    if (c == 5) segmentMapping['a'] = lettersPerCount['8'][i]
    if (c == 4) segmentMapping['c'] = lettersPerCount['8'][i]
  })

  const inverseSegmentMapping = Object.entries(segmentMapping).reduce((o, [x, y]) => {
    o[y] = x
    return o
  }, {})

  const number = parseInt(numbers.map(s => segmentsToNumbers[s.split('').map(c => inverseSegmentMapping[c]).sort().join('')]).join(''), 10)

  return sum + number
}, 0);

console.log(result)