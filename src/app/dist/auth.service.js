"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var msal_1 = require("msal");
var AuthService = /** @class */ (function () {
    function AuthService(broadcastService, msalService) {
        this.broadcastService = broadcastService;
        this.msalService = msalService;
        this.title = 'Party App';
        this.isIframe = false;
        this.loggedIn = false;
    }
    AuthService.prototype.startLogin = function () {
        var _this = this;
        this.isIframe = window !== window.parent && !window.opener;
        this.checkAccount();
        this.broadcastService.subscribe('msal:loginSuccess', function () {
            _this.checkAccount();
        });
        this.msalService.handleRedirectCallback(function (authError, response) {
            if (authError) {
                console.error('Redirect Error: ', authError.errorMessage);
                return;
            }
            console.log('Redirect Success: ', response.accessToken);
        });
        this.msalService.setLogger(new msal_1.Logger(function (logLevel, message, piiEnabled) {
            console.log('MSAL Logging: ', message);
        }, {
            correlationId: msal_1.CryptoUtils.createNewGuid(),
            piiLoggingEnabled: false
        }));
    };
    AuthService.prototype.checkAccount = function () {
        this.loggedIn = !!this.msalService.getAccount();
    };
    AuthService.prototype.login = function () {
        var isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
        if (isIE) {
            this.msalService.loginRedirect();
        }
        else {
            this.msalService.loginPopup();
        }
    };
    AuthService.prototype.logout = function () {
        this.msalService.logout();
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
