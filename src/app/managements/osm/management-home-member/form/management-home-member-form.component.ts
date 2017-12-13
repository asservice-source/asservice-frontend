import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { Service_HomeMember } from '../../../../service/service-home-member';
import { SimpleValidateForm } from '../../../../utils.util';
import { Address } from '../../../../beans/address';


declare var $:any;
@Component({
  selector: 'app-management-home-member-form',
  templateUrl: './management-home-member-form.component.html',
  styleUrls: ['./management-home-member-form.component.css' ,'../../../../checkbox.css']
})
export class ManagementHomeMemberFormComponent extends BaseComponent implements OnInit {


  @Input() bean: PersonalBasicBean;
  @Input() action: string;
  @Input() address: Address;
  @Output() success: EventEmitter<any>;
  public api: Service_HomeMember;
  public inputValidate: InputValidateInfo;
  public isVerify: boolean = false;
  public isShowVerify: boolean = true;
  public modelBirthDate: any;
  public genderList: any = [];
  public prefixList: any = [];
  public raceList: any = [];
  public nationalityList: any = [];
  public religionList: any = [];
  public occupationList: any = [];
  public bloodTypeList: any = [];
  public rhGroupList: any = [];
  public educationList: any = [];
  public familyStatusList: any = [];
  public provinceList: any = [];
  public amphurList: any = [];
  public tumbolList: any = [];
  public oldCitizenId: string;
  public actionName: string;
  public msgError_CitizenId: string = '';
  public msgError_CitizenIdEmty: string = 'กรุณาใส่หมายเลขประชาชนเป็นตัวเลข 13 หลัก';
  public msgError_CitizenIdNoFormat: string = 'รูปแบบหมายเลขประชาชนไม่ถูกต้อง';

  constructor() { 
    super();
    this.bean = new PersonalBasicBean();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_HomeMember();
    this.success = new EventEmitter<any>();
    this.address = new Address();
    this.msgError_CitizenId = this.msgError_CitizenIdEmty;
  }

