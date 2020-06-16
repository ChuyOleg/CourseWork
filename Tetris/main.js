'use strict';

const extraFuncs = require('./extraConstructions.js');
const { typeFigures, shapeFigures, colors } = require('./figures.js');
const { createField, showField, showFieldForNextFigure } = require('./fields');
const magic = require('./magicNumbersSymbols.js');

const EventEmitter = extraFuncs.SimpleEventEmitter;
const hideLoops = extraFuncs.hideLoops;
const random = extraFuncs.random;
const moveCursor = extraFuncs.moveCursor;

const randomTo4 = random.bind(null, 0, 4);

// перевіряє, чи не настав кінець гри
// (чи накладається новостворена фігура на вже існуючу)
const checkEndGame = instance => {
  const { x: checkX, y: checkY, blocks: checkBlocks } = instance.activePiece;
  const { gameOver, score, emptyLine } = magic;
  hideLoops(instance, checkBlocks, 1, (instance, y, x) => {
    const yCoor = checkY + y;
    const xCoor = checkX + x * 2;
    if (checkBlocks[y][x] === 1 && instance.playfield[yCoor][xCoor] === 1) {
      console.clear();
      moveCursor()
        .write(' 🦍 GAME OVER 🦍', gameOver.y, gameOver.x, colors.red)
        .write(` SCORE => ${instance.score}`, score.y, score.x, colors.yellow)
        .write('', emptyLine.y, emptyLine.x);
      process.exit(0);
    }
  });
};

// виводить усі фігури в консолі, окрім падаючої
const showPassivePieces = (instance, y, x) => {
  const { indent } = magic;
  const yCoor = y + indent.y;
  const xCoor = x + indent.x;
  const color = instance.passiveFigCol['' + y + x];
  if (instance.playfield[y][x] === 1) {
    moveCursor().write(color, yCoor, xCoor);
  } else {
    moveCursor().write('  ', yCoor, xCoor);
  }
};

// Виводить у консоль падаючу фігуру і стирає її попереднє розташування
const showPiece = instance => {
  const { yDel, xDel } = instance.activePieceNeedClear;
  const { blocksDel } = instance.activePieceNeedClear;
  const { y: yActive, x: xActive, blocks } = instance.activePiece;
  const { indent } = magic;
  hideLoops(instance, blocksDel, 1, (instance, y, x) => {
    const yCoor = yDel + y;
    const xCoor = xDel + 2 * x;
    // Стирає попереднє розташування
    if (blocksDel[y][x] === 1 && (instance.playfield[yCoor][xCoor] === 0)) {
      moveCursor().write('  ', yCoor + indent.y, xCoor + indent.x);
    }
  });
  instance.activePieceNeedClear.xDel = xActive;
  instance.activePieceNeedClear.yDel = yActive;
  instance.activePieceNeedClear.blocksDel = blocks;
  hideLoops(instance, blocks, 1, (instance, y, x) => {
    const yCoor = indent.y + yActive + y;
    const xCoor = indent.x + xActive + 2 * x;
    if (blocks[y][x] === 1) {  // виводить падаючу фігуру
      moveCursor().write(instance.activeShapeFigure, yCoor, xCoor);
    }
  });
};

const eventEm = new EventEmitter();

eventEm.on('levelUp', (instance, func) => {
  const { levelNum } = magic;
  const objLevel = instance.level;
  const speedDiff = 50;
  const minSpeed = 150;
  if (objLevel.speed > minSpeed) {
    objLevel.speed -= speedDiff;
    objLevel.level += 1;
    clearInterval(objLevel.speedometer);
    func();
    objLevel.speedometer = setInterval(func, objLevel.speed);
    moveCursor().write(objLevel.level, levelNum.y, levelNum.x);
  }
});

eventEm.on('levelDown', (instance, func) => {
  const { levelNum } = magic;
  const objLevel = instance.level;
  const speedDiff = 50;
  const maxSpeed = 500;
  if (objLevel.speed < maxSpeed) {
    objLevel.speed += speedDiff;
    objLevel.level -= 1;
    clearInterval(objLevel.speedometer);
    func();
    objLevel.speedometer = setInterval(func, objLevel.speed);
    moveCursor().write(objLevel.level, levelNum.y, levelNum.x);
  }
});

