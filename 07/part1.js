const fs = require('fs')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(',')
  .map(x => +x)
  .sort((a, b) => a-b)

const lowMiddle = Math.floor((input.length - 1) / 2);
const highMiddle = Math.ceil((input.length - 1) / 2);

const median = (input[lowMiddle] + input[highMiddle]) / 2;

const sum = input.reduce((s, n) => {
    return s + Math.abs(n-median);
}, 0);

console.log(sum)