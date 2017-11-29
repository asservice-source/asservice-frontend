import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonBean } from "../../../beans/person.bean";
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { BaseComponent } from '../../../base-component';
import { Service_SurveyPersonal } from '../../../service/service-survey-personal';
import { InputValidateInfo } from '../../../directives/inputvalidate.directive';
import { SimpleValidateForm } from '../../../utils.util';
declare var $;

@Component({
  selector: 'app-survey-personal-member-form',
  templateUrl: './survey-personal-member-form.component.html',
  styleUrls: ['./survey-personal-member-form.component.css', '../../../checkbox.css']
})
export class SurveyPersonalMemberFormComponent extends BaseComponent implements OnInit {

  // private apiHttp: ApiHTTPService = new ApiHTTPService();
  private apiHttp: Service_SurveyPersonal = new Service_SurveyPersonal();
  public member: PersonalMemberBean = new PersonalMemberBean();

  @Input() action: string;
  @Input() set triggerMember(paramMember: PersonalMemberBean) {
    let self = this;

    self.member = self.strNullToEmpty(paramMember);
    self.bindPrefix(self.member.genderId);
    self.modelBirthDate = self.getDatePickerModel(self.member.birthDate);
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
  public listProvince: any = [];
  public listDistrict: any = [];
  public listSubDistrict: any = [];

  public isDisabledCitizenId: boolean = true;
  public isDisplayButtonVerifyCitizenId: boolean = true;
  public isDisplayButtonEditCitizenId: boolean = false;
  public isDisabledButtonSave: boolean = true;

  public isDisplayActionEdit: boolean = false;
  public isDisabledActionAdd: boolean = false;
  public isDisablePersonData: boolean = true;

  public modelBirthDate: any = null;

  public validateVerify: InputValidateInfo = new InputValidateInfo();
  public validateSave: InputValidateInfo = new InputValidateInfo();

  constructor() {
    super();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();

    self.bindPrefix("");
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
    self.bindProvince();
  }

  onModalEvent() {
    let self = this;

    $("#modalMember").on('show.bs.modal', function (e) {
      if (self.action == self.ass_action.EDIT) {
        self.member.isExists = true;

        self.toggleCitizenId(true);

        self.isDisplayActionEdit = true;
        self.isDisabledActionAdd = true;
        self.isDisablePersonData = false;

        if (!self.isEmpty(self.member.provinceCode)) {
          self.bindDistrict(self.member.provinceCode);
        }
        if (!self.isEmpty(self.member.amphurCode)) {
          self.bindSubDistrict(self.member.amphurCode);
        }
      } else {
        self.modelBirthDate = null;
        self.member.isGuest = false;
        self.member.isExists = true;

        self.toggleCitizenId(false);

        self.isDisplayActionEdit = false;
        self.isDisabledActionAdd = false;
        self.isDisablePersonData = true;
      }
      self.validateVerify = new InputValidateInfo();
      self.validateSave = new InputValidateInfo();

      if (!self.isEmpty(self.member.citizenId)) {
        self.isDisabledButtonSave = false;
      } else {
        self.isDisabledButtonSave = true;
      }
    });
  }

  bindPrefix(genderId) {
    let self = this;

    let URL_LIST_PREFIX: string = "person/prefix_list";
    let params = { "genderId": genderId };

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

  bindProvince() {
    let self = this;

    self.apiHttp.api_ProvinceList(function (d) {
      self.listProvince = d;
    });
  }

  bindDistrict(provinceCode) {
    let self = this;

    let params = { "provinceCode": provinceCode };
    self.apiHttp.post('address/amphur', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.listDistrict = resp.response;
      }
    });
  }

