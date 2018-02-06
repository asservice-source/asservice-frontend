import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Service_Profile } from '../../api-managements/service-profile';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent extends BaseComponent implements OnInit {

  private apiHttp: Service_Profile = new Service_Profile();

  public oldPassword: string = "";
  public newPassword: string = "";
  public confirmNewPassword: string = "";

  public validateOldPassword: InputValidateInfo = new InputValidateInfo();
  public validateNewPassword: InputValidateInfo = new InputValidateInfo();
  public validateConfirmNewPassword: InputValidateInfo = new InputValidateInfo();

  public error_message_oldPassword: string = "กรุณาระบุ รหัสผ่านเก่า";
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

    self.validateOldPassword = new InputValidateInfo();
    self.validateOldPassword.isCheck = true;

    self.validateNewPassword = new InputValidateInfo();
    self.validateNewPassword.isCheck = true;

    self.validateConfirmNewPassword = new InputValidateInfo();
    self.validateConfirmNewPassword.isCheck = true;

    if (self.isEmpty(self.oldPassword)) {
      self.error_message_oldPassword = "กรุณาระบุ รหัสผ่านเก่า";
      countError++;
    }

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
    self.apiHttp.change_password(userLoginId, username, self.oldPassword, self.newPassword, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'เปลี่ยนรหัสผ่านสำเร็จ', function () {
          localStorage.clear();
          self.route.navigate(['']);
        });
      } else {
        self.message_error('', 'เปลี่ยนรหัสผ่านไม่สำเร็จ', function () {
          self.clearData();
        });
      }
    });
  }

  onClickCancel() {
    let self = this;

    self.route.navigate(['']);
  }

  clearData() {
    let self = this;

    self.oldPassword = "";
    self.newPassword = "";
    self.confirmNewPassword = "";
  }

}
