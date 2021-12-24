const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const instructions = input.reduce((i, line) => {
  const parts = line.split(' ')
  i.push([parts[0], ...parts.slice(1).map(x => +x == x ? +x : x)])
  return i
}, [])

const batches = instructions.reduce((b, instruction) => {
  if (instruction[0] == 'inp') b.push([])
  b[b.length-1].push(instruction)
  return b
}, []).map(b => [b[5][2],b[15][2]])

const s = []

let n = '.'.repeat(14).split('')
batches.forEach(([c, o], i) => {
  if (c>0) s.push([o, i])
  if (c<0) {
    const [off, from] = s.pop()
    const d = off + c
    if (d > 0) {
      n[from] = 9 - d
      n[i] = 9
    } else {
      n[from] = 9
      n[i] = 9+d
    }
  }
})

console.log(n.join(''))