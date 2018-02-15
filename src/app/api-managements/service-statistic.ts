import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";
import * as myconf from "../global-config";

export class Service_Statistic extends ApiHTTPService {

    public attr: any;

    constructor() {
        super();
    }

    public statistic_family_summary(osmId: string, callback: (doc: any) => void) {
        let self = this;

        let parameters = { "osmId": osmId };

        self.post('statistic/family_summary', parameters, function (d) {
            callback(d);
        });
    }

    public statistic_family_summary_hospital(callback: (doc: any) => void) {
        let parameters = { "code5": this.baseComponent.getHospitalCode() };
        this.post('statistic/family_summary_hospital', parameters, function (d) {
            callback(d);
        });
    }

    public statistic_survey_summary(osmId: string, callback: (doc: any) => void) {
        let parameters = { "osmId": osmId };
        this.post('statistic/survey_summary', parameters, function (d) {
            callback(d);
        });
    }
    public statistic_survey_summary_hospital(callback: (doc: any) => void) {
        let parameters = { "code5": this.baseComponent.getHospitalCode() };
        this.post('statistic/survey_summary_hospital', parameters, function (d) {
            callback(d);
        });
    }

}