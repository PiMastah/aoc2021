const fs = require('fs');
const { EOL } = require('os');

const result = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(x => +x)
  .reduce((counts, curr, i, arr) => { 
    if (i < 1) return counts
    return curr > arr[i-1] ? counts + 1 : counts 
  }, 0)

console.log(result)