// Клас, який відповідає за рухи фігури
class MovementsPiece {

  constructor() {

    this.score = 0;

    this.playfield = createField(20, 20);

    this.level = {
      speed: 500,
      speedometer: null,
      level: 1,
    };

    this.pause = false;

    this.activeShapeFigure = shapeFigures[randomTo4()];

    this.activePiece = {
      x: 6,
      y: 0,
      blocks: typeFigures[randomTo4()],
    };

    this.passiveFigCol = {};

    this.activePieceNeedClear = {
      xDel: this.activePiece.x,
      yDel: this.activePiece.y,
      blocksDel: this.activePiece.blocks,
    };

    this.nextPiece = {
      nextBlocks: typeFigures[randomTo4()],
      nextShape: shapeFigures[randomTo4()],
    };
  }
  // Перевіряє, чи находиться фігура в ігровому полі
  // і не накладається на інші
  checkErrors() {
    const playfield = this.playfield;
    const { x, y, blocks } = this.activePiece;
    return (hideLoops(this, blocks, 1, (instance, Y, X) =>
      blocks[Y][X] &&
      ((!playfield[y + Y] || playfield[y + Y][x + 2 * X] === undefined) ||
      playfield[y + Y][x + 2 * X])
    ));
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
  }

  turnPiece() {
    const blocks = this.activePiece.blocks;
    if (blocks === typeFigures[1]) return blocks;
    const newBlocks = [];
    hideLoops(this, blocks, 1, (instance, y, x) => {
      if (x === 0) newBlocks.push([]);
      newBlocks[y].push(blocks[blocks.length - 1 - x][y]);
    });
    this.activePiece.blocks = newBlocks;
    if (this.checkErrors()) {
      this.activePiece.blocks = blocks;
    }
  }

  // Видалення заповненого рядка
  deleteLine() {
    const { scoreNum } = magic;
    const color = this.passiveFigCol;
    for (let count = this.playfield.length - 1; count >= 0; count--) {
      if (this.playfield[count].indexOf(0) === -1) {
        for (let point = count; point >= 0; point--) {
          for (let xNum = 0; xNum < this.playfield[count].length; xNum += 2) {
            const keyThisFig = '' + (point) + xNum;
            const keyUpFig = '' + (point - 1) + xNum;
            // Змінює колір куба на колір куба над ним
            if (color[keyUpFig]) {
              this.passiveFigCol[keyThisFig] = this.passiveFigCol[keyUpFig];
            }
          }
          //  Змінює рядок на рядок над ним (нулі та одинииці)
          this.playfield[point] = this.playfield[point - 1] ?
            this.playfield[point - 1] :
            new Array(this.playfield[point].length).fill(0);
        }
        this.score += 1;
        hideLoops(this, this.playfield, 2, showPassivePieces);
        count++;
        moveCursor().write(this.score, scoreNum.y, scoreNum.x);
      }
    }
  }

  // Фіксує фігуру у полі, коли вона зайняла кінцеву позицію
  closePieceInField() {
    const { x: xActive, y: yActive, blocks } = this.activePiece;
    const { startCoor } = magic;
    hideLoops(this, blocks, 1, (instance, y, x) => {
      if (blocks[y][x] === 1) {
        const keyCol = '' + (yActive + y) + (xActive + 2 * x);
        instance.playfield[yActive + y][xActive + 2 * x] = blocks[y][x];
        instance.playfield[yActive + y][xActive + 2 * x + 1] = blocks[y][x];
        instance.passiveFigCol[keyCol] = instance.activeShapeFigure;
      }
    });
    this.activeShapeFigure = this.nextPiece.nextShape;
    this.activePiece.blocks = this.nextPiece.nextBlocks;
    this.nextPiece.nextShape = shapeFigures[randomTo4()];
    this.nextPiece.nextBlocks = typeFigures[randomTo4()];
    this.showNextPiece();
    this.activePiece.y = startCoor.y;
    this.activePiece.x = startCoor.x;
    checkEndGame(this);
  }

