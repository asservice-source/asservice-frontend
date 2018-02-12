import { Component, OnInit } from '@angular/core';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { IMyDateModel } from 'mydatepicker-thai';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { Service_Profile } from '../../api-managements/service-profile';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  private apiHttp: Service_Profile = new Service_Profile();

  public validateInput: InputValidateInfo = new InputValidateInfo();
  public validateNewPassword: InputValidateInfo = new InputValidateInfo();
  public validateConfirmNewPassword: InputValidateInfo = new InputValidateInfo();

  public isVerified: boolean = false;

  public code5: string = "";
  public citizenId: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public birthDate: string = "";
  public newPassword: string = "";
  public confirmNewPassword: string = "";

  public modelBirthDate: any;

  public error_message_code5: string = "กรุณาระบุ รหัสโรงพยาบาล";
  public error_message_citizenId: string = "กรุณาระบุ รหัสประจำตัวประชาชน";
  public error_message_firstName: string = "กรุณาระบุ ชื่อ";
  public error_message_lastName: string = "กรุณาระบุ สกุล";
  public error_message_birthDate: string = "กรุณาระบุ วัน/เดือน/ปี เกิด";
  public error_message_newPassword: string = "กรุณาระบุ รหัสผ่านใหม่";
  public error_message_confirmNewPassword: string = "กรุณาระบุ ยืนยันรหัสผ่านใหม่";

  public loading: boolean = false;

  constructor(private route: Router) {
    super();
  }

  ngOnInit() {

  }

  validBirthDate(event: InputValidateInfo) {
    // this.isBirthDate = event.isPassed;
  }

  onChangeBirthDate(event: IMyDateModel) {
    let self = this;

    self.birthDate = self.getStringDateForDatePickerModel(event.date);
    self.modelBirthDate = self.getDatePickerModel(self.birthDate);
  }

  onClickVerify() {
    let self = this;

    self.validateInput = new InputValidateInfo();
    self.validateInput.isCheck = true;

    self.loading = true;

    self.apiHttp.verify_forgot_password(self.code5, self.citizenId, self.birthDate, self.firstName, self.lastName, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        if (d.response.isVerified === true) {
          self.isVerified = true;
        } else {
          self.message_error('', 'ข้อมูลของท่านไม่ถูกต้อง กรุณาระบุข้อมูลใหม่อีกครั้ง');
        }
      }
      self.loading = false;
    })
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
    // self.apiHttp.reset_password(userLoginId, username, self.newPassword, function (d) {
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
