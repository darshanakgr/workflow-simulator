"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var WSClient = /** @class */ (function () {
    function WSClient(options) {
        var _this = this;
        this.socket = io(options.host);
        this.secretKey = options.secretKey;
        this.groupId = options.groupId;
        this.socket.emit("authenticate", this.secretKey, this.groupId, function (err) {
            if (err) {
                _this.socket.close();
                throw err;
            }
        });
    }
    WSClient.prototype.on = function (event, fn) {
        if (event == "connect" || event == "disconnect") {
            this.socket.on(event, fn);
            return;
        }
        throw new Error("Not a valid event");
    };
    WSClient.prototype.close = function () {
        this.socket.close();
    };
    WSClient.prototype.createTask = function (task, callback) {
        this.socket.emit('createTask', task, this.secretKey, callback);
    };
    WSClient.prototype.updateProgress = function (task, callback) {
        this.socket.emit('updateProgress', task, this.secretKey, callback);
    };
    WSClient.prototype.notifyError = function (error, callback) {
        this.socket.emit('notifyError', error, this.secretKey, callback);
    };
    WSClient.prototype.addListener = function (groupId, listener, callback) {
        var _this = this;
        this.socket.emit('addListener', groupId, this.secretKey, function (err) {
            if (err) {
                return callback(err);
            }
            _this.socket.on('notifyUpdate', listener);
        });
    };
    return WSClient;
}());
exports.WSClient = WSClient;
