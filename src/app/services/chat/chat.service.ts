import { Message } from './../../interfaces/message';
import { Logger } from './../logger/logger.service';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { FayeManager } from '../fayeManager/faye-manager.service';
import { FayeChannelMessage } from '../../interfaces/fayeChannelMessage';
import { UserPreference } from '../../interfaces/userPreference';
import { FayeState } from '../../enums/fayeState.enum';

/**
 * Chat service
 *
 * @export
 * @class ChatService
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /**
   * Faye channel to chat
   *
   * @private
   * @type {string}
   * @memberof ChatService
   */
  private _chatChannel = '/chat';

  /**
   * Chat event emiter
   *
   * @private
   * @memberof ChatService
   */
  public event = new EventEmitter();

  /**
   * Current user
   *
   * @private
   * @type {string}
   * @memberof ChatService
   */
  private _currentUser: string;

  /**
   * User preferences by sender in the chat
   *
   * @private
   * @type {{ [username: string]: UserPreference }}
   * @memberof ChatService
   */
  private _userPreference: { [username: string]: UserPreference } = { };

  private _currentSubscription: {
    unsubscribe: (disconnect: boolean) => void
  };

  /**
   * Default user preference
   *
   * @private
   * @type {UserPreference}
   * @memberof ChatService
   */
  private _defaultUserPreference: UserPreference = {
    color: 'purple',
    mute: false
  };

  constructor(
    private _fayeManager: FayeManager,
    private _logger: Logger
  ) {
    // Actually not necessary
    this._fayeManager.onDisconnected(() => {
      this.event.emit('disconnected');
    });

    this._fayeManager.onConnect(() => {
      this.event.emit('connected');
    });
  }

  /**
   * Init chat
   *
   * @param {string} username
   * @memberof ChatService
   */
  public init(username: string) {
    this.cleanUp();
    this._currentUser = username;
    this._currentSubscription = this._fayeManager.subscribe(this._chatChannel, (sender, message) => {
      try {
        const msg = JSON.parse(message) as FayeChannelMessage;
        if (!msg) {
          throw new Error('Format not correct');
        }
        // We use middleware-like to map the message with user preferences
        if (msg.sender !== this._currentUser) {
          this.event.emit('message', this.wrapMessage(msg));
        }
      } catch (e) {
        // It's not a chat message
        this._logger.error('Receive bad message ' + message);
      }
    }, false);
  }

  /**
   * Clean-up subscription
   */
  public cleanUp() {
    if (this._currentSubscription) {
      this._currentSubscription.unsubscribe(this._fayeManager.states === FayeState.DISCONNECTED);
    }
  }

  /**
   * Wrap message by adding user preferences
   *
   * @private
   * @param {FayeChannelMessage} message
   * @returns {Message}
   * @memberof ChatService
   */
  private wrapMessage(message: FayeChannelMessage): Message {
    const userPref = this._userPreference[message.sender] ? this._userPreference[message.sender] :
    { mute: this._defaultUserPreference.mute, color: this._defaultUserPreference.color };
    const chatMsg: Message = {
      content: message.content,
      sender: message.sender,
      color: userPref.color,
      muted: userPref.mute
    };
    return chatMsg;
  }

  /**
   * Mute a user in the chat
   *
   * @param {string} username
   * @memberof ChatService
   */
  public muteUser(username: string) {
    const userPref = this.getUserPef(username);
    userPref.mute = true;
    this.event.emit('mute', username);
  }

  /**
   * Unmute user
   *
   * @param {string} username
   * @memberof ChatService
   */
  public unmuteUser(username: string) {
    this.getUserPef(username).mute = false;
    this.event.emit('unmute', username);
  }

  /**
   * change user background color in chat
   *
   * @param {string} username
   * @param {string} color
   * @memberof ChatService
   */
  public changeUserColor(username: string, color: string) {
    this.getUserPef(username).color = color;
    this.event.emit('color', username, color);
  }

  /**
   * Get or set user preference
   *
   * @private
   * @param {string} username
   * @returns
   * @memberof ChatService
   */
  private getUserPef(username: string) {
    let userPref = this._userPreference[username];
    if (!userPref) {
      userPref = this._userPreference[username] = {
        color: this._defaultUserPreference.color,
        mute: this._defaultUserPreference.mute
      };
    }
    return userPref;
  }

  /**
   * Send message
   *
   * @private
   * @memberof ChatService
   */
  public sendMessage(message: FayeChannelMessage) {
    this._fayeManager.publish(this._chatChannel, JSON.stringify(message));
  }

}
