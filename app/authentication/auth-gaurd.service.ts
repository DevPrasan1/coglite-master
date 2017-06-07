// External imports
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGaurdService implements CanActivate {
    constructor(private route: Router, private _authService: AuthService) { }

    //
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // get current url access
        const currentAccess = route.data['access'];
        let currentRoutePath;
        if (route.url !== undefined && route.url[0] !== undefined && route.url[0].path !== undefined) {
            currentRoutePath = route.url[0].path;
        }
        if (currentRoutePath === undefined) {
            return false;
        }

        if (currentRoutePath.indexOf('login') > -1) {
            console.log('if');
            //if (this._authService.getIsAuthenticated() && localStorage['xsrfToken']) {
            if (this._authService.getIsAuthenticated()) {
                if (this._authService.lastUserPath !== undefined && this._authService.lastUserPath !== '') {
                    const lastUserPath = this._authService.lastUserPath;
                    this._authService.lastUserPath = '';
                    this.route.navigateByUrl(lastUserPath);
                }else {
                    // when user in home page and user change url to login then we don't have last user path
                    this.route.navigate(['customerSearch']);
                }
            }
        } else if (currentAccess != null) {
            console.log('else');
            if (currentAccess.requiredAuthentication) {
                if (!this._authService.getIsAuthenticated()) {
               // if (!localStorage['xsrfToken'] || !this._authService.getIsAuthenticated()) {
                    // Store user path before redirect to login
                    this._authService.lastUserPath = currentRoutePath;
                    this.route.navigate(['/login']);
                }else {
                    this._authService.lastUserPath = currentRoutePath;
                    return true;
                }
            }
        }
        return true;
    }
}
