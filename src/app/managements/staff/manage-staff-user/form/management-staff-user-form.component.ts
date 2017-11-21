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
  setupPrefix(){
    let _self = this;
    _self.api.post('person/prefix_list', {} , function (data) {
      console.log(data);
      if (data != null && data.status.toUpperCase() == "SUCCESS") {
        _self.prefixList = data.response;
      } else {
        console.log('error(s) => ' + data.message);
      }
    });
  }
  setupVillage(){
    let _self = this;
    this.api.api_villageList(this.getHospitalCode(),function(list){
      console.log(list);
      _self.villageList = list;
     
    });
  }
  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
    });

  }
  bindModalForm(){
    let _self = this;
    $('#modalForm').on('hidden.bs.modal', function(){
      _self.inputValidate = new InputValidateInfo();
    });
  }
  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let valid = new SimpleValidateForm();
    this.bean.hospitalCode5 = this.getHospitalCode();
    this.bean.userActive = true;
    this.bean.userRoleId = this.isStaff?'3':'5';
    
    if(this.isValidCitizenIdThailand(this.bean.citizenId)){
    //if(true){
      let arr = valid.getObjectEmpty(this.bean,[]);
      console.log(arr);
      if(arr.length<=0){
        let _self = this;
        _self.loading = true;
        this.api.commit_save(this.bean, function(response){
          _self.loading = false;
          let success = false;
          if(response && response.status.toString().toUpperCase()=='SUCCESS'){
            success = true;
            $('#modalForm').modal('hide');
            _self.message_success('','เพิ่มเจ้าหน้าที่ อสม. ' + _self.bean.fullName + ' สำเร็จ');
          }else{
            success = false;
            _self.message_error('','ไม่สามารถเพิ่มเจ้าหน้าที่ อสม. ' + _self.bean.fullName + ' ได้'
              , function(){
                
              });
          }
        
          _self.success.emit({"success": success, "response": response});
        });
      }else{

      }
    }
    
  }
}