  // Виводить наступну фігуру в окремому полі
  showNextPiece() {
    const { nextBlocks, nextShape } = this.nextPiece;
    hideLoops(this, typeFigures[4], 1, (instance, y, x) => {
      const yCoor = y + 5;
      const xCoor = 2 * x + 52;
      if (nextBlocks[y] && nextBlocks[y][x] === 1) {
        moveCursor().write(nextShape, yCoor, xCoor);
      } else {
        moveCursor().write('  ', yCoor, xCoor);
      }
    });
  }
}



const tetra = new MovementsPiece();

// Запускає деякі попередні функції/методи, які повинні відбуватися регулярно
const runGame = (reason = 'standart') => {
  showPiece(tetra);
  tetra.deleteLine();
  if (reason === 'standart') {
    tetra.movePieceDown();
  } else if (reason === 'moveRight') {
    tetra.movePieceRight();
  } else if (reason === 'moveLeft') {
    tetra.movePieceLeft();
  } else if (reason === 'turnPiece') {
    tetra.turnPiece();
  }
  moveCursor().write('', 25, 10);
};

const runConsoleLogs = instance => {
  console.clear();
  showField();
  showFieldForNextFigure();
  instance.showNextPiece();
  const { scoreLine, levelLine, arrow, space, esc, shiftUp, shiftDown } = magic;
  moveCursor()
    .write(` 🦍 SCORE 🦍  ${instance.score}`, scoreLine.y, scoreLine.x)
    .write(` LEVEL  ${instance.level.level}`, levelLine.y, levelLine.x)
    .write(' Arrows - Move figure', arrow.y, arrow.x)
    .write(' Space - Turn figure', space.y, space.x)
    .write(' Escape - Pause (+|-)', esc.y, esc.x)
    .write(' Shift + Up = Level+', shiftUp.y, shiftDown.x)
    .write(' Shift + Down = Level-', shiftDown.y, shiftDown.x);
  instance.level.speedometer = setInterval(runGame, instance.level.speed);
};

const codeKeys = {
  'CTRL + C': '\u0003',
  'Space': '\u0020',
  'Left': '\u001b\u005b\u0044',
  'Right': '\u001b\u005b\u0043',
  'Down': '\u001b\u005b\u0042',
  'Shift + Up': '\u001b\u005b\u0031\u003b\u0032\u0041',
  'Shift + Down': '\u001b\u005b\u0031\u003b\u0032\u0042',
  'Escape': '\u001b',
};

// Відповідає за взаємодію користувача з клавіатурою
process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdin.on('data', c => {
  if (c === codeKeys['CTRL + C']) {
    const { exGameOver, exScore, exEmptyLine } = magic;
    moveCursor()
      .write(' 🦍 GAME OVER 🦍', exGameOver.y, exGameOver.x, colors.red)
      .write(` SCORE => ${tetra.score}`, exScore.y, exScore.x, colors.yellow)
      .write('', exEmptyLine.y, exEmptyLine.x);
    process.exit();
  }
  if (c === codeKeys['Space'] && (!tetra.pause)) {
    runGame('turnPiece');
  }
  if (c === codeKeys['Left'] && (!tetra.pause)) {
    runGame('moveLeft');
  }
  if (c === codeKeys['Right'] && (!tetra.pause)) {
    runGame('moveRight');
  }
  if (c === codeKeys['Down'] && (!tetra.pause)) {
    runGame();
  }
  if (c === codeKeys['Shift + Up'] && (!tetra.pause)) {
    eventEm.emit('levelUp', tetra, runGame);
  }
  if (c === codeKeys['Shift + Down'] && (!tetra.pause)) {
    eventEm.emit('levelDown', tetra, runGame);
  }
  if (c === codeKeys['Escape']) {
    if (tetra.pause) {
      tetra.level.speedometer = setInterval(runGame, tetra.level.speed);
      tetra.pause = false;
    } else {
      clearInterval(tetra.level.speedometer);
      tetra.pause = true;
    }
  }
});

// запуск
runConsoleLogs(tetra);
