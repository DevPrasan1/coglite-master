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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//
var auth_service_1 = require("../auth.service");
var common_services_1 = require("../../common/common.services");
var RegistrationComponent = (function () {
    // intilialization
    function RegistrationComponent(router, authService, messageService, localStorageUtilityService, userService) {
        this.router = router;
        this.authService = authService;
        this.messageService = messageService;
        this.localStorageUtilityService = localStorageUtilityService;
        this.userService = userService;
    }
    // This Function is used while user click on login button
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        this.authService.register(this.userName, this.password).subscribe(function (result) {
            //this.localStorageUtilityService.addToLocalStorage('sessionId',result.stsTokenManager.accessToken);
            // redirect to home
            _this.router.navigate(['login']);
            // display toaster message
            _this.messageService.showMessage({ type: 'success', message: 'SignUp Successfully', duration: 3000 });
            // remove search critearea after login
            _this.localStorageUtilityService.removeFromLocalStorage('customerSearchObject');
        }, function (error) {
            // show error msg when invalid user
            _this.messageService.showMessage('signup_error');
        });
    };
    ;
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        moduleId: module.id.replace('/compiledSrc', ''),
        templateUrl: 'registration.component.html',
        styleUrls: ['registration.component.css'],
    }),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, common_services_1.MessageService,
        common_services_1.LocalStorageUtilityService, common_services_1.UserService])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map