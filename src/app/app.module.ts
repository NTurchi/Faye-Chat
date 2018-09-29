import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FayeChatComponent } from './components/faye-chat/faye-chat.component';
import { FayeChatMessageComponent } from './components/faye-chat-message/faye-chat-message.component';
import { FayeChatUserComponent } from './components/faye-chat-user/faye-chat-user.component';

@NgModule({
  declarations: [
    AppComponent,
    FayeChatComponent,
    FayeChatMessageComponent,
    FayeChatUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
