"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fayeServer_1 = require("./fayeServer");
const windowsCmdLineMessage_1 = require("./windowsCmdLineMessage");
const net = require("net");
const logger_1 = require("./logger");
const uuidv1 = require('uuid/v1');
/**
 * Telnet server
 *
 * @export
 * @class TelnetServer
 */
class TelnetServer {
    constructor() {
        /**
         * Telnet connections
         *
         * @private
         * @type {TelnetConnection[]}
         * @memberof TelnetServer
         */
        this._socketCache = [];
        /**
         * Telnet server port
         *
         * @private
         * @type {number}
         * @memberof TelnetServer
         */
        this._port = 9000;
        this._wCmdLineMessageManager = new windowsCmdLineMessage_1.WindowsCmdLineMessage();
        try {
            this._server = net.createServer(this.socketHanlder.bind(this));
            this._server.on('connection', (socket) => {
                socket.write('Welcome to the Faye chat, please enter your username : \r\n');
                // store socket connection in cache
                this._socketCache.push({
                    socket: socket,
                    username: undefined,
                    uuid: uuidv1()
                });
                logger_1.logger.info(`New connection ! ${this._socketCache.length} Telnet Client on the server`);
            });
            this._server.on('error', (error) => {
                logger_1.logger.error(`Telnet server error ${JSON.stringify(error)}`);
            });
            // Faye server message
            fayeServer_1.FayeServer.Instance.events.on('message', (message) => {
                this._socketCache.forEach(c => {
                    if (c.username && c.username !== message.sender) {
                        c.socket.write(`[${message.sender}] ${message.content}\r\n`);
                    }
                });
            });
        }
        catch (e) {
            logger_1.logger.error(JSON.stringify(e));
        }
    }
    /**
     * Socket handler for telnets
     *
     * @private
     * @param {net.Socket} socket
     * @memberof TelnetServer
     */
    socketHanlder(socket) {
        socket.on('data', (data) => {
            // Handshake username
            const base64Str = data.toString('base64');
            if (this.telnetDataIsCorrect(base64Str)) {
                const connectionInfo = this.getConnectionInfo(socket);
                let str = data.toString('utf8');
                if (str.length === 1 || base64Str === 'DQo=') {
                    str = this._wCmdLineMessageManager.push(connectionInfo.uuid, base64Str);
                }
                if (str && str.trim().length > 0) {
                    // replace enter chat
                    str = this.replaceEnterChar(str);
                    if (str.length < 3 && !connectionInfo.username) {
                        socket.write('!!!! Please enter a message with a minimum of 3 characters !!!! \r\n');
                    }
                    else {
                        // first time on the server ?
                        if (connectionInfo.username) {
                            // username and string are correct. It's a message !!
                            fayeServer_1.FayeServer.Instance.sendMessage(connectionInfo.username, str);
                        }
                        else {
                            connectionInfo.username = str;
                            socket.write(`Welcome ${connectionInfo.username}, you will see chat messages appears now\r\n`);
                        }
                    }
                }
            }
        });
        socket.on('close', () => {
            this._cleanSocket(socket);
            logger_1.logger.info(`Connection close ! ${this._socketCache.length} Telnet Client on the server`);
        });
    }
    /**
     * Start the telnet server
     *
     * @memberof TelnetServer
     */
    start() {
        this._server.listen(this._port);
    }
    /**
     * get socket connection by username
     *
     * @param {string} username
     * @returns {TelnetConnection}
     * @memberof TelnetServer
     */
    getConnectionInfo(socket) {
        const connectionInfo = this._socketCache.find(c => c.socket === socket); // equal by reference
        if (connectionInfo) {
            return connectionInfo;
        }
        return undefined;
    }
    /**
     * util function
     *
     * @private
     * @returns
     * @memberof TelnetServer
     */
    getEnterString() {
        return String.fromCharCode(10);
    }
    /**
     * Util function
     *
     * @private
     * @param {string} str
     * @returns
     * @memberof TelnetServer
     */
    replaceEnterChar(str) {
        return str.replace(this.getEnterString(), '');
    }
    /**
     * clean socket connection if user has been disconnected
     *
     * @param {net.Socket} socket
     * @memberof TelnetServer
     */
    _cleanSocket(socket) {
        const con = this.getConnectionInfo(socket);
        if (con) {
            this._socketCache.splice(this._socketCache.indexOf(con), 1);
        }
    }
    /**
     * Verification for data from windows CLI client and putty
     *
     * @private
     * @param {Buffer}
     * @returns {boolean}
     * @memberof TelnetServer
     */
    telnetDataIsCorrect(str) {
        return !str.includes('//0B//sD//0D');
    }
}
exports.TelnetServer = TelnetServer;
