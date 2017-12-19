import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { StaffUserBean } from '../../../../beans/staff-user.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { Service_UserStaffAndOSM } from '../../../../service/service-user-staff-osm';
import { SimpleValidateForm } from '../../../../utils.util';
declare var $:any;

@Component({
  selector: 'app-management-staff-user-form',
  templateUrl: './management-staff-user-form.component.html',
  styleUrls: ['./management-staff-user-form.component.css']
})
export class ManagementStaffUserFormComponent extends BaseComponent implements OnInit {

  @Input() bean: StaffUserBean;
  @Input() action: string;
  @Input() isStaff: boolean;
  @Output() success: EventEmitter<any>; 
  public api: Service_UserStaffAndOSM;
  public prefixList: any = [{}];
  public villageList: any;
  public genderList: any;
  public inputValidate: InputValidateInfo = new InputValidateInfo();
  public isVerify: boolean = false;
  public mBirthDate: any;
  public oldCitizenId: string;
  public actionName: string;
  public msgError_CitizenId: string = '';
  public msgError_CitizenIdEmty: string = 'กรุณาใส่หมายเลขประชาชนเป็นตัวเลข 13 หลัก';
  public msgError_CitizenIdNoFormat: string = 'รูปแบบหมายเลขประชาชนไม่ถูกต้อง';
  public loading: boolean = false;
  constructor() { 
    super();
    this.bean = new StaffUserBean();
    this.api = new Service_UserStaffAndOSM();
    this.success = new EventEmitter<any>(); 
    this.msgError_CitizenId = this.msgError_CitizenIdEmty;
  }

  ngOnInit() {
    this.setupGender();
    this.setupVillage();
    this.bindModalForm();
  }
  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
      _self.setupPrefix();
    });

  }
  setupPrefix(){
    this.bean.prefixCode="";
    let _self = this;
    _self.api.api_PrefixNameList(_self.bean.genderId, function (response) {
      _self.prefixList = response;
    });
  }
  setupVillage(){
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      _self.villageList = list;
     
    });
  }
  
  bindModalForm(){
    let _self = this;
    $('#modalForm').on('hidden.bs.modal', function(){
      _self.inputValidate = new InputValidateInfo();
      _self.msgError_CitizenId = _self.msgError_CitizenIdEmty;
    });
    $('#modalForm').on('show.bs.modal', function(){
      console.log(_self.bean);
      if(_self.bean.personId){
        _self.action = _self.ass_action.EDIT;
        _self.oldCitizenId = _self.bean.citizenId;
        _self.isVerify = true;
      }else{
        _self.action = _self.ass_action.ADD;
        _self.isVerify = false;
      }
      
      _self.setDatePickerModel();

    });
  }
  onGenderChange(){
    this.setupPrefix();
  }
  onClickVerifyCitizenId(){
    this.oldCitizenId = this.bean.citizenId;
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    if(this.isValidCitizenIdThailand(this.bean.citizenId)){
    //if(this.bean.citizenId){
      this.inputValidate = new InputValidateInfo();
      let _self = this;
      _self.loading = true;
      this.api.api_PersonByCitizenId(this.bean.citizenId, function(resp){
        _self.loading = false;
        if(resp.status.toUpperCase()=="SUCCESS"){
          let person = resp.response;
          if(person && person.personId){
           
            let msg = 'หมายเลขประชาชน <b>'+ _self.bean.citizenId +'</b> มีข้อมูลในระบบแล้ว';
            if(person.isDead){
             
              msg += ' แต่ไม่มีสิทธิ์แก้ไขข้อมูลได้';
              msg += '<br>เนื่องจากสถานะบุคคลไม่สามารถดำเนินการได้';
              _self.message_error('', msg);
              _self.isVerify = false;
            }else{
              
              let userRoleId = +(person.userRoleId);
              let code5 = person.hospitalCode5;
              let isNotChange = false;
   
              if(_self.isStaff){
               if(code5 != _self.getHospitalCode() && (userRoleId != 0)){
                 isNotChange = true;
               }else{
                 isNotChange = false;
               }
              }else{
                 if(code5 != _self.getHospitalCode() || userRoleId == 2 || userRoleId == 3){
                   isNotChange = true;
                 }else{
                   isNotChange = false;
                 }
              }
   
              if(isNotChange){
               
               msg += ' แต่ไม่มีสิทธิ์แก้ไขข้อมูลได้';
               msg += '<br>เนื่องจากลงทะเบียนในระบบเรียบร้อยแล้ว';
               _self.message_error('', msg);
   
              }else{
              
               msg += ' คุณต้องการแก้ไข ใช่หรือไม่?';
               _self.message_comfirm('', msg, function(result){
                 if(result){
                   _self.action = _self.ass_action.EDIT;
                   _self.isVerify = true;
                   _self.bean = person;
                   _self.bean.isActive = true;
                   _self.setDatePickerModel();
                   _self.oldCitizenId = _self.bean.citizenId;
                   console.log(_self.bean);
                 }else{
                   _self.isVerify = false;
                 }
   
               });
              }
            }
           

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
  onClickEditCitizenId(){

  }
  onSave(){
    this.bean.birthDate = this.getStringDateForDatePickerModel(this.mBirthDate.date);
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let valid = new SimpleValidateForm();
    this.bean.hospitalCode5 = this.getHospitalCode();
    let roleName = "";
    let fullName = this.getFullName('', this.bean.firstName, this.bean.lastName);
    if(this.isStaff){
      this.bean.villageId = '';
      this.bean.roleId ='3';
      roleName = "รพ.สต."
    }else{
      this.bean.roleId = '5';
      roleName = "อสม."
    }

    this.actionName = this.action==this.ass_action.ADD?'เพิ่ม':'แก้ไข';
    
    if(this.isValidCitizenIdThailand(this.bean.citizenId)){
    //if(true){
      let ignores = this.action==this.ass_action.ADD?['personId']:[];
      if(this.isStaff){
        ignores.push('villageId');
      }
      let arr = valid.getObjectEmpty(this.api.map(this.isStaff,this.bean),ignores);
      console.log(arr);
      if(arr.length<=0){
        let _self = this;
        _self.loading = true;

        this.api.api_PersonByCitizenId(_self.bean.citizenId, function(response){
          if(response.status.toString().toUpperCase()=="SUCCESS"){
            if(response.response && response.response.citizenId != _self.oldCitizenId){
              _self.loading = false;
              _self.message_error('', 'หมายเลขบัตรประจำตัว <b>'+ _self.bean.citizenId +'</b> ซ้ำ');
            }else{
              // Save To API
              _self.api.commit_save(_self.isStaff ,_self.bean, function(response){
                _self.loading = false;
                if(response && response.status.toString().toUpperCase()=='SUCCESS'){
                  $('#modalForm').modal('hide');
                  _self.success.emit({"success": true, message: _self.actionName+'เจ้าหน้าที่ ' + roleName + ' ' + fullName + ' เรียบร้อย'});

                }else{
                  
                  _self.success.emit({"success": false, message: 'ไม่สามารถ'+_self.actionName+'เจ้าหน้าที่ '+ roleName + ' ' + fullName + ' ได้'});
                  
                }
              });

            }
          }else{
            _self.loading = false;
            _self.message_error('', 'ไม่สามารถตรวจสอบข้อมูลเลขประชาชนได้');
          }
    
        });
      }else{
        // Invalidate
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
        this.mBirthDate = this.getCurrentDatePickerModel(this.bean.birthDate);
      }else{
        this.mBirthDate = "";
      } 
  }
}
