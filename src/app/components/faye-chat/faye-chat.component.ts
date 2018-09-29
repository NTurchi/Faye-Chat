import { ChatService } from './../../services/chat/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../interfaces/message';
import { UserPreference } from '../../interfaces/userPreference';

@Component({
  selector: 'app-faye-chat',
  templateUrl: './faye-chat.component.html',
  styleUrls: ['./faye-chat.component.css']
})
export class FayeChatComponent implements OnInit {

  @Input() username: string;

  public messages: Message[] = [];

  public usersInChat: string[] = [];

  /**
   * Current message written by the current user
   *
   * @type {string}
   * @memberof FayeChatComponent
   */
  public currentMessage: string;

  constructor(
    private _chatService: ChatService
  ) {
    this._chatService.event.on('color', (username, color) => {
      this.getMessagesFromUser(username).forEach(m => {
        m.color = color;
      });
    });


    this._chatService.event.on('unmute', (username) => {
      this.getMessagesFromUser(username).forEach(m => {
        m.muted = false;
      });
    });
  }

  ngOnInit(): void {
    this._chatService.init(this.username);
    this._chatService.event.on('message', this.onNewMessage.bind(this));
  }
  /**
   * On new message
   * @private
   * @param {Message} message
   * @memberof FayeChatComponent
   */
  private onNewMessage(message: Message) {
    if (!this.usersInChat.includes(message.sender)) {
      this.usersInChat.push(message.sender);
    }
    this.messages.push(message);
  }

  /**
   * Send message to other user
   *
   * @memberof FayeChatComponent
   */
  public sendMessage() {
    if (this.currentMessage.trim().length > 0) {
      const msg = {
        sender: this.username,
        content: this.currentMessage
      };
      this._chatService.sendMessage(msg);
      this.messages.push(msg);
      this.currentMessage = '';
    }
  }

  public getMessagesFromUser(username: string): Message[] {
    return this.messages.filter(m => m.sender === username);
  }
}
