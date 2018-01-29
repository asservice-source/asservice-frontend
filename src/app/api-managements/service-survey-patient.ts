import { ApiHTTPService } from "./api-http.service";
import { RequestOptions, Headers } from "@angular/http";
import { FilterHeadSurveyBean } from "../beans/filter-head-survey.bean";
import { PatientBean } from "../beans/patient.bean";

export class Service_SurveyPatient extends ApiHTTPService{

    constructor() {
        super();
    }

    public getListPatient(filter: FilterHeadSurveyBean, callback: (doc: any) => void){
        let parameter = this.api_mapFilterSurveyHeader(filter);
        this.callResponse('survey_patient/filter'
        , parameter
        , callback);
     } 

     public getPatientInfo(rowGUID: string, callback: (doc: any) => void){
        let parameter = {"rowGUID": rowGUID};
        this.post('survey_patient/patient_by_rowguid'
        , parameter
        , callback);
     }

     public deletePatient(rowGUID: string, callback: (doc: any) => void){
        let parameter = {"rowGUID": rowGUID};
        this.post('survey_patient/del'
        , parameter
        , callback);
     } 

     public getSurveyStatusType(callback: (doc: any) => void){
        this.post('person/patient_survey_type_list',{},callback);
     }

     public getPatientType(callback:(doc:any) => void){
        this.post('person/patient_type_list',{},callback);
     }

     public getDisabilityType(callback:(doc:any) => void){
        this.post('person/disability_type_list',{},callback);
     }

     public getDisabilityTypeCause(callback:(doc:any) => void){
        this.post('person/disability_cause_type_list',{},callback);
     }

     public getDiseaseStatusType(callback:(doc:any) => void){
        this.post('person/disease_status_type_list',{},callback);
     }

     public onSaveSurvey(bean,callback:(doc:any) => void){
        let parameter = this.baseComponent.strNullToEmpty(bean); 
        this.post('survey_patient/ins_upd',parameter,callback);
     }

}