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

const explore = path => {
  const node = path[path.length-1]
  if (node == 'end') return
  const possibilities = input[node]
  return possibilities
    .filter(target => target !== 'start' && target >= 'A' && target <= 'Z' || target == 'end' || !path.includes(target))
    .flatMap(target => explore([...path, target]))
}

const p = ['start']

console.log(explore(p).length)