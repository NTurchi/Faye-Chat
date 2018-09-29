import { EventManager } from '../../utils/eventManager';
import { EventManagerFactory } from '../eventManager/event-manager-factory.service';
import { Logger } from '../logger/logger.service';
import { FayeState } from '../../enums/fayeState.enum';
import { Injectable } from '@angular/core';

declare var Faye: any;

@Injectable({
  providedIn: 'root'
})
export class FayeManager {
  /**
   * Faye client status
   * @type {FayeState}
   * @memberof FayeService
   */
  private _state: FayeState = FayeState.DISCONNECTED;

  /**
   * _state getter property
   *
   * @readonly
   * @memberof FayeService
   */
  public get states() {
    return this._state;
  }

  /**
   * Faye client
   *
   * @type {Client}
   * @memberof FayeService
   */
  private _client;

  /**
   * Message cache size per channel
   *
   * @private
   * @memberof FayeService
   */
  private _maxChannelCacheSize = 2000;

  /**
   * On connect event manager
   *
   * @type {EventManager}
   * @memberof FayeService
   */
  private _onConnectEventManager: EventManager;

  /**
   * Keep track of the subscribers
   *
   * @private
   * @type {{ [key: string]: EventManager[] }}
   * @memberof FayeService
   */
  private _channelEventManager: { [key: string]: EventManager } = {};

  /**
   * Faye client event subscriptions
   *
   * @private
   * @type {{ [key: string]: EventManager }}
   * @memberof FayeService
   */
  private _fayeSubscriptions: { [key: string]: any } = {};

  /**
   * Cache per channel
   *
   * @private
   * @type {{ [key: string]: any[] }}
   * @memberof FayeService
   */
  private _cache: { [key: string]: any[] } = {};

  /**
   * On disconnect event manager
   *
   * @type {EventManager}
   * @memberof FayeService
   */
  private _onDisconnectEventManager: EventManager;

  constructor(
    private _logger: Logger,
    private _eventManagerFactory: EventManagerFactory
  ) {

    this._client = new Faye.Client('https://localhost/faye');
    this._onConnectEventManager = this._eventManagerFactory.create();
    this._onDisconnectEventManager = this._eventManagerFactory.create();

    this._client.on('transport:up', () => {
      this._logger.debug('Faye client connected');
      this._state = FayeState.CONNECTED;
      this._onConnectEventManager.raise(null);
    });

    this._client.on('transport:down', () => {
      this._logger.debug('Faye client disconnected');
      this._state = FayeState.DISCONNECTED;
      this._onDisconnectEventManager.raise(null);
    });
  }

  public onChannelMesage(channel: string, message: any, cache: any[]) {
    this._channelEventManager[channel].raise(null, message);
    // store the message in cache
    cache.push(message);
    while (cache.length > this._maxChannelCacheSize) {
      cache.shift();
    }
  }

  /**
   * Susbcribe to channel's events
   *
   * @param {string} channel
   * @param {(sender: any, eventArgs: any) => void} callback
   * @param {boolean} fetchHistory
   * @returns
   * @memberof FayeService
   */
  public subscribe(channel: string, callback: (sender: any, eventArgs: any) => void, fetchHistory: boolean) {
    let eventManager = this._channelEventManager[channel];
    let cacheMessages = [];
    let subscription;
    let needToSubscribe = false;

    if (!eventManager) {
      eventManager = this._channelEventManager[channel] = this._eventManagerFactory.create();
      needToSubscribe = true;
    }

    if (this._cache[channel] === undefined) {
      this._cache[channel] = [];
    }

    subscription = eventManager.subscribe(null, callback);
    this._logger.debug(`Faye client ${eventManager.subscriberCount} subscribers on channel ${channel}`);
    cacheMessages = this._cache[channel];

    if (fetchHistory && cacheMessages.length > 0) {
      const copyCache = cacheMessages.slice();
      copyCache.forEach(m => {
        callback(null, m);
      });
    }

    if (needToSubscribe) {
      this._fayeSubscriptions[channel] = this._client.subscribe(channel, (message) => {
        this.onChannelMesage(channel, message, cacheMessages);
      });
    }

    return {
      unsubscribe: (disconnect) => {
        subscription.unsubscribe();
        this._logger.debug(`Faye client ${eventManager.subscriberCount} subscribers on channel ${channel}`);
        if (disconnect && !eventManager.hasSubscriber) {
          this._fayeSubscriptions[channel].cancel();
          delete this._fayeSubscriptions[channel];
          delete this._channelEventManager[channel];
        }
      }
    };
  }

  /**
   * OnConnect event (trigger when we are connected to the faye client)
   *
   * @param {() => void} callback
   * @returns
   * @memberof FayeService
   */
  public onConnect(callback: () => void) {
    const subscription = this._onConnectEventManager.subscribe(null, callback);
    this._logger.debug(`Faye client ${this._onConnectEventManager.subscriberCount} subscribers on connect event`);
    if (this._state === FayeState.CONNECTED) {
      callback();
    }
    return {
      unsubscribe: () => {
        subscription.unsubscribe();
        this._logger.debug(`Faye client ${this._onConnectEventManager.subscriberCount} subscribers on connect event`);
      }
    };
  }

  /**
   * OnDisconnect event (trigger when we are disconnected from the faye client)
   *
   * @param {() => void} callback
   * @returns
   * @memberof FayeService
   */
  public onDisconnected(callback: () => void) {
    const subscription = this._onDisconnectEventManager.subscribe(null, callback);
    this._logger.debug(`Faye client ${this._onDisconnectEventManager.subscriberCount} subscribers on disconnect event`);
    if (this._state === FayeState.DISCONNECTED) {
      callback();
    }

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
        this._logger.debug(`Faye client ${this._onDisconnectEventManager.subscriberCount} subscribers on disconnect event`);
      }
    };
  }

  /**
   * Publish a message to the faye client
   *
   * @param {string} channel
   * @param {*} message
   * @memberof FayeService
   */
  public publish(channel: string, message: any) {
    this._client.publish(channel, message);
  }


}
