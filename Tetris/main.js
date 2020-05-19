'use strict';


const createField = (m, n, arr = []) => {
  for (let i = 0; i < m; i++) {
    arr.push(new Array(n).fill(0));
  }
  return arr;
};



class MovementsPiece {
  
  score = 0;
  
  lines = 0;
  
  level = 0;
  
  playfield = createField(20, 10);
  
  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  };

  

  checkErrors() {
    const playfield = this.playfield;
    const {x, y, blocks} = this.activePiece;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
        if (
        	blocks[Y][X] &&
        	((playfield[y + Y] === undefined || playfield[y + Y][x + X] === undefined) ||
        	playfield[y + Y][x + X])
        ) {
          return true;
        }
      }
    }
    return false;
  }
  
  movePieceDown() {
    this.activePiece.y += 1;
    if (this.checkErrors()) {
      this.activePiece.y -= 1;
      this.closePieceInField();
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;
    if (this.checkErrors()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceLeft() {
    this.activePiece.x -=1;
    if (this.checkErrors()) {
      this.activePiece.x += 1;
    }
  };

  turnPiece() {
    const blocks = this.activePiece.blocks;
    let newBlock = [[], [], []];
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].length; j++) {
        newBlock[i].push(blocks[blocks.length - 1 - j][i]);
      }
    }
    this.activePiece.blocks = newBlock;
    if (this.checkErrors()) {
      this.activePiece.blocks = blocks;
    }
  }

  closePieceInField() {
    let {x, y, blocks} = this.activePiece;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
      	  if (blocks[Y][X] == 1)
          this.playfield[y + Y][x + X] = '⛔';
          //this.playfield[y + Y][x + X] = blocks[Y][X];
      }
    };
    this.activePiece.y = 0;
    this.activePiece.x = 0;
  };
};



const tetra = new MovementsPiece();

const createGaps = (n) => {
  let gap = '';
  for (let i = 0; i < n-1; i++) {
    gap += ' '; 
  }
  return gap;
}

const showField = () => {
  const field = `
                     ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛                    ⬛
                     ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
  `
  return field;
}

const showPiece = () => {
  let {x, y, blocks} = tetra.activePiece;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
        if (blocks[Y][X] == 1) {
          const xCoor = 28 + x + X;
          const yCoor = 3 + y + Y;
          console.log(`\x1b[${yCoor};${xCoor}H` + '▮');        
        }
    }
  };
}

const fn = () => {
  console.clear();
  tetra.movePieceDown();
  console.log(showField());
  showPiece();    
  console.log('\x1b[25;10H');
}

setInterval(fn, 1000);



/*const readline = require('readline');

process.stdin.setRawMode(true);
//process.stdin.setEncoding('utf8');
process.stdin.on('data', c => {
  if (c == '\u0003') {
    console.log('SIGINT');
    process.exit();
  }
  if (c == '\u001b') {
    console.log('GG');
    process.exit();
  }
  console.log('got', c);
})
*/

/*const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question( name => {
  console.log('Hey');
  rl.close;
});
*/



const FIGURES = `
🐧🐧🐧🐧

🐧🐧🐧
🐧

🐧🐧🐧
  🐧

🐧🐧
🐧🐧

🐧🐧
  🐧🐧
`;

