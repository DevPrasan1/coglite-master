"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var enviroment_1 = require("../enviroment");
var common_services_1 = require("../common/common.services");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var AuthService = (function () {
    function AuthService(http, injector) {
        this.http = http;
        this.lastUserPath = '';
        this.isSessionEstablished = false;
        this._isAuthenticated = false;
        this.userService = injector.get(common_services_1.UserService);
        this.router = injector.get(router_1.Router);
        this.localStorageUtilityService = injector.get(common_services_1.LocalStorageUtilityService);
    }
    // set data after user login
    AuthService.prototype._login = function (data) {
        // update isAuthenticated variable
        this._isAuthenticated = true;
        // Update user details
        this.userService.updateUserDetails(data);
    };
    ;
    // clear data at logout time
    AuthService.prototype._logout = function () {
        // Reset user details
        this.userService.updateUserDetails({});
        // reset isAuthenticated
        this._isAuthenticated = false;
        // remove xsrh token
        this.localStorageUtilityService.removeFromLocalStorage('xsrfToken');
    };
    ;
    AuthService.prototype._recreateLogin = function (userData) {
        this._login(userData);
    };
    ;
    // To extract data from response
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    // To handle error from response
    AuthService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    AuthService.prototype._createSession = function (response, redirectToLastUserPath) {
        console.log('session call succeed authService');
        this.isSessionEstablished = true;
        if (response != null && response.userName != null && response.userName !== '') {
            // If redirectToLastUserPath is true redirect user to last grabed path.
            // This is required to open same page in case of ctrl+F5 or direct link.
            if (redirectToLastUserPath === true) {
                // here in past we are first recreate login and then redirect to last path but now this position is interchanged
                // for solve below issue
                // #issue solved : redirect from updateUserDetails method not work because its call after recreate so its redirect to last path
                // Redirect to last path
                // As user is already logged in on server. Set details in client side/
                this._recreateLogin(response);
                console.log('session authService.createSession - ' + this.getIsAuthenticated());
                // if las user path is defined then redirect to that path else redirect ot default path
                var lastUserPath = this.lastUserPath;
                this.lastUserPath = '';
                if (lastUserPath !== undefined && lastUserPath != null && lastUserPath !== '') {
                    this.router.navigateByUrl(lastUserPath);
                }
                // else
                //     this.router.navigateByUrl('customerSearch');
                // Turn off loading bar
                // loadingBarService.disableAppLoadingBar('system');
                // deferred.resolve("success");
            }
            else {
                // Turn off loading bar
                // loadingBarService.disableAppLoadingBar('system');
                // deferred.resolve("success");
            }
        }
        else {
            // Turn off loading bar
            // loadingBarService.disableAppLoadingBar('system');
            // deferred.resolve("success");
        }
    };
    /**
    **This Function is used to call createSession api
    **/
    AuthService.prototype.createSession = function (redirectToLastUserPath) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(enviroment_1.environment.origin + "/auth/session")
                .map(function (res) {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Bad response status: ' + res.status);
                }
                var body = res.json();
                _this._createSession(body.data || {}, redirectToLastUserPath);
            }).subscribe(function (config) {
                resolve();
            });
        });
    };
    /**
    **This Function is used to call changePassword api
    **/
    AuthService.prototype.changePassword = function (userName, oldPassword, newPassword) {
        return this.http.post(enviroment_1.environment.origin + "/auth/changePassword", { userName: userName, oldPassword: oldPassword, newPassword: newPassword })
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
    **This Function is used to call login api
    **/
    AuthService.prototype.login = function (userName, password) {
        var _this = this;
        var stream = this.http.post(enviroment_1.environment.origin + "/auth/login", { userName: userName, password: password })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('Bad response status: ' + res.status);
            }
            var data = res.json();
            _this._login(data || {});
            return data || {};
        });
        return stream;
    };
    /**
    **This Function is used to call register api
    **/
    AuthService.prototype.register = function (userName, password) {
        var stream = this.http.post(enviroment_1.environment.origin + "/auth/register", { userName: userName, password: password })
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('Bad response status: ' + res.status);
            }
            var data = res.json();
            //this._login(data || {});
            return data || {};
        });
        return stream;
    };
    /**
    **This Function is used to call logout api
    **/
    AuthService.prototype.logout = function () {
        var _this = this;
        var stream = this.http.post(enviroment_1.environment.origin + "/auth/logout", {})
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                throw new Error('Bad response status: ' + res.status);
            }
            // let body = res.json();
            _this._logout();
            return {};
        });
        return stream;
    };
    AuthService.prototype.getIsAuthenticated = function () {
        return this._isAuthenticated;
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, core_1.Injector])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map