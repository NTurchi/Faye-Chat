import { Subscription } from '../interfaces/subscription';

export class EventManager {
    /**
     * Returns true if EventManager has at least one subscriber
     *
     * @readonly
     * @type {boolean}
     * @memberof EventManger
     */
    get hasSubscriber(): boolean {
        return this._subscriptions.length > 0;
    }

    /**
     * Returns the number of subscribers
     *
     * @readonly
     * @type {number}
     * @memberof EventManger
     */
    get subscriberCount(): number {
        return this._subscriptions.length;
    }

    /**
     * Subscriptions
     *
     * @private
     * @type {Array<Subscription>}
     * @memberof EventManger
     */
    private _subscriptions: Array<Subscription> = [];

    /**
     * Clean up event manager
     *
     * @private
     * @memberof EventManger
     */
    private cleanup() {
        this._subscriptions = [];
    }

    /**
     * Subscribe to the event in order to be notified,
     * but notified only once and then the event is automatically unsubscribed
     * @param {Object | undefined} context
     * @param {(sender: any, eventArg: any) => void} handler
     * @returns
     * @memberof EventManger
     */
    public subscribeOnce(context: Object | undefined, handler: (sender: any, eventArg: any) => void) {
        return this._subscribe(true, context, handler);
    }

    /**
     * Subscribe to the event in order to be notified
     * @param {Object | undefined} context
     * @param {(sender: any, eventArg: any) => void} handler
     * @returns
     * @memberof EventManger
     */
    public subscribe(context: Object | undefined, handler: (sender: any, eventArg: any) => void) {
        return this._subscribe(false, context, handler);
    }

    /**
     * @private
     * @param {(Object | undefined)} context
     * @param {(sender: any, eventArg: any) => void} handler
     * @memberof EventManger
     */
    private _subscribe(isOnce: boolean, context: Object | undefined, handler: (sender: any, eventArg: any) => void) {
        const localSubscription: Subscription = {
            context: context,
            handler: handler,
            isOnce: isOnce
        };
        const self = this;
        this._subscriptions.push(localSubscription);
        return ({
            unsubscribe: function() {
                self._unsubscribe(localSubscription);
                this.unsubscribe = function() { return undefined; };
            }.bind(this)
        });
    }

    /**
     * Unsubscribe
     *
     * @private
     * @param {*} subscription
     * @memberof EventManger
     */
    private _unsubscribe(subscription) {
        if (this._subscriptions.includes(subscription)) {
            this._subscriptions.splice(this._subscriptions.indexOf(subscription, 1));
        }
    }

    /**
     * Raise the event bu notifying all the subscribed handlers
     *
     * @param {Object} sender
     * @param {*} eventArg
     * @memberof EventManger
     */
    public raise(sender: Object, eventArg?: any) {
        const unsubscribeList: Subscription[] = [];
        this._subscriptions.forEach((sub: Subscription) => {
            sub.handler.call(sub.context, sender, eventArg);
            if (sub.isOnce) {
                unsubscribeList.push(sub);
            }
        });
        unsubscribeList.forEach(sub => { this._unsubscribe(sub); });
    }
}
