import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
declare var $;

@Component({
  selector: 'app-survey-personal-member-form',
  templateUrl: './survey-personal-member-form.component.html',
  styleUrls: ['./survey-personal-member-form.component.css']
})
export class SurveyPersonalMemberFormComponent extends BaseComponent implements OnInit {

  @Input() action: string;
  @Input() set triggerMember(paramMember: PersonalMemberBean) {
    this.member = this.strNullToEmpty(paramMember);
  }
  @Output() memberUpdated = new EventEmitter<PersonalMemberBean>();
  @Output() memberInserted = new EventEmitter<PersonalMemberBean>();

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  public member: PersonalMemberBean = new PersonalMemberBean();

  public listTypeArea: any = [];
  public listPrefix: any = [];
  public listGender: any = [];
  public listRace: any = [];
  public listNationality: any = [];
  public listReligion: any = [];
  public listBloodType: any = [];
  public listRHGroup: any = [];
  public listEducation: any = [];
  public listOccupation: any = [];
  public listDischarge: any = [];
  public listFamilyStatus: any = [];

  public isDisabledActionAdd: boolean = false;
  public isDisplayOccupationOthers = false;

  constructor() {
    super();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();

    self.bindTypeArea();
    self.bindPrefix();
    self.bindGender();
    self.bindRace();
    self.bindNationality();
    self.bindReligion();
    self.bindBloodType();
    self.bindRHGroup();
    self.bindEducation();
    self.bindOccupation();
    self.bindDischarge();
    self.bindFamilyStatus();
  }

  onModalEvent() {
    let self = this;

    $("#modalMember").on('show.bs.modal', function (e) {
      if (self.action == self.ass_action.EDIT) {
        self.isDisabledActionAdd = true;
      } else {
        self.isDisabledActionAdd = false;
      }
    });
  }

  bindTypeArea() {
    let self = this;

    let URL_LIST_TYPE_AREA: string = "person/type_area_list";
    let params = {};

    self.apiHttp.post(URL_LIST_TYPE_AREA, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listTypeArea = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindTypeArea) occured error(s) => ' + d.message);
      }
    });
  }

  bindPrefix() {
    let self = this;

    let URL_LIST_PREFIX: string = "person/prefix_list";
    let params = {};

    self.apiHttp.post(URL_LIST_PREFIX, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listPrefix = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindPrefix) occured error(s) => ' + d.message);
      }
    });
  }

  bindGender() {
    let self = this;

    let URL_LIST_GENDER: string = "person/gender_list";
    let params = {};

    self.apiHttp.post(URL_LIST_GENDER, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listGender = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindGender) occured error(s) => ' + d.message);
      }
    });
  }

  bindRace() {
    let self = this;

    let URL_LIST_RACE: string = "person/race_list";
    let params = {};

    self.apiHttp.post(URL_LIST_RACE, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listRace = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindRace) occured error(s) => ' + d.message);
      }
    });
  }

  bindNationality() {
    let self = this;

    let URL_LIST_NATIONALITY: string = "person/nationality_list";
    let params = {};

    self.apiHttp.post(URL_LIST_NATIONALITY, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listNationality = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindNationality) occured error(s) => ' + d.message);
      }
    });
  }

  bindReligion() {
    let self = this;

    let URL_LIST_RELIGION: string = "person/religion_list";
    let params = {};

    self.apiHttp.post(URL_LIST_RELIGION, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listReligion = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindReligion) occured error(s) => ' + d.message);
      }
    });
  }

  bindBloodType() {
    let self = this;

    let URL_LIST_BLOOD_TYPE: string = "person/blood_type_list";
    let params = {};

    self.apiHttp.post(URL_LIST_BLOOD_TYPE, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listBloodType = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindBloodType) occured error(s) => ' + d.message);
      }
    });
  }

  bindRHGroup() {
    let self = this;

    let URL_LIST_RH_GROUP: string = "person/rhgroup_list";
    let params = {};

    self.apiHttp.post(URL_LIST_RH_GROUP, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listRHGroup = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindRHGroup) occured error(s) => ' + d.message);
      }
    });
  }

  bindEducation() {
    let self = this;

    let URL_LIST_EDUCATION: string = "person/education_list";
    let params = {};

    self.apiHttp.post(URL_LIST_EDUCATION, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listEducation = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindEducation) occured error(s) => ' + d.message);
      }
    });
  }

  bindOccupation() {
    let self = this;

    let URL_LIST_OCCUPATION: string = "person/occupation_list";
    let params = {};

    self.apiHttp.post(URL_LIST_OCCUPATION, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listOccupation = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindOccupation) occured error(s) => ' + d.message);
      }
    });
  }

  onChangeOccupation() {
    let self = this;
    if (self.member.occupationId == "010") {
      self.isDisplayOccupationOthers = true;
    } else {
      self.isDisplayOccupationOthers = false;
    }
  }

  bindDischarge() {
    let self = this;

    let URL_LIST_DISCHARGE: string = "person/discharge_list";
    let params = {};

    self.apiHttp.post(URL_LIST_DISCHARGE, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listDischarge = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindDischarge) occured error(s) => ' + d.message);
      }
    });
  }

  bindFamilyStatus() {
    let self = this;

    let URL_LIST_FAMILY_STATUS: string = "home/family_status_list";
    let params = {};

    self.apiHttp.post(URL_LIST_FAMILY_STATUS, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listFamilyStatus = d.response;
      } else {
        console.log('survey-personal-member-member-form(bindFamilyStatus) occured error(s) => ' + d.message);
      }
    });
  }

  clickSave() {
    let self = this;

    self.member.listPrefix = this.listPrefix;
    self.member.listGender = this.listGender;
    self.member.listFamilyStatus = this.listFamilyStatus;
    self.memberUpdated.emit(this.member);
  }

}
