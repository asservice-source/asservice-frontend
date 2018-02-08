import { Component, OnInit } from '@angular/core';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { IMyDateModel } from 'mydatepicker-thai';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  public validateInput: InputValidateInfo = new InputValidateInfo();

  public code5: string = "";
  public citizenId: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public birthDate: string = "";

  public modelBirthDate: any;

  public error_message_code5: string = "กรุณาระบุ รหัสโรงพยาบาล";
  public error_message_citizenId: string = "กรุณาระบุ รหัสประจำตัวประชาชน";
  public error_message_firstName: string = "กรุณาระบุ ชื่อ";
  public error_message_lastName: string = "กรุณาระบุ สกุล";
  public error_message_birthDate: string = "กรุณาระบุ วัน/เดือน/ปี เกิด";

  constructor(private route: Router) {
    super();
  }

  ngOnInit() {

  }

  validBirthDate(event: InputValidateInfo){
    // this.isBirthDate = event.isPassed;
  }

  onChangeBirthDate(event: IMyDateModel) {
    //this.memberBean.birthDate = this.getStringDateForDatePickerModel(event.date);
  }

  onClickSave() {
    let self = this;


  }

  onClickCancel() {
    let self = this;

    self.route.navigate(['']);
  }

}
