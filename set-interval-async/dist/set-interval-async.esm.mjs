import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';

/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */
const MAX_INTERVAL_MS = Math.pow(2, 31) - 1;
/**
 * Stops an execution cycle started by setIntervalAsync.<br>
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 *
 * @param {SetIntervalAsyncTimer} timer
 * @returns {Promise}
 *          A promise which resolves when all pending executions have finished.
 */

function clearIntervalAsync(_x) {
  return _clearIntervalAsync.apply(this, arguments);
}

function _clearIntervalAsync() {
  _clearIntervalAsync = _asyncToGenerator(function* (timer) {
    timer.stopped = true;

    for (var _i = 0, _Object$values = Object.values(timer.timeouts); _i < _Object$values.length; _i++) {
      const timeout = _Object$values[_i];
      clearTimeout(timeout);
    }

    const noop = () => {};

    const promises = Object.values(timer.promises).map(promise => {
      promise.catch(noop);
    });
    const noopInterval = setInterval(noop, MAX_INTERVAL_MS);
    yield Promise.all(promises);
    clearInterval(noopInterval);
  });
  return _clearIntervalAsync.apply(this, arguments);
}

/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

/**
 * Error thrown by setIntervalAsync when invalid arguments are provided.
 */
class SetIntervalAsyncError extends Error {}

Object.defineProperty(SetIntervalAsyncError.prototype, 'name', {
  value: 'SetIntervalAsyncError'
});

/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */
const MIN_INTERVAL_MS = 10;
/**
 * @private
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 */

function validateHandler(handler) {
  if (!(typeof handler === 'function')) {
    throw new SetIntervalAsyncError('Invalid argument: "handler". Expected a function.');
  }
}
/**
 * @private
 *
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
 */

function validateInterval(interval) {
  if (!(typeof interval === 'number' && MIN_INTERVAL_MS <= interval)) {
    throw new SetIntervalAsyncError(`Invalid argument: "interval". Expected a number greater than or equal to ${MIN_INTERVAL_MS}.`);
  }
}

/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */

/**
 * Timer object returned by setIntervalAsync.<br>
 * Can be used together with {@link clearIntervalAsync} to stop execution.
 */
class SetIntervalAsyncTimer {
  constructor() {
    this.stopped = false;
    this.id = 0;
    this.timeouts = {};
    this.promises = {};
  }

}

/**
 * Attempts to execute the given handler at regular intervals, while preventing<br>
 * multiple concurrent executions. The handler will never be executed concurrently<br>
 * more than once in any given moment. If the running time of any execution exceeds<br>
 * the desired interval, the following execution will be scheduled as soon as<br>
 * possible; ie. immediately after the previous execution concludes.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
 * @param {...*} args - Any number of arguments to pass on to the handler.
 * @returns {SetIntervalAsyncTimer}
 *          A timer object which can be used to stop execution with {@link clearIntervalAsync}.
 *
 * @alias [Dynamic] setIntervalAsync
 */

function setIntervalAsync(handler, interval, ...args) {
  validateHandler(handler);
  validateInterval(interval);
  const timer = new SetIntervalAsyncTimer();
  const id = timer.id;
  timer.timeouts[id] = setTimeout(timeoutHandler, interval, timer, handler, interval, ...args);
  return timer;
}

function timeoutHandler(timer, handler, interval, ...args) {
  const id = timer.id;
  timer.promises[id] = _asyncToGenerator(function* () {
    const startTime = new Date();

    try {
      yield handler(...args);
    } catch (err) {
      console.error(err);
    }

    const endTime = new Date();

    if (!timer.stopped) {
      const executionTime = endTime - startTime;
      const timeout = interval > executionTime ? interval - executionTime : 0;
      timer.timeouts[id + 1] = setTimeout(timeoutHandler, timeout, timer, handler, interval, ...args);
    }

    delete timer.timeouts[id];
    delete timer.promises[id];
  })();
  timer.id = id + 1;
}

/**
 * Executes the given handler at fixed intervals, while preventing<br>
 * multiple concurrent executions. The handler will never be executed<br>
 * concurrently more than once in any given moment, providing a fixed<br>
 * time interval between the <strong>end</strong> of a given execution and the <strong>start</strong> of<br>
 * the following one.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
 * @param {...*} args - Any number of arguments to pass on to the handler.
 * @returns {SetIntervalAsyncTimer}
 *          A timer object which can be used to stop execution with {@link clearIntervalAsync}.
 *
 * @alias [Fixed] setIntervalAsync
 */

function setIntervalAsync$1(handler, interval, ...args) {
  validateHandler(handler);
  validateInterval(interval);
  const timer = new SetIntervalAsyncTimer();
  const id = timer.id;
  timer.timeouts[id] = setTimeout(timeoutHandler$1, interval, timer, handler, interval, ...args);
  return timer;
}

function timeoutHandler$1(timer, handler, interval, ...args) {
  const id = timer.id;
  timer.promises[id] = _asyncToGenerator(function* () {
    try {
      yield handler(...args);
    } catch (err) {
      console.error(err);
    }

    if (!timer.stopped) {
      timer.timeouts[id + 1] = setTimeout(timeoutHandler$1, interval, timer, handler, interval, ...args);
    }

    delete timer.timeouts[id];
    delete timer.promises[id];
  })();
  timer.id = id + 1;
}

/**
 * Executes the given handler at fixed intervals; ie. the start time<br>
 * between consecutive executions is always a fixed amount of time.<br>
 * If a given execution takes longer than the given time interval to<br>
 * complete, then the handler will be invoked again without waiting<br>
 * for the previous one to finish. In this scenario, multiple concurrent<br>
 * executions can and will ocurr, so this function should only be used<br>
 * when the given handler is reentrancy-safe.
 *
 * @param {function} handler - Handler function to be executed in intervals.<br>
 *                             May be asynchronous.
 * @param {number} interval - Interval in milliseconds. Must be at least 10 ms.
 * @param {...*} args - Any number of arguments to pass on to the handler.
 * @returns {SetIntervalAsyncTimer}
 *          A timer object which can be used to stop execution with {@link clearIntervalAsync}.
 *
 * @alias [Legacy] setIntervalAsync
 */

function setIntervalAsync$2(handler, interval, ...args) {
  validateHandler(handler);
  validateInterval(interval);
  const timer = new SetIntervalAsyncTimer();
  const id = timer.id;
  timer.timeouts[id] = setTimeout(timeoutHandler$2, interval, timer, handler, interval, ...args);
  return timer;
}

function timeoutHandler$2(timer, handler, interval, ...args) {
  const id = timer.id;
  timer.promises[id] = _asyncToGenerator(function* () {
    timer.timeouts[id + 1] = setTimeout(timeoutHandler$2, interval, timer, handler, interval, ...args);

    try {
      yield handler(...args);
    } catch (err) {
      console.error(err);
    }

    delete timer.timeouts[id];
    delete timer.promises[id];
  })();
  timer.id = id + 1;
}

/**
 * Copyright (c) 2019 Emilio Almansi. All rights reserved.
 * This work is licensed under the terms of the MIT license.
 * For a copy, see the file LICENSE in the root directory.
 */
const dynamic = {
  setIntervalAsync: setIntervalAsync
};
const fixed = {
  setIntervalAsync: setIntervalAsync$1
};
const legacy = {
  setIntervalAsync: setIntervalAsync$2
};

export { SetIntervalAsyncError, SetIntervalAsyncTimer, clearIntervalAsync, dynamic, fixed, legacy };
//# sourceMappingURL=set-interval-async.esm.mjs.map
