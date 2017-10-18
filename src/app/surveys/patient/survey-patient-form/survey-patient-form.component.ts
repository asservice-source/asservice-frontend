import { Component, OnInit } from '@angular/core';
import { PersonBean } from '../../../beans/person.bean';

@Component({
  selector: 'app-survey-patient-form',
  templateUrl: './survey-patient-form.component.html',
  styleUrls: ['./survey-patient-form.component.css']
})
export class SurveyPatientFormComponent implements OnInit {

    public isFindPersonal: boolean = true;
    public personBean = new PersonBean();
    public isShowForm: boolean = false;

  constructor() { }

  ngOnInit() {
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
