// External Imports
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

// Internal Imports
import { SharedModule } from '../common/shared.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { AuthService } from './auth.service';
import { AuthenticationRoutingModule } from './authentication.routing';

// AoT requires an exported function for factories
export function createSessionServiceFactory(authService: AuthService) {
    return () => authService.createSession(true);
}

@NgModule({
    imports: [
        AuthenticationRoutingModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
        ChangePasswordComponent,
        RegistrationComponent
    ],
    providers: [
        AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: createSessionServiceFactory,
            deps: [AuthService],
            multi: true
        },
    ]
})

export class AuthenticationModule {
}
