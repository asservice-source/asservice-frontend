import { Component, OnInit, Input} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { Service_HomeMember } from '../../../../service/service-home-member';


declare var $:any;
@Component({
  selector: 'app-management-home-member-form',
  templateUrl: './management-home-member-form.component.html',
  styleUrls: ['./management-home-member-form.component.css']
})
export class ManagementHomeMemberFormComponent extends BaseComponent implements OnInit {


  @Input() bean: PersonalBasicBean;
  public api: Service_HomeMember;
  public inputValidate: InputValidateInfo;
  public isVerify: boolean = true;
  public isShowVerify: boolean = true;
  public genderList: any = [];
  public prefixList: any = [];
  constructor() { 
    super();
    this.bean = new PersonalBasicBean();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_HomeMember();
  }

  ngOnInit() {
    this.setupGender();
  }

  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
      _self.setupPrefix();
    });

  }
  setupPrefix(){
    this.bean.prefixCode="";
    let _self = this;
    _self.api.api_PrefixNameList(_self.bean.genderId, function (response) {
      _self.prefixList = response;
    });
  }

  onGenderChange(){
    this.setupPrefix();
  }


  
}