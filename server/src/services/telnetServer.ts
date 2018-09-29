import { FayeServer } from './fayeServer';
import { WindowsCmdLineMessage } from './windowsCmdLineMessage';
import * as net from 'net';
import { logger } from './logger';
import { FayeServerMessage } from '../interfaces/FayeServerMessage';
const uuidv1 = require('uuid/v1');

/**
 * Represent a telnet connection (store usernamen and socket connection)
 *
 * @interface TelnetConnection
 */
interface TelnetConnection {
    socket: net.Socket;
    username: string;
    uuid: string; // unique identifier per socket
}

/**
 * Telnet server
 *
 * @export
 * @class TelnetServer
 */
export class TelnetServer {

    /**
     * Telnet server
     *
     * @private
     * @type {net.Server}
     * @memberof TelnetServer
     */
    private _server: net.Server;

    /**
     * Telnet connections
     *
     * @private
     * @type {TelnetConnection[]}
     * @memberof TelnetServer
     */
    private _socketCache:  TelnetConnection[] = [];

    /**
     * Manage windows command line message
     *
     * @private
     * @type {WindowsCmdLineMessage}
     * @memberof TelnetServer
     */
    private _wCmdLineMessageManager: WindowsCmdLineMessage;

    /**
     * Telnet server port
     *
     * @private
     * @type {number}
     * @memberof TelnetServer
     */
    private _port = 9000;

    constructor() {
        this._wCmdLineMessageManager = new WindowsCmdLineMessage();

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
                logger.info(`New connection ! ${this._socketCache.length} Telnet Client on the server`);
            });

            this._server.on('error', (error) => {
                logger.error(`Telnet server error ${JSON.stringify(error)}`);
            });

            // Faye server message
            FayeServer.Instance.events.on('message', (message: FayeServerMessage) => {
                this._socketCache.forEach(c => {
                    if (c.username && c.username !== message.sender) {
                        c.socket.write(`[${message.sender}] ${message.content}\r\n`);
                    }
                });
            });
        } catch (e) {
            logger.error(JSON.stringify(e));
        }
    }

    /**
     * Socket handler for telnets
     *
     * @private
     * @param {net.Socket} socket
     * @memberof TelnetServer
     */
    private socketHanlder(socket: net.Socket) {
        socket.on('data', (data: Buffer) =>  {
            // Handshake username
            const base64Str = data.toString('base64');
            if (this.telnetDataIsCorrect(base64Str)) {
                const connectionInfo = this.getConnectionInfo(socket);
                let str = data.toString('utf8');

                if (str.length === 1 || base64Str === 'DQo=') { // Windows cmdline case TODO: we can improve this with ascii code !
                    str = this._wCmdLineMessageManager.push(connectionInfo.uuid, base64Str);
                }

                if (str && str.trim().length > 0) {
                    // replace enter chat
                    str = this.replaceEnterChar(str);

                    if (str.length < 3 && !connectionInfo.username) {
                        socket.write('!!!! Please enter a message with a minimum of 3 characters !!!! \r\n');
                    } else {
                        // first time on the server ?
                        if (connectionInfo.username) {
                            // username and string are correct. It's a message !!
                            FayeServer.Instance.sendMessage(connectionInfo.username, str);
                        } else {
                            connectionInfo.username = str;
                            socket.write(`Welcome ${connectionInfo.username}, you will see chat messages appears now\r\n`);
                        }
                    }
                }
            }
        });

        socket.on('close', () => {
            this._cleanSocket(socket);
            logger.info(`Connection close ! ${this._socketCache.length} Telnet Client on the server`);
        });
    }

    /**
     * Start the telnet server
     *
     * @memberof TelnetServer
     */
    public start() {
        this._server.listen(this._port);
    }

    /**
     * get socket connection by username
     *
     * @param {string} username
     * @returns {TelnetConnection}
     * @memberof TelnetServer
     */
    public getConnectionInfo(socket: net.Socket): TelnetConnection {
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
    private getEnterString() {
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
    private replaceEnterChar(str: string) {
        return str.replace(this.getEnterString(), '');
    }

    /**
     * clean socket connection if user has been disconnected
     *
     * @param {net.Socket} socket
     * @memberof TelnetServer
     */
    private _cleanSocket(socket: net.Socket) {
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
    private telnetDataIsCorrect(str: string): boolean {
        return !str.includes('//0B//sD//0D');
    }

}
