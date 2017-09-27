import { Component, OnInit ,AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-died-add',
  templateUrl: './died-add.component.html',
  styleUrls: ['./died-add.component.css']
})
export class DiedAddComponent implements OnInit ,AfterViewInit {
  isHiddenContent = true;
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
  mFullname;
  constructor() { }
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
      /*
      if($(this).val()>0){
        person = this.persons[0];
        this.mFullname = person.Prefix + person.FirstName+' ' +person.LastName;
        $('#personDetail').removeAttr("hidden");
        console.log("mFullname => " + this.mFullname);
      }else{
        $('#personDetail').attr("hidden",'hidden');
      }
      */
    });
  
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
}


