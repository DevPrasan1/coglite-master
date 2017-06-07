// External imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

// Internal imports
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { AuthService } from './auth.service';

// Define Routes
const AuthetenticationRoutes: Routes  = [
	{ path: 'register', component: RegistrationComponent, canActivate: [AuthGaurdService], data: { 'access': { requiredAuthentication: false } } },
    { path: 'login', component: LoginComponent, canActivate: [AuthGaurdService], data: { 'access': { requiredAuthentication: false } } },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService], data: { 'access': { requiredAuthentication: true } } },
    { path: 'ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGaurdService], data: { 'access': { requiredAuthentication: false } } }
];

@NgModule({
    imports: [
        RouterModule.forChild(AuthetenticationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthenticationRoutingModule { }
