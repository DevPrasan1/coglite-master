// External imports
import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../enviroment';
import { UserService, LocalStorageUtilityService } from '../common/common.services';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {
    private userService: UserService;
    private router: Router;
    private localStorageUtilityService: LocalStorageUtilityService;
    lastUserPath: string = '';
    isSessionEstablished: boolean = false;
    _isAuthenticated: boolean= false;

    constructor(
        private http: Http, injector: Injector) {
        this.userService = injector.get(UserService);
        this.router = injector.get(Router);
        this.localStorageUtilityService=injector.get(LocalStorageUtilityService);

    }

    // set data after user login
    private _login (data: any): void {
        // update isAuthenticated variable
        this._isAuthenticated = true;
        // Update user details

        this.userService.updateUserDetails(data);
    };

    // clear data at logout time
    private _logout(): void {
        // Reset user details
        this.userService.updateUserDetails({});
        // reset isAuthenticated
        this._isAuthenticated = false;
        // remove xsrh token
        this.localStorageUtilityService.removeFromLocalStorage('xsrfToken');
    };

    private _recreateLogin (userData: any): any {
        this._login(userData);
    };

    // To extract data from response
    private extractData(res: Response): any {
        const body = res.json();
        return body.data || { };
    }
    // To handle error from response
    private handleError (error: Response | any): any {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private _createSession(response: any, redirectToLastUserPath: any): any {
        console.log('session call succeed authService');
        this.isSessionEstablished = true;
        if (response != null && response.userName != null && response.userName !== '') {
            // If redirectToLastUserPath is true redirect user to last grabed path.
            // This is required to open same page in case of ctrl+F5 or direct link.
            if (redirectToLastUserPath === true) {
                // here in past we are first recreate login and then redirect to last path but now this position is interchanged
                // for solve below issue
                // #issue solved : redirect from updateUserDetails method not work because its call after recreate so its redirect to last path
                // Redirect to last path

                // As user is already logged in on server. Set details in client side/
                this._recreateLogin(response);
                console.log('session authService.createSession - ' + this.getIsAuthenticated());
                // if las user path is defined then redirect to that path else redirect ot default path

                const lastUserPath = this.lastUserPath;
                this.lastUserPath = '';
                if (lastUserPath !== undefined && lastUserPath != null && lastUserPath !== '') {
                    this.router.navigateByUrl(lastUserPath);
                }
                // else
                //     this.router.navigateByUrl('customerSearch');
                // Turn off loading bar
                // loadingBarService.disableAppLoadingBar('system');
                // deferred.resolve("success");

            } else {// If there is no last path
                // Turn off loading bar
                // loadingBarService.disableAppLoadingBar('system');
                // deferred.resolve("success");
            }
        } else {// No user data in session (user is not already logged in)
            // Turn off loading bar
            // loadingBarService.disableAppLoadingBar('system');
            // deferred.resolve("success");
        }
    }

    /**
    **This Function is used to call createSession api
    **/
   public createSession(redirectToLastUserPath: any): any {
        return new Promise((resolve) => {
            
            this.http.get(`${environment.origin}/auth/session`)
                .map((res: Response) => {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad response status: ' + res.status);
                    }
                    const body = res.json();
                    this._createSession(body.data || {}, redirectToLastUserPath);

                }).subscribe(config => {
                    resolve();
                });
        });
    }

    /**
    **This Function is used to call changePassword api
    **/
    public changePassword(userName: string, oldPassword: string, newPassword: string): Observable<any> {
         return this.http.post(`${environment.origin}/auth/changePassword`, { userName, oldPassword, newPassword})
           .map(this.extractData)
           .catch(this.handleError);
        }
    /**
    **This Function is used to call login api
    **/
   public login(userName: string, password: string): Observable<any> {
        const stream = this.http.post(`${environment.origin}/auth/login`, { userName, password })
            .map((res: any) => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Bad response status: ' + res.status);
                }
                
                const data = res.json();
                this._login(data || {});
                return data || {};
            });

        return stream;
    }


    /**
    **This Function is used to call register api
    **/
   public register(userName: string, password: string): Observable<any> {
        const stream = this.http.post(`${environment.origin}/auth/register`, { userName, password })
            .map((res: any) => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Bad response status: ' + res.status);
                }
                
                const data = res.json();
                //this._login(data || {});
                return data || {};
            });

        return stream;
    }

    /**
    **This Function is used to call logout api
    **/
    public logout(): Observable<any> {
         const stream = this.http.post(`${environment.origin}/auth/logout`, {})
            .map((res: any) => {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Bad response status: ' + res.status);
                }
                // let body = res.json();
                this._logout();
                return {};
            });
        return stream;
    }

    getIsAuthenticated(): boolean {
        return this._isAuthenticated;
    }
}
