import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent extends BaseComponent implements OnInit {

  public oldPassword: string = "";
  public newPassword: string = "";
  public confirmNewPassword: string = "";

  public validatePassword: InputValidateInfo = new InputValidateInfo();

  constructor(private route: Router) {
    super();
  }

  ngOnInit() {

  }

  onClickSave() {
    let self = this;

    self.validatePassword = new InputValidateInfo();
    self.validatePassword.isCheck = true;
  }

  onClickCancel() {
    let self = this;

    self.route.navigate(['']);
  }

}
