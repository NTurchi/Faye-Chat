import { ChatService } from './../../services/chat/chat.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faye-chat-user',
  templateUrl: './faye-chat-user.component.html',
  styleUrls: ['./faye-chat-user.component.css']
})
export class FayeChatUserComponent  {
  public isMute = false;
  public currentColorIndex = 0;
  public colors = ['purple', 'pink', 'red', 'green', 'blue']; // we can also use a color picker (not very hard)
  @Input() username: string;

  constructor(
    private _chatService: ChatService
  ) { }

  mute() {
    this._chatService.muteUser(this.username);
    this.isMute = true;
  }

  unmute() {
    this._chatService.unmuteUser(this.username);
    this.isMute = false;
  }

  changeColor() {
    if ((this.currentColorIndex + 1) === this.colors.length) {
      this.currentColorIndex = 0;
    } else {
      this.currentColorIndex += 1;
    }
    this._chatService.changeUserColor(this.username, this.colors[this.currentColorIndex]);
  }

}
