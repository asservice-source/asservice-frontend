import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-survey-patient',
  templateUrl: './survey-patient.component.html',
  styleUrls: ['./survey-patient.component.css']
})
export class SurveyPatientComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  public patientType:number = 0;
  public isShowsick : boolean = true;
  public surveyTypeCode: string = "PATIENT";

  constructor() { 
    this.loadData();
  }

  ngOnInit() {  
    
  }

  checkPatient(){
    if(this.patientType == 1){
       this.isShowsick = false;
    }else if(this.patientType == 2){
        $("#disabled").hide();
    }
  }

  loadData() {
  
      this.dtOptions = {
        pagingType: "full_numbers",
        processing: true,
        columns: [{
          width: "40px",
          orderable: false
        }, {
          width: ""
        }, {
          width: "200px"
        }, {
          width: "50px"
        }, {
          width: "170px"
        }, {
          width: "100px"
        }, {
          width: "70px",
          orderable: false
        }]
      };
  
    }


}
