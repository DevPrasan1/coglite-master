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
// External import
var core_1 = require("@angular/core");
// Internal Import
var common_services_1 = require("../../common/common.services");
var HeaderComponent = (function () {
    function HeaderComponent(userService) {
        this.userService = userService;
        this.isCollapsed = true;
        this.userDetails = null;
        this.userName = '';
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.userDetails = this.userService.getUserDetails();
        if (this.userDetails != undefined && this.userDetails['userName'] != undefined) {
            this.userName = this.userDetails['userName'];
        }
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        moduleId: module.id.replace('/compiledSrc', ''),
        selector: 'header',
        templateUrl: 'header.component.html',
        styleUrls: ['header.component.css'],
    }),
    __metadata("design:paramtypes", [common_services_1.UserService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map