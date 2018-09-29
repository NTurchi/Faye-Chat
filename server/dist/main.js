(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#main-divider {\r\n    margin-bottom: 2%;\r\n}\r\n\r\n#main-title {\r\n    text-align: center;\r\n}\r\n\r\n.username-small {\r\n    color: red;\r\n}\r\n\r\n.main-container, .main-app {\r\n    height: 100%;\r\n}\r\n\r\n#main-enter {\r\n    text-align: center;\r\n}\r\n\r\n.main-input {\r\n    height: 85%;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container main-app\">\n  <div class=\"col s10 offset-s1 m10 offset-m1 main-container\">\n    <h2 id=\"main-title\">Faye Chat</h2>\n    <div class=\"divider\" id=\"main-divider\"></div>\n    <div class=\"row main-input\" *ngIf=\"!username\">\n      <div class=\"row\">\n        <form #f=\"ngForm\" [formGroup]=\"form\">\n          <div class=\"input-field col s8 offset-s2 m4 offset-m4\">\n              <input type=\"text\" class=\"validate\" (keyup.enter)=\"enter()\" class=\"form-control\" [ngClass]=\"{'is-invalid': !form.get('username').valid}\" id=\"username\" formControlName=\"username\">\n              <label for=\"username\">Username</label>\n              <div *ngIf=\"form.get('username').touched\">\n                <small *ngIf=\"usernameIsInvalid()\" class=\"form-text username-small\">\n                  Username must be between 3 and 15 characters long\n                </small>        \n              </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"row\" id=\"main-enter\">\n        <a class=\"waves-effect waves-light btn\" [ngClass]=\"{'disabled': usernameIsInvalid()}\" (click)=\"enter()\">Enter in the chat</a>\n      </div>\n    </div>\n    <app-faye-chat *ngIf=\"username\" [username]=\"username\"></app-faye-chat>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _services_logger_logger_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/logger/logger.service */ "./src/app/services/logger/logger.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(_fb, _logger) {
        this._fb = _fb;
        this._logger = _logger;
        this.title = 'Faye Chat';
        this.initForm();
    }
    /**
     * Form init (username)
     * @private
     * @memberof AppComponent
     */
    AppComponent.prototype.initForm = function () {
        // Form configuration
        this.form = this._fb.group({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(15)])
        });
    };
    /**
     * Return username invalid state
     * @returns
     * @memberof AppComponent
     */
    AppComponent.prototype.usernameIsInvalid = function () {
        return this.form.get('username').hasError('minlength') ||
            this.form.get('username').hasError('required') ||
            this.form.get('username').hasError('maxlength');
    };
    /**
     * Enter in the chat
     * @memberof AppComponent
     */
    AppComponent.prototype.enter = function () {
        if (!this.usernameIsInvalid()) {
            this.username = this.form.get('username').value;
            this._logger.debug("Connected as " + this.username);
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_logger_logger_service__WEBPACK_IMPORTED_MODULE_0__["Logger"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_faye_chat_faye_chat_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/faye-chat/faye-chat.component */ "./src/app/components/faye-chat/faye-chat.component.ts");
/* harmony import */ var _components_faye_chat_message_faye_chat_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/faye-chat-message/faye-chat-message.component */ "./src/app/components/faye-chat-message/faye-chat-message.component.ts");
/* harmony import */ var _components_faye_chat_user_faye_chat_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/faye-chat-user/faye-chat-user.component */ "./src/app/components/faye-chat-user/faye-chat-user.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _components_faye_chat_faye_chat_component__WEBPACK_IMPORTED_MODULE_4__["FayeChatComponent"],
                _components_faye_chat_message_faye_chat_message_component__WEBPACK_IMPORTED_MODULE_5__["FayeChatMessageComponent"],
                _components_faye_chat_user_faye_chat_user_component__WEBPACK_IMPORTED_MODULE_6__["FayeChatUserComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/faye-chat-message/faye-chat-message.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/components/faye-chat-message/faye-chat-message.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sender {    \r\n    display: block;\r\n    color: #000000;\r\n    font-size: 9pt;\r\n    padding-top: 5px !important;\r\n}\r\n\r\n.replies .sender {\r\n    padding: 0px 15px 3px 5px;\r\n}\r\n\r\n.sent .sender {\r\n    text-align: right;\r\n    padding: 5px 8px 3px 0px;\r\n}\r\n\r\ndiv.replies p {\r\n    color: white;\r\n    float: left;\r\n}\r\n\r\ndiv.sent p {\r\n    background: #0000;\r\n    color: white;\r\n    float: right;\r\n}\r\n\r\n.message {\r\n    margin-bottom: 0px;\r\n}\r\n\r\n.message p {\r\n    display: block;\r\n    padding: 10px 15px;\r\n    word-wrap:break-word;\r\n    border-radius: 7px;\r\n    line-height: 130%;\r\n    max-width: 70%;\r\n    margin-top: 5px;\r\n    margin-bottom: 5px;\r\n}"

/***/ }),

