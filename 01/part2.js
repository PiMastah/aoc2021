const fs  = require('fs');

const result = 
  fs.readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(x => +x)
  .reduce((counts, curr, i, arr) => { 
    if (i < 3) return counts
    return curr > arr[i-3] ? counts + 1 : counts 
  }, 0)

console.log(result)