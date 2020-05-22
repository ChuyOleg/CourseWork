'use strict';


const typeFigures = [
[
  [0, 1, 0],
  [1, 1, 1],
  [0, 0, 0]
],
[
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 0]
],
[
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0]
],
[
  [1, 1, 1],
  [1, 0, 0],
  [0, 0, 0]
],
[
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
];

const shapeFigures = ['🆗', '🆘', '🆚', '🆔', '🦠'];

const randomFrom0To4 = () => {
  const result = Math.floor((Math.random() * 5)); 
  return result;
};


const createField = (m, n, arr = []) => {
  for (let i = 0; i < m; i++) {
    arr.push(new Array(n).fill(0));
  }
  return arr;
};


class MovementsPiece {

  score = 0;
  
  level = 0;
  
  playfield = createField(20, 20);

  activeShapeFigure = shapeFigures[randomFrom0To4()];

  activePiece = {
    x: 0,
    y: 0,
    blocks: typeFigures[randomFrom0To4()],
  };

  redFigures = [];

  blueFigures = [];

  orangeFigures = [];

  purpleFigures = [];

  activePieceNeedClear = {
    xDel: this.activePiece.x,
    yDel: this.activePiece.y,
    blocksDel: this.activePiece.blocks,
  };

  
  checkErrors() {
    const playfield = this.playfield;
    const {x, y, blocks} = this.activePiece;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
        if (
        	blocks[Y][X] &&
        	((playfield[y + Y] === undefined || playfield[y + Y][x + 2*X] === undefined) ||
        	playfield[y + Y][x + 2*X])
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
    this.activePiece.x += 2;
    if (this.checkErrors()) {
      this.activePiece.x -= 2;
    }
  }

  movePieceLeft() {
    this.activePiece.x -= 2;
    if (this.checkErrors()) {
      this.activePiece.x += 2;
    }
  };

  turnPiece() {
    const blocks = this.activePiece.blocks;
    let newBlock = new Array(blocks.length).fill([]);
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
  
  deleteLine() {
    const {x, y, blocks} = this.activePiece;
    for (let count = 0; count < this.playfield.length; count++) {
      if (this.playfield[count].indexOf(0) == -1) {
        const yCoor = 3 + count;
        const xCoor = 24;
        console.log(`\x1b[${yCoor};${xCoor}H` + '⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜');
      }
    }
  }

  closePieceInField() {
    let {x, y, blocks} = this.activePiece;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
      	if (blocks[Y][X] == 1) {
            this.playfield[y + Y][x + 2*X] = blocks[Y][X];
            this.playfield[y + Y][x + 2*X + 1] = blocks[Y][X];
        };
      }
    };
    this.activePiece.y = 0;
    this.activePiece.x = 0;
    this.activeShapeFigure = shapeFigures[randomFrom0To4()];
    this.activePiece.blocks = typeFigures[randomFrom0To4()];
  };
};



const tetra = new MovementsPiece();


const showField = () => {
  const field = `
                     ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬛
                     ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
  `
  console.log(field);
}

const showPiece = () => {
  const shapeFigure = tetra.activeShapeFigure;
  const {xDel: xFake, yDel: yFake, blocksDel: blocksFake} = tetra.activePieceNeedClear;
  let {x, y, blocks} = tetra.activePiece;
  for (let Ydel = 0; Ydel < blocksFake.length; Ydel++) {
    for (let Xdel = 0; Xdel < blocksFake[Ydel].length; Xdel++) {
      if (blocksFake[Ydel][Xdel] == 1) {
        const yCoor = 3 + yFake + Ydel;
        const xCoor = 24 + xFake + 2*Xdel;
        if (tetra.playfield[yFake + Ydel][xFake + 2*Xdel] == 0) {
          console.log(`\x1b[${yCoor};${xCoor}H` + '⬜');
        };
      }
    }
  }
  tetra.activePieceNeedClear.xDel = x;
  tetra.activePieceNeedClear.yDel = y;
  tetra.activePieceNeedClear.blocksDel = blocks;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
        if (blocks[Y][X] == 1) {
          const yCoor = 3 + y + Y;
          const xCoor = 24 + x + 2*X;
          console.log(`\x1b[${yCoor};${xCoor}H` + shapeFigure);        
        }
    }
  };
}
/*
const showPassivePieces = () => {
  for (let Y = 0; Y < tetra.playfield.length; Y++) {
    for (let X = 0; X < tetra.playfield[Y].length; X++) {
      if (tetra.playfield[Y][X] == 1) {
        const yCoor = Y + 3;
        const xCoor = X + 24;
        console.log(`\x1b[${yCoor};${xCoor}H` + '⬜')
      }
    }
  }
};*/

const fn = (reason = 'standart') => {
  showPiece();
  tetra.deleteLine();
  if (reason == 'standart') {
    tetra.movePieceDown();
  } else if (reason == 'moveRight') {
    tetra.movePieceRight();
  } else if (reason == 'moveLeft') {
    tetra.movePieceLeft();
  } else if (reason == 'turnPiece') {
    tetra.turnPiece();
  }   
  console.log('\x1b[25;10H');
}

console.clear();
showField();


setInterval(fn, 500);


process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdin.on('data', c => {
  if (c == '\u0003') {
    console.log('GAME OVER, GG');
    process.exit();
  }
  if (c == '\u0020') {
    fn('turnPiece');
  }
  if (c == '\u001b\u005b\u0044') {
    fn('moveLeft');
  } 
  if (c == '\u001b\u005b\u0043') {
    fn('moveRight');
  }   
  if (c == '\u001b\u005b\u0042') {
    fn();
  }    
})



/*
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question( name => {
  console.log('Hey');
  rl.close;
});
*/

