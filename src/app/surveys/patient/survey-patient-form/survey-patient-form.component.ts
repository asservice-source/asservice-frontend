import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientBean } from '../../../beans/patient.bean'
import { Http } from '@angular/http';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { InputValidateInfo } from '../../../directives/inputvalidate.directive';
import { SimpleValidateForm } from '../../../utils.util';
declare var $: any;
declare var bootbox: any;

@Component({
  selector: 'app-survey-patient-form',
  templateUrl: './survey-patient-form.component.html',
  styleUrls: ['./survey-patient-form.component.css']
})
export class SurveyPatientFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: PatientBean;
  @Input() documentId: string;

  @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  public isFindPersonal: boolean = true;
  public isShowForm: boolean = false;
  public patientbean: PatientBean;
  public resetFind: number = 1;
  private api: ApiHTTPService;
  public healtInsuranceTypeList: any;
  public surveyStatusTypeList: any;
  public patientTypeList: any;
  public disabilityTypeList: any;
  public disabilityTypeCause: any;
  public diseaseStatusTypeList: any;
  public code: string = "PATIENT";
  public isErrorDisabilityType: any;//
  public disabilityCauseType: boolean = true;
  public loading;
  public inputValidate: InputValidateInfo = new InputValidateInfo();


  constructor(private http: Http, private changeRef: ChangeDetectorRef) {
    super();
    this.patientbean = new PatientBean();
    this.api = new ApiHTTPService();
    this.getHealtinsuranceType();
    this.getSurveyStatusType();
    this.getPatientType();
    this.getDisabilityType();
    this.getDisabilityTypeCause();
    this.getDiseaseStatusType();
  }

  ngOnInit() {
    this.onModalEvent();
  }

  ngAfterViewInit() {

  }

  onChoosePersonal(bean: any): void {
    this.patientbean = bean;
    console.log(bean);
    console.log(this.patientbean.homeId);

    if (this.action == this.ass_action.ADD) {
      this.patientbean.patientSurveyTypeCode = "";
      this.patientbean.disabilityCauseTypeId = "";
      this.patientbean.disabilityTypeId = "";
      this.patientbean.patientTypeId = "";
      this.patientbean.diseaseStatusTypeId = "";
      this.patientbean.patientDate = this.getCurrentDatePickerModel();
    }
    this.isDuplicate();
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
      self.inputValidate = new InputValidateInfo();
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        //self.data.telephone = self.formatPhoneToDisplay(self.data.telephone);
        self.data.patientDate = self.getCurrentDatePickerModel(self.data.patientDate);
        self.onChoosePersonal(self.data);
      }
      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.inputValidate = new InputValidateInfo();
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

  getDiseaseStatusType() {
    let self = this;
    let params = {};
    this.api.post('person/disease_status_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.diseaseStatusTypeList = resp.response;
      }

    })
  }

  onChangePatientSyurvey() {
    if (this.action == this.ass_action.ADD) {
      if (this.patientbean.patientSurveyTypeCode == 'Patient') {
        this.inputValidate = new InputValidateInfo();
        this.patientbean.hInsuranceTypeId = "89";
      }
      else {
        this.inputValidate = new InputValidateInfo();
        this.patientbean.hInsuranceTypeId = "74";
      }
    }
  }

  isDuplicate() {
    let self = this;
    let params = {
      "headerTypeCode": this.code,
      "documentId": this.documentId,
      "personId": this.patientbean.personId
    };

    console.log(JSON.stringify(params));
    this.api.post('survey/survey_is_duplicate', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        if (self.action != self.ass_action.EDIT) {
          if (resp.response.isDuplicate == true) {
            $('#find-person-md').modal('hide');
            self.message_error('', 'คนที่ท่านเลือกได้ทำการสำรวจไปแล้ว');
          }
        }
      }
    })
  }

  formatPhoneNumber() {
    let self = this;

    if (!self.isEmpty(self.patientbean.telephone)) {
      let patternPhone: string = "__-____-____";
      let patternPhone_ex: string = "-";
      let returnText = "";
      let obj_1: number = self.patientbean.telephone.length;
      let obj_2 = obj_1 - 1;
      for (let i = 0; i < patternPhone.length; i++) {
        if (obj_2 == i && patternPhone.charAt(i + 1) == patternPhone_ex) {
          returnText += self.patientbean.telephone + patternPhone_ex;
          self.patientbean.telephone = returnText;
        }
      }
    }
  }

  formatForJson(value) {
    let pure_value = value.split("-");
    let result = pure_value.join('');
    return result;
  }


  formatPhoneToDisplay(phone): string {
    // if(this.isEmpty(phone) && phone.length==10) return phone;
    if (!this.isEmpty(phone)) {
      let arr = phone.split('');
      return arr[0] + arr[1] + '-' + arr[2] + arr[3] + arr[4] + arr[5] + '-' + arr[6] + arr[7] + arr[8] + arr[9];
    }
  }

  validate(obj: any): boolean {
    let validate = true;

    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpVal: SimpleValidateForm = new SimpleValidateForm();
    let ignore = ["documentId", "cancerTypeId", "diseaseStatusTypeId", "patientTypeId", "disabilityTypeId", "disabilityCauseTypeId", "treatmentPlace", "remark", "telephone", "latitude", "longitude"];

    if (this.patientbean.patientSurveyTypeCode == 'Disabled') {
      ignore = ["cancerTypeId", "latitude", "longitude"];
    } else {
      ignore = ["cancerTypeId", "disabilityTypeId", "disabilityCauseTypeId", "latitude", "longitude"];
    }

    if (this.action == this.ass_action.ADD) {
      ignore.push("rowGUID");
    }
    let objs = simpVal.getObjectEmpty(obj, ignore);
    console.log(objs);
    
    if (objs.length > 0) {
      validate = false;
    } else {
      // if (this.patientbean.telephone.length < 12) {
      //   validate = false;
      // } else {
        
      // }
      validate = true;
    }
    return validate;
  }

  addSurvey(): void {
    let self = this;
    let documentId;
    let disabilityTypeId;
    let disabilityCauseTypeId;
    if (this.action == this.ass_action.ADD) {
      documentId = this.documentId;
    } else {
      documentId = this.patientbean.documentId;
    }

    if (this.patientbean.patientSurveyTypeCode == 'Patient') {
      disabilityTypeId = "";
      disabilityCauseTypeId = "";
    } else {
      disabilityTypeId = this.patientbean.disabilityTypeId;
      disabilityCauseTypeId = this.patientbean.disabilityCauseTypeId;
    }
    let obj = {
      "rowGUID": this.patientbean.rowGUID
      , "personId": this.patientbean.personId
      , "documentId": documentId
      , "osmId": this.patientbean.osmId
      , "homeId": this.patientbean.homeId //รอแก้
      , "cancerTypeId": this.patientbean.cancerTypeId
      , "diseaseStatusTypeId": this.patientbean.diseaseStatusTypeId
      , "patientDate": this.getStringDateForDatePickerModel(this.patientbean.patientDate.date)
      , "patientTypeId": this.patientbean.patientTypeId
      , "hInsuranceTypeId": this.patientbean.hInsuranceTypeId
      , "patientSurveyTypeCode": this.patientbean.patientSurveyTypeCode
      , "disabilityTypeId": disabilityTypeId
      , "disabilityCauseTypeId": disabilityCauseTypeId
      , "treatmentPlace": this.patientbean.treatmentPlace
      , "remark": this.patientbean.remark
      , "telephone": this.patientbean.telephone
      , "latitude": this.patientbean.latitude
      , "longitude": this.patientbean.longitude
    };

    if (this.validate(obj)) {
      // if (!self.isEmpty(obj["telephone"])) {
      //   obj["telephone"] = self.formatForJson(obj["telephone"]);
      // }
      let params = this.strNullToEmpty(obj);
      console.log(params);

      self.message_comfirm('', 'ยืนยันการทำแบบสำรวจ', function (confirm) {
        self.inputValidate = new InputValidateInfo();
        if (confirm) {
          self.loading = true;
          self.api.post('survey_patient/ins_upd', params, function (resp) {
            self.loading = false;
            console.log(resp);
            if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
              $("#find-person-md").modal('hide');
              self.completed.emit(true);
              // self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจผู้พิการ และผู้ป่วยติดเตียงแล้ว')
            }
          })
        }
      })

    }
  }

}
