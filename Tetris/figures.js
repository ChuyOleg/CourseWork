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


const shapeFigures = [
  '\x1b[31m[]',  // RED
  '\x1b[32m[]',  // Green
  '\x1b[33m[]',  // Yellow
  '\x1b[34m[]',  // Blue
  '\x1b[35m[]',  // Purple
];

const colors = {
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  purple: 35,
};

module.exports = { typeFigures, shapeFigures, colors };
