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
var angular2_toaster_1 = require("angular2-toaster");
var material_1 = require("@angular/material");
var confirm_dialog_component_1 = require("./dialogs/confirm-dialog/confirm-dialog.component");
var notify_dialog_component_1 = require("./dialogs/notify-dialog/notify-dialog.component");
/**
 * This service is created to show toaster message
 */
var MessageService = (function () {
    function MessageService(toasterService) {
        this.toasterService = toasterService;
        // message array
        this.messages = {
            'login_error': { type: 'error', message: 'User email and password combination do not match a registered user' },
            'login_success': { type: 'success', message: 'Logged In Sucessfully' },
            'logout_error': { type: 'error', message: 'Logout Error' },
            'logout_success': { type: 'success', message: 'Logged Out Sucessfully' },
            'default': { type: 'info', message: 'Error while processing your request', duration: 3000 }
        };
    }
    // This function will show toaster based on user argument
    MessageService.prototype.showMessage = function (messageArg) {
        var showType = this.messages['default'].message;
        var showText = this.messages['default'].type;
        var timeout = this.messages['default'].duration;
        if (typeof (messageArg) === 'object') {
            // For Message Type
            if (messageArg.type !== '' && messageArg.type !== undefined) {
                showType = messageArg.type;
            }
            // For Message Text
            if (messageArg.message !== '' && messageArg.message !== undefined) {
                showText = messageArg.message;
            }
            // For Message Duration
            if (messageArg.duration !== '' && messageArg.duration !== undefined) {
                timeout = messageArg.duration;
            }
        }
        else if (typeof (messageArg) === 'string') {
            var messageKey = this.messages[messageArg];
            if (messageKey !== undefined && messageKey !== null && messageKey !== '') {
                showType = messageKey.type;
                showText = messageKey.message;
            }
            else {
                showType = this.messages['default'].type;
                showText = messageArg;
            }
            timeout = this.messages['default'].duration;
        }
        // Display Toaster
        if (showText !== '') {
            var toast = {
                type: showType,
                body: showText,
                timeout: timeout
            };
            this.toasterService.pop(toast);
        }
    };
    // to clear all toaster
    MessageService.prototype.clear = function () {
        this.toasterService.clear();
    };
    ;
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular2_toaster_1.ToasterService])
], MessageService);
exports.MessageService = MessageService;
;
var UserService = (function () {
    function UserService() {
    }
    // update logged in user data
    UserService.prototype.updateUserDetails = function (data) {
        this._userDetails = data;
    };
    // get user data
    UserService.prototype.getProperty = function (key) {
        return this._userDetails[key] === undefined ? '' : this._userDetails[key];
    };
    UserService.prototype.getUserDetails = function () {
        return this._userDetails;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
// Start : DialogService
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    // This function opens a dialog for confirmation
    DialogService.prototype.confirm = function (title, message, dialogConfig, viewContainerRef) {
        // Give reference of ConfirmDialog component
        var dialogRef;
        var config = new material_1.MdDialogConfig();
        // Check if customized height and width is given or not
        if (dialogConfig.width !== undefined && dialogConfig.width !== '' && dialogConfig.height !== undefined && dialogConfig.height !== '') {
            config.width = dialogConfig.width + 'px';
            config.height = dialogConfig.height + 'px';
        }
        config.viewContainerRef = viewContainerRef;
        // open confirmation dialog
        dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialog, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    };
    // This function opens a dialog for notification
    DialogService.prototype.notify = function (title, message, dialogConfig, viewContainerRef) {
        // Give reference of NotifyDialog component
        var dialogRef;
        // Assign configuration for dialog
        var config = new material_1.MdDialogConfig();
        // Check if customized height and width is given or not
        if (dialogConfig.width !== undefined && dialogConfig.width !== '' && dialogConfig.height !== undefined && dialogConfig.height !== '') {
            config.width = dialogConfig.width + 'px';
            config.height = dialogConfig.height + 'px';
        }
        config.viewContainerRef = viewContainerRef;
        // open notification dialog
        dialogRef = this.dialog.open(notify_dialog_component_1.NotifyDialog, config);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    };
    // This function opens a custom dialog
    DialogService.prototype.custom = function (dialogComponent, dialogConfig, viewContainerRef) {
        // Give reference of CustomDialog component
        var dialogRef;
        // Assign configuration for dialog
        var config = new material_1.MdDialogConfig();
        // Check if customized height and width is given or not
        if (dialogConfig.width !== undefined && dialogConfig.width !== '') {
            config.width = dialogConfig.width + 'px';
        }
        else if (dialogConfig.height !== undefined && dialogConfig.height !== '') {
            config.height = dialogConfig.height + 'px';
        }
        else if (dialogConfig.data !== undefined && dialogConfig.data !== '') {
            config.data = dialogConfig.data;
        }
        config.viewContainerRef = viewContainerRef;
        // open custom dialog
        dialogRef = this.dialog.open(dialogComponent, config);
        dialogRef.componentInstance.title = dialogConfig.title;
        dialogRef.componentInstance.data = dialogConfig.data;
        dialogRef.componentInstance.customHtml = dialogConfig.customHtml;
        return dialogRef.afterClosed();
    };
    return DialogService;
}());
DialogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_1.MdDialog])
], DialogService);
exports.DialogService = DialogService;
// End : DialogService
// Start : LocalStorageUtilityService
var LocalStorageUtilityService = (function () {
    function LocalStorageUtilityService() {
    }
    LocalStorageUtilityService.prototype.addToLocalStorage = function (key, data) {
        if (typeof (localStorage) === 'undefined') {
            return 'Error';
        }
        else {
            try {
                data = JSON.stringify(data);
                localStorage.setItem(key, data);
                return 'Success';
            }
            catch (e) {
                return 'Error';
            }
            ;
        }
        ;
    };
    LocalStorageUtilityService.prototype.removeFromLocalStorage = function (key) {
        if (typeof (localStorage) === 'undefined') {
            return 'Error';
            // $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        }
        else {
            try {
                localStorage.removeItem(key);
                return 'Success';
            }
            catch (e) {
                return 'Error';
            }
            ;
        }
        ;
    };
    ;
    LocalStorageUtilityService.prototype.getFromLocalStorage = function (key) {
        if (typeof (localStorage) === 'undefined') {
            return 'Error';
            // $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        }
        else {
            try {
                return JSON.parse(localStorage.getItem(key));
            }
            catch (e) {
                return 'Error';
            }
        }
    };
    ;
    LocalStorageUtilityService.prototype.checkLocalStorageKey = function (key) {
        if (typeof (localStorage) === 'undefined') {
            return false;
            // $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        }
        else {
            try {
                if (localStorage[key]) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        }
    };
    ;
    LocalStorageUtilityService.prototype.manageLocalStorageReturnList = function (key, data) {
        var currentData = localStorage.getItem(key);
        if (currentData == null) {
            var newList = new Array();
            newList.push(data);
            currentData = JSON.stringify(newList);
        }
        else {
            var currentList = JSON.parse(currentData);
            var isFound = false;
            var foundIndex = void 0;
            for (var _idx = 0; _idx < currentList.length; _idx++) {
                if (currentList[_idx].id === data.id) {
                    isFound = true;
                    foundIndex = _idx;
                    break;
                }
            }
            if (!isFound) {
                currentList.push(data);
            }
            else if (foundIndex !== undefined) {
                currentList.splice(foundIndex, 1, data);
            }
            currentData = JSON.stringify(currentList);
        }
        localStorage.setItem(key, currentData);
    };
    ;
    return LocalStorageUtilityService;
}());
LocalStorageUtilityService = __decorate([
    core_1.Injectable()
], LocalStorageUtilityService);
exports.LocalStorageUtilityService = LocalStorageUtilityService;
// End : LocalStorageUtilityService
//# sourceMappingURL=common.services.js.map