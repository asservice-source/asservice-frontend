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
  public isShowVerify: boolean = true;
  constructor() { 
    super();
    this.bean = new StaffUserBean();
    this.api = new Service_UserStaffAndOSM();
    this.success = new EventEmitter<any>(); 
    
  }

  ngOnInit() {
    this.setupGender();
    this.setupPrefix();
    this.setupVillage();
    this.bindModalForm();
  }
  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
    });

  }
  setupPrefix(){
    let _self = this;
    _self.api.api_PrefixNameList(_self.bean.genderId, function (response) {
      console.log(response);
      _self.prefixList = response;
    });
  }
  setupVillage(){
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      console.log(list);
      _self.villageList = list;
     
    });
  }
  
  bindModalForm(){
    let _self = this;
    $('#modalForm').on('hidden.bs.modal', function(){
      _self.inputValidate = new InputValidateInfo();
    });
    $('#modalForm').on('show.bs.modal', function(){
      console.log(_self.bean);
    });
  }
  onGenderChange(){
    this.bean.prefixCode="";
  }
  onClickVerifyCitizenId(){

  }
  onClickEditCitizenId(){
    
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let valid = new SimpleValidateForm();
    this.bean.hospitalCode5 = this.getHospitalCode();
    this.bean.userActive = true;
    let roleName = "";
    let fullName = this.getFullName('', this.bean.firstName, this.bean.lastName);
    if(this.isStaff){
      this.bean.villageId;
      this.bean.userRoleId ='3';
      roleName = "รพ.สต."
    }else{
      this.bean.userRoleId = '5';
      roleName = "อสม."
    }
    
    
    //if(this.isValidCitizenIdThailand(this.bean.citizenId)){
    if(true){
      let ignores = this.action==this.ass_action.ADD?['personId']:[];
      if(this.isStaff){
        ignores.push('villageId');
      }
      let arr = valid.getObjectEmpty(this.api.map(this.isStaff,this.bean),ignores);
      console.log(arr);
      if(arr.length<=0){
        let _self = this;
        _self.loading = true;
        this.api.commit_save(this.isStaff ,this.bean, function(response){
          _self.loading = false;
          if(response && response.status.toString().toUpperCase()=='SUCCESS'){
            $('#modalForm').modal('hide');
            _self.message_success('','เพิ่มเจ้าหน้าที่ ' + roleName + ' ' + fullName + ' สำเร็จ', function(){
              _self.success.emit({"success": true, "response": response});
            });
          }else{
            _self.message_error('','ไม่สามารถเพิ่มเจ้าหน้าที่ '+ roleName + ' ' + fullName + ' ได้', function(){
              _self.success.emit({"success": false, "response": response});
            });
          }
        
          
        });
      }else{

      }
    }
    
  }
}
