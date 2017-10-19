import { Component, OnInit, Input } from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
declare var $;

@Component({
  selector: 'app-survey-personal-member-form',
  templateUrl: './survey-personal-member-form.component.html',
  styleUrls: ['./survey-personal-member-form.component.css']
})
export class SurveyPersonalMemberFormComponent implements OnInit {

  @Input() set triggerPerson(paramsPerson: PersonBean) {
    this.showModal(paramsPerson);
  }

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private personData: any;
  public person: PersonBean;

  constructor() {
    this.person = new PersonBean();
  }

  ngOnInit() {
    let self = this;

    self.bindGuestType();
    self.bindPrefix();
    self.bindGender();
    self.bindRace();
    self.bindNationality();
    self.bindReligion();
    self.bindBloodType();
    self.bindRHGroup();
    self.bindEducation();
    self.bindOccupation();
  }

  showModal(ps: PersonBean) {
    let self = this;
    if (ps) {
      this.person = ps;
    }
  }

  bindGuestType(){

  }

  bindPrefix(){
    
  }

  bindGender(){

  }

  bindRace(){

  }

  bindNationality(){

  }

  bindReligion(){

  }

  bindBloodType(){

  }

  bindRHGroup(){

  }

  bindEducation(){

  }

  bindOccupation(){

  }

}
