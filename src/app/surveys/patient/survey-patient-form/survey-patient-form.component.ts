import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Input } from '@angular/core';
import {PatientBean} from '../../../beans/patient.bean'
import { Http } from '@angular/http';
import { BaseComponent } from '../../../base-component';
declare var $:any;

@Component({
  selector: 'app-survey-patient-form',
  templateUrl: './survey-patient-form.component.html',
  styleUrls: ['./survey-patient-form.component.css']
})
export class SurveyPatientFormComponent extends BaseComponent implements OnInit,AfterViewInit {

  @Input() action: string;
  @Input() data: PatientBean;

    public isFindPersonal: boolean = true;
    public isShowForm: boolean = false;
    public patientType : string ="0";
    public patienbean : PatientBean;
    public resetFind: number = 1;


  constructor(private http: Http,private changeRef: ChangeDetectorRef) {
    super();
   this.patienbean = new PatientBean();
   }

  ngOnInit() {
    this.onModalEvent();
  }

  ngAfterViewInit(){
    
  }

  onChoosePersonal(bean:any):void {
    this.patienbean = bean;
    this.isFindPersonal = false;
    this.isShowForm = true;
   
  }
  onBack(){
    this.patienbean = new PatientBean();
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
