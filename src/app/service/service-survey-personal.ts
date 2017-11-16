import { ApiHTTPService } from "./api-http.service";
import { PersonalMemberBean } from "../beans/personal-member.bean";

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
            "nationalityCode": bean.nationalityCode,
            "religionCode": bean.religionCode,
            "bloodTypeId": bean.bloodTypeId,
            "rhGroupId": bean.rhGroupId,
            "birthDate": bean.birthDate,
            "educationCode": bean.educationCode,
            "occupationCode": bean.occupationCode,
            "laborCode": bean.laborCode,
            "passport": bean.passport,
            "isDead": bean.isDead,
            "deadDate": bean.deadDate,
            "dischargeId": bean.dischargeId,
            "familyStatusId": bean.familyStatusId,
            "fatherCID": bean.fatherCID,
            "motherCID": bean.motherCID,
            "coupleCID": bean.coupleCID,
            "homeId": bean.homeId,
            "isGuest": bean.isGuest,
            "isExists": bean.isExists
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
        let parameter = this.map(bean);

        self.post('survey_population/ins_upd_death_info', parameter, callback);
    }

    // public commit_del(rowGUID: string, callback: (doc: any) => void) {
    //     let parameter = { "rowGUID": rowGUID };
    //     this.apiHTTPService.post('survey_death/del_death_info', parameter, callback);
    // }
}