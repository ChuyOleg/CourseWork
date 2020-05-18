'use strict';

const createField = (m, n) => {
  const arr = [];
  for (let i = 0; i < m; i++) {
  	arr.push([]);
    for (let j = 0; j < n; j++) {
      arr[i].push(0);
    }
  }
  return arr;
};

class Game {
  
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

  checkConditions() {
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
    if (this.checkConditions()) {
      this.activePiece.y -= 1;
      this.closePieceInField();
    }
  }

  movePieceRight() {
    this.activePiece.x += 1;
    if (this.checkConditions()) {
      this.activePiece.x -= 1;
    }
  }

  movePieceLeft() {
    this.activePiece.x -=1;
    if (this.checkConditions()) {
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
    if (this.checkConditions()) {
      this.activePiece.blocks = blocks;
    }
  }

  closePieceInField() {
    let {x, y, blocks} = this.activePiece;
    for (let Y = 0; Y < blocks.length; Y++) {
      for (let X = 0; X < blocks[Y].length; X++) {
      	  if (blocks[Y][X] == 1)
          this.playfield[y + Y][x + X] = blocks[Y][X];
      }
    };
  };
};


const tetra = new Game();

/*const obj = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
]; */



tetra.turnPiece();
console.log(tetra.activePiece.blocks);

tetra.movePieceLeft();
tetra.turnPiece();
console.log(tetra.activePiece.blocks);

tetra.turnPiece();
console.log(tetra.activePiece.blocks);

tetra.turnPiece();
console.log(tetra.activePiece.blocks);

// console.log(tetra);