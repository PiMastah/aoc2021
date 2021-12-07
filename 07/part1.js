const fs = require('fs')

const input = 
  fs.readFileSync('input.txt', 'utf8')
  .split(',')
  .map(x => +x)
  .sort((a, b) => a-b)

let lowMiddle = Math.floor((input.length - 1) / 2);
let highMiddle = Math.ceil((input.length - 1) / 2);

const median = (input[lowMiddle] + input[highMiddle]) / 2;

const sum = input.reduce((s, n) => {
    return s + Math.abs(n-median);
}, 0);

console.log(sum)