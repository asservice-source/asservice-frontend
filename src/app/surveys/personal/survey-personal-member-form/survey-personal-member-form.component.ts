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

  @Input() action: string;
  @Input() memberBean: PersonalBasicBean;
  @Input() address: Address;
  @Output() memberUpdated = new EventEmitter<PersonalBasicBean>();

  private apiHttp: Service_SurveyPersonal = new Service_SurveyPersonal();
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
  public modelBirthDate: any = null;
  public modelDischargeDate: any = null;
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
      console.log(self.memberBean);
      self.memberBean.dischargeId = self.memberBean.dischargeId || '9';
      self.memberBean = self.strNullToEmpty(self.memberBean);
      self.bindPrefix(self.memberBean.genderId);
      self.modelBirthDate = self.getDatePickerModel(self.memberBean.birthDate);
      self.modelDischargeDate = self.getDatePickerModel(self.memberBean.dischargeDate);
      if(self.memberBean.isGuest){
        if (!self.isEmpty(self.memberBean.provinceCode)) {
          self.bindDistrict();
        }
        if (!self.isEmpty(self.memberBean.amphurCode)) {
          self.bindSubDistrict();
        }
      }else{
        self.isGuestClearAddress();
      }
      
      self.validateVerify = new InputValidateInfo();
      self.validateSave = new InputValidateInfo();
    });
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

  bindDistrict() {
    let self = this;
    self.apiHttp.api_AmphurList(self.memberBean.provinceCode, function (resp) {
      self.listDistrict = resp;
    });
  }

  bindSubDistrict() {
    let self = this;
    self.apiHttp.api_TumbolList(self.memberBean.amphurCode, function (resp) {
      self.listSubDistrict = resp;
    });
  }

  defaultValue() {
    let self = this;
    self.memberBean.isGuest = false;
    self.memberBean.isExists = true;
  }

  onChangeGender(element: any) {
    this.bindPrefix(this.memberBean.genderId);
    this.memberBean.prefixCode = "";
    let options = element.options;
    for(let option of options){
      if(option.value == element.value){
        this.memberBean.genderName = option.text;
      }
    }
  }
  onChangePrefix(element: any){
    let options = element.options;
    for(let option of options){
      if(option.value == element.value){
        this.memberBean.prefixName = option.text;
        console.log(this.memberBean.prefixName);
      }
    }
  }
  onChangeFamilyStatus(element: any){
    let options = element.options;
    for(let option of options){
      if(option.value == element.value){
        this.memberBean.familyStatusName = option.text;
      }
    }
  }
  onChangeBirthDate(event: IMyDateModel) {
    let self = this;
    self.memberBean.birthDate = self.getStringDateForDatePickerModel(event.date);
  }

  onChangeProvince() {
    this.memberBean.amphurCode = "";
    this.memberBean.tumbolCode = "";
    this.bindDistrict();
  }

  onChangeDistrict() {
    this.memberBean.tumbolCode = "";
    this.bindSubDistrict();
  }

  onChangeSubDistrict() {

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

  // onClickVerifyCitizenId(): void {
  //   let self = this;
  //   self.validateVerify = new InputValidateInfo();
  //   let cid = self.memberBean.citizenId;
  //   let personData: any;
  //   self.apiHttp.api_PersonByCitizenId(cid, function (d) {
  //     if (d && d.status.toUpperCase() == "SUCCESS") {
  //       personData = d.response;
  //       if (personData && personData.personId) {
  //         self.message_comfirm('', 'หมายเลขประจำตัว "' + cid + '" มีข้อมูลแล้ว คุณต้องการดึงข้อมูลหรือไม่ ?', function (isConfirm) {
  //           if (isConfirm) {
  //             personData = self.strNullToEmpty(personData);
  //             self.memberBean.personId = personData.personId;
  //             self.memberBean.genderId = personData.genderId;
  //             self.bindPrefix(self.memberBean.genderId);
  //             self.memberBean.prefixCode = personData.prefixCode;
  //             self.memberBean.firstName = personData.firstName;
  //             self.memberBean.lastName = personData.lastName;
  //             self.memberBean.raceCode = personData.raceCode;
  //             self.memberBean.nationalityCode = personData.nationalityCode;
  //             self.memberBean.religionCode = personData.religionCode;
  //             self.memberBean.bloodTypeId = personData.bloodTypeID;
  //             self.memberBean.rhGroupId = personData.rhGroupId;
  //             self.memberBean.birthDate = personData.birthDate;
  //             self.modelBirthDate = self.getDatePickerModel(personData.birthDate);
  //             self.memberBean.educationCode = personData.educationCode;
  //             self.memberBean.occupationCode = personData.occupationCode;

  //           }
  //         });
  //       }
       
  //     } else {
  //       self.message_error('','ไม่สามารถตรวจสอบข้อมูลหมายเลขบัตรประชาชน <b>'+self.formatCitizenId(cid)+'</b> ได้');
  //     }
  //   });
  // }


  isValidClickSave(bean: PersonalBasicBean) {
    let self = this;

    let simpValidate = new SimpleValidateForm();

    let validateFields = ["genderId", "prefixCode", "firstName", "lastName", "birthDate", "raceCode", "nationalityCode", "religionCode", "bloodTypeId"];
    if(bean.dischargeId!='9'){
      validateFields.push('dischargeDate');
    }
    if(bean.isGuest){
      validateFields.push('homeNo','mooNo','tumbolCode','amphurCode','provinceCode');
    }else{
      // Home Address  Added to Personal Address 
      this.memberBean.homeNo = this.address.homeNo;
      this.memberBean.mooNo = this.address.mooNo;
      this.memberBean.road = this.address.road;
      this.memberBean.tumbolCode = this.address.tumbolCode;
      this.memberBean.amphurCode = this.address.amphurCode;
      this.memberBean.provinceCode = this.address.provinceCode;
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
  isGuestClearAddress(){
    this.memberBean.homeNo = '';
    this.memberBean.mooNo = '';
    this.memberBean.road = '';
    this.memberBean.tumbolCode = '';
    this.memberBean.amphurCode = '';
    this.memberBean.provinceCode = '';
  }
  onClickSave() {
    let self = this;
    if (!self.isValidClickSave(self.memberBean)) {
      return;
    } 
    
    // self.loading = true;
    // let citizenId = self.reverseFormatCitizenId(self.memberBean.citizenId);
    // self.apiHttp.api_PersonByCitizenId(citizenId, function (d) {
    //   self.loading = false;
    //   if (d && d.status.toUpperCase() == "SUCCESS") {
    //     let personData = d.response;
    //     if (personData && personData.personId) {
    //       self.message_error('', 'หมายเลขประชาชน <b>' + self.memberBean.citizenId + '</b> ซ้ำ');
    //     }else{
    //       self.memberUpdated.emit(self.memberBean);
    //       self.message_success('', 'แก้ไขข้อมูลบุคคล <b>' + self.memberBean.fullName + '</b> เรียบร้อย');
    //     }
    //   }else{
    //       self.message_error('', 'ไม่สามารถตรวจสอบหมายเลขประชาชนได้');
    //   }
    // });
    self.memberBean.citizenId = self.reverseFormatCitizenId(self.memberBean.citizenId)
    self.memberUpdated.emit(self.memberBean);
    $("#modalMember").modal('hide');
    self.message_success('', 'แก้ไขข้อมูลบุคคล <b>' + self.memberBean.fullName + '</b> เรียบร้อย');
    
    
  }

}