/***/ "./src/app/components/faye-chat-message/faye-chat-message.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/components/faye-chat-message/faye-chat-message.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!message.muted\" class=\"row message\" [ngClass]=\"{'sent': !incomeMessage, 'replies': incomeMessage}\">\n  <span class=\"sender\" *ngIf=\"!sameSenderThanPreviousMsg\" >{{ message.sender }}</span>\n  <p [ngStyle]=\"{'background-color': incomeMessage ? message.color : 'black'}\">{{ message.content }}</p>\n</div>"

/***/ }),

/***/ "./src/app/components/faye-chat-message/faye-chat-message.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/components/faye-chat-message/faye-chat-message.component.ts ***!
  \*****************************************************************************/
/*! exports provided: FayeChatMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FayeChatMessageComponent", function() { return FayeChatMessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FayeChatMessageComponent = /** @class */ (function () {
    function FayeChatMessageComponent() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FayeChatMessageComponent.prototype, "incomeMessage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FayeChatMessageComponent.prototype, "message", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FayeChatMessageComponent.prototype, "sameSenderThanPreviousMsg", void 0);
    FayeChatMessageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-faye-chat-message',
            template: __webpack_require__(/*! ./faye-chat-message.component.html */ "./src/app/components/faye-chat-message/faye-chat-message.component.html"),
            styles: [__webpack_require__(/*! ./faye-chat-message.component.css */ "./src/app/components/faye-chat-message/faye-chat-message.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FayeChatMessageComponent);
    return FayeChatMessageComponent;
}());



/***/ }),

/***/ "./src/app/components/faye-chat-user/faye-chat-user.component.css":
/*!************************************************************************!*\
  !*** ./src/app/components/faye-chat-user/faye-chat-user.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-info {\r\n    position: relative;\r\n    width: 100%;\r\n    left: 0;\r\n    height: 8%;\r\n}\r\n\r\n.username {\r\n    position: absolute;\r\n    left: 3%;\r\n    top: 4%;\r\n    color: black;\r\n}\r\n\r\n.color-icon {\r\n    position: absolute !important;\r\n    right: 2% !important;\r\n}\r\n\r\n.mute-icon {\r\n    position: absolute !important;\r\n    right: 20% !important;\r\n}"

/***/ }),

/***/ "./src/app/components/faye-chat-user/faye-chat-user.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/components/faye-chat-user/faye-chat-user.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row user-info\">\n  <p class=\"username\">{{ username }}</p>\n  <a class=\"btn-floating btn-large waves-effect waves-light green mute-icon\" *ngIf=\"!isMute\" (click)=\"mute()\"><i class=\"material-icons\">mic</i></a>\n  <a class=\"btn-floating btn-large waves-effect waves-light red mute-icon\" *ngIf=\"isMute\" (click)=\"unmute()\"><i class=\"material-icons\">mic_off</i></a>\n  <a class=\"btn-floating btn-large waves-effect waves-light color-icon\" (click)=\"changeColor()\" [ngStyle]=\"{'background-color': colors[currentColorIndex]}\"><i class=\"material-icons\"></i></a>\n</div>"