  bindSubDistrict(districtCode) {
    let self = this;

    let params = { "amphurCode": districtCode };
    self.apiHttp.post('address/tumbol', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.listSubDistrict = resp.response;
      }
    });
  }

  defaultValue() {
    let self = this;

    self.member.isGuest = false;
    self.member.isExists = true;
    // self.member.raceCode = "099";
    // self.member.nationalityCode = "099";
    // self.member.religionCode = "01";
  }

  onChangeGender() {
    let self = this;

    self.bindPrefix(self.member.genderId);

    self.member.prefixCode = "";
  }

  onChangeBirthDate(event: IMyDateModel) {
    let self = this;

    // console.log(event);
    self.member.birthDate = self.getStringDateForDatePickerModel(event.date);
  }

  onChangeProvince() {
    let self = this;

    let params = { "provinceCode": self.member.provinceCode };
    self.apiHttp.post('address/amphur', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.listDistrict = resp.response;
      }
    });

    self.member.amphurCode = "";
    self.member.tumbolCode = "";
  }

  onChangeDistrict() {
    let self = this;

    let params = { "amphurCode": self.member.amphurCode };
    self.apiHttp.post('address/tumbol', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.listSubDistrict = resp.response;
      }
    });

    self.member.tumbolCode = "";
  }

  onChangeSubDistrict() {

  }

  toggleCitizenId(flag: boolean) {
    let self = this;

    if (flag === true) {
      self.isDisabledCitizenId = true;
      self.isDisplayButtonVerifyCitizenId = false;
      self.isDisplayButtonEditCitizenId = true;
    } else {
      self.isDisabledCitizenId = false;
      self.isDisplayButtonVerifyCitizenId = true;
      self.isDisplayButtonEditCitizenId = false;
    }
  }

  clearPersonalData() {
    let self = this;

    self.member.personId = '';
    self.member.prefixCode = '';
    self.member.firstName = '';
    self.member.lastName = '';
    self.member.genderId = '';
    self.member.raceCode = '';
    self.member.nationalityCode = '';
    self.member.religionCode = '';
    self.member.bloodTypeId = '';
    self.member.rhGroupId = '';
    self.member.birthDate = '';
    self.modelBirthDate = null;
    self.member.educationCode = '';
    self.member.occupationCode = '';

    self.toggleCitizenId(true);
    self.isDisablePersonData = false;
  }

  isValidClickVerify(cid: any) {
    let self = this;

    self.validateVerify = new InputValidateInfo();
    self.validateVerify.isCheck = true;

    if (!self.isValidCitizenIdThailand(cid)) {
      return false;
    } else {
      return true;
    }
  }

  onClickVerifyCitizenId(): void {
    let self = this;

    self.validateVerify = new InputValidateInfo();

    let cid = self.member.citizenId;
    let personData: any;

    if (!self.isValidClickVerify(cid)) {
      self.isDisabledButtonSave = true;
      return;
    }

    let URL_GET_PERSON_INFO: string = "person/person_by_citizenid";
    let params = { "citizenId": cid };

    self.apiHttp.post(URL_GET_PERSON_INFO, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d.response);
        personData = d.response;

        if (personData) {
          self.message_comfirm('', 'หมายเลขประจำตัว "' + cid + '" มีข้อมูลแล้ว คุณต้องการดึงข้อมูลหรือไม่ ?', function (isConfirm) {
            if (isConfirm) {
              personData = self.strNullToEmpty(personData);
              self.member.personId = personData.personId;
              self.member.genderId = personData.genderId;
              self.bindPrefix(self.member.genderId);
              self.member.prefixCode = personData.prefixCode;
              self.member.firstName = personData.firstName;
              self.member.lastName = personData.lastName;
              self.member.raceCode = personData.raceCode;
              self.member.nationalityCode = personData.nationCode;
              self.member.religionCode = personData.religionCode;
              self.member.bloodTypeId = personData.bloodTypeID;
              self.member.rhGroupId = personData.rHGroupID;
              self.member.birthDate = personData.birthDate;
              self.modelBirthDate = self.getDatePickerModel(personData.birthDate);
              self.member.educationCode = personData.educationCode;
              self.member.occupationCode = personData.occupCode;

              self.toggleCitizenId(true);
              self.isDisablePersonData = false;
            }
          });
        } else {
          self.clearPersonalData();

          self.toggleCitizenId(true);
          self.isDisablePersonData = false;
        }
        self.isDisabledButtonSave = false;
      } else {
        console.log('survey-personal-member-form(onClickVerify) occured error(s) => ' + d.message);
      }
    });
  }

  onClickEditCitizenId() {
    let self = this;

    self.validateVerify = new InputValidateInfo();

    self.clearPersonalData();

    self.toggleCitizenId(false);
    self.isDisablePersonData = true;
    self.isDisabledButtonSave = true;
  }

  isValidClickSave(bean) {
    let self = this;

    let simpValidate = new SimpleValidateForm();
    let validateFields = ["genderId", "prefixCode", "firstName", "lastName", "birthDate", "raceCode", "nationalityCode", "religionCode", "bloodTypeId"];

    self.validateSave = new InputValidateInfo();
    self.validateSave.isCheck = true;

    let errors = simpValidate.getObjectEmpty_byFilds(bean, validateFields);
    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  onClickSave() {
    let self = this;

    // console.log(JSON.stringify(self.member));
    if (!self.isValidClickSave(self.member)) {
      return;
    }

    if (self.action == self.ass_action.ADD) {
      self.loading = true;
      self.apiHttp.commit_save(self.member, function (d) {
        // console.log(d);
        if (d != null && d.status.toUpperCase() == "SUCCESS") {
          self.member.personId = d.response.personId;
          self.member.listPrefix = self.listPrefix;
          self.member.listGender = self.listGender;
          self.member.listFamilyStatus = self.listFamilyStatus;
          self.memberUpdated.emit(self.member);
          self.message_success('', 'เพิ่มข้อมูลบุคคล : ' + self.member.fullName + ' สำเร็จ');
        } else {
          self.message_error('', 'เพิ่มข้อมูลบุคคล : ' + self.member.fullName + ' ไม่สำเร็จ');
        }
        self.loading = false;
      });
    } else {
      self.loading = true;
      self.member.listPrefix = self.listPrefix;
      self.member.listGender = self.listGender;
      self.member.listFamilyStatus = self.listFamilyStatus;
      self.memberUpdated.emit(self.member);
      self.message_success('', 'แก้ไขข้อมูลบุคคล : ' + self.member.fullName);
      self.loading = false;
    }
  }

}
