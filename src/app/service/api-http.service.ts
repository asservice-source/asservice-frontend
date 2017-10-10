import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Http, RequestOptions, Headers, BrowserXhr, BaseRequestOptions, ResponseOptions, ConnectionBackend, XHRBackend, XSRFStrategy, CookieXSRFStrategy, BaseResponseOptions } from "@angular/http";
import { BaseComponent } from '../base-component';
export class ApiHTTPService extends BaseComponent implements OnInit {
    private http;
    constructor() {
        super();

        let injector = ReflectiveInjector.resolveAndCreate([
            Http,
            BrowserXhr,
            { provide: RequestOptions, useClass: BaseRequestOptions },
            { provide: ResponseOptions, useClass: BaseResponseOptions },
            { provide: ConnectionBackend, useClass: XHRBackend },
            { provide: XSRFStrategy, useFactory: () => new CookieXSRFStrategy() },
        ]);
        this.http = injector.get(Http);

    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    get(url: string, params?: object, callback?: (doc: any) => void) {
        this.http.get(this.getApiUrl(url), params)
            .map(res => res.json())
            .subscribe(
            data => callback(data),
            err => err,
            () => console.log('Fetching complete for Server Api.')
            )
    }

    post(url: string, params?: object, callback?: (doc: any) => void) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        this.http.post(this.getApiUrl(url), params, options)
            .map(res => res.json())
            .subscribe(
            data => callback(data),
            err => err,
            () => console.log('Fetching url ' + url + ' complete for Server Api.')
            )
    }

    api_villageList(hospitalCode5: string, callback?: (doc: any) => void) {
        this.post(this.getApiUrl('village/villageList')
            , { hospitalCode: hospitalCode5 }
            , callback
        );
    }

}