/***/ }),

/***/ "./src/app/components/faye-chat-user/faye-chat-user.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/faye-chat-user/faye-chat-user.component.ts ***!
  \***********************************************************************/
/*! exports provided: FayeChatUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FayeChatUserComponent", function() { return FayeChatUserComponent; });
/* harmony import */ var _services_chat_chat_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/chat/chat.service */ "./src/app/services/chat/chat.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FayeChatUserComponent = /** @class */ (function () {
    function FayeChatUserComponent(_chatService) {
        this._chatService = _chatService;
        this.isMute = false;
        this.currentColorIndex = 0;
        this.colors = ['purple', 'pink', 'red', 'green', 'blue']; // we can also use a color picker (not very hard)
    }
    FayeChatUserComponent.prototype.mute = function () {
        this._chatService.muteUser(this.username);
        this.isMute = true;
    };
    FayeChatUserComponent.prototype.unmute = function () {
        this._chatService.unmuteUser(this.username);
        this.isMute = false;
    };
    FayeChatUserComponent.prototype.changeColor = function () {
        if ((this.currentColorIndex + 1) === this.colors.length) {
            this.currentColorIndex = 0;
        }
        else {
            this.currentColorIndex += 1;
        }
        this._chatService.changeUserColor(this.username, this.colors[this.currentColorIndex]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], FayeChatUserComponent.prototype, "username", void 0);
    FayeChatUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-faye-chat-user',
            template: __webpack_require__(/*! ./faye-chat-user.component.html */ "./src/app/components/faye-chat-user/faye-chat-user.component.html"),
            styles: [__webpack_require__(/*! ./faye-chat-user.component.css */ "./src/app/components/faye-chat-user/faye-chat-user.component.css")]
        }),
        __metadata("design:paramtypes", [_services_chat_chat_service__WEBPACK_IMPORTED_MODULE_0__["ChatService"]])
    ], FayeChatUserComponent);
    return FayeChatUserComponent;
}());



/***/ }),

/***/ "./src/app/components/faye-chat/faye-chat.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/faye-chat/faye-chat.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".faye-chat {\r\n    height: 85%;\r\n    position: relative;\r\n}\r\n\r\n.messages-wrapper {\r\n    width: 70% !important;\r\n    position: absolute;\r\n    left: 28% !important;\r\n    height: 100%;\r\n    border-left: 1px solid silver;\r\n}\r\n\r\n.messages {\r\n    width: 100%;\r\n    height: 90%;\r\n    top: 0;\r\n    padding: 3%;\r\n    overflow-y: scroll;\r\n    overflow-x: hidden;\r\n    position: absolute;\r\n}\r\n\r\n.input-message {\r\n    width: 100%;\r\n    height: 10%;\r\n    position: absolute;\r\n    bottom: 0;\r\n}\r\n\r\n.input-text-message {\r\n    position: absolute;\r\n    width: 87% !important;\r\n    left: 1% !important;\r\n}\r\n\r\n.input-send-button {\r\n    position: absolute !important;\r\n    right: 2%;\r\n}\r\n\r\n.usernames-wrapper {\r\n    width: 28% !important;\r\n    position: absolute;\r\n    left: 0% !important;\r\n    height: 100%;\r\n}"

/***/ }),

