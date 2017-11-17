import { ApiHTTPService } from "./api-http.service";
import { PersonalMemberBean } from "../beans/personal-member.bean";
import { RequestOptions,Headers } from "@angular/http";

export class Service_SurveyPersonal extends ApiHTTPService {

    public attr: any;

    constructor() {
    super();
    }

    public map(bean: PersonalMemberBean): any {
        let self = this;

        self.attr =
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
            "familyStatusId": bean.familyStatusId,
            "fatherCid": bean.fatherCid,
            "motherCid": bean.motherCid,
            "coupleCid": bean.coupleCid,
            "personId": bean.personId,
            "homeId": bean.homeId,
            "isGuest": bean.isGuest,
            "mStatusCode": bean.mStatusCode,
            "vStatusCode": bean.vStatusCode
        };

        return self.attr;
    }

    // public getList(filter: FilterHeadSurveyBean, callback: (doc: any) => void) {
    //     let parameter = this.apiHTTPService.api_mapFilterSurveyHeader(filter);
    //     console.log("parameter = = = ");
    //     console.log(parameter);
    //     this.apiHTTPService.callResponse('survey_death/search_death_info_list'
    //         , parameter
    //         , callback);
    // }

    public commit_save(bean: PersonalMemberBean, callback: (doc: any) => void) {
        let self = this;
        let parameters = self.strNullToEmpty(self.map(bean));
        console.log(parameters);

        self.post('survey_population/population_add_home_member', parameters, callback);

        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers, method: "post" });

        // self.http.post("http://192.168.2.227:8080/API-ASService/survey_population/population_add_home_member", self.strNullToEmpty(self.map(bean)), options)
        //     .map(res => res.json())
        //     .subscribe(
        //     data => callback(data),
        //     err => err,
        //     () => console.log('Fetching url Server Api : ' + 'http://192.168.2.227:8080/API-ASService/survey_population/population_add_home_member')
        //     )
    }

    // public commit_del(rowGUID: string, callback: (doc: any) => void) {
    //     let parameter = { "rowGUID": rowGUID };
    //     this.apiHTTPService.post('survey_death/del_death_info', parameter, callback);
    // }
}