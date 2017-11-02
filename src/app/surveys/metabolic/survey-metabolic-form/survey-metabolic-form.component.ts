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
  public smokeType: string;
  public drinkType: string;
  public isErrorSmoke = false;
  public isErrorDrink = false;
  public isErrorWeight = false;
  public isErrorHeight = false;
  public isErrorWaistline = false;
  public isErrorBMI = false;
  public isErrorBP1 = false;
  public isErrorBP2 = false;


  // dataFor;

  constructor(private http: Http, private changeRef: ChangeDetectorRef) {
    super();
    this.metabolicbean = new MetabolicBean();
    this.api = new ApiHTTPService();
    this.getHealtinsuranceType();

  }

  ngOnInit() {
    this.onModalEvent();

    $('body').on('click', '#radioBtn a', function () {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    })

    $('body').on('click', '#radioBtn2 a', function () {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive2');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive2').addClass('active');
    })

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

  smoke(T) {
    let b = T;
    if (T == '2') {
      $("#numTobacco").prop('disabled', false);
      this.metabolicbean.drugHistory_Smoke = '2';
    } else if (T == '1') {
      $("#numTobacco").prop('disabled', true);
      this.metabolicbean.drugHistory_Smoke = '1';
    } else {
      $("#numTobacco").prop('disabled', true);
      this.metabolicbean.drugHistory_Smoke = '3';
    }
  }

  drink(T) {
    let b = T;
    if (T == '2') {
      $("#timeDrink").prop('disabled', false);
      this.metabolicbean.drugHistory_Drink = '2';
    } else if (T == '1') {
      $("#timeDrink").prop('disabled', true);
      this.metabolicbean.drugHistory_Drink = '1';
    } else {
      $("#timeDrink").prop('disabled', true);
      this.metabolicbean.drugHistory_Drink = '3';
    }
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
    this.metabolicbean = bean;
    this.isFindPersonal = false;
    this.isShowForm = true;

  }
  onBack() {
    this.metabolicbean = new MetabolicBean();
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
        self.onChoosePersonal(self.data);
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

    this.metabolicbean.healtHistory_isDiabetesParent = this.metabolicbean.healtHistory_isDiabetesParent || false;
    this.metabolicbean.healtHistory_isOverBmi = this.metabolicbean.healtHistory_isOverBmi || false;
    this.metabolicbean.healtHistory_isOverBp = this.metabolicbean.healtHistory_isOverBp || false;
    this.metabolicbean.healtHistory_isOverFbs = this.metabolicbean.healtHistory_isOverFbs || false;
    this.metabolicbean.healtHistory_isOvercholesterol = this.metabolicbean.healtHistory_isOvercholesterol || false;
    this.metabolicbean.healtHistory_isPregnantDiabetes = this.metabolicbean.healtHistory_isPregnantDiabetes || false;
    this.metabolicbean.healtHistory_isOverBpParent = this.metabolicbean.healtHistory_isOverBpParent || false;

    this.metabolicbean.disease_Diabetes = this.metabolicbean.disease_Diabetes || false;
    this.metabolicbean.disease_Complication_etc = this.metabolicbean.disease_Complication_etc || false;
    this.metabolicbean.disease_Complication_eye = this.metabolicbean.disease_Complication_eye || false;
    this.metabolicbean.disease_Complication_kidney = this.metabolicbean.disease_Complication_kidney || false;
    this.metabolicbean.disease_Complication_nerve = this.metabolicbean.disease_Complication_nerve || false;
    this.metabolicbean.disease_Complication_nervousSys = this.metabolicbean.disease_Complication_nervousSys || false;
    this.metabolicbean.disease_OverBP = this.metabolicbean.disease_OverBP || false;

    console.log(this.metabolicbean.disease_Diabetes);
    console.log(this.metabolicbean.disease_Complication_etc);
    console.log(this.metabolicbean.disease_Complication_eye);
    console.log(this.metabolicbean.disease_Complication_kidney);
    console.log(this.metabolicbean.disease_Complication_nerve);
    console.log(this.metabolicbean.disease_Complication_nervousSys);
    console.log(this.metabolicbean.disease_OverBP);

    if (this.metabolicbean.drugHistory_Smoke == undefined) {
      this.metabolicbean.drugHistory_Smoke = '1';
    }
    if (this.metabolicbean.drugHistory_Drink == undefined) {
      this.metabolicbean.drugHistory_Drink = '1';
    }


    if (this.metabolicbean.drugHistory_Smoke == '2') {
      if (!this.metabolicbean.drugHistory_numTobacco) {
        this.isErrorSmoke = true;
        validateform = false;
      }
      else {
        this.isErrorSmoke = false;
      }
    } else {
      this.metabolicbean.drugHistory_numTobacco = undefined;
      this.isErrorSmoke = false;
    }

    if (this.metabolicbean.drugHistory_Drink == '2') {
      if (!this.metabolicbean.drugHistory_numDrink) {
        this.isErrorDrink = true;
        validateform = false;
      }
      else {
        this.isErrorDrink = false;
      }
    } else {
      this.metabolicbean.drugHistory_numDrink = undefined;
      this.isErrorDrink = false;
    }

    if (this.metabolicbean.physicalBody_weight == undefined) {
      this.isErrorWeight = true;
      validateform = false;
    } else {
      this.isErrorWeight = false;
    }

    if (this.metabolicbean.physicalBody_height == undefined) {
      this.isErrorHeight = true;
      validateform = false;
    } else {
      this.isErrorHeight = false;
    }

    if (this.metabolicbean.physicalBody_waistline == undefined) {
      this.isErrorWaistline = true;
      validateform = false;
    } else {
      this.isErrorWaistline = false;
    }

    if (this.metabolicbean.physicalBody_BMI == undefined) {
      this.isErrorBMI = true;
      validateform = false;
    } else {
      this.isErrorBMI = false;
    }

    if (this.metabolicbean.physicalBody_BP1_hg == undefined || this.metabolicbean.physicalBody_BP1_mm == undefined) {
      this.isErrorBP1 = true;
      validateform = false;
    } else {
      this.isErrorBP1 = false;
    }

    if (this.metabolicbean.physicalBody_BP2_hg == undefined || this.metabolicbean.physicalBody_BP2_mm == undefined) {
      this.isErrorBP2 = true;
      validateform = false;
    } else {
      this.isErrorBP2 = false;
    }

    return validateform;
  }

  addSurvey() {
    this.validateForm();

    if (this.validateForm() == true) {
      // send data to api 
    }
  }

  
}