/***/ "./src/app/components/faye-chat/faye-chat.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/faye-chat/faye-chat.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"faye-chat\">\n  <div class=\"messages-wrapper\">\n    <div class=\"messages\">\n      <app-faye-chat-message *ngFor=\"let message of messages; let i = index\" [message]=\"message\" [incomeMessage]=\"message.sender !== username\" [sameSenderThanPreviousMsg]=\"(i > 0 && message.sender === messages[(i - 1)].sender)\"></app-faye-chat-message> \n    </div>\n    <div class=\"input-message\">\n        <div class=\"input-field col s12 m12\">\n          <input type=\"text\" class=\"form-control input-text-message\" (keyup.enter)=\"sendMessage()\" [(ngModel)]=\"currentMessage\" id=\"message\">\n          <label for=\"username\">Message</label>\n          <a class=\"btn-floating btn-large waves-effect waves-light green input-send-button\" (click)=\"sendMessage()\"><i class=\"material-icons\">send</i></a>\n        </div>\n    </div>\n  </div>\n  <div class=\"usernames-wrapper\">\n    <app-faye-chat-user *ngFor=\"let username of usersInChat;\" [username]=\"username\"></app-faye-chat-user>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/components/faye-chat/faye-chat.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/faye-chat/faye-chat.component.ts ***!
  \*************************************************************/
/*! exports provided: FayeChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FayeChatComponent", function() { return FayeChatComponent; });
/* harmony import */ var _services_chat_chat_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/chat/chat.service */ "./src/app/services/chat/chat.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FayeChatComponent = /** @class */ (function () {
    function FayeChatComponent(_chatService) {
        var _this = this;
        this._chatService = _chatService;
        this.messages = [];
        this.usersInChat = [];
        this._chatService.event.on('color', function (username, color) {
            _this.getMessagesFromUser(username).forEach(function (m) {
                m.color = color;
            });
        });
        this._chatService.event.on('unmute', function (username) {
            _this.getMessagesFromUser(username).forEach(function (m) {
                m.muted = false;
            });
        });
    }
    FayeChatComponent.prototype.ngOnInit = function () {
        this._chatService.init(this.username);
        this._chatService.event.on('message', this.onNewMessage.bind(this));
    };
    /**
     * On new message
     * @private
     * @param {Message} message
     * @memberof FayeChatComponent
     */
    FayeChatComponent.prototype.onNewMessage = function (message) {
        if (!this.usersInChat.includes(message.sender)) {
            this.usersInChat.push(message.sender);
        }
        this.messages.push(message);
    };
    /**
     * Send message to other user
     *
     * @memberof FayeChatComponent
     */
    FayeChatComponent.prototype.sendMessage = function () {
        if (this.currentMessage.trim().length > 0) {
            var msg = {
                sender: this.username,
                content: this.currentMessage
            };
            this._chatService.sendMessage(msg);
            this.messages.push(msg);
            this.currentMessage = '';
        }
    };
    FayeChatComponent.prototype.getMessagesFromUser = function (username) {
        return this.messages.filter(function (m) { return m.sender === username; });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], FayeChatComponent.prototype, "username", void 0);
    FayeChatComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-faye-chat',
            template: __webpack_require__(/*! ./faye-chat.component.html */ "./src/app/components/faye-chat/faye-chat.component.html"),
            styles: [__webpack_require__(/*! ./faye-chat.component.css */ "./src/app/components/faye-chat/faye-chat.component.css")]
        }),
        __metadata("design:paramtypes", [_services_chat_chat_service__WEBPACK_IMPORTED_MODULE_0__["ChatService"]])
    ], FayeChatComponent);
    return FayeChatComponent;
}());



/***/ }),

/***/ "./src/app/enums/fayeState.enum.ts":
/*!*****************************************!*\
  !*** ./src/app/enums/fayeState.enum.ts ***!
  \*****************************************/
/*! exports provided: FayeState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FayeState", function() { return FayeState; });
var FayeState;
(function (FayeState) {
    FayeState[FayeState["DISCONNECTED"] = 0] = "DISCONNECTED";
    FayeState[FayeState["CONNECTING"] = 1] = "CONNECTING";
    FayeState[FayeState["CONNECTED"] = 2] = "CONNECTED";
})(FayeState || (FayeState = {}));


/***/ }),

