import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CancerBean } from '../../../beans/cancer.bean';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { Http } from '@angular/http';
import { InputValidateInfo } from '../../../directives/inputvalidate.directive';
import { SimpleValidateForm } from '../../../utils.util';
declare var $: any;
declare var bootbox: any;

@Component({
  selector: 'app-survey-cancer-form',
  templateUrl: './survey-cancer-form.component.html',
  styleUrls: ['./survey-cancer-form.component.css']
})

export class SurveyCancerFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: CancerBean;
  @Input() documentId: string;

  @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  public isFindPersonal: boolean = true;
  public isShowForm: boolean = false;
  public cancerbean: CancerBean;
  public resetFind: number = 1;
  private api: ApiHTTPService;
  public healtInsuranceTypeList: any;
  public surveyStatusTypeList: any;
  public cancerTypeList: any;
  public disabilityTypeList: any;
  public disabilityTypeCause: any;
  public diseaseStatusTypeList: any;
  public code: string = "CANCER";
  public loading: boolean;
  public inputValidate: InputValidateInfo = new InputValidateInfo();

  public latitude: string = "";
  public longitude: string = "";
  public info: string = "";

  constructor(private http: Http, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.cancerbean = new CancerBean();
    self.api = new ApiHTTPService();
    self.getHealthInsuranceType();
    self.getSurveyStatusType();
    self.getCancerType();
    self.getDisabilityType();
    self.getDisabilityTypeCause();
    self.getDiseaseStatusType();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
  }

  ngAfterViewInit() {

  }

  onChoosePersonal(bean: any): void {
    let self = this;

    self.cancerbean = self.cloneObj(bean);

    if (self.action == self.ass_action.ADD) {
      self.cancerbean.disabilityCauseTypeId = "";
      self.cancerbean.disabilityTypeId = "";
      self.cancerbean.cancerTypeId = "";
      self.cancerbean.diseaseStatusTypeId = "";
      self.cancerbean.hInsuranceTypeId = "89";
      self.cancerbean.patientSurveyTypeCode = "Cancer"
      self.cancerbean.patientDate = self.getCurrentDatePickerModel();

      // self.cancerbean.latitude = "";
      // self.cancerbean.longitude = "";
      self.info = "";
    } else {
      self.info = "บ้านของ " + self.cancerbean.fullName;
    }
    self.isFindPersonal = false;
    self.isShowForm = true;
  }

  onClickBack() {
    let self = this;

    self.cancerbean = new CancerBean();
    self.isFindPersonal = true;
    self.isShowForm = false;

    if (self.ass_action.EDIT == self.action) {
      $('#find-person-md').modal('hide');
    }
  }

  onModalEvent() {
    let self = this;

    $('#find-person-md').on('show.bs.modal', function (e) {
      self.inputValidate = new InputValidateInfo();
      self.resetFind = self.resetFind + 1;

      if (self.action == self.ass_action.EDIT) {
        self.data.patientDate = self.getCurrentDatePickerModel(self.data.patientDate);
        self.onChoosePersonal(self.data);
      }
      self.changeRef.detectChanges();
    });

    $('#find-person-md').on('hidden.bs.modal', function () {
      self.inputValidate = new InputValidateInfo();
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
  }

  getHealthInsuranceType() {
    let self = this;

    let params = {};

    self.api.post('person/health_insurance_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.healtInsuranceTypeList = resp.response;
        self.healtInsuranceTypeList.id = 89;
      }
    });
  }

  getSurveyStatusType() {
    let self = this;

    let params = {};

    self.api.post('person/patient_survey_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.surveyStatusTypeList = resp.response;
      }
    });
  }

  getCancerType() {
    let self = this;

    let params = {};

    self.api.post('person/cancer_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.cancerTypeList = resp.response;
      }
    });
  }

  getDisabilityType() {
    let self = this;

    let params = {};

    self.api.post('person/disability_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.disabilityTypeList = resp.response;
      }
    });
  }

  getDisabilityTypeCause() {
    let self = this;

    let params = {};

    self.api.post('person/disability_cause_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.disabilityTypeCause = resp.response;
      }
    });
  }

  getDiseaseStatusType() {
    let self = this;

    let params = {};

    self.api.post('person/disease_status_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.diseaseStatusTypeList = resp.response;
      }
    });
  }

  validate(obj: any): boolean {
    let self = this;
    let validate = true;
    self.inputValidate = new InputValidateInfo();
    self.inputValidate.isCheck = true;
    let simpVal: SimpleValidateForm = new SimpleValidateForm();
    let ignore = ["patientTypeId", "disabilityTypeId", "disabilityCauseTypeId", "latitude", "longitude", "remark"];

    if (self.action == self.ass_action.ADD) {
      ignore.push("rowGUID");
    }
    let objs = simpVal.getObjectEmpty(obj, ignore);
    if (objs.length > 0 || self.compareDateCurrent_DDMMYYYY(self.cancerbean.patientDate) < 0) {
      validate = false;
    } else {
      validate = true;
    }
    return validate;
  }

  addSurvey(): void {
    let self = this;

    let documentId;
    if (self.action == self.ass_action.ADD) {
      documentId = self.documentId;
    } else {
      documentId = self.cancerbean.documentId;
    }

    let obj = {
      "rowGUID": self.cancerbean.rowGUID
      , "personId": self.cancerbean.personId
      , "documentId": documentId
      , "osmId": self.cancerbean.osmId
      , "homeId": self.cancerbean.homeId //รอแก้
      , "cancerTypeId": self.cancerbean.cancerTypeId
      , "diseaseStatusTypeId": self.cancerbean.diseaseStatusTypeId
      , "patientDate": self.getStringDateForDatePickerModel(self.cancerbean.patientDate.date)
      , "patientTypeId": ""
      , "hInsuranceTypeId": self.cancerbean.hInsuranceTypeId
      , "patientSurveyTypeCode": self.cancerbean.patientSurveyTypeCode
      , "disabilityTypeId": ""
      , "disabilityCauseTypeId": ""
      , "treatmentPlace": self.cancerbean.treatmentPlace
      , "remark": self.cancerbean.remark
      , "telephone": self.cancerbean.telephone
      , "latitude": self.cancerbean.latitude
      , "longitude": self.cancerbean.longitude
    };

    //console.log(obj.remark.length);

    if (self.validate(obj)) {
      self.message_comfirm('', 'ยืนยันการทำแบบสำรวจ', function (confirm) {
        self.inputValidate = new InputValidateInfo();
        if (confirm) {
          self.loading = true;

          let params = self.strNullToEmpty(obj);
          self.api.post('survey_patient/ins_upd', params, function (resp) {
            self.completed.emit(resp);
            self.loading = false;
            self.changeRef.detectChanges();
          });
        }
      });
    }
  }

  onMapChange(event: any) {
    if (event) {
      this.cancerbean.latitude = event.lat;
      this.cancerbean.longitude = event.lng;
    }
  }

}