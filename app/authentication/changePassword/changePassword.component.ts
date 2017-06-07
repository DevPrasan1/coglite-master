// External imports
import { Component, OnInit } from '@angular/core';

// Internal imports
import { AuthService } from '../auth.service';
import { MessageService } from '../../common/common.services';
import { UserService } from '../../common/common.services';

@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    templateUrl: 'changePassword.component.html',
    styleUrls: ['changePassword.component.css'],
})

export class ChangePasswordComponent implements OnInit {
    // Object Store All Password
    public changePasswordObj: any= {
        oldPassword : '',
        newPassword : '',
        confirmPassword: ''

    };

    _userDetails: any;
    chngPasswordNoMatch: boolean = false;

    // intilialization
    constructor(private userService: UserService, private authService: AuthService, private messageService: MessageService) {
    }
    // This Function is used while user click on login button
    change(): void {
        this.matchPassword();
        if (this._userDetails.email && this.chngPasswordNoMatch === false) {
            this.authService.changePassword(this._userDetails.email, this.changePasswordObj.oldPassword, this.changePasswordObj.newPassword).subscribe((result) => {
                this.messageService.showMessage({ type: 'success', message: 'Password Change Successfully', duration: 3000 });
            }, error => {
                // show error msg when invalid user
                this.messageService.showMessage('login_error');
            });
        }

    };

    // This Function is used at on blur
    matchPassword(): void {
        if (this.changePasswordObj.confirmPassword !== undefined && this.changePasswordObj.newPassword !== undefined &&
        this.changePasswordObj.confirmPassword !== '' && this.changePasswordObj.newPassword !== '' && this.changePasswordObj.confirmPassword !== this.changePasswordObj.newPassword) {
            this.chngPasswordNoMatch = true;
        }else {
            this.chngPasswordNoMatch = false;
        }
    };

    // get user getUserDetails
    ngOnInit(): void {
        this._userDetails = this.userService.getUserDetails();
    }
}
