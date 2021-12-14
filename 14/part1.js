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

const step = t => t.split('').reduce((out, current, i, a) => {
  if (i +1 == a.length) return out + current
  return out + current + rules[current+a[i+1]]
}, '')

let turns = 10
let s = template

while (turns-- > 0) {
  s = step(s)
}

const counts = Object.values(s.split('').reduce((o, c) => {
  if (!o[c]) o[c] = 0
  o[c] += 1
  return o
}, {})).reduce((m, c) => {
  if (c > m[0]) m[0] = c
  if (c < m[1]) m[1] = c
  return m
}, [-Infinity, Infinity])

console.log(counts[0]-counts[1])