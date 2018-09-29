import { Logger } from './services/logger/logger.service';
import { Component, Input } from '@angular/core';
import { FormBuilder, Form, FormGroup, Validators, FormControl } from '@angular/forms';
import { FayeManager } from './services/fayeManager/faye-manager.service';
import { sendRequest } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Faye Chat';

  /**
   * Username input formular
   *
   * @type {FormGroup}
   * @memberof AppComponent
   */
  form: FormGroup;

  /**
   * Current user's username
   *
   * @type {string}
   * @memberof AppComponent
   */
  username: string;

  constructor(
    private _fb: FormBuilder,
    private _logger: Logger
  ) {
    this.initForm();
  }

  /**
   * Form init (username)
   * @private
   * @memberof AppComponent
   */
  private initForm() {
    // Form configuration
    this.form = this._fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
    });
  }

  /**
   * Return username invalid state
   * @returns
   * @memberof AppComponent
   */
  public usernameIsInvalid() {
    return this.form.get('username').hasError('minlength') ||
      this.form.get('username').hasError('required') ||
      this.form.get('username').hasError('maxlength');
  }

  /**
   * Enter in the chat
   * @memberof AppComponent
   */
  public enter() {
    if (!this.usernameIsInvalid()) {
      this.username = this.form.get('username').value;
      this._logger.debug(`Connected as ${this.username}`);
    }
  }
}
