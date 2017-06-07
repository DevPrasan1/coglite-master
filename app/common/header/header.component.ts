// External import
import { OnInit, Component } from '@angular/core';

// Internal Import
import { UserService } from '../../common/common.services';
@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})

export class HeaderComponent implements OnInit {
    public isCollapsed: boolean = true;
    userDetails: Object = null;
    userName: String = '';
    constructor(private userService: UserService) { }
    
    public ngOnInit(): void {
        this.userDetails = this.userService.getUserDetails();
        if (this.userDetails != undefined && this.userDetails['userName'] != undefined) {
            this.userName = this.userDetails['userName'];
        }
    }
}
