import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-survey-patient',
  templateUrl: './survey-patient.component.html',
  styleUrls: ['./survey-patient.component.css']
})
export class SurveyPatientComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  patientType = 0;
  isShowsick : boolean = true;

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
          width: "220px"
        }, {
          width: "70px"
        }, {
          width: "70px"
        }, {
          width: "70px"
        }, {
          width: "70px",
          orderable: false
        }]
      };
  
    }


}
