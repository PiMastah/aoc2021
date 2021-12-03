const fs = require('fs');
const { EOL } = require('os');

const bits = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('').map(x => +x))

const transposedBits = bits[0].map((_, colIndex) => bits.map(row => row[colIndex]));

const mostCommonBits = 
  transposedBits.reduce(
    (bits, group) => bits.push(
      group.reduce(
        (sum, x) => sum + x,
        0
      ) > group.length / 2 ? 1 : 0) && bits,
    []
  );

console.log(
  parseInt(mostCommonBits.join(''), 2)
  * parseInt(mostCommonBits.map(x => x == 1 ? 0 : 1).join(''), 2)
)