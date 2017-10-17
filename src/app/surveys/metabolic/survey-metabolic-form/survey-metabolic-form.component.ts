import { Component, OnInit, Input } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Personalities } from './survey-metabolic-form-bean';
import { PersonBean } from './../../../beans/person.bean';

@Component({
  selector: 'app-survey-metabolic-form',
  templateUrl: './survey-metabolic-form.component.html',
  styleUrls: ['./survey-metabolic-form.component.css']
})
export class SurveyMetabolicFormComponent implements OnInit {

  @Input() set citizenID(citizenID: string) {
    this.personBean.citizenId = citizenID;
  }

  public personalities = new Personalities();
  public personBean = new PersonBean();
  public isShowForm: boolean = false;

  healtHistory_isDiabetesParent: boolean;
  healtHistory_isOverBmi: boolean;
  healtHistory_isOverBp: boolean;
  healtHistory_isOverFbs: boolean;
  healtHistory_isOvercholesterol: boolean;
  healtHistory_isPregnantDiabetes: boolean;
  healtHistory_isOverBpParent: boolean;

  drugHistory_isSmoke: boolean;
  drugHistory_isDrink: boolean;
  drugHistory_numTobacco: Number;
  drugHistory_numDrink: Number;

  physicalBody_weight: Number;
  physicalBody_height: Number;
  physicalBody_waistline: Number;
  physicalBody_BMI: Number;
  physicalBody_BP1_mm: Number;
  physicalBody_BP1_hg: Number;
  physicalBody_BP2_mm: Number;
  physicalBody_BP2_hg: Number;

  disease_Diabetes: boolean;
  disease_OverBP: boolean;
  disease_Complication_eye: boolean;
  disease_Complication_kidney: boolean;
  disease_Complication_nerve: boolean;
  disease_Complication_nervousSys: boolean;
  disease_Complication_etc: boolean;

  // dataFor;

  constructor(private http: Http) {
    this.personBean.healthInsurananceType = "ท.89"
  }

  ngOnInit() {

    $('#radioBtn a').on('click', function () {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    })

    $('#radioBtn2 a').on('click', function () {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive2');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive2').addClass('active');
    })

  }

  update() {
    if (this.physicalBody_weight == 0) {

    }
  }

  Smoke(T) {
    if (T == 'N') {
      $("#numTobacco").prop('disabled', true);
      this.drugHistory_isSmoke = false;

    } else {
      $("#numTobacco").prop('disabled', false);
      this.drugHistory_isSmoke = true;
    }

  }

  Drink(T) {
    if (T == 'N') {
      $("#timeDrink").prop('disabled', true);
      this.drugHistory_isDrink = false;
    } else {
      $("#timeDrink").prop('disabled', false);
      this.drugHistory_isDrink = true;
    }
  }

  test() {
    // let headers = new Headers({ 'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers});

    // this.http.get('http://192.168.1.59:8080/asservice/gender/getAll', options)
    //   .map(res => res.json())
    //   .subscribe(
    //   data => {
    //     this.dataFor = data;
    //     console.log(this.dataFor);
    //     this.xxx=data[0].Name;
    //   },
    //   error => console.log(error)
    //   );
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

}
