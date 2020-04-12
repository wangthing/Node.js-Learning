var Promise = function () {
    EventEmitter.call(this);
}

util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (fufilled, reject, progress) {
    if(typeof fufilled == 'function') {
        //利用once方法保证回调只执行一次
        this.once('success', fufilled);
    }

    if(typeof reject == 'function') {
        //利用once方法保证回调只执行一次
        this.once('error', reject);
    }

    if(typeof progress == 'function') {
        this.on('progress', progress)
    }

    return this;
}

var Deffered = function () {
    this.state = 'unfufilled';
    this.promise = new Promise()
}

Deffered.prototype.resolve = function (obj) {
    this.state = 'fufilled';
    this.promise.emit('success', obj);
}

Deffered.prototype.reject = function (err) {
    this.state = 'reject';
    this.promise.emit('error', obj);
}

Deffered.prototype.progress = function (data) {
    this.promise.emit('progress', data);
}