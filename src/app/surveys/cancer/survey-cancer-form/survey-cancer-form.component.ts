import { Component, OnInit, Input } from '@angular/core';
import { CancerBean } from '../../../beans/cancer.bean';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';

@Component({
  selector: 'app-survey-cancer-form',
  templateUrl: './survey-cancer-form.component.html',
  styleUrls: ['./survey-cancer-form.component.css']
})
export class SurveyCancerFormComponent extends BaseComponent implements OnInit {

  public member: PersonalMemberBean = new PersonalMemberBean();

  @Input() set triggerCancer(paramCancer: CancerBean) {
    // this.showModal(paramsPerson);
  }

  constructor() {
    super();
  }

  ngOnInit() {

  }

  showModal() {
    let self = this;
  }

  onChangeDate(event: IMyDateModel) {
    let self = this;

    // console.log(event);
    self.member.birthDate = self.getStringDateForDatePickerModel(event.date);
  }
}
