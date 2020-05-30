'use strict';

class myEventEmitter {

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

  delete(name) {
    delete this.events[name];
  }
}

