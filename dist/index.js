"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
/**
 * WSClient class
 * includes all the functionalities which requires to access the
 * cloud service remotely. A valid secret key and the group identifier
 * is required to initialize the connection.
 */
var WSClient = /** @class */ (function () {
    /**
     * constructor
     * @param {object} options an object contains url to host, secret key, and group identifier
     */
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
    /**
     * This function acts as a listener to emitting events by the web server.Throws an error when event name is not valid.
     * @example connect, disconnect
     * @param {string} event event name
     * @param {Function} fn callback function
     * @throws {Error}
     * @return {void}
     */
    WSClient.prototype.on = function (event, fn) {
        if (event == "connect" || event == "disconnect") {
            this.socket.on(event, fn);
            return;
        }
        throw new Error("Not a valid event");
    };
    /**
     * closes the connection wih the cloud service.
     * @return {void}
     */
    WSClient.prototype.close = function () {
        this.socket.close();
    };
    /**
     * creates a task in the chained task which is used when
     * initializing the WSClient.
     * @param {Task} task task object
     * @param {WSCallback} callback callback function
     * @return {void}
     */
    WSClient.prototype.createTask = function (task, callback) {
        this.socket.emit('createTask', task, this.secretKey, callback);
    };
    /**
     * updates the progress of a subroutine in a chained task which is used when
     * initializing the WSClient.
     * @param {object} task task object
     * @param {WSCallback} callback callback function
     */
    WSClient.prototype.updateProgress = function (task, callback) {
        this.socket.emit('updateProgress', task, this.secretKey, callback);
    };
    /**
     * notifies an error to all the clients.
     * @param {WSError} error error object
     * @param {WSCallback} callback callback function
     */
    WSClient.prototype.notifyError = function (error, callback) {
        this.socket.emit('notifyError', error, this.secretKey, callback);
    };
    /**
     * listens to state changes of a chained task
     * @param {WSListener} listener listener function
     * @param {WSCallback} callback callback function
     */
    WSClient.prototype.addListener = function (listener, callback) {
        var _this = this;
        this.socket.emit('addListener', this.groupId, this.secretKey, function (err) {
            if (err) {
                return callback(err);
            }
            _this.socket.on('notifyUpdate', listener);
        });
    };
    return WSClient;
}());
exports.WSClient = WSClient;
