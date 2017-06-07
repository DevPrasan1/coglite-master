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
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var AuthGaurdService = (function () {
    function AuthGaurdService(route, _authService) {
        this.route = route;
        this._authService = _authService;
    }
    //
    AuthGaurdService.prototype.canActivate = function (route) {
        // get current url access
        var currentAccess = route.data['access'];
        var currentRoutePath;
        if (route.url !== undefined && route.url[0] !== undefined && route.url[0].path !== undefined) {
            currentRoutePath = route.url[0].path;
        }
        if (currentRoutePath === undefined) {
            return false;
        }
        if (currentRoutePath.indexOf('login') > -1) {
            console.log('if');
            //if (this._authService.getIsAuthenticated() && localStorage['xsrfToken']) {
            if (this._authService.getIsAuthenticated()) {
                if (this._authService.lastUserPath !== undefined && this._authService.lastUserPath !== '') {
                    var lastUserPath = this._authService.lastUserPath;
                    this._authService.lastUserPath = '';
                    this.route.navigateByUrl(lastUserPath);
                }
                else {
                    // when user in home page and user change url to login then we don't have last user path
                    this.route.navigate(['customerSearch']);
                }
            }
        }
        else if (currentAccess != null) {
            console.log('else');
            if (currentAccess.requiredAuthentication) {
                if (!this._authService.getIsAuthenticated()) {
                    // if (!localStorage['xsrfToken'] || !this._authService.getIsAuthenticated()) {
                    // Store user path before redirect to login
                    this._authService.lastUserPath = currentRoutePath;
                    this.route.navigate(['/login']);
                }
                else {
                    this._authService.lastUserPath = currentRoutePath;
                    return true;
                }
            }
        }
        return true;
    };
    return AuthGaurdService;
}());
AuthGaurdService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
], AuthGaurdService);
exports.AuthGaurdService = AuthGaurdService;
//# sourceMappingURL=auth-gaurd.service.js.map