import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";
import { PregnantBean } from "../beans/pregnant.bean";
import { PregnantChildBean } from "../beans/pregnant-child.bean";

export class Service_SurveyPregnant extends ApiHTTPService {

    public attr: any;

    constructor() {
        super();
    }

    public map(bean: PregnantBean): any {
        let self = this;

        let params =
            {
                "rowGUID": bean.rowGUID,
                "documentId": bean.documentId,
                "osmId": bean.osmId,
                "homeId": bean.homeId,
                "masterGUID": bean.masterGUID,
                "personId": bean.personId,
                "wombNo": bean.wombNo,
                "bornDueDate": bean.bornDueDate,
                "pSurveyTypeCode": bean.pSurveyTypeCode,
                "childs": self.map_child(bean.childs)
            };
        params = self.baseComponent.strNullToEmpty(params);

        return params;
    }

    public map_child(bean: any): any {
        let self = this;

        let list = [];

        for (let item of bean) {
            let params =
                {
                    "bloodTypeId": item.bloodTypeId,
                    "bornTypeId": item.bornTypeId,
                    "birthDate": item.birthDate,
                    "weight": item.weight,
                    "prefixCode": self.findPrefixCode(item.genderId),
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "genderId": item.genderId,
                    "bornLocationId": item.bornLocationId,
                    "bornCitizenId": item.citizenId,
                    "abortionCause": item.abortionCause
                };
            params = self.baseComponent.strNullToEmpty(params);
            list.push(params);
        }

        return list;
    }

    public get_pregnant_info(id, callback: (doc: any) => void) {
        let self = this;

        let parameters = { rowGUID: id };

        self.post('survey_pregnant/get_pregnant_detail_info', parameters, function (d) {
            callback(d);
        });
    }

    public commit_save(bean: PregnantBean, callback: (doc: any) => void) {
        let self = this;

        let parameters = self.baseComponent.strNullToEmpty(self.map(bean));

        self.post('survey_pregnant/ins_upd_pregnant_info', parameters, function (d) {
            callback(d);
        });
    }

    public commit_delete(bean: PregnantBean, callback: (doc: any) => void) {
        let self = this;

        let parameters =
            {
                "rowGUID": bean.rowGUID
            };

        self.post('survey_pregnant/del_pregnant_info', parameters, function (d) {
            callback(d);
        });
    }

    findPrefixCode(genderId) {
        let self = this;

        if (genderId == "1") { //ชาย
            return "001"; //เด็กชาย
        } else if (genderId == "2") { //หญิง
            return "002"; //เด็กหญิง
        } else {
            return "";
        }
    }
    // public commit_save_survey(homeId: string, osmId: string, roundId: string, beanList: Array<any>, callback: (doc: any) => void) {
    //     let self = this;

    //     let list = [];

    //     for (let item of beanList) {
    //         let tmp = self.map(item);
    //         list.push(tmp);
    //     }

    //     self.attr =
    //         {
    //             "homeId": homeId,
    //             "osmId": osmId,
    //             "documentId": roundId,
    //             "list": list
    //         };

    //     let parameters = self.attr;
    //     // console.log(parameters);
    //     console.log(JSON.stringify(parameters));

    //     self.post('survey_population/ins_upd_population_info', parameters, function (d) {
    //         callback(d);
    //     });
    // }

}