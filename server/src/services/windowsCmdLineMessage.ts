
/**
 * This service is created because i got some troubleshot with telnet windows command on cmd
 *
 * @export
 * @class WindowsCmdLine
 */
export class WindowsCmdLineMessage {

    /**
     * All actual message written by a windows cmd client
     *
     * @private
     * @type {{ [uuid: string]: string }}
     * @memberof WindowsCmdLine
     */
    private _messageCache: { [uuid: string]: string } = {};

    constructor() {}

    /**
     * push new character in a specified message
     *
     * @param {string} uuid
     * @param {string} message
     * @memberof WindowsCmdLine
     */
    public push(uuid: string, char: string) {
        let msg = this._messageCache[uuid];
        if (!msg) {
            this._messageCache[uuid] = msg = '';
        }
        if (char === 'CA==') { // user press delete button
            if (msg.length >= 1) {
                this._messageCache[uuid] = msg.slice(0, msg.length - 1);
            }
        } else {
            this._messageCache[uuid] += this.base64ToString(char);
        }
        return this.getMessage(uuid);
    }

    /**
     * Get complete message if it's correct
     *
     * @memberof WindowsCmdLine
     */
    private getMessage(uuid: string) {
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
    public cleanUpMessage(uuid: string) {
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
    public base64ToString(str: string) {
        return Buffer.from(str, 'base64').toString('utf8');
    }
}
