import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";
import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";
import { MetabolicBean } from "../beans/metabolic.bean";

export class Service_SurveyMetabolic extends ApiHTTPService {

    constructor() {
        super();
    }

    public getListMetabolic(filter: FilterHeadSurveyBean, callback: (doc: any) => void){
        let parameter = this.api_mapFilterSurveyHeader(filter);
        this.callResponse('survey_metabolic/search_metabolic_list'
        , parameter
        , callback);
     }

     public getMetabolicInfo(rowGUID: string, callback: (doc: any) => void){
        let parameter = {"rowGUID": rowGUID};
        this.post('survey_metabolic/metabolic_by_rowguid'
        , parameter
        , callback);
     }

     public deleteMetabolic(rowGUID: string, callback: (doc: any) => void){
        let parameter = {"rowGUID": rowGUID};
        this.post('survey_metabolic/del_metabolic_info'
        , parameter
        , callback);
     }

     public onSaveSurvey(bean,callback:(doc:any) => void){
        let parameter = this.baseComponent.strNullToEmpty(bean); 
        this.post('survey_metabolic/ins_upd_metabolic_info',parameter,callback);
     }
}