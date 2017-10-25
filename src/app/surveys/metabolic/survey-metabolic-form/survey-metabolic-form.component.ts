import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { PersonBean } from './../../../beans/person.bean';
import { BaseComponent } from '../../../base-component';
import {MetabolicBean} from '../../../beans/metabolic.bean';

declare var $:any;

@Component({
  selector: 'app-survey-metabolic-form',
  templateUrl: './survey-metabolic-form.component.html',
  styleUrls: ['./survey-metabolic-form.component.css']
})

export class SurveyMetabolicFormComponent extends BaseComponent implements OnInit ,AfterViewInit {
  @Input() action: string;
  @Input() data: MetabolicBean;

  @Input() set citizenID(citizenID: string) {
    this.personBean.citizenId = citizenID;
    
  }

  public metabolicbean:MetabolicBean;
  public isFindPersonal: boolean = true;

  public personBean = new PersonBean();
  public isShowForm: boolean = false;
  public resetFind: number = 1;

  public personal_CitizenID : String;
  public personal_PatentID : String;
  public personal_Fname : String;
  public personal_Lname : String;
  public personal_Gender : String;
  public personal_AgeYears : String;
  public personal_AgeMonths : String;
  public personal_HouseID : String;
  public personal_HgroupID : String;
  public personal_DistrictID : String;
  public personal_AmphurID : String;
  public personal_CityID : String;

  public healtHistory_isDiabetesParent: boolean;
  public healtHistory_isOverBmi: boolean;
  public healtHistory_isOverBp: boolean;
  public healtHistory_isOverFbs: boolean;
  public healtHistory_isOvercholesterol: boolean;
  public healtHistory_isPregnantDiabetes: boolean;
  public healtHistory_isOverBpParent: boolean;

  public drugHistory_isSmoke: boolean;
  public drugHistory_isDrink: boolean;
  public drugHistory_numTobacco: Number;
  public drugHistory_numDrink: Number;

  public physicalBody_weight: Number;
  public physicalBody_height: Number;
  public physicalBody_waistline: Number;
  public physicalBody_BMI: Number;
  public physicalBody_BP1_mm: Number;
  public physicalBody_BP1_hg: Number;
  public physicalBody_BP2_mm: Number;
  public physicalBody_BP2_hg: Number;

  public disease_Diabetes: boolean;
  public disease_OverBP: boolean;
  public disease_Complication_eye: boolean;
  public disease_Complication_kidney: boolean;
  public disease_Complication_nerve: boolean;
  public disease_Complication_nervousSys: boolean;
  public disease_Complication_etc: boolean;

  // dataFor;

  constructor(private http: Http,private changeRef: ChangeDetectorRef) {
    super();
    this.metabolicbean = new MetabolicBean();
  }

  ngOnInit() {
    $('body').on('click','#radioBtn a', function () {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
    })

    $('body').on('click','#radioBtn2 a', function () {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive2');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive2').addClass('active');
    })

  }

  ngAfterViewInit(){
    
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

  onChoosePersonal(personBean:PersonBean):void {
    this.personBean = personBean;
    console.log('noti Choose = '+personBean.citizenId);
    this.isFindPersonal = false;
    this.isShowForm = true;
   
  }
  onBack(){
    this.isFindPersonal = true;
    this.isShowForm = false;
  }

}
