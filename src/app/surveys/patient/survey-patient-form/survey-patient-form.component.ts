import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Input } from '@angular/core';
import { PatientBean } from '../../../beans/patient.bean'
import { Http } from '@angular/http';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
declare var $: any;

@Component({
  selector: 'app-survey-patient-form',
  templateUrl: './survey-patient-form.component.html',
  styleUrls: ['./survey-patient-form.component.css']
})
export class SurveyPatientFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: PatientBean;

  public isFindPersonal: boolean = true;
  public isShowForm: boolean = false;
  public patientbean: PatientBean;
  public resetFind: number = 1;
  private api: ApiHTTPService;
  public healtInsuranceTypeList: any;
  public surveyStatusTypeList: any;
  public patientTypeList:any;
  public disabilityTypeList : any;
  public disabilityTypeCause : any;



  constructor(private http: Http, private changeRef: ChangeDetectorRef) {
    super();
    this.patientbean = new PatientBean();
    this.api = new ApiHTTPService();
    this.getHealtinsuranceType();
    this.getSurveyStatusType();
    this.getPatientType();
    this.getDisabilityType();
    this.getDisabilityTypeCause()
   
  }

  ngOnInit() {
    this.onModalEvent();
  }

  ngAfterViewInit() {

  }

  onChoosePersonal(bean: any): void {
    this.patientbean = bean;

    this.patientbean.patientSurveyTypeCode = this.patientbean.patientSurveyTypeCode || "0";
    // this.patientbean.patientType = this.patientbean.patientType || "0";
    // this.patientbean.disabilityType = this.patientbean.disabilityType || "0";
    // this.patientbean.disabilityCauseType = this.patientbean.disabilityCauseType || "0";
    this.isFindPersonal = false;
    this.isShowForm = true;

  }
  onBack() {
    this.patientbean = new PatientBean();
    this.isFindPersonal = true;
    this.isShowForm = false;
    if (this.ass_action.EDIT == this.action) {
      $('#find-person-md').modal('hide');
    }
  }

  onModalEvent() {
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        //self.data.patientSurveyTypeCode.toUpperCase();
        //self.data.patientDate = self.getCurrentDatePickerModel(self.data.patientDate);
        self.onChoosePersonal(self.data);
        
        console.log(self.data);
      }

      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
  }

  getHealtinsuranceType() {
    let self = this;
    let params = {};
    this.api.post('person/health_insurance_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.healtInsuranceTypeList = resp.response;
        self.healtInsuranceTypeList.id = 89;
      }

    })
  }

  getSurveyStatusType() {
    let self = this;
    let params = {};
    this.api.post('person/patient_survey_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.surveyStatusTypeList = resp.response;
      }

    })
  }

  getPatientType() {
    let self = this;
    let params = {};
    this.api.post('person/patient_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.patientTypeList = resp.response;
      }

    })
  }

  getDisabilityType() {
    let self = this;
    let params = {};
    this.api.post('person/disability_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.disabilityTypeList = resp.response;
      }

    })
  }

  getDisabilityTypeCause() {
    let self = this;
    let params = {};
    this.api.post('person/disability_cause_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.disabilityTypeCause = resp.response;
      }

    })
  }

  onChangePatientSyurvey(){

    if(this.patientbean.patientSurveyTypeCode == 'PATIENT'){
      this.patientbean.hInsuranceType = "89";
    }

    if(this.patientbean.patientSurveyTypeCode == 'DABLED'){
      this.patientbean.hInsuranceType = "74";
    }

    this.patientbean.patientType = "0";
    this.patientbean.disabilityType = "0";
    this.patientbean.disabilityCauseType = "0";
    this.patientbean.patientDate = undefined;
    this.patientbean.remark = undefined;

  }


  addSurvey(){
    let self = this;

    let params = {
      "rowGUID": this.patientbean.rowGUID,
      "personID": this.patientbean.personID,
      "documentID": this.patientbean.documentID,
      "osmId": this.patientbean.osmId,
      "operationDate" : this.patientbean.operationDate,
      "homeID" : this.patientbean.homeID,
      "cancerTypeID" : this.patientbean.cancerTypeID,
      "diseaseStatusTypeID" : this.patientbean.diseaseStatusTypeID,
      "patientDate" : this.patientbean.patientDate,
      "patientTypeID" : this.patientbean.patientTypeId,
      // "hInsuranceTypeID"
    };

    this.api.post('survey_patient/ins_upd', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log(resp);
      }

    })

  }

}
