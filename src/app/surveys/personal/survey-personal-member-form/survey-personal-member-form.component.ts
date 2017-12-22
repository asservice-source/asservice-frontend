import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonBean } from "../../../beans/person.bean";
//import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { PersonalBasicBean } from "../../../beans/personal-basic.bean";
import { BaseComponent } from '../../../base-component';
import { Service_SurveyPersonal } from '../../../service/service-survey-personal';
import { InputValidateInfo } from '../../../directives/inputvalidate.directive';
import { SimpleValidateForm } from '../../../utils.util';
import { Address } from '../../../beans/address';
declare var $;

@Component({
  selector: 'app-survey-personal-member-form',
  templateUrl: './survey-personal-member-form.component.html',
  styleUrls: ['./survey-personal-member-form.component.css', '../../../checkbox.css']
})
export class SurveyPersonalMemberFormComponent extends BaseComponent implements OnInit {

  // private apiHttp: ApiHTTPService = new ApiHTTPService();
  private apiHttp: Service_SurveyPersonal = new Service_SurveyPersonal();
  public member: PersonalBasicBean = new PersonalBasicBean();

  @Input() action: string;
  @Input() set triggerMember(paramMember: PersonalBasicBean) {
    let self = this;

    self.member = self.strNullToEmpty(paramMember);
    self.bindPrefix(self.member.genderId);
    self.modelBirthDate = self.getDatePickerModel(self.member.birthDate);
  }
  @Input() address: Address;
  @Output() memberUpdated = new EventEmitter<PersonalBasicBean>();
  @Output() memberInserted = new EventEmitter<PersonalBasicBean>();

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

  public loading: boolean = false;
  
  constructor() {
    super();
    this.address = new Address();
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
      self.member.dischargeId = self.member.dischargeId || '9';
      if (self.action == self.ass_action.EDIT) {
        //self.member.isExists = true;
        self.toggleCitizenId(true);
        console.log(self.member);
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
  onIsGuest(){
    if(this.member.isGuest){
      this.member.homeNo = '';
      this.member.mooNo = '';
      this.member.road = '';
      this.member.tumbolCode = '';
      this.member.amphurCode = '';
      this.member.provinceCode = '';
    }
  }
  bindGender() {
    let self = this;
    self.apiHttp.api_GenderList(function (response) {
      self.listGender = response;
    });
  }

  bindPrefix(genderId) {
    let self = this;
    self.apiHttp.api_PrefixNameList(genderId, function (data) {
      self.listPrefix = data;
    });
  }

  bindRace() {
    let self = this;
    self.apiHttp.api_RaceList(function (data) {
      self.listRace = data;
    });
  }

  bindNationality() {
    let self = this;
    self.apiHttp.api_NationalityList(function (data) {
      self.listNationality = data;
    });
  }

  bindReligion() {
    let self = this;
    self.apiHttp.api_ReligionList(function (data) {
      self.listReligion = data;
    });
  }

  bindBloodType() {
    let self = this;
    self.apiHttp.api_BloodTypeList(function (data) {
      self.listBloodType = data;
    });
  }

  bindRHGroup() {
    let self = this;
    self.apiHttp.api_RHGroupList( function (data) {
      self.listRHGroup = data;
    });
  }
  bindEducation() {
    let self = this;
    self.apiHttp.api_EducationList(function (data) {
      self.listEducation = data;
    });
  }

  bindOccupation() {
    let self = this;
    self.apiHttp.api_OccupationList(function (data) {
      self.listOccupation = data;
    });
  }

  bindDischarge() {
    let self = this;
    self.apiHttp.api_DischargeList(function (data) {
      self.listDischarge = data;
    });
  }

  bindFamilyStatus() {
    let self = this;
    self.apiHttp.api_FamilyStatusList(function (data) {
      self.listFamilyStatus = data;
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
    self.apiHttp.api_AmphurList(provinceCode, function (resp) {
      self.listDistrict = resp;
    });
  }

  bindSubDistrict(districtCode) {
    let self = this;
    self.apiHttp.api_TumbolList(districtCode, function (resp) {
      self.listSubDistrict = resp;
    });
  }

  defaultValue() {
    let self = this;
    self.member.isGuest = false;
    self.member.isExists = true;
  }

  onChangeGender(element: any) {
    this.bindPrefix(this.member.genderId);
    this.member.prefixCode = "";
    let options = element.options;
    for(let option of options){
      if(option.value == element.value){
        this.member.genderName = option.text;
      }
    }
  }
  onChangePrefix(element: any){
    let options = element.options;
    for(let option of options){
      if(option.value == element.value){
        this.member.prefixName = option.text;
        console.log(this.member.prefixName);
      }
    }
  }
  onChangeFamilyStatus(element: any){
    let options = element.options;
    for(let option of options){
      if(option.value == element.value){
        this.member.familyStatusName = option.text;
      }
    }
  }
  onChangeBirthDate(event: IMyDateModel) {
    let self = this;
    self.member.birthDate = self.getStringDateForDatePickerModel(event.date);
  }

  onChangeProvince() {
    this.member.amphurCode = "";
    this.member.tumbolCode = "";
    this.bindProvince();
  }

  onChangeDistrict() {
    this.member.tumbolCode = "";
    this.bindSubDistrict(this.member.amphurCode);
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
    self.apiHttp.api_PersonByCitizenId(cid, function (d) {
      if (d && d.status.toUpperCase() == "SUCCESS") {
        personData = d.response;
        if (personData && personData.personId) {
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
              self.member.nationalityCode = personData.nationalityCode;
              self.member.religionCode = personData.religionCode;
              self.member.bloodTypeId = personData.bloodTypeID;
              self.member.rhGroupId = personData.rhGroupId;
              self.member.birthDate = personData.birthDate;
              self.modelBirthDate = self.getDatePickerModel(personData.birthDate);
              self.member.educationCode = personData.educationCode;
              self.member.occupationCode = personData.occupationCode;

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
        self.message_error('','ไม่สามารถตรวจสอบข้อมูลหมายเลขบัตรประชาชน <b>'+self.formatCitizenId(cid)+'</b> ได้');
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
    if(bean.isGuest){
      validateFields.push('homeNo','mooNo','tumbolCode','amphurCode','provinceCode');
    }else{
      // Home Address  Added to Personal Address 
      this.member.homeNo = this.address.homeNo;
      this.member.mooNo = this.address.mooNo;
      this.member.road = this.address.road;
      this.member.tumbolCode = this.address.tumbolCode;
      this.member.amphurCode = this.address.amphurCode;
      this.member.provinceCode = this.address.provinceCode;
    }

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
    if (!self.isValidClickSave(self.member)) {
      return;
    }

    self.loading = true;
    self.memberUpdated.emit(self.member);
    self.message_success('', 'แก้ไขข้อมูลบุคคล : ' + self.member.fullName);
    self.loading = false;
  }

}
