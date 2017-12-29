import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { CancerBean } from '../../../beans/cancer.bean';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
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
    public loading : boolean;
    public inputValidate: InputValidateInfo = new InputValidateInfo();
  
  
    constructor(private http: Http, private changeRef: ChangeDetectorRef) {
      super();
      this.cancerbean = new CancerBean();
      this.api = new ApiHTTPService();
      this.getHealtinsuranceType();
      this.getSurveyStatusType();
      this.getCancerType();
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
      console.log(bean);
      this.cancerbean = bean;
  
      if (this.action == this.ass_action.ADD) {
        this.cancerbean.disabilityCauseTypeId = "";
        this.cancerbean.disabilityTypeId = "";
        this.cancerbean.cancerTypeId = "";
        this.cancerbean.diseaseStatusTypeId = "";
        this.cancerbean.hInsuranceTypeId = "89";
        this.cancerbean.patientSurveyTypeCode = "Cancer"
        this.cancerbean.cancerDate = this.getCurrentDatePickerModel();
      }
      //this.isDuplicate();
      this.isFindPersonal = false;
      this.isShowForm = true;
  
    }
    onBack() {
      this.cancerbean = new CancerBean();
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
          self.data.cancerDate = self.getCurrentDatePickerModel(self.data.cancerDate);
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
  
    getCancerType() {
      let self = this;
      let params = {};
      this.api.post('person/cancer_type_list', params, function (resp) {
        if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
          self.cancerTypeList = resp.response;
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
  
    // formatForJson(value) {
    //   let pure_value = value.split("-");
    //   let result = pure_value.join('');
    //   return result;
    // }
  
  
  //   formatPhoneToDisplay(phone): string{
  //     if(!this.isEmpty(phone)){
  //     let arr = phone.split('');
  //     return arr[0]+arr[1]+'-'+arr[2]+arr[3]+arr[4]+arr[5]+'-'+arr[6]+arr[7]+arr[8]+arr[9];
  //     }
  // }

  validate(obj: any): boolean {
    let validate = true;
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpVal: SimpleValidateForm = new SimpleValidateForm();
    let ignore = ["patientTypeId", "disabilityTypeId", "disabilityCauseTypeId","latitude", "longitude","remark"];
    if (this.action == this.ass_action.ADD) {
      ignore.push("rowGUID");
    }

    let objs = simpVal.getObjectEmpty(obj, ignore);
    console.log(objs);

    console.log(this.compareDateCurrent_DDMMYYYY(this.cancerbean.cancerDate));
    if (objs.length > 0 || this.compareDateCurrent_DDMMYYYY(this.cancerbean.cancerDate)<0) {
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
    if (this.action == this.ass_action.ADD) {
      documentId = this.documentId;
    } else {
      documentId = this.cancerbean.documentId;
    }

    let obj = {
      "rowGUID": this.cancerbean.rowGUID
      , "personId": this.cancerbean.personId
      , "documentId": documentId
      , "osmId": this.cancerbean.osmId
      , "homeId": this.cancerbean.homeId //รอแก้
      , "cancerTypeId": this.cancerbean.cancerTypeId
      , "diseaseStatusTypeId": this.cancerbean.diseaseStatusTypeId
      , "patientDate": this.getStringDateForDatePickerModel(this.cancerbean.cancerDate.date)
      , "patientTypeId": ""
      , "hInsuranceTypeId": this.cancerbean.hInsuranceTypeId
      , "patientSurveyTypeCode": this.cancerbean.patientSurveyTypeCode
      , "disabilityTypeId": ""
      , "disabilityCauseTypeId": ""
      , "treatmentPlace": this.cancerbean.treatmentPlace
      , "remark": this.cancerbean.remark
      , "telephone": this.cancerbean.telephone
      , "latitude": this.cancerbean.latitude
      , "longitude": this.cancerbean.longitude
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
              // self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจผู้ป่วยมะเร็ง')
            }
          })
        }
      })

    }
  }
  }