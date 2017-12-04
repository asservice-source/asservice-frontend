import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { Service_HomeMember } from '../../../../service/service-home-member';
import { SimpleValidateForm } from '../../../../utils.util';


declare var $:any;
@Component({
  selector: 'app-management-home-member-form',
  templateUrl: './management-home-member-form.component.html',
  styleUrls: ['./management-home-member-form.component.css']
})
export class ManagementHomeMemberFormComponent extends BaseComponent implements OnInit {


  @Input() bean: PersonalBasicBean;
  @Input() action: string;
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
  constructor() { 
    super();
    this.bean = new PersonalBasicBean();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_HomeMember();
    this.success = new EventEmitter<any>();
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
  }
  onGenderChange(){
    this.setupPrefix();
  }

  onChangeBirthDate(event: any){

  }

  bindModal(){
    let _self = this;
    $('#modalForm').on('show.bs.modal', function(){
      console.log(">>>>>>");
      console.log(_self.action);
      if(_self.action == _self.ass_action.ADD){
        _self.actionName = 'เพิ่ม';
        _self.isVerify = false;
        _self.modelBirthDate = null;
        //let homeId = _self.bean.homeId;
        _self.bean = _self.api.map(_self.bean);
        _self.bean.occupationCode = '';//objMap.occupCode;
        _self.bean.nationalityCode = '';//objMap.nationCode;
      }else{
        _self.actionName = 'แก้ไข';
        _self.isVerify = true;
        _self.oldCitizenId = _self.bean.citizenId;
        _self.setDatePickerModel();
      }
      _self.strNullToEmpty(_self.bean);
      console.log(_self.bean);

    });
  }

  onVerifyCitizenId(){
    this.oldCitizenId = this.bean.citizenId;
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    if(this.bean.citizenId){
      this.inputValidate = new InputValidateInfo();
      let _self = this;
      _self.loading = true;
      this.api.api_PersonByCitizenId(this.bean.citizenId, function(response){
        _self.loading = false;
        if(response.status.toString().toUpperCase()=="SUCCESS"){
          if(response.response){
            let msg = 'มีข้อมูลหมายเลขประชาชน <b>'+ _self.bean.citizenId +'</b> อยู่แล้ว คุณต้องการดึงข้อมูลมาแก้ไข ใช่หรือไม่?';
            _self.message_comfirm('', msg, function(result){
              if(result){
                _self.action = _self.ass_action.EDIT;
                _self.actionName = 'แก้ไข';
                _self.isVerify = true;
                _self.bean = _self.strNullToEmpty(response.response);
                _self.bean.familyStatusId='';
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
    }
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpValidate: SimpleValidateForm = new SimpleValidateForm();
    this.bean.birthDate = this.getStringDateForDatePickerModel(this.modelBirthDate.date);
    let fildsCheck = ['citizenId', 'firstName', 'lastName', 'prefixCode', 'genderId', 'raceCode', 'nationCode', 'religionCode', 'bloodTypeId', 'rhGroupId', 'birthDate', 'educationCode', 'occupCode', 'familyStatusId', 'isGuest'];
    let objsEmpty = simpValidate.getObjectEmpty_byFilds(this.api.map(this.bean), fildsCheck);
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
  }


  setDatePickerModel(){
    if(this.bean.birthDate){
      this.modelBirthDate = this.getCurrentDatePickerModel(this.bean.birthDate);
    }else{
      this.modelBirthDate = null;
    } 
}
}