const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL + EOL)

const [template, r] = input

const rules = r.split(EOL).reduce((o, l) => {
  const [from, to] = l.split(' -> ')
  o[from] = to
  return o
}, {})

const step = pairs => {
  const newPairs = {}

  for (pair in pairs) {
    const count = (pairs[pair])
    const insertion = rules[pair]
    if (!newPairs[pair[0]+insertion]) newPairs[pair[0]+insertion] = (0)
    if (!newPairs[insertion+pair[1]]) newPairs[insertion+pair[1]] = (0)
    newPairs[pair[0]+insertion] += count
    newPairs[insertion+pair[1]] += count
  }

  return newPairs
}

let turns = 40
let s = template.split('').reduce((pairs, c, i, a) => {
  if (i+1 == a.length) return pairs
  const pair = c + a[i+1]
  if (!pairs[pair]) pairs[pair] = 0
  pairs[pair] += 1
  return pairs  
}, {})

while (turns-- > 0) {
  s = step(s)
}

const counts = Object.values(Object.entries(s).reduce((o, [k, v]) => {
  const [l1, l2] = k.split('')
  if (!o[l1]) o[l1] = 0
  if (!o[l2]) o[l2] = 0
  o[l1] += v/2
  o[l2] += v/2

  return o
}, {})).reduce((m, c) => {
  if (c > m[0]) m[0] = c
  if (c < m[1]) m[1] = c
  return m
}, [-Infinity, Infinity])

console.log(Math.round(counts[0] - counts[1]))