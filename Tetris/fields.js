'use strict';

const createField = (m, n, arr = []) => {
  for (let i = 0; i < m; i++) {
    arr.push(new Array(n).fill(0));
  }
  return arr;
};

const showField = () => {
  let field = '\x1b[2;23H======================';
  for (let count = 3; count < 23; count++) {
    field += `\n \x1b[${count};21H ||                    ||`;
  }
  field += '\n \x1b[23;23H======================';
  console.log(field);
};

const showFieldForNextFigure = () => {
  console.log(` 
  \x1b[3;50H NEXT FIGURE
  \x1b[4;50H ========== 
  \x1b[5;50H||        ||
  \x1b[6;50H||        ||
  \x1b[7;50H||        ||
  \x1b[8;50H||        ||
  \x1b[9;50H ========== 
  `);
};

module.exports = {
  createField,
  showField,
  showFieldForNextFigure,
};
