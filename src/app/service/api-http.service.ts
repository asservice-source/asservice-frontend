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

    get(url: string, params: any, callback: (doc: any) => void) {
        this.http.get(this.getApiUrl(url), params)
            .map(res => res.json())
            .subscribe(
            data => callback(data),
            err => err,
            () => console.log('Fetching complete for Server Api.')
            )
    }

    public post(url: string, params: any, callback: (doc: any) => void) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        this.http.post(this.getApiUrl(url), params, options)
            .map(res => res.json())
            .subscribe(
            data => callback(data),
            err => err,
            () => console.log('Fetching url Server Api : ' + url)
            )
    }

    public callResponse(path: any, params: any, callback: (doc: any) => void){
        this.post(
            path
            , params
            , function(resp){
                console.log(resp);
                if (resp && resp.status.toUpperCase() == "SUCCESS") {
                    callback(resp.response);
                }else{
                    callback([]);
                }
            }
        );
    }

    public api_villageList(hospitalCode5: string, callback: (doc: any) => void) {
        this.callResponse('village/village_no_list_by_hospital', {"hospitalCode": hospitalCode5}, callback);
    }
    public api_OsmList(villageId: string, callback: (doc: any) => void) {
        this.callResponse('osm/osm_list_by_village', {"villageId": villageId}, callback);
    }
    public api_HomeList(villageId: string, osmId: string, callback: (doc: any) => void) {
        this.callResponse('home/home_no_list_by_village_or_osm', {"villageId": villageId, "osmId": osmId}, callback);
    }
    
    public api_HomeMemberList(homeId: string, callback: (doc: any) => void){
        this.callResponse('homemember/homemember_by_home', {"homeId": homeId}, callback);
    }

    public api_ProvinceList(callback: (doc: any) => void) {
        this.callResponse('address/province', {}, callback);     
    }

    public api_AmphurList(provinceCode: string, callback: (doc: any) => void) {
        this.callResponse('address/amphur', {"provinceCode":provinceCode}, callback);
    }

    public api_TumbolList(amphurCode: string, callback: (doc: any) => void) {
        this.callResponse('address/tumbol', {"amphurCode": amphurCode}, callback);
    }
    
    public api_GenderList(callback: (doc: any) => void) {
        this.callResponse('person/gender_list', {}, callback);
    }

    public api_SurveyHeaderList(headerTypeCode: string, callback: (doc: any) => void){
        console.log(headerTypeCode);
        this.callResponse('survey/survey_header_list', {"headerTypeCode": headerTypeCode, "hospitalCode": this.getHospitalCode()}, callback);
    }


}