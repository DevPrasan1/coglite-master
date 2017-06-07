import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

// internal imports
import {AuthService} from '../auth.service';
import {MessageService , LocalStorageUtilityService} from '../../common/common.services';

@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    templateUrl: 'logout.component.html'
})

export class LogoutComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private messageService: MessageService,
                private localStorageUtilityService: LocalStorageUtilityService) {}

    ngOnInit(): void {
        // Call logout api
        this.authService.logout().subscribe((result) => {
          // show message in toaster
          this.messageService.showMessage({ type: 'success', message: 'Logged Out Successfully', duration: 3000 });
          // redirect to login page
          this.router.navigate(['login']);
          window.location.reload();
        }, error => {
            // show error
            console.log(error);
        });
    }
}