/***/ "./src/app/services/chat/chat.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/chat/chat.service.ts ***!
  \***********************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var _logger_logger_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../logger/logger.service */ "./src/app/services/logger/logger.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fayeManager_faye_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../fayeManager/faye-manager.service */ "./src/app/services/fayeManager/faye-manager.service.ts");
/* harmony import */ var _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../enums/fayeState.enum */ "./src/app/enums/fayeState.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Chat service
 *
 * @export
 * @class ChatService
 */
var ChatService = /** @class */ (function () {
    function ChatService(_fayeManager, _logger) {
        var _this = this;
        this._fayeManager = _fayeManager;
        this._logger = _logger;
        /**
         * Faye channel to chat
         *
         * @private
         * @type {string}
         * @memberof ChatService
         */
        this._chatChannel = '/chat';
        /**
         * Chat event emiter
         *
         * @private
         * @memberof ChatService
         */
        this.event = new events__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * User preferences by sender in the chat
         *
         * @private
         * @type {{ [username: string]: UserPreference }}
         * @memberof ChatService
         */
        this._userPreference = {};
        /**
         * Default user preference
         *
         * @private
         * @type {UserPreference}
         * @memberof ChatService
         */
        this._defaultUserPreference = {
            color: 'purple',
            mute: false
        };
        // Actually not necessary
        this._fayeManager.onDisconnected(function () {
            _this.event.emit('disconnected');
        });
        this._fayeManager.onConnect(function () {
            _this.event.emit('connected');
        });
    }
    /**
     * Init chat
     *
     * @param {string} username
     * @memberof ChatService
     */
    ChatService.prototype.init = function (username) {
        var _this = this;
        this.cleanUp();
        this._currentUser = username;
        this._currentSubscription = this._fayeManager.subscribe(this._chatChannel, function (sender, message) {
            try {
                var msg = JSON.parse(message);
                if (!msg) {
                    throw new Error('Format not correct');
                }
                // We use middleware-like to map the message with user preferences
                if (msg.sender !== _this._currentUser) {
                    _this.event.emit('message', _this.wrapMessage(msg));
                }
            }
            catch (e) {
                // It's not a chat message
                _this._logger.error('Receive bad message ' + message);
            }
        }, false);
    };
    /**
     * Clean-up subscription
     */
    ChatService.prototype.cleanUp = function () {
        if (this._currentSubscription) {
            this._currentSubscription.unsubscribe(this._fayeManager.states === _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_4__["FayeState"].DISCONNECTED);
        }
    };
    /**
     * Wrap message by adding user preferences
     *
     * @private
     * @param {FayeChannelMessage} message
     * @returns {Message}
     * @memberof ChatService
     */
    ChatService.prototype.wrapMessage = function (message) {
        var userPref = this._userPreference[message.sender] ? this._userPreference[message.sender] :
            { mute: this._defaultUserPreference.mute, color: this._defaultUserPreference.color };
        var chatMsg = {
            content: message.content,
            sender: message.sender,
            color: userPref.color,
            muted: userPref.mute
        };
        return chatMsg;
    };
    /**
     * Mute a user in the chat
     *
     * @param {string} username
     * @memberof ChatService
     */
    ChatService.prototype.muteUser = function (username) {
        var userPref = this.getUserPef(username);
        userPref.mute = true;
        this.event.emit('mute', username);
    };
    /**
     * Unmute user
     *
     * @param {string} username
     * @memberof ChatService
     */
    ChatService.prototype.unmuteUser = function (username) {
        this.getUserPef(username).mute = false;
        this.event.emit('unmute', username);
    };
    /**
     * change user background color in chat
     *
     * @param {string} username
     * @param {string} color
     * @memberof ChatService
     */
    ChatService.prototype.changeUserColor = function (username, color) {
        this.getUserPef(username).color = color;
        this.event.emit('color', username, color);
    };
    /**
     * Get or set user preference
     *
     * @private
     * @param {string} username
     * @returns
     * @memberof ChatService
     */
    ChatService.prototype.getUserPef = function (username) {
        var userPref = this._userPreference[username];
        if (!userPref) {
            userPref = this._userPreference[username] = {
                color: this._defaultUserPreference.color,
                mute: this._defaultUserPreference.mute
            };
        }
        return userPref;
    };
    /**
     * Send message
     *
     * @private
     * @memberof ChatService
     */
    ChatService.prototype.sendMessage = function (message) {
        this._fayeManager.publish(this._chatChannel, JSON.stringify(message));
    };
    ChatService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_fayeManager_faye_manager_service__WEBPACK_IMPORTED_MODULE_3__["FayeManager"],
            _logger_logger_service__WEBPACK_IMPORTED_MODULE_0__["Logger"]])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./src/app/services/eventManager/event-manager-factory.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/services/eventManager/event-manager-factory.service.ts ***!
  \************************************************************************/
