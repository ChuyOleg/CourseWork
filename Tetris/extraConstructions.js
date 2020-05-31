'use strict';

class MyEventEmitter {

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
  for (let Y = 0; Y < arr.length; Y++) {
    for (let X = 0; X < arr[Y].length; X += addForX) {
      const result = listener(instance, Y, X);
      if (result === true) return true;  // Need for method checkErrors
    }
  }
};

module.exports = {
  MyEventEmitter,
  hideLoops,
};