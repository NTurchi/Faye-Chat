import { ChatService } from './../../services/chat/chat.service';
import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-faye-chat-message',
  templateUrl: './faye-chat-message.component.html',
  styleUrls: ['./faye-chat-message.component.css']
})
export class FayeChatMessageComponent {
  @Input() incomeMessage: boolean;
  @Input() message: Message;
  @Input() sameSenderThanPreviousMsg: boolean;

  constructor() {
  }

}
