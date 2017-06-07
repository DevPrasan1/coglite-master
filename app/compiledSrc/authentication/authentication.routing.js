"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Internal imports
var login_component_1 = require("./login/login.component");
var logout_component_1 = require("./logout/logout.component");
var registration_component_1 = require("./registration/registration.component");
var changePassword_component_1 = require("./changePassword/changePassword.component");
var auth_gaurd_service_1 = require("./auth-gaurd.service");
// Define Routes
var AuthetenticationRoutes = [
    { path: 'register', component: registration_component_1.RegistrationComponent, canActivate: [auth_gaurd_service_1.AuthGaurdService], data: { 'access': { requiredAuthentication: false } } },
    { path: 'login', component: login_component_1.LoginComponent, canActivate: [auth_gaurd_service_1.AuthGaurdService], data: { 'access': { requiredAuthentication: false } } },
    { path: 'logout', component: logout_component_1.LogoutComponent, canActivate: [auth_gaurd_service_1.AuthGaurdService], data: { 'access': { requiredAuthentication: true } } },
    { path: 'ChangePassword', component: changePassword_component_1.ChangePasswordComponent, canActivate: [auth_gaurd_service_1.AuthGaurdService], data: { 'access': { requiredAuthentication: false } } }
];
var AuthenticationRoutingModule = (function () {
    function AuthenticationRoutingModule() {
    }
    return AuthenticationRoutingModule;
}());
AuthenticationRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(AuthetenticationRoutes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], AuthenticationRoutingModule);
exports.AuthenticationRoutingModule = AuthenticationRoutingModule;
//# sourceMappingURL=authentication.routing.js.map