import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { IMyDateModel } from 'mydatepicker-thai';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { Service_Profile } from '../../api-managements/service-profile';
import { CompleterService, CompleterData } from 'ng2-completer';
declare var $;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  private apiHttp: Service_Profile = new Service_Profile();

  public validateInput: InputValidateInfo = new InputValidateInfo();
  public validateInputHospital: InputValidateInfo = new InputValidateInfo();
  public validateNewPassword: InputValidateInfo = new InputValidateInfo();
  public validateConfirmNewPassword: InputValidateInfo = new InputValidateInfo();

  public isVerified: boolean = false;
  public isFormHospital: boolean = true;

  public classActive = "btn btn-primary btn-sm active";
  public classNotactive = "btn btn-primary btn-sm notActive";

  public classHospital = "btn btn-primary btn-sm active";
  public classOSM = "btn btn-primary btn-sm notActive";

  public hospitalList: Array<any>;
  public dataHospitals: CompleterData;

  public listProvince: any;
  public listDistrict: any;
  public listSubDistrict: any;

  public code5: string = "";
  public citizenId: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public birthDate: string = "";

  public hospitalName: string = "";
  public hospitalProvince: string = "";
  public hospitalDistrict: string = "";
  public hospitalSubDistrict: string = "";
  public hospitalCode9: string = "";
  public hospitalCode5: string = "";
  public hospitalCitizenId: string = "";

  public newPassword: string = "";
  public confirmNewPassword: string = "";

  public userLoginId: string = "";
  public userName: string = "";

  public modelBirthDate: any;
  public isBirthDate: boolean = false;

  public error_message_code5: string = "กรุณาระบุ รหัสโรงพยาบาล";
  public error_message_citizenId: string = "กรุณาระบุ รหัสประจำตัวประชาชน";
  public error_message_firstName: string = "กรุณาระบุ ชื่อ";
  public error_message_lastName: string = "กรุณาระบุ สกุล";
  public error_message_birthDate: string = "กรุณาระบุ วัน/เดือน/ปี เกิด";

  public error_message_hospital: string = "กรุณาระบุ รพ.สต.";
  public error_message_hospitalProvince: string = "กรุณาเลือก จังหวัด";
  public error_message_hospitalDistrict: string = "กรุณาเลือก อำเภอ";
  public error_message_hospitalSubDistrict: string = "กรุณาเลือก ตำบล";
  public error_message_hospitalCode9: string = "กรุณาระบุ รหัส 9 หลัก รพ.สต.";
  public error_message_hospitalCode5: string = "กรุณาระบุ รหัส 5 หลัก รพ.สต.";
  public error_message_hospital_cid: string = "กรุณาระบุ เลขประจำตัวประชาชน รพ.สต.";

  public error_message_newPassword: string = "กรุณาระบุ รหัสผ่านใหม่";
  public error_message_confirmNewPassword: string = "กรุณาระบุ ยืนยันรหัสผ่านใหม่";

  public loading: boolean = false;

  constructor(private route: Router, private completerService: CompleterService, private changeRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();

    self.BindHospital();
    self.BindProvince();
  }

  validBirthDate(event: InputValidateInfo) {
    let self = this;

    self.isBirthDate = event.isPassed;
  }

  onChangeRadio(val) {
    let self = this;

    if (val == '2') {
      self.classHospital = self.classActive;
      self.classOSM = self.classNotactive;
      self.isFormHospital = true;
    } else {
      self.classHospital = self.classNotactive;
      self.classOSM = self.classActive;
      self.isFormHospital = false;
    }
    self.clearData();
  }

  onChangeBirthDate(event: IMyDateModel) {
    let self = this;

    self.birthDate = self.getStringDateForDatePickerModel(event.date);
    self.modelBirthDate = self.getDatePickerModel(self.birthDate);
  }

  onChangeProvince() {
    let self = this;

    self.hospitalDistrict = "";
    self.hospitalSubDistrict = "";

    self.apiHttp.post('address/amphur', { "provinceCode": self.hospitalProvince }, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.listDistrict = d.response;
      }
    });
  }

  onChangeDistrict() {
    let self = this;

    self.hospitalSubDistrict = "";

    self.apiHttp.post('address/tumbol', { "amphurCode": self.hospitalDistrict }, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.listSubDistrict = d.response;
      }
    });
  }

  onClickVerify() {
    let self = this;

    self.validateInput = new InputValidateInfo();
    self.validateInput.isCheck = true;

    if (self.isEmpty(self.code5))
      return;

    if (self.isEmpty(self.citizenId))
      return;

    if (self.isEmpty(self.birthDate))
      return;

    if (self.isEmpty(self.firstName))
      return;

    if (self.isEmpty(self.lastName))
      return;

    self.loading = true;

    self.apiHttp.verify_forgot_password(self.code5, self.citizenId, self.birthDate, self.firstName, self.lastName, function (d) {
      self.loading = false;

      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        let data = d.response;
        if (data.isVerified === true) {
          self.isVerified = true;
          self.userLoginId = data.userLoginId;
          self.userName = data.userName;
          return;
        }
      }
      self.message_error('', 'ข้อมูลของท่านไม่ถูกต้อง กรุณาระบุข้อมูลใหม่อีกครั้ง');
    });
  }

  onClickVerifyHospital() {
    let self = this;

    self.validateInputHospital = new InputValidateInfo();
    self.validateInputHospital.isCheck = true;

    if (self.isEmpty(self.hospitalName))
      return;

    if (self.isEmpty(self.hospitalProvince))
      return;

    if (self.isEmpty(self.hospitalDistrict))
      return;

    if (self.isEmpty(self.hospitalSubDistrict))
      return;

    if (self.isEmpty(self.hospitalCode9))
      return;

    if (self.isEmpty(self.hospitalCode5))
      return;

    if (self.isEmpty(self.hospitalCitizenId))
      return;

    // self.loading = true;

    // self.apiHttp.verify_forgot_password(self.code5, self.citizenId, self.birthDate, self.firstName, self.lastName, function (d) {
    //   self.loading = false;

    //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
    //     let data = d.response;
    //     if (data.isVerified === true) {
    //       self.isVerified = true;
    //       self.userLoginId = data.userLoginId;
    //       self.userName = data.userName;
    //       return;
    //     }
    //   }
    //   self.message_error('', 'ข้อมูลของท่านไม่ถูกต้อง กรุณาระบุข้อมูลใหม่อีกครั้ง');
    // });
    self.message_error('', 'ยังไม่พร้อมใช้งาน');
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

    self.loading = true;

    self.apiHttp.reset_password(self.userLoginId, self.userName, self.newPassword, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'รีเซ็ตรหัสผ่านสำเร็จ', function () {
          self.clearData();
          $('#modalForgotPassword').modal('hide');
        });
      } else {
        self.message_error('', 'รีเซ็ตรหัสผ่านไม่สำเร็จ', function () {
          self.newPassword = '';
          self.confirmNewPassword = '';
        });
      }
    });
  }

  onClickCancel() {
    let self = this;

    self.route.navigate(['']);
  }

  onModalEvent() {
    let self = this;

    $('#modalForgotPassword').on('show.bs.modal', function (e) {
      self.onChangeRadio('1');
      self.clearData();
      // self.changeRef.detectChanges();
    });

    $('#modalForgotPassword').on('hidden.bs.modal', function () {
      // self.changeRef.detectChanges();
    });
  }

  // clearData() {
  //   let self = this;

  //   self.isVerified = false;

  //   self.code5 = '';
  //   self.citizenId = '';
  //   self.birthDate = '';
  //   self.modelBirthDate = null;
  //   self.firstName = '';
  //   self.lastName = '';

  //   self.newPassword = '';
  //   self.confirmNewPassword = '';

  //   self.userLoginId = '';
  //   self.userName = '';

  //   self.validateInput = new InputValidateInfo();
  //   self.validateNewPassword = new InputValidateInfo();
  //   self.validateConfirmNewPassword = new InputValidateInfo();
  // }

  clearData() {
    let self = this;

    self.isVerified = false;

    self.code5 = '';
    self.citizenId = '';
    self.birthDate = '';
    self.modelBirthDate = null;
    self.firstName = '';
    self.lastName = '';

    self.hospitalName = '';
    self.hospitalProvince = '';
    self.hospitalDistrict = '';
    self.hospitalSubDistrict = '';
    self.hospitalCode9 = '';
    self.hospitalCode5 = '';
    self.hospitalCitizenId = '';

    self.newPassword = '';
    self.confirmNewPassword = '';

    self.userLoginId = '';
    self.userName = '';

    self.validateInputHospital = new InputValidateInfo();
    self.validateInput = new InputValidateInfo();
    self.validateNewPassword = new InputValidateInfo();
    self.validateConfirmNewPassword = new InputValidateInfo();
  }

  BindHospital() {
    let self = this;

    self.loading = true;

    self.apiHttp.post('hospital/hospitalName_list', {}, function (d) {
      self.hospitalList = new Array<any>();
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        for (let item of d.response) {
          if (!item.isRegister) {
            self.hospitalList.push(item);
          }
        }
      }
      self.dataHospitals = self.completerService.local(self.hospitalList, 'hospitalName', 'hospitalName');
      self.loading = false;
    });
  }

  BindProvince() {
    let self = this;

    self.apiHttp.post('address/province', {}, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.listProvince = d.response;
      }
      self.loading = false;
    });
  }

}
