const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(s => +s.slice(-1))

const [p1Pos, p2Pos] = input

const r = []

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      r.push([i+1, j+1, k+1])
    }    
  }
}

const rolls = r.reduce((sums, c) => {
  const s  = c[0] + c[1] + c[2]
  if (!sums[s]) sums[s] = 0
  sums[s] += 1
  return sums
}, {})

const rollout = state => {
  const s = state.stringify()
  const mV = resultMap.get(s)
  if (mV) {
    return mV
  }

  const winner = state.getWinner()
  if (winner !== 0) {
    const w = [0, 0]
    if (winner == 1) {
      w[0] += 1
    } else {
      w[1] += 1
    }
    resultMap.set(s, w)
    return w
  }

  const wins = [0, 0]

  for (const r in rolls) {
    const roll = +r
    const s = state.clone().roll(roll)
    const w = rollout(s)

    wins[0] += w[0] * rolls[r]
    wins[1] += w[1] * rolls[r]
  }

  resultMap.set(state.stringify(), wins)

  return wins
}

class State {
  constructor(scoreP1, scoreP2, posP1, posP2, isP1) {
    this.scoreP1 = scoreP1
    this.scoreP2 = scoreP2
    this.posP1 = posP1
    this.posP2 = posP2
    this.isP1 = isP1
  }

  stringify() {
    return [this.scoreP1, this.scoreP2, this.posP1, this.posP2, this.isP1].join('//')
  }

  clone() {
    return new State(this.scoreP1, this.scoreP2, this.posP1, this.posP2, this.isP1)
  }

  roll(score) {
    if (this.isP1) {
      this.posP1 = (this.posP1 + score - 1) % 10 + 1
      this.scoreP1 += this.posP1
    } else {
      this.posP2 = (this.posP2 + score - 1) % 10 + 1
      this.scoreP2 += this.posP2
    }
    this.isP1 = !this.isP1

    return this
  }

  getWinner() {
    return this.scoreP1 > 20 ? 1 : this.scoreP2 > 20 ? -1 : 0
  }
}

const resultMap = new Map()

const initial = new State(0, 0, p1Pos, p2Pos, true)

const wins = rollout(initial)

console.log(Math.max(...wins))
