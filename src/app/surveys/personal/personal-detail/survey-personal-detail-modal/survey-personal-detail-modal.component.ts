import { Component, OnInit, Input } from '@angular/core';
import { PersonBean } from "../../../../beans/person.bean";
import { ApiHTTPService } from '../../../../service/api-http.service';
declare var $;

@Component({
  selector: 'app-survey-personal-detail-modal',
  templateUrl: './survey-personal-detail-modal.component.html',
  styleUrls: ['./survey-personal-detail-modal.component.css']
})
export class SurveyPersonalDetailModalComponent implements OnInit {

  @Input() set triggerCitizenId(paramCitizenId: string) {
    this.showModal(paramCitizenId);
  }

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private URL_PERSON_PROFILE: string = "";
  private personData: any;
  public person: PersonBean;

  constructor() {
    this.person = new PersonBean();
    this.person.guestType = "0";
  }

  ngOnInit() {

  }

  showModal(citizenId: string) {
    let self = this;
    if (citizenId) {
      // let params = { "hospitalCode": "" };
      // this.apiHttp.post(this.URL_PERSON_PROFILE, params, function (d) {
      //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
      //     self.listHomeData = d.list;
      //   }
      // })
      // if (self.personData) {
      this.person.citizenID = citizenId;
      // }
    }
  }

}
