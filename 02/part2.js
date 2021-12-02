const fs = require('fs');
const { EOL } = require('os');

const result = 
  fs.readFileSync('input.txt', 'utf8')
  .split(EOL)
  .reduce((pos, current) => {
    const [dir, amount] = current.split(' ');

    switch (dir) {
      case 'forward':
        pos.x += +amount;
        pos.y += pos.aim * +amount;
        break;
      case 'down':
        pos.aim += +amount;
        break;
      case 'up':
        pos.aim -= +amount;
        break;
    }


    return pos
   }, {x: 0, y: 0, aim: 0})

 console.log(result.x * result.y)
