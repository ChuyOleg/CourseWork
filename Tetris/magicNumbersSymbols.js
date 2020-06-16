'use strict';

class Magic {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}
const startCoor = new Magic(0, 6);
const gameOver = new Magic(18, 29);
const endScore = new Magic(20, 32);
const emptyLine = new Magic(28, 30);
const scoreLine = new Magic(12, 49);
const scoreNum = new Magic(12, 63);
const levelLine = new Magic(14, 49);
const levelNum = new Magic(14, 57);
const arrow = new Magic(16, 49);
const space = new Magic(18, 49);
const esc = new Magic(20, 49);
const shiftUp = new Magic(22, 49);
const shiftDown = new Magic(24, 49);
const indent = new Magic(3, 24);
const exGameOver = new Magic(25, 26);
const exScore = new Magic(27, 29);
const exEmptyLine = new Magic(28, 30);

module.exports = {
  startCoor,
  gameOver,
  endScore,
  emptyLine,
  scoreLine,
  scoreNum,
  levelLine,
  levelNum,
  arrow,
  space,
  esc,
  shiftUp,
  shiftDown,
  indent,
  exGameOver,
  exScore,
  exEmptyLine,
};
