import { logger } from './logger';
import * as https from 'https';
import { EventEmitter } from 'events';
import { FayeServerMessage } from '../interfaces/FayeServerMessage';
const faye = require('faye');

/**
 * Faye server
 *
 * @export
 * @class FayeServer
 */
export class FayeServer {
    /**
     * Singleton instance
     *
     * @private
     * @static
     * @type {FayeServer}
     * @memberof FayeServer
     */
    private static _instance: FayeServer;

    /**
     * Faye server mount
     *
     * @private
     * @type {string}
     * @memberof FayeServer
     */
    private _mount = '/faye';

    /**
     * Event emitter for incoming message
     *
     * @private
     * @type {EventEmitter}
     * @memberof FayeServer
     */
    public events: EventEmitter = new EventEmitter();

    /**
     * Get faye server instance
     *
     * @readonly
     * @static
     * @memberof FayeServer
     */
    public static get Instance() {
        if (!this._instance) {
            this._instance = new FayeServer();
        }
        return this._instance;
    }

    private constructor() {
    }

    /**
     * Server-side client to send message from telnet user or just from user
     *
     * @private
     * @memberof FayeServer
     */
    private _serverSideClient: any;

    /**
     * Http server
     *
     * @private
     * @type {http.Server}
     * @memberof FayeServer
     */
    private _server: https.Server;

    /**
     * Faye bayeux protocol
     *
     * @private
     * @type {*}
     * @memberof FayeServer
     */
    private _bayeux: any;

    /**
     * Start faye server
     *
     * @param {http.Server} server
     * @memberof FayeServer
     */
    public attach(server: https.Server) {
        this._server = server;
        this._bayeux = new faye.NodeAdapter({mount: this._mount});
        this._bayeux.attach(this._server);
    }

    /**
     * Init faye server side client
     *
     * @memberof FayeServer
     */
    public initServerSideClient() {
        this._serverSideClient = this._bayeux.getClient();
        this._serverSideClient.subscribe('/chat', (message: string) => {
            try {
                const msg = JSON.parse(message);
                if (msg as FayeServerMessage) {
                    this.events.emit('message', msg);
                } else {
                    throw new Error('Message bad format');
                }
            } catch (e) {
                logger.info(`Receive bad message : ${message}`);
            }
        });
    }

    /**
     * Send a message to web clients
     *
     * @memberof FayeServer
     */
    public sendMessage(sender: string, msg: string) {
        const message: FayeServerMessage = {
            sender: sender,
            content: msg
        };
        this._serverSideClient.publish(`/chat`, JSON.stringify(message));
    }
}
