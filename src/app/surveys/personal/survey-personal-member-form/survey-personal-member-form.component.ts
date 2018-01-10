import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { PersonBean } from "../../../beans/person.bean";
//import { PersonalMemberBean } from '../../../beans/personal-member.bean';
import { PersonalBasicBean } from "../../../beans/personal-basic.bean";
import { BaseComponent } from '../../../base-component';
import { Service_SurveyPersonal } from '../../../api-managements/service-survey-personal';
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
  public validateAddress: InputValidateInfo = new InputValidateInfo();
  public loading: boolean = false;
  public isBirthDate: boolean = false;
  public isDischargeDate: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.address = new Address();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
    self.bindGender();
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
      self.bindPrefix();
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
      self.validateAddress = new InputValidateInfo();
    });
  }
  
  bindGender() {
    let self = this;
    self.apiHttp.api_GenderList(function (response) {
      self.listGender = response;
    });
  }

  bindPrefix() {
    let self = this;
    self.apiHttp.api_PrefixNameList(self.memberBean.genderId, function (data) {
      self.listPrefix = data;
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
    this.bindPrefix();
    this.memberBean.prefixCode = "";
    this.listPrefix = [];

  }
  onChangePrefix(element: any){

  }
  onChangeFamilyStatus(element: any){

    if(this.memberBean.familyStatusId=='1'){
      this.memberBean.isGuest = false;
    }

    if(this.memberBean.familyStatusId=='1' && this.memberBean.isGuest){
      this.memberBean.isGuest = false;
      this.validateAddress = new InputValidateInfo();
    }

  }
  onChangeBirthDate(event: IMyDateModel) {
    //this.memberBean.birthDate = this.getStringDateForDatePickerModel(event.date);
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

  isValidClickSave():boolean {
    this.memberBean.birthDate = this.getStringDateForDatePickerModel(this.modelBirthDate.date);
    if(!this.isBirthDate){
      return false;
    }
    let self = this;
    self.validateSave = new InputValidateInfo();
    self.validateSave.isCheck = true;
    self.changeRef.detectChanges();
    let simpValidate = new SimpleValidateForm();
    let validateFields = ["genderId", "prefixCode", "firstName", "lastName", "birthDate", "raceCode", "nationalityCode", "religionCode"];
    if(this.memberBean.dischargeId!='9'){
      if(!this.isDischargeDate){
        return false;
      }
      this.memberBean.dischargeDate = this.modelDischargeDate?this.getStringDateForDatePickerModel(this.modelDischargeDate.date):'';
      validateFields.push('dischargeDate');
    }
    self.validateAddress = new InputValidateInfo();
    if(this.memberBean.isGuest){
      self.validateAddress.isCheck = true;
      self.changeRef.detectChanges();
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

    let errors = simpValidate.getObjectEmpty_byFilds(this.memberBean, validateFields);
    if (errors.length > 0) {
      console.log(errors);
      return false;

    } else {
      for(let item of this.listGender){
        if(this.memberBean.genderId==item.id){
          this.memberBean.genderName = item.name;
        }
      }
      for(let item of this.listPrefix){
        if(this.memberBean.prefixCode==item.code){
          this.memberBean.prefixName = item.name;
        }
      }
      for(let item of this.listFamilyStatus){
        if(this.memberBean.familyStatusId==item.id){
          this.memberBean.familyStatusName = item.name;
        }
      }
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
  validBirthDate(event: InputValidateInfo){
    this.isBirthDate =event.isPassed;
  }

  validDischargeDate(event: InputValidateInfo){
    this.isDischargeDate =event.isPassed;
  }
  onChangeGuest(){
    console.log(this.memberBean.isGuest)
    this.validateAddress = new InputValidateInfo();
    if(this.memberBean.isGuest && this.memberBean.familyStatusId=='1'){
      let msg = 'เมื่อเลือกประเภทการอยู่อาศัย เป็น "ไม่มีชื่อในสำเนาทะเบียนบ้าน แต่ตัวอยู่จริง"';
      msg += ' จะทำให้ สถานะความสัมพันธ์ เปลี่ยนเป็น "ผู้อยู่อาศัย" ทันที'
      msg += ' ต้องการทำต่อ ใช่หรือไม่ ?';
      let _self = this;
      _self.message_comfirm('',msg, function(isComfirm){
        if(isComfirm){
          _self.memberBean.familyStatusId = '2';
        }else{
          _self.memberBean.isGuest = false;
        }
        
      });
    }
  }
  onClickSave() {
    let self = this;
    if (!self.isValidClickSave()) {
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
    //$("#modalMember").modal('hide');
    
    
    
  }

}