/*! exports provided: EventManagerFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventManagerFactory", function() { return EventManagerFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _utils_eventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/eventManager */ "./src/app/utils/eventManager.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var EventManagerFactory = /** @class */ (function () {
    function EventManagerFactory() {
    }
    EventManagerFactory.prototype.create = function () {
        return new _utils_eventManager__WEBPACK_IMPORTED_MODULE_1__["EventManager"]();
    };
    EventManagerFactory = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], EventManagerFactory);
    return EventManagerFactory;
}());



/***/ }),

/***/ "./src/app/services/fayeManager/faye-manager.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/services/fayeManager/faye-manager.service.ts ***!
  \**************************************************************/
/*! exports provided: FayeManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FayeManager", function() { return FayeManager; });
/* harmony import */ var _eventManager_event_manager_factory_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventManager/event-manager-factory.service */ "./src/app/services/eventManager/event-manager-factory.service.ts");
/* harmony import */ var _logger_logger_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/logger.service */ "./src/app/services/logger/logger.service.ts");
/* harmony import */ var _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums/fayeState.enum */ "./src/app/enums/fayeState.enum.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FayeManager = /** @class */ (function () {
    function FayeManager(_logger, _eventManagerFactory) {
        var _this = this;
        this._logger = _logger;
        this._eventManagerFactory = _eventManagerFactory;
        /**
         * Faye client status
         * @type {FayeState}
         * @memberof FayeService
         */
        this._state = _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_2__["FayeState"].DISCONNECTED;
        /**
         * Message cache size per channel
         *
         * @private
         * @memberof FayeService
         */
        this._maxChannelCacheSize = 2000;
        /**
         * Keep track of the subscribers
         *
         * @private
         * @type {{ [key: string]: EventManager[] }}
         * @memberof FayeService
         */
        this._channelEventManager = {};
        /**
         * Faye client event subscriptions
         *
         * @private
         * @type {{ [key: string]: EventManager }}
         * @memberof FayeService
         */
        this._fayeSubscriptions = {};
        /**
         * Cache per channel
         *
         * @private
         * @type {{ [key: string]: any[] }}
         * @memberof FayeService
         */
        this._cache = {};
        this._client = new Faye.Client('https://localhost/faye');
        this._onConnectEventManager = this._eventManagerFactory.create();
        this._onDisconnectEventManager = this._eventManagerFactory.create();
        this._client.on('transport:up', function () {
            _this._logger.debug('Faye client connected');
            _this._state = _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_2__["FayeState"].CONNECTED;
            _this._onConnectEventManager.raise(null);
        });
        this._client.on('transport:down', function () {
            _this._logger.debug('Faye client disconnected');
            _this._state = _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_2__["FayeState"].DISCONNECTED;
            _this._onDisconnectEventManager.raise(null);
        });
    }
    Object.defineProperty(FayeManager.prototype, "states", {
        /**
         * _state getter property
         *
         * @readonly
         * @memberof FayeService
         */
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    FayeManager.prototype.onChannelMesage = function (channel, message, cache) {
        this._channelEventManager[channel].raise(null, message);
        // store the message in cache
        cache.push(message);
        while (cache.length > this._maxChannelCacheSize) {
            cache.shift();
        }
    };
    /**
     * Susbcribe to channel's events
     *
     * @param {string} channel
     * @param {(sender: any, eventArgs: any) => void} callback
     * @param {boolean} fetchHistory
     * @returns
     * @memberof FayeService
     */
    FayeManager.prototype.subscribe = function (channel, callback, fetchHistory) {
        var _this = this;
        var eventManager = this._channelEventManager[channel];
        var cacheMessages = [];
        var subscription;
        var needToSubscribe = false;
        if (!eventManager) {
            eventManager = this._channelEventManager[channel] = this._eventManagerFactory.create();
            needToSubscribe = true;
        }
        if (this._cache[channel] === undefined) {
            this._cache[channel] = [];
        }
        subscription = eventManager.subscribe(null, callback);
        this._logger.debug("Faye client " + eventManager.subscriberCount + " subscribers on channel " + channel);
        cacheMessages = this._cache[channel];
        if (fetchHistory && cacheMessages.length > 0) {
            var copyCache = cacheMessages.slice();
            copyCache.forEach(function (m) {
                callback(null, m);
            });
        }
        if (needToSubscribe) {
            this._fayeSubscriptions[channel] = this._client.subscribe(channel, function (message) {
                _this.onChannelMesage(channel, message, cacheMessages);
            });
        }
        return {
            unsubscribe: function (disconnect) {
                subscription.unsubscribe();
                _this._logger.debug("Faye client " + eventManager.subscriberCount + " subscribers on channel " + channel);
                if (disconnect && !eventManager.hasSubscriber) {
                    _this._fayeSubscriptions[channel].cancel();
                    delete _this._fayeSubscriptions[channel];
                    delete _this._channelEventManager[channel];
                }
            }
        };
    };
    /**
     * OnConnect event (trigger when we are connected to the faye client)
     *
     * @param {() => void} callback
     * @returns
     * @memberof FayeService
     */
    FayeManager.prototype.onConnect = function (callback) {
        var _this = this;
        var subscription = this._onConnectEventManager.subscribe(null, callback);
        this._logger.debug("Faye client " + this._onConnectEventManager.subscriberCount + " subscribers on connect event");
        if (this._state === _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_2__["FayeState"].CONNECTED) {
            callback();
        }
        return {
            unsubscribe: function () {
                subscription.unsubscribe();
                _this._logger.debug("Faye client " + _this._onConnectEventManager.subscriberCount + " subscribers on connect event");
            }
        };
    };
    /**
     * OnDisconnect event (trigger when we are disconnected from the faye client)
     *
     * @param {() => void} callback
     * @returns
     * @memberof FayeService
     */
    FayeManager.prototype.onDisconnected = function (callback) {
        var _this = this;
        var subscription = this._onDisconnectEventManager.subscribe(null, callback);
        this._logger.debug("Faye client " + this._onDisconnectEventManager.subscriberCount + " subscribers on disconnect event");
        if (this._state === _enums_fayeState_enum__WEBPACK_IMPORTED_MODULE_2__["FayeState"].DISCONNECTED) {
            callback();
        }
        return {
            unsubscribe: function () {
                subscription.unsubscribe();
                _this._logger.debug("Faye client " + _this._onDisconnectEventManager.subscriberCount + " subscribers on disconnect event");
            }
        };
    };
    /**
     * Publish a message to the faye client
     *
     * @param {string} channel
     * @param {*} message
     * @memberof FayeService
     */
    FayeManager.prototype.publish = function (channel, message) {
        this._client.publish(channel, message);
    };
    FayeManager = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_logger_logger_service__WEBPACK_IMPORTED_MODULE_1__["Logger"],
            _eventManager_event_manager_factory_service__WEBPACK_IMPORTED_MODULE_0__["EventManagerFactory"]])
    ], FayeManager);
    return FayeManager;
}());



