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
        break;
      case 'down':
        pos.y += +amount;
        break;
      case 'up':
        pos.y -= +amount;
        break;
    }

    console.log(pos)
    return pos
   }, {x: 0, y: 0})

 console.log(result.x * result.y)
