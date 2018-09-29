import { Injectable } from '@angular/core';

/**
 * Just console.log() wrapper (more sexy than use console object ;) )
 * @export
 * @class LoggerService
 */
@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor() { }
  private print(msg: string): string {
    return `${Date()} - [FayeChatWeb] => ${msg}`;
  }

  public error(msg: string)  {
    console.error(this.print(msg));
  }

  public debug(msg: string)  {
    console.log(this.print(msg));
  }
}
