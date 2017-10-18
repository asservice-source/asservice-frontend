import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { BaseComponent } from "../../../base-component";
@Component({
  selector: 'app-survey-died-form',
  templateUrl: './survey-died-form.component.html',
  styleUrls: ['./survey-died-form.component.css']
  
})
export class SurveyDiedFormComponent extends BaseComponent implements OnInit ,AfterViewInit {
  public isShowForm: boolean = false;
  public isFindPersonal: boolean = true;
  public personBean: PersonBean = new PersonBean();
  show = false;
  location = 1;
  cause = 1;
  location2 = 1;
  cause2 = 1;

  mCitizenID;
  mFirstName;
  mLastName;
  mNickName;
  mGender;
  mPrefix;
  mBirthDate;
  mFullname = "นายโสภน การแพทย์";
  constructor() {
    super();
   }
  persons = [];

  ngOnInit() {
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });

    $("#textLocation").hide();
    $("#textCause").hide();

    $("#textLocation2").hide();
    $("#textCause2").hide();
    
    this.persons = [{
      CitizenID: "5470900018746"
    , LastName:"สมนึก"
    , FirstName: "จิตใจดี"
    , NickName:"So"
    , Gender: "ชาย"
    , Prefix: "นาย"
    , BirthDate: "01/02/2536"}];
  }


  ngAfterViewInit(){
    let person;
    $('#find-dropdownPerson').on('change', function(){
        if($(this).val()>=1){
          $('#personDetail').removeAttr('hidden');
        }else{
          $('#personDetail').attr('hidden','true');
        }

    });
  }
  
  doAlert(){
    alert('dddd');
  }

  ChangeLocation(){
    if(this.location == 0){
      $("#textLocation").fadeIn();
    }else{
      $("#textLocation").fadeOut();
    }
  }

  ChangeCause(){
    if(this.cause == 0){
      $("#textCause").fadeIn();
    }else{
      $("#textCause").fadeOut();
    }
  }

  ChangeLocation2(){
    if(this.location2 == 0){
      $("#textLocation2").fadeIn();
    }else{
      $("#textLocation2").fadeOut();
    }
  }

  ChangeCause2(){
    if(this.cause2 == 0){
      $("#textCause2").fadeIn();
    }else{
      $("#textCause2").fadeOut();
    }
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


