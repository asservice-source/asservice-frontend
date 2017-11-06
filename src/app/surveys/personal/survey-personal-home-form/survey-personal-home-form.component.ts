import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { PersonalHomeBean } from '../../../beans/personal-home.bean';

@Component({
  selector: 'app-survey-personal-home-form',
  templateUrl: './survey-personal-home-form.component.html',
  styleUrls: ['./survey-personal-home-form.component.css']
})
export class SurveyPersonalHomeFormComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  public home: PersonalHomeBean = new PersonalHomeBean();

  @Input() action: string;
  @Input() set triggerHome(paramHome: PersonalHomeBean) {
    let self = this;

    self.home = this.strNullToEmpty(paramHome);
  }

  constructor() {
    super();
  }

  ngOnInit() {

  }

  onClickSave() {

  }

}
