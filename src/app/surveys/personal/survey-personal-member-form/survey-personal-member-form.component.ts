import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
declare var $;

@Component({
  selector: 'app-survey-personal-member-form',
  templateUrl: './survey-personal-member-form.component.html',
  styleUrls: ['./survey-personal-member-form.component.css', '../../../checkbox.css']
})
export class SurveyPersonalMemberFormComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  public member: PersonalMemberBean = new PersonalMemberBean();

  @Input() action: string;
  @Input() set triggerMember(paramMember: PersonalMemberBean) {
    let self = this;

    self.member = this.strNullToEmpty(paramMember);
    self.member.isGuest = self.member.isGuest.toString();
    if (self.member && self.member.birthDate) {
      self.modelBirthDate = self.getCurrentDatePickerModel(self.member.birthDate);
    } else {
      self.modelBirthDate = {};
    }
  }
  @Output() memberUpdated = new EventEmitter<PersonalMemberBean>();
  @Output() memberInserted = new EventEmitter<PersonalMemberBean>();

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
  public isDisablePersonData: boolean = true;

  public modelBirthDate: any;

  constructor() {
    super();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();

    // self.bindTypeArea();
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
        self.isDisablePersonData = false;
      } else {
        self.defaultValue();
        self.isDisabledActionAdd = false;
        self.isDisablePersonData = true;
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

  defaultValue() {
    this.member.isGuest = "false";
    this.member.isExists = "true";
    // this.member.raceCode = "099";
    // this.member.nationalityCode = "099";
    // this.member.religionCode = "01";
  }

  onChangeDate(event: IMyDateModel) {
    let self = this;

    // console.log(event);
    self.member.birthDate = self.getStringDateForDatePickerModel(event.date);
  }

  onClickVerify() {
    let self = this;

    let cid = self.member.citizenId;
    let personData: any;

    let URL_GET_PERSON_INFO: string = "person/person_by_citizenid";
    let params = { "citizenId": cid };

    self.apiHttp.post(URL_GET_PERSON_INFO, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d.response);
        personData = d.response;

        if (personData) {
          personData = self.strNullToEmpty(personData);
          self.member.prefixCode = personData.prefixCode;
          self.member.firstName = personData.firstName;
          self.member.lastName = personData.lastName;
          self.member.genderId = personData.genderId;
          self.member.raceCode = personData.raceCode;
          self.member.nationalityCode = personData.nationCode;
          self.member.religionCode = personData.religionCode;
          self.member.bloodTypeId = personData.bloodTypeID;
          self.member.rhGroupId = personData.rHGroupID;
          self.member.birthDate = personData.birthDate;
          self.modelBirthDate = self.getCurrentDatePickerModel(personData.birthDate);
          self.member.educationCode = personData.educationCode;
          self.member.occupationId = personData.occupCode;

          self.isDisablePersonData = false;
        }
      } else {
        console.log('survey-personal-member-form(onClickVerify) occured error(s) => ' + d.message);
      }
    });
  }

  onClickSave() {
    let self = this;

    self.member.listPrefix = self.listPrefix;
    self.member.listGender = self.listGender;
    self.member.listFamilyStatus = self.listFamilyStatus;
    self.memberUpdated.emit(self.member);
  }

}
