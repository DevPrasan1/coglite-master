import { Injectable, Inject, forwardRef } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).map(res => {
            this.unwrapHttpValue(res);
            return res;
        });
    }


    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        if (url !== '' && (url.indexOf('auth/session') > -1)) {
            url = this.updateUrlWithTS(url);
        }

        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string): any {
        return req;
    }

    private updateUrlWithTS(req: string): string {
        return req + '?TS=' + (new Date().getTime());
    }

    private unwrapHttpValue(res: Response): Response {
        if (res != null) {
            // Store XSRF-Token
            if (res.headers.get('XSRF-TOKEN') != null) {
                localStorage.setItem('xsrfToken', res.headers.get('XSRF-TOKEN'));
            }
        }
        return res;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');
        if (localStorage['xsrfToken']) {
            options.headers.append('X-XSRF-TOKEN', localStorage.getItem('xsrfToken'));
        }

        return options;
    }
}
