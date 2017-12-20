import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { PersonBean } from './../../../beans/person.bean';
import { BaseComponent } from '../../../base-component';
import { MetabolicBean } from '../../../beans/metabolic.bean';
import { ApiHTTPService } from '../../../service/api-http.service';

declare var bootbox: any;
declare var $: any;

@Component({
  selector: 'app-survey-metabolic-form',
  templateUrl: './survey-metabolic-form.component.html',
  styleUrls: ['./survey-metabolic-form.component.css']
})

export class SurveyMetabolicFormComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() action: string;
  @Input() data: MetabolicBean;
  @Input() documentId: string;

  @Input() set citizenID(citizenID: string) {
    this.personBean.citizenId = citizenID;
  }

  @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  public metabolicbean: MetabolicBean;
  public isFindPersonal: boolean = true;
  // public loading: boolean = false;

  public code: string = "METABOLIC";
  public personBean = new PersonBean();
  public isShowForm: boolean = false;
  public resetFind: number = 1;
  public apiHttp = new ApiHTTPService();
  private api: ApiHTTPService;
  public healtInsuranceTypeList: any;
  //public smokeType: string;
  public drinkType: string;
  public isErrorSmoke = false;
  public isErrorDrink = false;
  public isErrorWeight = false;
  public isErrorHeight = false;
  public isErrorWaistline = false;
  public isErrorBMI = false;
  public isErrorOthercomplication = false;
  public isErrorPeripheralName = false;
  public classActive = "btn btn-primary btn-sm active";
  public classNotactive = "btn btn-primary btn-sm notActive";
  public smoke = this.classNotactive;
  public noSmoke = this.classActive;
  public afterSmoke = this.classNotactive;
  public drinks = this.classNotactive;
  public noDrink = this.classActive;
  public afterDrink = this.classNotactive;
  public isRollPerDayDisabled = true;
  public isPackPerYearDisabled = true;
  public isOftenPerWeekDisabled = true;
  public errorinput = "error-input";


  public errorSmoke;
  public errorDrink;
  public errorWeight;
  public errorHeight;
  public errorWaistline;
  public errorBMI;
  public errorPeripheralName;
  public errorOthercomplication;




  // dataFor;

  constructor(private http: Http, private changeRef: ChangeDetectorRef) {
    super();
    //console.log(this.metabolicbean);
    this.metabolicbean = new MetabolicBean();
    this.api = new ApiHTTPService();
  }

  ngOnInit() {
    this.onModalEvent();
    this.getHealtinsuranceType();
  }

  ngAfterViewInit() {

  }

  calculateBMI() {
    if (this.metabolicbean.height && this.metabolicbean.weight) {
      let H = this.metabolicbean.height / 100;
      let W = this.metabolicbean.weight;
      let result = W / (H * H);
      this.metabolicbean.bmi = result.toFixed(2);
    }
  }

  getHealtinsuranceType() {
    let self = this;
    let params = {};
    this.api.post('person/health_insurance_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.healtInsuranceTypeList = resp.response;
        // self.healtInsuranceTypeList.id = 89;
        // self.metabolicbean.hInsuranceTypeId = self.healtInsuranceTypeList.id;
      }
    })
  }

  isDuplicate() {
    let self = this;
    let params = {
      "headerTypeCode": this.code,
      "documentId": this.documentId,
      "personId": this.metabolicbean.personId
    };

    console.log(JSON.stringify(params));
    this.api.post('survey/survey_is_duplicate', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        if (self.action != self.ass_action.EDIT) {
          if (resp.response.isDuplicate == true) {
            $('#find-person-md').modal('hide');
            self.message_error('', 'คนที่ท่านเลือกได้ทำการสำรวจไปแล้ว')
          }
        }
      }
    })
  }


  getCitizen(event: PersonBean) {
    if (event.citizenId == '0') {
      this.isShowForm = false;
    } else {
      this.isShowForm = true;
    }
    this.personBean.citizenId = event.citizenId;
    console.log("content");
  }

  onChangeFind(event: PersonBean) {
    if (event.citizenId == '0') {
      this.isShowForm = false;
    } else {
      this.isShowForm = true;
    }
    console.log(event);
  }

  onChoosePersonal(bean: any): void {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    console.log(bean);
    this.metabolicbean = new MetabolicBean();
    this.metabolicbean = bean;
    if (this.ass_action.ADD == this.action) {
      this.metabolicbean.hInsuranceTypeId = "89";
    }
    this.isDuplicate();
    this.isFindPersonal = false;
    this.isShowForm = true;


  }
  onBack() {
    this.metabolicbean = new MetabolicBean();
    this.isFindPersonal = true;
    this.isShowForm = false;

    this.isErrorSmoke = false;
    this.isErrorDrink = false;
    this.isErrorWeight = false;
    this.isErrorHeight = false;
    this.isErrorWaistline = false;
    this.isErrorBMI = false;
    this.isErrorOthercomplication = false;
    this.isErrorPeripheralName = false;

    if (this.ass_action.EDIT == this.action) {
      $('#find-person-md').modal('hide');
    }
  }

  onModalEvent() {

    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePersonal(self.data);
        self.activeBtnsmoke(self.data.smokingStatusId);
        self.activeBtnDrink(self.data.drinkingStatusId);

        if (self.data.bp1) {
          self.data.bp1MM = self.splitBP(self.data.bp1)[0];
          self.data.bp1HG = self.splitBP(self.data.bp1)[1];
        }

        if (self.data.bp2) {
          self.data.bp2MM = self.splitBP(self.data.bp2)[0];
          self.data.bp2HG = self.splitBP(self.data.bp2)[1];
        }
      }

      // if (self.action == self.ass_action.ADD){
      //   this.metabolicbean.hInsuranceTypeId = 89;
      //  }

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


  validateForm() {

    let validateform = true;

    this.metabolicbean.isHeredityMetabolic = this.metabolicbean.isHeredityMetabolic || false;
    this.metabolicbean.isWaistlineOver = this.metabolicbean.isWaistlineOver || false;
    this.metabolicbean.isBPOver = this.metabolicbean.isBPOver || false;
    this.metabolicbean.isFBS = this.metabolicbean.isFBS || false;
    this.metabolicbean.isCholesterol = this.metabolicbean.isCholesterol || false;
    this.metabolicbean.isNewborn4kg = this.metabolicbean.isNewborn4kg || false;
    this.metabolicbean.isHeredityHypertension = this.metabolicbean.isHeredityHypertension || false;

    this.metabolicbean.isEyeComplication = this.metabolicbean.isEyeComplication || false;
    this.metabolicbean.isMetabolic = this.metabolicbean.isMetabolic || false;
    this.metabolicbean.isHypertension = this.metabolicbean.isHypertension || false;
    this.metabolicbean.isKidneyComplication = this.metabolicbean.isKidneyComplication || false;
    this.metabolicbean.isPeripheralNeuropathy = this.metabolicbean.isPeripheralNeuropathy || false;
    this.metabolicbean.isNeuropathy = this.metabolicbean.isNeuropathy || false;
    this.metabolicbean.isOther = this.metabolicbean.isOther || false;

    if (this.metabolicbean.smokingStatusId == '1') {
      if (!this.metabolicbean.rollPerDay || !this.metabolicbean.packPerYear) {
        this.isErrorSmoke = true;
        this.errorSmoke = this.errorinput;
        validateform = false;
      }
      else {
        this.isErrorSmoke = false;
        this.errorSmoke = "";
      }
    } else {
      this.metabolicbean.rollPerDay = "";
      this.metabolicbean.packPerYear = "";
      this.isErrorSmoke = false;
      this.errorSmoke = "";
    }

    if (this.metabolicbean.drinkingStatusId == '1') {
      if (!this.metabolicbean.oftenPerWeek || this.metabolicbean.oftenPerWeek >= 255) {
        this.isErrorDrink = true;
        this.errorDrink = this.errorinput;
        validateform = false;
      }
      else {
        this.isErrorDrink = false;
        this.errorDrink = "";
      }
    } else {
      this.metabolicbean.oftenPerWeek = undefined;
      this.isErrorDrink = false;
      this.errorDrink = "";
    }

    if (!this.metabolicbean.weight || this.metabolicbean.weight >= 255) {
      this.isErrorWeight = true;
      this.errorWeight = this.errorinput;
      validateform = false;
    } else {
      this.isErrorWeight = false;
      this.errorWeight = "";
    }

    if (!this.metabolicbean.height || this.metabolicbean.height >= 255) {
      this.isErrorHeight = true;
      this.errorHeight = this.errorinput;
      validateform = false;
    } else {
      this.isErrorHeight = false;
      this.errorHeight = "";
    }

    if (!this.metabolicbean.waistline) {
      this.isErrorWaistline = true;
      this.errorWaistline = this.errorinput;
      validateform = false;
    } else {
      this.isErrorWaistline = false;
      this.errorWaistline = "";
    }

    // if (!this.metabolicbean.bmi) {
    //   this.isErrorBMI = true;
    //   this.errorBMI = this.errorinput;
    //   validateform = false;
    // } else {
    //   this.isErrorBMI = false;
    //   this.errorBMI = "";
    // }

    if (this.metabolicbean.isPeripheralNeuropathy == true) {
      if (!this.metabolicbean.peripheralName) {
        this.isErrorPeripheralName = true;
        this.errorPeripheralName = this.errorinput;
        validateform = false;
      } else {
        this.isErrorPeripheralName = false;
        this.errorPeripheralName = "";
      }
    } else {
      this.metabolicbean.peripheralName = undefined;
    }

    if (this.metabolicbean.isOther == true) {
      if (!this.metabolicbean.otherComplication) {
        this.isErrorOthercomplication = true;
        this.errorOthercomplication = this.errorinput;
        validateform = false;
      } else {
        this.isErrorOthercomplication = false;
        this.errorOthercomplication = "";
      }
    } else {
      this.metabolicbean.otherComplication = undefined;
    }

    if (this.metabolicbean.bp1MM && this.metabolicbean.bp1HG) {
      this.metabolicbean.bp1 = this.metabolicbean.bp1MM + "/" + this.metabolicbean.bp1HG;
    } else {
      this.metabolicbean.bp1 = undefined;
    }

    if (this.metabolicbean.bp2MM && this.metabolicbean.bp2HG) {
      this.metabolicbean.bp2 = this.metabolicbean.bp2MM + "/" + this.metabolicbean.bp2HG;
    } else {
      this.metabolicbean.bp2 = undefined;
    }



    return validateform;
  }

  activeBtnsmoke(values) {
    if (values == '1') {
      this.smoke = this.classActive;
      this.noSmoke = this.classNotactive;
      this.afterSmoke = this.classNotactive;
      this.isRollPerDayDisabled = false;
      this.isPackPerYearDisabled = false;
      this.metabolicbean.smokingStatusId = '1';
    } else if (values == '2') {
      this.noSmoke = this.classActive;
      this.afterSmoke = this.classNotactive;
      this.smoke = this.classNotactive;
      this.isRollPerDayDisabled = true;
      this.isPackPerYearDisabled = true;
      this.metabolicbean.smokingStatusId = '2';
    } else if (values == '3') {
      this.afterSmoke = this.classActive;
      this.noSmoke = this.classNotactive;
      this.smoke = this.classNotactive;
      this.isRollPerDayDisabled = true;
      this.isPackPerYearDisabled = true;
      this.metabolicbean.smokingStatusId = '3';
    }
  }

  activeBtnDrink(values) {
    if (values == '1') {
      this.drinks = this.classActive;
      this.noDrink = this.classNotactive;
      this.afterDrink = this.classNotactive;
      this.isOftenPerWeekDisabled = false;
      this.metabolicbean.drinkingStatusId = '1';
    } else if (values == '2') {
      this.noDrink = this.classActive;
      this.afterDrink = this.classNotactive;
      this.drinks = this.classNotactive;
      this.isOftenPerWeekDisabled = true;
      this.metabolicbean.drinkingStatusId = '2';
    } else if (values == '3') {
      this.afterDrink = this.classActive;
      this.noDrink = this.classNotactive;
      this.drinks = this.classNotactive;
      this.isOftenPerWeekDisabled = true;
      this.metabolicbean.drinkingStatusId = '3';
    }
  }

  clearSmokeValue() {
    this.metabolicbean.rollPerDay = undefined;
    this.metabolicbean.packPerYear = undefined;
  }

  clearDrinkValue() {
    this.metabolicbean.oftenPerWeek = undefined;
  }

  splitBP(value) {
    let bp = value.split("/");
    return bp;
  }


  addSurvey() {
    let self = this;

    console.log(this.documentId);
    if (this.action == this.ass_action.ADD) {
      this.metabolicbean.documentId = this.documentId;
    }

    if (this.validateForm() == true) {
      let obj = {
        "oftenPerWeek": this.metabolicbean.oftenPerWeek || "",
        "isMetabolic": this.metabolicbean.isMetabolic,
        "isWaistlineOver": this.metabolicbean.isWaistlineOver,
        "isKidneyComplication": this.metabolicbean.isKidneyComplication,
        "isHypertension": this.metabolicbean.isHypertension,
        "isCholesterol": this.metabolicbean.isCholesterol,
        "isFBS": this.metabolicbean.isFBS,
        "smokingStatusId": this.metabolicbean.smokingStatusId || "",
        "packPerYear": this.metabolicbean.packPerYear || "",
        "rollPerDay": this.metabolicbean.rollPerDay || "",
        "osmId": this.metabolicbean.osmId || "",
        "waistline": this.metabolicbean.waistline || "",
        "isBPOver": this.metabolicbean.isBPOver,
        "drinkingStatusId": this.metabolicbean.drinkingStatusId || "",
        "homeId": this.metabolicbean.homeId || "",
        "hInsuranceTypeId": this.metabolicbean.hInsuranceTypeId || "",
        "isHeredityHypertension": this.metabolicbean.isHeredityHypertension,
        "height": this.metabolicbean.height || "",
        "bp1": this.metabolicbean.bp1 || "",
        "isHeredityMetabolic": this.metabolicbean.isHeredityMetabolic,
        "bp2": this.metabolicbean.bp2 || "",
        "isEyeComplication": this.metabolicbean.isEyeComplication,
        "isNeuropathy": this.metabolicbean.isNeuropathy,
        "weight": this.metabolicbean.weight || "",
        "otherComplication": this.metabolicbean.otherComplication || "",
        "peripheralName": this.metabolicbean.peripheralName || "",
        "fbs": this.metabolicbean.fbs || "",
        "isPeripheralNeuropathy": this.metabolicbean.isPeripheralNeuropathy,
        "documentId": this.metabolicbean.documentId || "",
        "isNewborn4kg": this.metabolicbean.isNewborn4kg,
        "rowGUID": this.metabolicbean.rowGUID || "",
        "isOther": this.metabolicbean.isOther,
        "bmi": this.metabolicbean.bmi || "",
        "personId": this.metabolicbean.personId || "",
      }

      console.log(Object.keys(obj).length);
      console.log(JSON.stringify(obj));

      self.message_comfirm('', 'ยืนยันการทำแบบสำรวจ', function (confirm) {
        if (confirm) {
          self.api.post('survey_metabolic/ins_upd_metabolic_info', obj, function (resp) {
            if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
              $("#find-person-md").modal('hide');
              self.completed.emit(true);
              // self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจความเสี่ยงโรค Metabolic แล้ว');
            }else{
              self.completed.emit(false);
            }
          })
        }
      })
    }
  }

}
