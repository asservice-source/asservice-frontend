import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { PersonBean } from './../../../beans/person.bean';
import { BaseComponent } from '../../../base-component';
import { MetabolicBean } from '../../../beans/metabolic.bean';
import { ApiHTTPService } from '../../../service/api-http.service';

declare var $: any;

@Component({
  selector: 'app-survey-metabolic-form',
  templateUrl: './survey-metabolic-form.component.html',
  styleUrls: ['./survey-metabolic-form.component.css']
})

export class SurveyMetabolicFormComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() action: string;
  @Input() data: MetabolicBean;


  @Input() set citizenID(citizenID: string) {
    this.personBean.citizenId = citizenID;
  }

  public metabolicbean: MetabolicBean;
  public isFindPersonal: boolean = true;

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
  public isOfterPerWeekDisabled = true;




  // dataFor;

  constructor(private http: Http, private changeRef: ChangeDetectorRef) {
    super();
    console.log(this.metabolicbean);
    this.metabolicbean = new MetabolicBean();
    this.api = new ApiHTTPService();
    this.getHealtinsuranceType();

  }

  ngOnInit() {
    this.onModalEvent();
  }

  ngAfterViewInit() {

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
    console.log(" xxxx xxxx xxxx");
    console.log(bean);
    this.metabolicbean = new MetabolicBean();
    this.metabolicbean = bean;
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

        if(self.data.bp1){
          self.data.bp1MM = self.splitBP(self.data.bp1)[0];
          self.data.bp1HG = self.splitBP(self.data.bp1)[1];
        }

        if(self.data.bp2){
          self.data.bp2MM = self.splitBP(self.data.bp2)[0];
          self.data.bp2HG = self.splitBP(self.data.bp2)[1];
        }
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


  validateForm() {

    let validateform = true;

    this.metabolicbean.isHeredityMetabolic = this.metabolicbean.isHeredityMetabolic || false;
    this.metabolicbean.isWaistlineOver = this.metabolicbean.isWaistlineOver || false;
    this.metabolicbean.isBPOver = this.metabolicbean.isBPOver || false;
    this.metabolicbean.isFBS = this.metabolicbean.isFBS || false;
    this.metabolicbean.isCholesterol = this.metabolicbean.isCholesterol || false;
    this.metabolicbean.isNewborn4kg = this.metabolicbean.isNewborn4kg || false;
    this.metabolicbean.isHeredityHypertension = this.metabolicbean.isHeredityHypertension || false;


    if (this.metabolicbean.smokingStatusId == '1') {
      if (!this.metabolicbean.rollPerDay || !this.metabolicbean.packPerYear) {
        this.isErrorSmoke = true;
        validateform = false;
      }
      else {
        this.isErrorSmoke = false;
      }
    } else {
      this.isErrorSmoke = false;
    }

    if (this.metabolicbean.drinkingStatusId == '1') {
      if (!this.metabolicbean.ofterPerWeek) {
        this.isErrorDrink = true;
        validateform = false;
      }
      else {
        this.isErrorDrink = false;
      }
    } else {
      this.isErrorDrink = false;
    }

    if (this.metabolicbean.weight == undefined) {
      this.isErrorWeight = true;
      validateform = false;
    } else {
      this.isErrorWeight = false;
    }

    if (this.metabolicbean.height == undefined) {
      this.isErrorHeight = true;
      validateform = false;
    } else {
      this.isErrorHeight = false;
    }

    if (this.metabolicbean.waistline == undefined) {
      this.isErrorWaistline = true;
      validateform = false;
    } else {
      this.isErrorWaistline = false;
    }

    if (this.metabolicbean.bmi == undefined) {
      this.isErrorBMI = true;
      validateform = false;
    } else {
      this.isErrorBMI = false;
    }

    if (this.metabolicbean.isOther == true) {
      if (!this.metabolicbean.otherComplication) {
        this.isErrorOthercomplication = true;
      }
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
      this.isOfterPerWeekDisabled = false;
      this.metabolicbean.drinkingStatusId = '1';
    } else if (values == '2') {
      this.noDrink = this.classActive;
      this.afterDrink = this.classNotactive;
      this.drinks = this.classNotactive;
      this.isOfterPerWeekDisabled = true;
      this.metabolicbean.drinkingStatusId = '2';
    } else if (values == '3') {
      this.afterDrink = this.classActive;
      this.noDrink = this.classNotactive;
      this.drinks = this.classNotactive;
      this.isOfterPerWeekDisabled = true;
      this.metabolicbean.drinkingStatusId = '3';
    }
  }

  clearSmokeValue() {
    this.metabolicbean.rollPerDay = undefined;
    this.metabolicbean.packPerYear = undefined;
  }

  clearDrinkValue() {
    this.metabolicbean.ofterPerWeek = undefined;
  }
  addSurvey() {

    if (this.validateForm() == true) {
    }
  }

  splitBP(value) {
    let bp = value.split("/");
    return bp;
  }

}
