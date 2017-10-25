import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { PersonBean } from './../../../beans/person.bean';
import { BaseComponent } from '../../../base-component';
import {MetabolicBean} from '../../../beans/metabolic.bean';
import { ApiHTTPService } from '../../../service/api-http.service';

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
  public apiHttp = new ApiHTTPService();
  private api: ApiHTTPService;
  public healtInsuranceTypeList : any;

  

  // dataFor;

  constructor(private http: Http,private changeRef: ChangeDetectorRef) {
    super();
    this.metabolicbean = new MetabolicBean();
    this.api = new ApiHTTPService();
    this.getHealtinsuranceType();
    
  }

  ngOnInit() {
    this.onModalEvent();
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

  getHealtinsuranceType() {
    let self = this;
    let params = {};
    this.api.post('person/health_insurance_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.healtInsuranceTypeList = resp.list;
      }

    })
  }

  Smoke(T) {
    if (T == 'N') {
      $("#numTobacco").prop('disabled', true);
      this.metabolicbean.drugHistory_isSmoke = false;

    } else {
      $("#numTobacco").prop('disabled', false);
      this.metabolicbean.drugHistory_isSmoke = true;
    }

  }

  Drink(T) {
    if (T == 'N') {
      $("#timeDrink").prop('disabled', true);
      this.metabolicbean.drugHistory_isDrink = false;
    } else {
      $("#timeDrink").prop('disabled', false);
      this.metabolicbean.drugHistory_isDrink = true;
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

  onChoosePersonal(bean:any):void {
    console.log("---------------------------------------------");
    console.log(bean.cID);
    if(this.ass_action.ADD==this.action){
      this.metabolicbean.personal_CitizenID = bean.cID;
      // this.metabolicbean.healthInsurananceType = "ท.";
      // this.metabolicbean.personal_Fullname = this.getFullName(bean.person.prefix.name, bean.person.firstName, bean.person.lastName);
      // this.metabolicbean.birthDate = bean.person.birthDate;
      // this.metabolicbean.personal_AgeYears = this.getAge(bean.person.birthDate);
    }else if(this.ass_action.EDIT==this.action){
      this.metabolicbean.personal_CitizenID = bean.cID;
    }
    
    this.isFindPersonal = false;
    this.isShowForm = true;
   
  }
  onBack(){
    this.metabolicbean = new MetabolicBean();
    this.isFindPersonal = true;
    this.isShowForm = false;
    if(this.ass_action.EDIT == this.action){
      $('#find-person-md').modal('hide');
    }
  }

  onModalEvent(){
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind+1;
      if(self.action==self.ass_action.EDIT){
        self.onChoosePersonal(self.data);
      }

      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind+1;
      self.changeRef.detectChanges();
    });
  }

}
