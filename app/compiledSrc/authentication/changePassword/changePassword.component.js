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
// Internal imports
var auth_service_1 = require("../auth.service");
var common_services_1 = require("../../common/common.services");
var common_services_2 = require("../../common/common.services");
var ChangePasswordComponent = (function () {
    // intilialization
    function ChangePasswordComponent(userService, authService, messageService) {
        this.userService = userService;
        this.authService = authService;
        this.messageService = messageService;
        // Object Store All Password
        this.changePasswordObj = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };
        this.chngPasswordNoMatch = false;
    }
    // This Function is used while user click on login button
    ChangePasswordComponent.prototype.change = function () {
        var _this = this;
        this.matchPassword();
        if (this._userDetails.email && this.chngPasswordNoMatch === false) {
            this.authService.changePassword(this._userDetails.email, this.changePasswordObj.oldPassword, this.changePasswordObj.newPassword).subscribe(function (result) {
                _this.messageService.showMessage({ type: 'success', message: 'Password Change Successfully', duration: 3000 });
            }, function (error) {
                // show error msg when invalid user
                _this.messageService.showMessage('login_error');
            });
        }
    };
    ;
    // This Function is used at on blur
    ChangePasswordComponent.prototype.matchPassword = function () {
        if (this.changePasswordObj.confirmPassword !== undefined && this.changePasswordObj.newPassword !== undefined &&
            this.changePasswordObj.confirmPassword !== '' && this.changePasswordObj.newPassword !== '' && this.changePasswordObj.confirmPassword !== this.changePasswordObj.newPassword) {
            this.chngPasswordNoMatch = true;
        }
        else {
            this.chngPasswordNoMatch = false;
        }
    };
    ;
    // get user getUserDetails
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this._userDetails = this.userService.getUserDetails();
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id.replace('/compiledSrc', ''),
        templateUrl: 'changePassword.component.html',
        styleUrls: ['changePassword.component.css'],
    }),
    __metadata("design:paramtypes", [common_services_2.UserService, auth_service_1.AuthService, common_services_1.MessageService])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=changePassword.component.js.map