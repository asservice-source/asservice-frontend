import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { CancerBean } from '../../../beans/cancer.bean';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
// import { Output } from '@angular/core/src/metadata/directives';
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
// export class SurveyCancerFormComponent extends BaseComponent implements OnInit {

//   // @Input() action: string;
//   // @Input() data: CancerBean;
//   // @Input() documentId: string;

//   // @Output() completed: EventEmitter<any> = new EventEmitter<any>();

//   // public isFindPersonal: boolean = true;
//   // public isShowForm: boolean = false;
//   // public cancerbean: CancerBean;
//   // public resetFind: number = 1;
//   // private api: ApiHTTPService;
//   // public healtInsuranceTypeList: any;
//   // public surveyStatusTypeList: any;
//   // public cancerTypeList: any;
//   // public disabilityTypeList: any;
//   // public disabilityTypeCause: any;
//   // public diseaseStatusTypeList: any;
//   // public code: string = "Cancer";




  
//   public member: PersonalMemberBean = new PersonalMemberBean();



//   constructor() {
//     super();
//   }

//   ngOnInit() {

//   }

//   showModal() {
//     let self = this;
//   }

//   onChangeDate(event: IMyDateModel) {
//     let self = this;

//     // console.log(event);
//     self.member.birthDate = self.getStringDateForDatePickerModel(event.date);
//   }
// }

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
      this.isDuplicate();
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
          self.data.telephone = self.formatPhoneToDisplay(self.data.telephone);
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
  
    // onChangeCancerSyurvey() {
    //   if (this.action == this.ass_action.ADD) {
    //     if (this.cancerbean.patientSurveyTypeCode == 'Cancer') {
    //       this.cancerbean.hInsuranceTypeId = "89";
    //     }
    //     else {
    //       this.cancerbean.hInsuranceTypeId = "74";
    //     }
    //   }
    // }
  
  
    isDuplicate() {
      let self = this;
      let params = {
        "headerTypeCode": this.code,
        "documentId": this.documentId,
        "personId": this.cancerbean.personId
      };
  
      console.log(JSON.stringify(params));
      this.api.post('survey/survey_is_duplicate', params, function (resp) {
        if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
          if (self.action != self.ass_action.EDIT) {
            if (resp.response.isDuplicate == true) {
              $('#find-person-md').modal('hide');
              bootbox.alert({
                size: "large",
                title: "<div style='color:white;font-weight: bold;'><span class='glyphicon glyphicon-alert'></span> ไม่ถูกต้อง</div>",
                message: "คนที่ท่านเลือกได้ทำการสำรวจไปแล้ว",
                callback: function () {
  
                }
              });
            }
          }
        }
      })
    }
  
    formatPhoneNumber() {
      let self = this;
  
      if (!self.isEmpty(self.cancerbean.telephone)) {
        let patternPhone: string = "__-____-____";
        let patternPhone_ex: string = "-";
        let returnText = "";
        let obj_1: number = self.cancerbean.telephone.length;
        let obj_2 = obj_1 - 1;
        for (let i = 0; i < patternPhone.length; i++) {
          if (obj_2 == i && patternPhone.charAt(i + 1) == patternPhone_ex) {
            returnText += self.cancerbean.telephone + patternPhone_ex;
            self.cancerbean.telephone = returnText;
          }
        }
      }
    }
  
    formatForJson(value) {
      let pure_value = value.split("-");
      let result = pure_value.join('');
      return result;
    }
  
  
    formatPhoneToDisplay(phone): string{
      // if(this.isEmpty(phone) && phone.length==10) return phone;
      if(!this.isEmpty(phone)){
      let arr = phone.split('');
      return arr[0]+arr[1]+'-'+arr[2]+arr[3]+arr[4]+arr[5]+'-'+arr[6]+arr[7]+arr[8]+arr[9];
      }
  }

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

    if (objs.length > 0) {
      validate = false;
    } else {
      if (this.cancerbean.telephone.length < 12) {
        validate = false;
      } else {
        validate = true;
      }
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
      if (!self.isEmpty(obj["telephone"])) {
        obj["telephone"] = self.formatForJson(obj["telephone"]);
      }
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
  
    // addSurvey(): void {
    //   let self = this;
  
    //   if(!self.isEmpty(self.cancerbean.telephone)){
    //     self.cancerbean.telephone = self.formatForJson(self.cancerbean.telephone);
    //   }
  
    //   console.log(this.documentId);
    //   if (this.action == this.ass_action.ADD) {
    //     this.cancerbean.documentId = this.documentId;
    //   }
  
    //   if (this.cancerbean.patientSurveyTypeCode == 'Cancer') {
    //     this.cancerbean.disabilityTypeId = "";
    //     this.cancerbean.disabilityCauseTypeId = "";
    //   }
  
  
    //   let obj = {
        
    //       "rowGUID" : this.cancerbean.rowGUID
    //       ,"personId" : this.cancerbean.personId
    //       ,"documentId" : this.cancerbean.documentId
    //       ,"osmId" : this.cancerbean.osmId
    //       ,"homeId" : this.cancerbean.homeId
    //       ,"cancerTypeId" : this.cancerbean.cancerTypeId
    //       ,"diseaseStatusTypeId": this.cancerbean.diseaseStatusTypeId
    //       ,"patientDate" : this.getStringDateForDatePickerModel(this.cancerbean.cancerDate)
    //       ,"patientSurveyTypeCode" : "Cancer"
    //       ,"hInsuranceTypeId" : this.cancerbean.hInsuranceTypeId
    //       , "treatmentPlace": this.cancerbean.treatmentPlace
    //       , "remark": this.cancerbean.remark
    //       , "telephone": this.cancerbean.telephone
    //       , "latitude": this.cancerbean.latitude
    //       , "longitude": this.cancerbean.longitude
    //   };

  
    //   let params = this.strNullToEmpty(obj);
    //   let params2 = JSON.stringify(params);
    //   console.log(params);
    //   console.log(params2);

    //   this.api.post('survey_patient/ins_upd', params, function (resp) {
    //     console.log(resp);
    //     if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
    //       $("#find-person-md").modal('hide');
    //       self.completed.emit(true);
    //       bootbox.alert({
    //         size: "large",
    //         title: "<div style='color:#5cb85c;font-weight: bold;'><span class='glyphicon glyphicon-ok'></span> ส่งแบบสำรวจสำเร็จ</div>",
    //         message: "ท่านได้ทำการส่งแบบสำรวจความเสี่ยงโรค Metabolic แล้ว",
    //         callback: function () {
    //         }
    //       });
    //     }
    //   })
  
    // }
  
  }