  ngOnInit() {
    this.bindModal();
    this.setupGender();
    this.setupDropdownList();
  }

  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
      _self.setupPrefix();
    });

  }
  setupPrefix(){
    let _self = this;
    _self.api.api_PrefixNameList(_self.bean.genderId, function (response) {
      _self.prefixList = response;
    });
  }

  setupDropdownList(){
    let _self = this;
    _self.api.api_RaceList(function(response){
      _self.raceList = response;
    });
    _self.api.api_NationalityList(function(response){
      _self.nationalityList = response;
    });
    _self.api.api_ReligionList(function(response){
      _self.religionList = response;
    });
    _self.api.api_OccupationList(function(response){
      _self.occupationList = response;
    });
    _self.api.api_BloodTypeList(function(response){
      _self.bloodTypeList = response;
      console.log(response);
    });
    _self.api.api_RHGroupList(function(response){
      _self.rhGroupList = response;
      console.log(response);
    });
    _self.api.api_EducationList(function(response){
      _self.educationList = response;
    });
    _self.api.api_FamilyStatusList(function(response){
      _self.familyStatusList = response;
    });

    this.setupProvince();
  }

  bindModal(){
    let _self = this;
    $('#modalForm').on('show.bs.modal', function(){
      console.log(">>>>>>");
      console.log(_self.action);
      // reset validate error class
      $('#is-guest-error').hide();
      _self.inputValidate = new InputValidateInfo();
      _self.msgError_CitizenId = _self.msgError_CitizenIdEmty;
      //---
      if(_self.action == _self.ass_action.ADD){
        _self.actionName = 'เพิ่ม';
        _self.isVerify = false;
        _self.modelBirthDate = null;
        // new Bean as set default empty value
        _self.bean = _self.api.map(_self.bean);
        _self.bean.occupationCode = '';//objMap.occupCode;
        //set default ไทย
        _self.bean.nationalityCode = '099';//objMap.nationCode;
        _self.bean.raceCode = '099';
        //---
      }else{
        _self.actionName = 'แก้ไข';
        _self.isVerify = true;
        _self.oldCitizenId = _self.bean.citizenId;
        _self.setDatePickerModel();
        _self.setupAmphur();
        _self.setupTumbol();
      }
      _self.strNullToEmpty(_self.bean);
      console.log(_self.bean);

    });
  }
  onGenderChange(){
    this.setupPrefix();
  }

  onChangeBirthDate(event: any){

  }
  onChangeProvince(){
    this.bean.amphurCode = '';
    this.bean.tumbolCode = '';
    this.amphurList = [];
    this.tumbolList = [];
    if(this.bean.provinceCode){
      this.setupAmphur();
    }
  }
  onChangeAmphur(){
    this.bean.tumbolCode = '';
    this.tumbolList = [];
    if(this.bean.amphurCode){
      this.setupTumbol();
    }
  }
  onIsGuest(){
    $('#is-guest-error').hide();
    if(this.bean.isGuest){
      this.bean.homeNo = '';
      this.bean.mooNo = '';
      this.bean.road = '';
      this.bean.tumbolCode = '';
      this.bean.amphurCode = '';
      this.bean.provinceCode = '';
    }
  }
  setupProvince(){
    let _self = this;
    _self.api.api_ProvinceList(function(response){
      _self.provinceList = response;
    });
  }
  setupAmphur(){
    let _self = this;
    _self.api.api_AmphurList(_self.bean.provinceCode, function(response){
      _self.amphurList = response;
    });
  }
  setupTumbol(){
    let _self = this;
    _self.api.api_TumbolList(_self.bean.amphurCode, function(response){
      _self.tumbolList = response;
    });
  }
  onVerifyCitizenId(){
    this.oldCitizenId = this.bean.citizenId;
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    if(this.isValidCitizenIdThailand(this.bean.citizenId)){
      this.inputValidate = new InputValidateInfo();
      let _self = this;
      _self.loading = true;
      this.api.api_PersonByCitizenId(this.bean.citizenId, function(response){
        _self.loading = false;
        if(response.status.toString().toUpperCase()=="SUCCESS"){
          if(response.response){
            let msg = 'หมายเลขประชาชน <b>'+ _self.bean.citizenId +'</b> มีข้อมูลในระบบแล้ว';
            msg += ' คุณต้องการแก้ไข ใช่หรือไม่?';
            _self.message_comfirm('', msg, function(result){
              if(result){
                // Change Action to EDIT
                _self.action = _self.ass_action.EDIT;
                _self.actionName = 'แก้ไข';
                _self.isVerify = true;
                let homeId = _self.bean.homeId;
                _self.bean = _self.strNullToEmpty(response.response);
                _self.bean.homeId = homeId;
                _self.bean.familyStatusId = '';
                _self.bean.isGuest = '';
                _self.setDatePickerModel();
                _self.oldCitizenId = _self.bean.citizenId;
                console.log(_self.bean);
              }else{
                _self.isVerify = false;
              }
            });
            
          }else{
            _self.isVerify = true;
          }
        }else{
          _self.message_error('', 'ไม่สามารถตรวจสอบข้อมูลได้');
        }
      });
    }else{
      if(!this.bean.citizenId || this.bean.citizenId.length!=13){
        this.msgError_CitizenId = this.msgError_CitizenIdEmty;
      }else{
        this.msgError_CitizenId = this.msgError_CitizenIdNoFormat;
      }
    }
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true; // validate input error form
    let simpValidate: SimpleValidateForm = new SimpleValidateForm();

    if(this.isValidCitizenIdThailand(this.bean.citizenId)){
      let birthDate = this.modelBirthDate && this.getStringDateForDatePickerModel(this.modelBirthDate.date);
      this.bean.birthDate = birthDate || '';
      let fildsCheck = ['citizenId', 'firstName', 'lastName', 'prefixCode', 'genderId', 'raceCode', 'nationCode', 'religionCode', 'bloodTypeId', 'rhGroupId', 'birthDate', 'educationCode', 'occupCode', 'familyStatusId', 'isGuest'];
      if(this.bean.isGuest){
        fildsCheck.push('homeNo','mooNo','tumbolCode','amphurCode','provinceCode');
      }else{
        // Home Address  Added to Personal Address 
        this.bean.homeNo = this.address.homeNo;
        this.bean.mooNo = this.address.mooNo;
        this.bean.road = this.address.road;
        this.bean.tumbolCode = this.address.tumbolCode;
        this.bean.amphurCode = this.address.amphurCode;
        this.bean.provinceCode = this.address.provinceCode;
      }
      console.log('>>> Bean Before Save <<<');
      console.log(this.bean);
      let objsEmpty: Array<string> = simpValidate.getObjectEmpty_byFilds(this.api.map(this.bean), fildsCheck);
      if(objsEmpty.indexOf('isGuest')>=0){
        $('#is-guest-error').show();
      }
      console.log(objsEmpty);
      if(objsEmpty.length<=0){
        let _self = this;
        _self.loading = true;
        this.api.api_PersonByCitizenId(_self.bean.citizenId, function(response){
          if(response.status.toString().toUpperCase()=="SUCCESS"){
            if(response.response && response.response.citizenId != _self.oldCitizenId){
              _self.loading = false;
              _self.message_error('', 'หมายเลขบัตรประจำตัว <b>'+ _self.bean.citizenId +'</b> ซ้ำ');
            }else{
              // Save To API
              _self.api.commit_save(_self.bean, function(response){
                _self.loading = false;   
                if(response && response.status.toString().toUpperCase()=='SUCCESS'){
                  $('#modalForm').modal('hide');
                  _self.message_success('',_self.actionName + ' สมาชิกใหม่เรียบร้อย', function(){
                    _self.success.emit({"success": true, "response": response});
                  });
                }else{
                  _self.message_error('','ไม่สามารถ'+_self.actionName+'ได้', function(){
                    _self.success.emit({"success": false, "response": response});
                  });
                }
              });

            }
          }else{
            _self.loading = false;
            _self.message_error('', 'ไม่สามารถตรวจสอบข้อมูลเลขประชาชนได้');
          }
    
        });

      }else{

      }
    }else{
      if(!this.bean.citizenId || this.bean.citizenId.length!=13){
        this.msgError_CitizenId = this.msgError_CitizenIdEmty;
      }else{
        this.msgError_CitizenId = this.msgError_CitizenIdNoFormat;
      }
    }
  }


  setDatePickerModel(){
    if(this.bean.birthDate){
      this.modelBirthDate = this.getCurrentDatePickerModel(this.bean.birthDate);
    }else{
      this.modelBirthDate = null;
    } 
}
}