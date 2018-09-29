import { Injectable } from '@angular/core';
import { EventManager } from '../../utils/eventManager';

@Injectable({
  providedIn: 'root'
})
export class EventManagerFactory {
  public create() {
    return new EventManager();
  }
}
