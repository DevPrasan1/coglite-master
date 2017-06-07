import { Declaration } from '@angular/compiler/src/i18n/serializers/xml_helper';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
//
import {AuthService} from '../auth.service';
import {MessageService , LocalStorageUtilityService , UserService} from '../../common/common.services';

@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    templateUrl : 'registration.component.html',
    styleUrls: ['registration.component.css'],
})

export class RegistrationComponent {
    // varible for userName and password
    userName: string;
    password: string;

    // intilialization
    constructor(private router: Router, private authService: AuthService, private messageService: MessageService,
                private localStorageUtilityService: LocalStorageUtilityService, private userService: UserService) {
   
    }

    // This Function is used while user click on login button
    register(): void {
        this.authService.register(this.userName, this.password).subscribe((result) => {

            //this.localStorageUtilityService.addToLocalStorage('sessionId',result.stsTokenManager.accessToken);
            // redirect to home
            this.router.navigate(['login']);
            
            // display toaster message
            this.messageService.showMessage({ type: 'success', message: 'SignUp Successfully', duration: 3000 });
            // remove search critearea after login
            this.localStorageUtilityService.removeFromLocalStorage('customerSearchObject');
        }, error => {
            // show error msg when invalid user
            this.messageService.showMessage('signup_error');
        });
    };
}
