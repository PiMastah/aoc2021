const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)

const add = (p1, p2) => {
  return reduce(`[${p1},${p2}]`)
}

const testNesting = s => {
  let d = 0, i = 0
  let found = false
  for (;i<s.length;i++) {
    if (s[i] == '[') d++
    if (s[i] == ']') d--
    if (d > 4 && s[i+1] !== '[') {
      found = true
      break
    }
  }
  return [found, i+1]
}

const reduce = n => {
  let s = n
  while (true) {
    const [match, index] = testNesting(s)
    const match10Plus = s.match(/\d{2,}/)
    if (match == false && match10Plus == null) break
    if (match == true) {
      const target = s.substr(index, s.indexOf(']', index) - index)
      const left = s.substr(0, index-1)
      const right = s.substr(index + target.length + 1)
      const [x, y] = target.split(',').map(x=>+x)
      const leftNum = [...left].reverse().join('').match(/\d+/)
      const rightNum = right.match(/\d+/)
      let newStr = ''
      if (leftNum === null) {
        newStr += left
      } else {
        const i = leftNum.index
        const l = left.length
        const n = x + parseInt([...leftNum[0]].reverse().join(''), 10)
        newStr += left.substr(0, l - i - leftNum[0].length) + n + left.substr(l-i)
      }
      newStr += 0
      if (rightNum === null) {
        newStr += right
      } else {
        const i = rightNum.index
        const l = right.length
        const n = y + parseInt(rightNum[0], 10)
        newStr += right.substr(0, i) + n + right.substr(i+rightNum[0].length)
      }
      s = newStr
    } else {
      const i = match10Plus.index
      const l = match10Plus[0].length
      const n = parseInt(match10Plus[0], 10)
      s = s.substr(0, i) + `[${Math.floor(n/2)},${Math.ceil(n/2)}]` + s.substr(i+l)
    }
  }

  return s
}

const mag = s => s.length ? 3*mag(s[0]) + 2*mag(s[1]) : +s

const result = input.reduce((n, c) => add(n, c))

console.log(mag(JSON.parse(result)))