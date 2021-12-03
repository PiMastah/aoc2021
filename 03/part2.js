const fs = require('fs');
const { EOL } = require('os');

const bits = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .map(l => l.split('').map(x => +x))

const mostCommonBitInPosition = (bits, position, roundUp = true) => {
  const sum = bits.map(bits => bits[position]).reduce((sum, x) => sum + x, 0);

  return roundUp
    ? sum >= bits.length / 2 ? 1 : 0
    : sum >= bits.length / 2 ? 0 : 1
}

let candidatesO2 = bits.filter(x => true);
let candidatesCO2 = bits.filter(x => true);

let index = 0;

while (candidatesO2.length > 1 || candidatesCO2.length > 1) {
  if (candidatesO2.length > 1) {
    const targetBitO2 = mostCommonBitInPosition(candidatesO2, index);
    candidatesO2 = candidatesO2.filter(bits => bits[index] == targetBitO2);
  }

  if (candidatesCO2.length > 1) {
    const targetBitCO2 = mostCommonBitInPosition(candidatesCO2, index, false);
    candidatesCO2 = candidatesCO2.filter(bits => bits[index] == targetBitCO2);
  }

  index++;
}

console.log(
  parseInt(candidatesO2[0].join(''), 2)
  * parseInt(candidatesCO2[0].join(''), 2)
)