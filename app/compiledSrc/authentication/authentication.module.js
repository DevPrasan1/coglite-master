"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// External Imports
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
// Internal Imports
var shared_module_1 = require("../common/shared.module");
var login_component_1 = require("./login/login.component");
var logout_component_1 = require("./logout/logout.component");
var registration_component_1 = require("./registration/registration.component");
var changePassword_component_1 = require("./changePassword/changePassword.component");
var auth_service_1 = require("./auth.service");
var authentication_routing_1 = require("./authentication.routing");
// AoT requires an exported function for factories
function createSessionServiceFactory(authService) {
    return function () { return authService.createSession(true); };
}
exports.createSessionServiceFactory = createSessionServiceFactory;
var AuthenticationModule = (function () {
    function AuthenticationModule() {
    }
    return AuthenticationModule;
}());
AuthenticationModule = __decorate([
    core_1.NgModule({
        imports: [
            authentication_routing_1.AuthenticationRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            login_component_1.LoginComponent,
            logout_component_1.LogoutComponent,
            changePassword_component_1.ChangePasswordComponent,
            registration_component_1.RegistrationComponent
        ],
        providers: [
            auth_service_1.AuthService,
            {
                provide: core_2.APP_INITIALIZER,
                useFactory: createSessionServiceFactory,
                deps: [auth_service_1.AuthService],
                multi: true
            },
        ]
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map