'use strict';

class SimpleEventEmitter {

  constructor() {
    this.events = new Object();
  }

  on(name, func) {
    const events = this.events[name];
    if (events) events.push(func);
    else this.events[name] = [func];
  }

  emit(name, ...args) {
    const events = this.events[name];
    if (events) {
      events.forEach(func => func(...args));
    }
  }

}

const hideLoops = (instance, arr, addForX, listener) => {
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x += addForX) {
      if (listener(instance, y, x)) return true;
    }
  }
};

const random = (from, to) => Math.floor(from + Math.random() * (to + 1));

const moveCursor = () => ({
  write(string, y, x, color) {
    if (color) console.log(`\x1b[${color}m\x1b[${y};${x}H${string}`);
    else console.log(`\x1b[${y};${x}H${string}`);
    return this;
  }
});

module.exports = {
  SimpleEventEmitter,
  hideLoops,
  random,
  moveCursor,
};
