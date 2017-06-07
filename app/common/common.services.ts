import { Injectable, ViewContainerRef } from '@angular/core';
import { ToasterService, Toast} from 'angular2-toaster';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { ConfirmDialog } from './dialogs/confirm-dialog/confirm-dialog.component';
import { NotifyDialog } from './dialogs/notify-dialog/notify-dialog.component';

import { Observable } from 'rxjs/Rx';

/**
 * This service is created to show toaster message
 */
@Injectable()
export class MessageService {
    // message array
    private messages: any = {
        'login_error': { type: 'error', message: 'User email and password combination do not match a registered user' },
        'login_success': { type: 'success', message: 'Logged In Sucessfully' },
        'logout_error': { type: 'error', message: 'Logout Error' },
        'logout_success': { type: 'success', message: 'Logged Out Sucessfully' },
        'default': { type: 'info', message: 'Error while processing your request', duration: 3000 }
    };

    constructor(public toasterService: ToasterService) { }

	// This function will show toaster based on user argument
    public showMessage(messageArg: any): void {
      let showType = this.messages['default'].message;
      let showText = this.messages['default'].type;
      let timeout = this.messages['default'].duration;
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
        } else if (typeof (messageArg) === 'string') {
            const messageKey: any = this.messages[messageArg];
            if (messageKey !== undefined && messageKey !== null && messageKey !== '') { // && !_.isEmpty(messageKey) (last condition)remove temporary and impementation is pending for isEmpty because of lodash
                showType = messageKey.type;
                showText = messageKey.message;
            } else {
                showType = this.messages['default'].type;
                showText = messageArg;
            }
            timeout = this.messages['default'].duration;
        }
        // Display Toaster
        if (showText !== '') {
            const toast: Toast = {
                type: showType,
                body: showText,
                timeout: timeout
            };
            this.toasterService.pop(toast);
        }
    }

    // to clear all toaster
    public clear(): void {
            this.toasterService.clear();
    };
};

@Injectable()
export class UserService {
    private _userDetails: any;

    // update logged in user data
    public updateUserDetails(data: any): void {
        this._userDetails = data;
    }

    // get user data
    public getProperty(key: string): any {
        return this._userDetails[key] === undefined ? '' : this._userDetails[key];

    }
    public getUserDetails(): any {
        return this._userDetails;
    }

}


// Start : DialogService

@Injectable()

export class DialogService {

    constructor(public dialog: MdDialog) {}

    // This function opens a dialog for confirmation
    public confirm(title: string, message: string, dialogConfig: any, viewContainerRef: ViewContainerRef): Observable<boolean> {

        // Give reference of ConfirmDialog component
        let dialogRef: MdDialogRef<ConfirmDialog>;
        const config = new MdDialogConfig();
        // Check if customized height and width is given or not
        if ( dialogConfig.width !== undefined && dialogConfig.width !== '' && dialogConfig.height !== undefined && dialogConfig.height !== '') {
            config.width = dialogConfig.width + 'px';
            config.height = dialogConfig.height + 'px';
        }
        config.viewContainerRef = viewContainerRef;
        // open confirmation dialog
        dialogRef = this.dialog.open(ConfirmDialog, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    // This function opens a dialog for notification
    public notify(title: string, message: string, dialogConfig: any, viewContainerRef: ViewContainerRef): Observable<boolean> {

        // Give reference of NotifyDialog component
        let dialogRef: MdDialogRef<NotifyDialog>;
        // Assign configuration for dialog
        const config = new MdDialogConfig();
        // Check if customized height and width is given or not
        if ( dialogConfig.width !== undefined && dialogConfig.width !== '' && dialogConfig.height !== undefined && dialogConfig.height !== '') {
            config.width = dialogConfig.width + 'px';
            config.height = dialogConfig.height + 'px';
        }
        config.viewContainerRef = viewContainerRef;
        // open notification dialog
        dialogRef = this.dialog.open(NotifyDialog, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    // This function opens a custom dialog
    public custom(dialogComponent: any, dialogConfig: any, viewContainerRef: ViewContainerRef): Observable<boolean> {
        // Give reference of CustomDialog component
        let dialogRef: MdDialogRef<any>;
        // Assign configuration for dialog
        const config = new MdDialogConfig();
        // Check if customized height and width is given or not
        if ( dialogConfig.width !== undefined && dialogConfig.width !== '') {
            config.width = dialogConfig.width + 'px';
        } else if (dialogConfig.height !== undefined && dialogConfig.height !== '') {
            config.height = dialogConfig.height + 'px';
        } else if (dialogConfig.data !== undefined && dialogConfig.data !== '') {
            config.data = dialogConfig.data;
        }
        config.viewContainerRef = viewContainerRef;
        // open custom dialog
        dialogRef = this.dialog.open(dialogComponent, config);

        dialogRef.componentInstance.title = dialogConfig.title;
        dialogRef.componentInstance.data = dialogConfig.data;
        dialogRef.componentInstance.customHtml = dialogConfig.customHtml;

        return dialogRef.afterClosed();
    }
}
// End : DialogService

// Start : LocalStorageUtilityService

@Injectable()
export class LocalStorageUtilityService {

   public addToLocalStorage(key: string, data: any): string {
        if (typeof (localStorage) === 'undefined') {
            return 'Error';
        } else {
            try {
                data = JSON.stringify(data);
                localStorage.setItem(key, data);
                return 'Success';
            } catch (e) {
                return 'Error';
            };
        };
    }

   public removeFromLocalStorage(key: string): string {
        if (typeof (localStorage) === 'undefined') {
            return 'Error';
            // $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                localStorage.removeItem(key);
                return 'Success';
            } catch (e) {
                return 'Error';
            };
        };
    };


  public getFromLocalStorage(key: string): any {
        if (typeof (localStorage) === 'undefined') {
            return 'Error';
            // $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return 'Error';
            }
        }
    };

 public checkLocalStorageKey(key: string): boolean {
        if (typeof (localStorage) === 'undefined') {
            return false;
            // $log.error('Your browser does not support HTML5 localStorage.Try upgrading.');
        } else {
            try {
                if (localStorage[key]) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
    };

   public manageLocalStorageReturnList(key: string, data: any): void {
        let currentData = localStorage.getItem(key);

        if (currentData == null) {
            const newList = new Array();
            newList.push(data);
            currentData = JSON.stringify(newList);
        }else {
            const currentList = JSON.parse(currentData);
            let isFound = false;
            let foundIndex;

            for (let _idx = 0; _idx < currentList.length; _idx++) {
                if (currentList[_idx].id === data.id) {
                    isFound = true;
                    foundIndex = _idx;
                    break;
                }
            }

            if (!isFound) {
                currentList.push(data);
            }else if (foundIndex !== undefined) {
                currentList.splice(foundIndex, 1, data);
            }
            currentData = JSON.stringify(currentList);
        }
        localStorage.setItem(key, currentData);
    };
}

// End : LocalStorageUtilityService
