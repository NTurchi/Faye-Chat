"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const events_1 = require("events");
const faye = require('faye');
/**
 * Faye server
 *
 * @export
 * @class FayeServer
 */
class FayeServer {
    constructor() {
        /**
         * Faye server mount
         *
         * @private
         * @type {string}
         * @memberof FayeServer
         */
        this._mount = '/faye';
        /**
         * Event emitter for incoming message
         *
         * @private
         * @type {EventEmitter}
         * @memberof FayeServer
         */
        this.events = new events_1.EventEmitter();
    }
    /**
     * Get faye server instance
     *
     * @readonly
     * @static
     * @memberof FayeServer
     */
    static get Instance() {
        if (!this._instance) {
            this._instance = new FayeServer();
        }
        return this._instance;
    }
    /**
     * Start faye server
     *
     * @param {http.Server} server
     * @memberof FayeServer
     */
    attach(server) {
        this._server = server;
        this._bayeux = new faye.NodeAdapter({ mount: this._mount });
        this._bayeux.attach(this._server);
    }
    /**
     * Init faye server side client
     *
     * @memberof FayeServer
     */
    initServerSideClient() {
        this._serverSideClient = this._bayeux.getClient();
        this._serverSideClient.subscribe('/chat', (message) => {
            try {
                const msg = JSON.parse(message);
                if (msg) {
                    this.events.emit('message', msg);
                }
                else {
                    throw new Error('Message bad format');
                }
            }
            catch (e) {
                logger_1.logger.info(`Receive bad message : ${message}`);
            }
        });
    }
    /**
     * Send a message to web clients
     *
     * @memberof FayeServer
     */
    sendMessage(sender, msg) {
        const message = {
            sender: sender,
            content: msg
        };
        this._serverSideClient.publish(`/chat`, JSON.stringify(message));
    }
}
exports.FayeServer = FayeServer;
