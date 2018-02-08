import { Component, OnInit } from '@angular/core';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base-component';
import { Service_Profile } from '../../api-managements/service-profile';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {

  private apiHttp: Service_Profile = new Service_Profile();
  
  public newPassword: string = "";
  public confirmNewPassword: string = "";

  public validateNewPassword: InputValidateInfo = new InputValidateInfo();
  public validateConfirmNewPassword: InputValidateInfo = new InputValidateInfo();
  
  public error_message_newPassword: string = "กรุณาระบุ รหัสผ่านใหม่";
  public error_message_confirmNewPassword: string = "กรุณาระบุ ยืนยันรหัสผ่านใหม่";

  constructor(private route: Router) { 
    super();
  }

  ngOnInit() {

  }

  onClickSave() {
    let self = this;

    let countError = 0;

    self.validateNewPassword = new InputValidateInfo();
    self.validateNewPassword.isCheck = true;

    self.validateConfirmNewPassword = new InputValidateInfo();
    self.validateConfirmNewPassword.isCheck = true;

    if (self.isEmpty(self.newPassword)) {
      self.error_message_newPassword = "กรุณาระบุ รหัสผ่านใหม่";
      countError++;
    }

    if (self.isEmpty(self.confirmNewPassword)) {
      self.error_message_confirmNewPassword = "กรุณาระบุ ยืนยันรหัสผ่านใหม่";
      countError++;
    }

    if (self.newPassword != self.confirmNewPassword) {
      self.error_message_confirmNewPassword = "รหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ต้องมีค่าเหมือนกัน";
      self.validateConfirmNewPassword = new InputValidateInfo();
      self.validateConfirmNewPassword.isCheck = true;
      self.validateConfirmNewPassword.isShowError = true;
      countError++;
    }

    if (countError > 0) {
      return;
    }

    let userLoginId = self.userInfo.userId;
    let username = self.userInfo.username;
    // self.apiHttp.change_password(userLoginId, username, self.newPassword, function (d) {
    //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
    //     self.message_success('', 'เปลี่ยนรหัสผ่านสำเร็จ', function () {
    //       localStorage.clear();
    //       self.route.navigate(['']);
    //     });
    //   } else {
    //     self.message_error('', 'เปลี่ยนรหัสผ่านไม่สำเร็จ', function () {
    //       self.clearData();
    //     });
    //   }
    // });
  }

  onClickCancel() {
    let self = this;

    self.route.navigate(['']);
  }

}
