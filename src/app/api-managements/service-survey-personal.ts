import { ApiHTTPService } from "./api-http.service";
//import { PersonalMemberBean } from "../beans/personal-member.bean";
import { RequestOptions, Headers } from "@angular/http";
import { BaseComponent } from "../base-component";
import { PersonalBasicBean } from "../beans/personal-basic.bean";

export class Service_SurveyPersonal extends ApiHTTPService {

    public attr: any;
    constructor() {
        super();
    }

    public map(bean: PersonalBasicBean): any {
        let self = this;

        let params =
            {
                "citizenId": bean.citizenId,
                "prefixCode": bean.prefixCode,
                "firstName": bean.firstName,
                "lastName": bean.lastName,
                "nickName": bean.nickName,
                "genderId": bean.genderId,
                "raceCode": bean.raceCode,
                "nationCode": bean.nationalityCode,
                "religionCode": bean.religionCode,
                "bloodTypeId": bean.bloodTypeId,
                "rhGroupId": bean.rhGroupId,
                "birthDate": bean.birthDate,
                "educationCode": bean.educationCode,
                "occupCode": bean.occupationCode,
                "laborCode": bean.laborCode,
                "passport": bean.passport,
                "isDead": bean.isDead,
                "deadDate": bean.deadDate,
                "dischargeId": bean.dischargeId,
                "dischargeDate": bean.dischargeDate,
                "familyStatusId": bean.familyStatusId,
                "fatherCid": bean.fatherCid,
                "motherCid": bean.motherCid,
                "coupleCid": bean.coupleCid,
                "personId": bean.personId,
                "homeId": bean.homeId,
                "isGuest": bean.isGuest,
                "isExists": bean.isExists,
                "mStatusCode": bean.mStatusCode,
                "vStatusCode": bean.vStatusCode,
                "congenitalDisease": bean.congenitalDisease,
                "remark": bean.remark,
                "homeNo": bean.homeNo,
                "mooNo": bean.mooNo,
                "road": bean.road,
                "provinceCode": bean.provinceCode,
                "amphurCode": bean.amphurCode,
                "tumbolCode": bean.tumbolCode
            };
        params = self.baseComponent.strNullToEmpty(params);

        return params;
    }

     public getListMember(documentId: string, homeId: any, callback: (doc: any) => void) {
        let path = "survey_population/homemember_by_home";
        let parameter = { "documentId": documentId,"homeId": homeId};
        let _self = this;
        this.post(path, parameter, function(response){
            if(response && response.status.toUpperCase()=='SUCCESS'){
                callback(response.response);
            }else{
                _self.baseComponent.message_servNotRespond('', response.message);
            }
        });
    }
    public getHistoryListMember(documentId: string, homeId: any, callback: (doc: any) => void) {
        let path = "survey_population/homemember_by_documentid";
        let parameter = { "documentId": documentId,"homeId": homeId};
        let _self = this;
        this.post(path, parameter, function(response){
            if(response && response.status.toUpperCase()=='SUCCESS'){
                callback(response.response);
            }else{
                _self.baseComponent.message_servNotRespond('', response.message);
            }
        });
    }
    public getListHome(documentId: string, villageId: string, osmId: string, homeId: string, callback: (doc: any) => void) {
        let path = "survey_population/search_population_list";
        let parameter = { "documentId": documentId, "villageId": villageId, "osmId": osmId, "homeId": homeId };
        let _self = this;
        this.post(path, parameter, function(response){
            if(response && response.status.toUpperCase()=='SUCCESS'){
                callback(response.response);
            }else{
                _self.baseComponent.message_servNotRespond('', response.message);
            }
        });
    }

    public commit_save(bean: PersonalBasicBean, callback: (doc: any) => void) {
        let self = this;
        let parameters = self.baseComponent.strNullToEmpty(self.map(bean));
        self.post('survey_population/population_add_home_member', parameters, function(d){
            callback(d);
        });

    }

    public commit_save_survey(homeId: string, osmId: string, roundId: string, beanList: Array<any>, callback: (doc: any) => void) {
        let self = this;

        let list = [];

        for (let item of beanList) {
            let tmp = self.map(item);
            list.push(tmp);
        }

        self.attr =
            {
                "homeId": homeId,
                "osmId": osmId,
                "documentId": roundId,
                "list": list
            };

        let parameters = self.attr;
        // console.log(parameters);

        self.post('survey_population/ins_upd_population_info', parameters, function(d){
            callback(d);
        });
    }

    // public commit_del(rowGUID: string, callback: (doc: any) => void) {
    //     let parameter = { "rowGUID": rowGUID };
    //     this.apiHTTPService.post('survey_death/del_death_info', parameter, callback);
    // }
}