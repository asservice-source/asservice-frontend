import { Component, OnInit } from '@angular/core';
import { PersonBean } from '../../../beans/person.bean';

@Component({
  selector: 'app-survey-pregnant-form',
  templateUrl: './survey-pregnant-form.component.html',
  styleUrls: ['./survey-pregnant-form.component.css']
})
export class SurveyPregnantFormComponent implements OnInit {
  mStatusNo = 0;

  isDisable = false;
  isDisableBirth = true;
  isDisableAbort = true;
  public pregnantType: number = 0;
  public bornType: number = 0;

  public isFindPersonal: boolean = true;
  public personBean = new PersonBean();
  public isShowForm: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  changStatusNo() {
    if (this.mStatusNo > 0) {
      if (this.mStatusNo == 1) {
        this.isDisable = true;
        this.isDisableBirth = false;
        this.isDisableAbort = true;
      } else {
        this.isDisable = true;
        this.isDisableBirth = true;
        this.isDisableAbort = false;
      }
    } else {
      this.isDisableBirth = true;
      this.isDisable = false;
      this.isDisableAbort = true;
    }

  }

  // getCitizen(event: PersonBean){
  //   if(event.citizenID=='0'){
  //     this.isShowForm = false;
  //   }else{
  //     this.isShowForm = true;
  //   }
  //   this.personBean.citizenID = event.citizenID;
  //   console.log("content");
  // }

  // onChangeFind(event: PersonBean){
  //   if(event.citizenID=='0'){
  //     this.isShowForm = false;
  //   }else{
  //     this.isShowForm = true;
  //   }
  //   console.log(event);
  // }

  onChoosePersonal(personBean: PersonBean): void {
    this.personBean = personBean;
    console.log('noti Choose = ' + personBean.citizenId);
    this.isFindPersonal = false;
    this.isShowForm = true;

  }
  onBack() {
    this.isFindPersonal = true;
    this.isShowForm = false;
  }

}