/***/ }),

/***/ "./src/app/services/logger/logger.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/logger/logger.service.ts ***!
  \***************************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Just console.log() wrapper (more sexy than use console object ;) )
 * @export
 * @class LoggerService
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.print = function (msg) {
        return Date() + " - [FayeChatWeb] => " + msg;
    };
    Logger.prototype.error = function (msg) {
        console.error(this.print(msg));
    };
    Logger.prototype.debug = function (msg) {
        console.log(this.print(msg));
    };
    Logger = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], Logger);
    return Logger;
}());



/***/ }),

/***/ "./src/app/utils/eventManager.ts":
/*!***************************************!*\
  !*** ./src/app/utils/eventManager.ts ***!
  \***************************************/
/*! exports provided: EventManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventManager", function() { return EventManager; });
var EventManager = /** @class */ (function () {
    function EventManager() {
        /**
         * Subscriptions
         *
         * @private
         * @type {Array<Subscription>}
         * @memberof EventManger
         */
        this._subscriptions = [];
    }
    Object.defineProperty(EventManager.prototype, "hasSubscriber", {
        /**
         * Returns true if EventManager has at least one subscriber
         *
         * @readonly
         * @type {boolean}
         * @memberof EventManger
         */
        get: function () {
            return this._subscriptions.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventManager.prototype, "subscriberCount", {
        /**
         * Returns the number of subscribers
         *
         * @readonly
         * @type {number}
         * @memberof EventManger
         */
        get: function () {
            return this._subscriptions.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clean up event manager
     *
     * @private
     * @memberof EventManger
     */
    EventManager.prototype.cleanup = function () {
        this._subscriptions = [];
    };
    /**
     * Subscribe to the event in order to be notified,
     * but notified only once and then the event is automatically unsubscribed
     * @param {Object | undefined} context
     * @param {(sender: any, eventArg: any) => void} handler
     * @returns
     * @memberof EventManger
     */
    EventManager.prototype.subscribeOnce = function (context, handler) {
        return this._subscribe(true, context, handler);
    };
    /**
     * Subscribe to the event in order to be notified
     * @param {Object | undefined} context
     * @param {(sender: any, eventArg: any) => void} handler
     * @returns
     * @memberof EventManger
     */
    EventManager.prototype.subscribe = function (context, handler) {
        return this._subscribe(false, context, handler);
    };
    /**
     * @private
     * @param {(Object | undefined)} context
     * @param {(sender: any, eventArg: any) => void} handler
     * @memberof EventManger
     */
    EventManager.prototype._subscribe = function (isOnce, context, handler) {
        var localSubscription = {
            context: context,
            handler: handler,
            isOnce: isOnce
        };
        var self = this;
        this._subscriptions.push(localSubscription);
        return ({
            unsubscribe: function () {
                self._unsubscribe(localSubscription);
                this.unsubscribe = function () { return undefined; };
            }.bind(this)
        });
    };
    /**
     * Unsubscribe
     *
     * @private
     * @param {*} subscription
     * @memberof EventManger
     */
    EventManager.prototype._unsubscribe = function (subscription) {
        if (this._subscriptions.includes(subscription)) {
            this._subscriptions.splice(this._subscriptions.indexOf(subscription, 1));
        }
    };
    /**
     * Raise the event bu notifying all the subscribed handlers
     *
     * @param {Object} sender
     * @param {*} eventArg
     * @memberof EventManger
     */
    EventManager.prototype.raise = function (sender, eventArg) {
        var _this = this;
        var unsubscribeList = [];
        this._subscriptions.forEach(function (sub) {
            sub.handler.call(sub.context, sender, eventArg);
            if (sub.isOnce) {
                unsubscribeList.push(sub);
            }
        });
        unsubscribeList.forEach(function (sub) { _this._unsubscribe(sub); });
    };
    return EventManager;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Nicolas\Desktop\Exercice\bitcraft_exercise\fayeChat\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map