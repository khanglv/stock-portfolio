export function Event() {

    let self = this;

    self.queue = {};
    self.fired = [];

    return {
        fire: function(event, repeat = false, value = null) {
            let queue = self.queue[event];

            if (typeof queue === 'undefined') {
                return;
            }

            while (queue.length && repeat === false) {
                (queue.shift())(value);
            }

            if (repeat === true) {
                queue.forEach( callback => callback(value));
            }

            self.fired[event] = true;
        },
        on: function(event, callback) {
            if (self.fired[event] === true) {
                return callback();
            }

            if (typeof self.queue[event] === 'undefined') {
                self.queue[event] = [];
            }

            self.queue[event].push(callback);
        }

    };

}
