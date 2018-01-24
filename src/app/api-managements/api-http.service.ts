import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Http, RequestOptions, Headers, BrowserXhr, BaseRequestOptions, ResponseOptions, ConnectionBackend, XHRBackend, XSRFStrategy, CookieXSRFStrategy, BaseResponseOptions } from "@angular/http";
import { FilterHeadSurveyBean } from '../beans/filter-head-survey.bean';
import * as myconf from "../global-config";
import { BaseComponent } from '../base-component';
export class ApiHTTPService  implements OnInit {
    public baseComponent: BaseComponent = new BaseComponent();
    public http;
    constructor() {
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
        this.http.get(this.baseComponent.getApiUrl(url), params)
            .map(res => res.json())
            .subscribe(
            data => this.subscribe(data, callback, params, url),
            err => this.subscribe_error(err, callback, params, url),
            () => console.log('Fetching complete for Server Api.')
            )
    }

    public post(url: string, params: any, callback: (doc: any) => void) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, method: "post" });

        this.http.post(this.baseComponent.getApiUrl(url), params, options)
            .map(res => res.json())
            .subscribe(
            data => this.subscribe(data, callback, params, url),
            err => this.subscribe_error(err, callback, params, url)
            )
    }
    private subscribe(data: any, callback: (doc: any)=> void, params: any, path: any){
        console.log("<<<< Call Path = " + path +" >>>>");
        console.log(params);
        console.log(data);
        console.log("<<<< /End >>>>");
        if(data.status){
            data.status = ''+data.status;
        }else{
            data.status = '';
        }
        callback(data);
    }
    private subscribe_error(data: any, callback: (doc: any)=> void, params: any, path: any){
        console.log("<<<< Call Path = " + path +" >>>>");
        console.log(params);
        console.log(data);
        console.log("<<<< /End >>>>");
        if(data.status){
            data.status = ''+data.status;
        }else{
            data.status = '';
        }
        data.message = data.statusText;
        callback(data);
    }
    public callResponse(path: any, params: any, callback: (doc: any) => void){
        this.post(
            path
            , params
            , function(resp){
                if (resp && resp.status.toString().toUpperCase() == "SUCCESS") {
                    callback(resp.response);
                }else{
                    callback([]);
                }
            }
        );
    }

    public api_mapFilterSurveyHeader(filter: FilterHeadSurveyBean): any{
        return (
        {
        "documentId": filter.rowGUID,
        "villageId": filter.villageId,
        "osmId": filter.osmId,
        "name": filter.fullName
       });

    }
    public api_MenuLeft(callback: (doc: any) => void){
        this.post( 'app/menu'
            , {}
            , function(resp){
                callback(resp);
            });
    }

    public api_HomeListByHeader(documentId:string,villageId:string,osmId:string,headerTypeCode:string,callback: (doc: any) => void){
        this.callResponse('home/home_list_by_headertype_code',{"documentId":documentId,"villageId":villageId,"osmId":osmId,"headerTypeCode":headerTypeCode},callback);
    }

    public api_villageList(hospitalCode5: string, callback: (doc: any) => void) {
        this.callResponse('village/village_no_list_by_hospital', {"hospitalCode": hospitalCode5}, callback);
    }

    public api_OsmList(villageId: string, callback: (doc: any) => void) {
        this.callResponse('osm/osm_list_by_village', {"villageId": villageId}, callback);
    }
    public api_HomeList(villageId: string, osmId: string,headerTypeCode: string, callback: (doc: any) => void) {
        this.callResponse('home/home_no_list_by_village_or_osm', {"villageId": villageId, "osmId": osmId,"headerTypeCode":headerTypeCode}, callback);
    }
    public api_HomeTypeList(callback: (doc: any) => void){
        this.callResponse('home/home_type_list',{}, callback);
    }
    public api_HomrInfo(homeId: any, callback: (doc: any) => void){
        let parameter = {"homeId": +homeId};
        this.post('home/home_info', parameter, function(response){
            callback(response);
        });
    }
    public api_HomeMemberList(homeId: string, callback: (doc: any) => void){
        this.callResponse('homemember/homemember_by_home', {"homeId": homeId}, callback);
    }

    public api_SurveyHomeMemberList(documentId:string,headerTypeCode:string,homeId:string,callback: (doc: any) => void){
        this.callResponse('survey/homemember_by_home',{"documentId":documentId,"headerTypeCode":headerTypeCode,"homeId":homeId},callback);
    }

    public api_ProvinceList(callback: (doc: any) => void) {
        this.callResponse('address/province', {}, callback);    
    }

    public api_AmphurList(provinceCode: string, callback: (doc: any) => void) {
        if(provinceCode){
            this.callResponse('address/amphur', {"provinceCode":provinceCode}, callback);
        }else{
            callback([]);
        }
    }

    public api_TumbolList(amphurCode: string, callback: (doc: any) => void) {
        if(amphurCode){
            this.callResponse('address/tumbol', {"amphurCode": amphurCode}, callback);
        }else{
            callback([]);
        }
        
    }
    
    public api_GenderList(callback: (doc: any) => void) {
        this.callResponse('person/gender_list', {}, callback);
    }

    public api_PrefixNameList(genderId: string,callback: (doc: any) => void) {
        this.callResponse('person/prefix_list', {"genderId": genderId}, callback);
    }

    public api_SurveyHeaderList(headerTypeCode: string, callback: (doc: any) => void){
        this.callResponse('survey/survey_header_list', {"headerTypeCode": headerTypeCode, "hospitalCode": this.baseComponent.getHospitalCode()}, callback);
    }

    public api_CancerList(callback: (doc: any) => void){
        this.callResponse('person/cancer_type_list', {}, callback);
    }

    public api_DeathPlaceList(callback: (doc: any) => void){
        this.callResponse('survey/survey_death_place_list', {}, callback);
    }

    public api_HealtInsuranceType(callback: (doc: any) => void){
        this.post('person/health_insurance_type_list',{},callback);
     }

    public api_PersonByCitizenId(citizenId: string, callback: (doc: any) => void){
        citizenId = this.baseComponent.reverseFormatCitizenId(citizenId);
        let parameter = {"citizenId": citizenId};
        this.post('person/person_by_citizenid', parameter, function(response){
            callback(response);
        });
    }
    public api_PersonByPersionId(personId: string, callback: (doc: any) => void){;
        let parameter = {"personId": personId};
        this.post('person/person_by_personid', parameter, function(response){
            callback(response);
        });
    }
    public api_RaceList(callback: (doc: any) => void){
        this.callResponse('person/race_list',{}, callback);
    }
    public api_NationalityList(callback: (doc: any) => void){
        this.callResponse('person/nationality_list',{}, callback);
    }
    public api_ReligionList(callback: (doc: any) => void){
        this.callResponse('person/religion_list',{}, callback);
    }
    public api_BloodTypeList(callback: (doc: any) => void){
        this.callResponse('person/blood_type_list',{}, callback);
    }
    public api_RHGroupList(callback: (doc: any) => void){
        this.callResponse('person/rhgroup_list',{}, callback);
    }
    public api_EducationList(callback: (doc: any) => void){
        this.callResponse('person/education_list',{}, callback);
    }
    public api_OccupationList(callback: (doc: any) => void){
        this.callResponse('person/occupation_list',{}, callback);
    }
    public api_FamilyStatusList(callback: (doc: any) => void){
        this.callResponse('home/family_status_list',{}, callback);
    }
    public api_DischargeList(callback: (doc: any) => void){
        this.callResponse('person/discharge_list',{}, callback);
    }
    public getRound_byDocumentId(headerTypeCode: string, documentId: string, callback: (doc:any)=>void): any{
        let mitem = {};
        this.api_SurveyHeaderList(headerTypeCode, function(response){
            for(let item of response){
                if(documentId == item.rowGUID){
                    mitem = item;
                    break;

                }
            }
            callback(mitem);
            return;
        });
    }

}