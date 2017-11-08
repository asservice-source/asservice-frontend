import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { StaffBean } from '../../../../beans/staff.bean';
import { ApiHTTPService } from '../../../../service/api-http.service';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';



@Component({
  selector: 'app-management-staff-staff-form',
  templateUrl: './management-staff-staff-form.component.html',
  styleUrls: ['./management-staff-staff-form.component.css']
})
export class ManagementStaffStaffFormComponent extends BaseComponent implements OnInit {

  @Input() bean: StaffBean;

  public prefixList: any = [{}];
  public api: ApiHTTPService = new ApiHTTPService();
  public InputValidate: InputValidateInfo = new InputValidateInfo();
  public genderList: any;
  constructor() {
    super();

    this.bean = new StaffBean();
    this.bean.prefixCode = '';
   }

  ngOnInit() {
    this.setUpPrefix();
    this.setUpGender();
    this.bindModal();
  }
  setUpPrefix(){
    let _self = this;
    this.api.post('person/prefix_list', {} , function (data) {
      console.log(data);
      if (data != null && data.status.toUpperCase() == "SUCCESS") {
        _self.prefixList = data.response;
      } else {
        console.log('error(s) => ' + data.message);
      }
    });
  }
  setUpGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
    });
  }
  onSave(){
    this.InputValidate = new InputValidateInfo();
    this.InputValidate.isCleck = true;
  }
  bindModal(){
    let _self = this;
    $('#modalForm').on('hide.bs.modal', function(){
      _self.InputValidate = new InputValidateInfo();
    });
  }
}
