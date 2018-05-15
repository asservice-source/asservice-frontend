import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { StaffUserBean } from '../../../../beans/staff-user.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { Service_UserStaffAndOSM } from '../../../../api-managements/service-user-staff-osm';
import { SimpleValidateForm, RefreshChange } from '../../../../utils.util';
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
  public inputValidateBirthDate: InputValidateInfo = new InputValidateInfo();
  public isVerify: boolean = false;
  public mBirthDate: any;
  public oldCitizenId: string;
  public actionName: string;
  public msgError_CitizenId: string = '';
  public msgError_CitizenIdEmty: string = 'กรุณาใส่หมายเลขประชาชนเป็นตัวเลข 13 หลัก';
  public msgError_CitizenIdNoFormat: string = 'รูปแบบหมายเลขประชาชนไม่ถูกต้อง';
  public msgError_BirthDate: string  = 'กรุณาเลือก วัน/เดือน/ปี เกิด';
  public loading: boolean = false;
  public refreshChange: RefreshChange;
  public isDisabledVillage: boolean;
  public prefixName: string;
  constructor(private changeRef: ChangeDetectorRef) { 
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
    this.api.api_GenderList((response)=>{
      this.genderList = response;
      this.setupPrefix();
    });

  }
  setupPrefix(){
    console.log('setupPrefix', this.bean.prefixCode);
    //this.bean.prefixCode="";
    this.prefixList = [];
    if(this.bean.genderId){
      console.log('setupPrefix 1');
      this.api.api_PrefixNameList(this.bean.genderId,  (response) => {
        console.log('setupPrefix 2');
        for(let item of response){
          if(item.code == '001' || item.code == '002'){
            continue; // ไม่เอา เด็กชาย เด็กหญิง
          }
          console.log('setupPrefix LLL');
          this.prefixList.push(item);
        }

      });
    }
    
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

      _self.msgError_BirthDate = 'กรุณาเลือก วัน/เดือน/ปี เกิด';
      if(_self.bean.personId){
        _self.action = _self.ass_action.EDIT;
        _self.oldCitizenId = _self.bean.citizenId;
        _self.setupPrefix();
        _self.prefixName = _self.bean.prefixName;
        _self.isVerify = true;
        if(_self.bean.homeId || (_self.bean.userId && (_self.bean.activateHome || _self.bean.homeId))){
          _self.isDisabledVillage = true;
        }else{
          _self.isDisabledVillage = false;
        }
        
      }else{
        _self.action = _self.ass_action.ADD;
        _self.isVerify = false;
        _self.isDisabledVillage = false;
      }
      _self.setDatePickerModel();

    });
  }
  onGenderChange(){
    this.bean.prefixCode = "";
    this.setupPrefix();
  }
  onPrefixChange(element: any){
    console.log(element);
    for(let item of element.options){
      if(item.value==this.bean.prefixCode){
        console.log(item.text);
        this.prefixName = item.text
      }
    }
  }
  onClickVerifyCitizenId(){
    this.bean.citizenId = this.pastCitizenId(this.bean.citizenId);
    this.oldCitizenId = this.bean.citizenId;
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    console.log(this.bean);
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
           
            let msg = 'หมายเลขประชาชน <b>'+ _self.formatCitizenId(_self.bean.citizenId) +'</b> มีข้อมูลในระบบแล้ว';
            if(person.isDead){
             
              msg += ' แต่ไม่มีสิทธิ์แก้ไขข้อมูลได้';
              msg += '<br>เนื่องจากสถานะบุคคลไม่สามารถดำเนินการได้';
              _self.message_error('', msg);
              _self.isVerify = false;
            }else{
              
              let userRoleId = +(person.userRoleId) || 0;
              let code5 = person.hospitalCode5;
              let isNotChange = false;
              if(!code5){
                console.log('>>>> NOT 1');
                  isNotChange = false;

              } else if(_self.isStaff){
                if(code5 != _self.getHospitalCode() && (userRoleId != 0)){
                  console.log('>>>> S1');
                  isNotChange = true;
                }else{
                  console.log('>>>> S2');
                  isNotChange = false;
               }

              }else{
                if(code5 != _self.getHospitalCode() || userRoleId == 3){
                  
                  console.log('>>>> X1');
                  console.log(code5 +  ' <<<>>> ' + _self.getHospitalCode());
                  isNotChange = true;
                }else{
                  console.log('>>>> X2');
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
                   _self.bean.isActive = person.isActive==undefined?true:person.isActive;
                   _self.setDatePickerModel();
                   _self.setupPrefix();
                   _self.oldCitizenId = _self.bean.citizenId;

                   if(_self.bean.activateHome || _self.bean.homeId){
                    _self.isDisabledVillage = true;
                  }else{
                    _self.isDisabledVillage = false;
                  }

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
  onSave(): any{
    this.bean.birthDate = this.getStringDateForDatePickerModel(this.mBirthDate.date);
    this.inputValidate = new InputValidateInfo();
    this.inputValidateBirthDate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    this.inputValidateBirthDate.isCheck = true;
    let valid = new SimpleValidateForm();
    this.bean.hospitalCode5 = this.getHospitalCode();
    let roleName = "";
    //let fullName = this.getFullName('', this.bean.firstName, this.bean.lastName);
    if(this.isStaff){
      this.bean.villageId = '';
      this.bean.roleId ='3';
      roleName = "รพ.สต."
    }else{
      this.bean.roleId = '5';
      roleName = "อสม."
    }

    this.actionName = this.action==this.ass_action.ADD?'เพิ่ม':'แก้ไข';
    this.bean.citizenId = this.pastCitizenId(this.bean.citizenId);
    if(this.isValidCitizenIdThailand(this.bean.citizenId)){
    //if(true){
      let ignores = this.action==this.ass_action.ADD?['personId']:[];
      if(this.isStaff){
        ignores.push('villageId');
      }
      let arr = valid.getObjectEmpty(this.api.map(this.isStaff,this.bean),ignores);
      if(arr.length<=0){
        let _self = this;
        if(_self.getYearDiff(_self.mBirthDate.date.year) < 18){
          _self.inputValidateBirthDate.isShowError = true;
          _self.msgError_BirthDate = 'วัน/เดือน/ปี เกิดไม่ถูกต้อง';
          return false;
        }
        _self.loading = true;
        this.api.api_PersonByCitizenId(_self.bean.citizenId, function(resp){
          if(resp.status.toString().toUpperCase()=="SUCCESS"){
            let person = resp.response;
            if(person && person.citizenId && person.citizenId != _self.oldCitizenId){
              _self.loading = false;
              _self.message_error('', 'หมายเลขบัตรประจำตัว <b>'+ _self.formatCitizenId(_self.bean.citizenId) +'</b> ซ้ำ');
            }else{
              // Save To API
              _self.api.commit_save(_self.isStaff ,_self.bean, (response)=>{
                let fullName = _self.getFullName(_self.prefixName, _self.bean.firstName, _self.bean.lastName);
                _self.loading = false;
                if(response && response.status.toString().toUpperCase()=='SUCCESS'){
                  $('#modalForm').modal('hide');
                  if(_self.userInfo.personId == _self.bean.personId){
                    _self.userInfo.fullName = fullName;
                    console.log('PREFIX',_self.bean.prefixName);
                    console.log('PREFIX',_self.userInfo.fullName);
                  }
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
