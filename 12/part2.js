const fs = require('fs')
const { EOL } = require('os')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL).map(l => l.split('-')).reduce((connections, [start, finish]) => {
    if (!connections[start]) connections[start] = []
    if (!connections[finish]) connections[finish] = []
    connections[start].push(finish)
    connections[finish].push(start)
    return connections
  }, {})

const paths = []

class Node {
  constructor(id, parent) {
    this.id = id
    this.parent = parent
    this.path = parent ? [...parent.path, id] : [id]
    this.visited = parent ? Object.assign({}, parent.visited) : {}
    if (!this.visited[id]) this.visited[id] = 0
    this.visited[id] += 1
    this.canNotVisitAgain = false
    if (parent?.canNotVisitAgain || this.id >= 'a' && this.id <= 'zzzz' && this.visited[id] > 1) {
      this.canNotVisitAgain = true
    }
  }

  getPossibleSteps() {
    return input[this.id].filter(candidate => candidate !== 'start')
  }
}

const start = new Node('start', null)

const allowOneRepeat = true

const explore = node => {
  const options = node.getPossibleSteps()
  options.forEach(o => {
    if (o === 'end') {
      paths.push([...node.path, o])
      return
    }
    if (!node.visited[o] || o >= 'A' && o <= 'ZZZZ' ||  allowOneRepeat && !node.canNotVisitAgain) {
      const next = new Node(o, node)
      explore(next)
    }
  })
}

explore(start)

console.log(paths.length)