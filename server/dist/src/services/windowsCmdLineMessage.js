"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This service is created because i got some troubleshot with telnet windows command on cmd
 *
 * @export
 * @class WindowsCmdLine
 */
class WindowsCmdLineMessage {
    constructor() {
        /**
         * All actual message written by a windows cmd client
         *
         * @private
         * @type {{ [uuid: string]: string }}
         * @memberof WindowsCmdLine
         */
        this._messageCache = {};
    }
    /**
     * push new character in a specified message
     *
     * @param {string} uuid
     * @param {string} message
     * @memberof WindowsCmdLine
     */
    push(uuid, char) {
        let msg = this._messageCache[uuid];
        if (!msg) {
            this._messageCache[uuid] = msg = '';
        }
        if (char === 'CA==') {
            if (msg.length >= 1) {
                this._messageCache[uuid] = msg.slice(0, msg.length - 1);
            }
        }
        else {
            this._messageCache[uuid] += this.base64ToString(char);
        }
        return this.getMessage(uuid);
    }
    /**
     * Get complete message if it's correct
     *
     * @memberof WindowsCmdLine
     */
    getMessage(uuid) {
        const msg = this._messageCache[uuid];
        if (msg.charCodeAt(msg.length - 1) === 10) {
            delete this._messageCache[uuid];
            return msg.slice(0, msg.length - 2);
        }
        return undefined;
    }
    /**
     * Clean up message
     *
     * @param {string} uuid
     * @memberof WindowsCmdLine
     */
    cleanUpMessage(uuid) {
        const msg = this._messageCache[uuid];
        if (msg) {
            delete this._messageCache[uuid];
        }
    }
    /**
     * Convert base64 to string
     * @param {string} str base64 string
     * @returns {string}
     * @memberof WindowsCmdLineMessage
     */
    base64ToString(str) {
        return Buffer.from(str, 'base64').toString('utf8');
    }
}
exports.WindowsCmdLineMessage = WindowsCmdLineMessage;
