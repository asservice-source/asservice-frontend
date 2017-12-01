import { Component, OnInit, Input} from '@angular/core';
import { BaseComponent } from '../../../../base-component';
import { PersonalBasicBean } from '../../../../beans/personal-basic.bean';
import { InputValidateInfo } from '../../../../directives/inputvalidate.directive';
import { Service_HomeMember } from '../../../../service/service-home-member';
import { SimpleValidateForm } from '../../../../utils.util';


declare var $:any;
@Component({
  selector: 'app-management-home-member-form',
  templateUrl: './management-home-member-form.component.html',
  styleUrls: ['./management-home-member-form.component.css']
})
export class ManagementHomeMemberFormComponent extends BaseComponent implements OnInit {


  @Input() bean: PersonalBasicBean;
  @Input() action: string;
  public api: Service_HomeMember;
  public inputValidate: InputValidateInfo;
  public isVerify: boolean = true;
  public isShowVerify: boolean = true;
  public modelBirthDate: any;
  public genderList: any = [];
  public prefixList: any = [];
  public raceList: any = [];
  public nationalityList: any = [];
  public religionList: any = [];
  public occupationList: any = [];
  public bloodTypeList: any = [];
  public rhGroupList: any = [];
  public educationList: any = [];
  public familyStatusList: any = [];
  
  constructor() { 
    super();
    this.bean = new PersonalBasicBean();
    this.inputValidate = new InputValidateInfo();
    this.api = new Service_HomeMember();
  }

  ngOnInit() {
    this.bindModal();
    this.setupGender();
    this.setupDropdownList();
  }

  setupGender(){
    let _self = this;
    this.api.api_GenderList(function(response){
      _self.genderList = response;
      _self.setupPrefix();
    });

  }
  setupPrefix(){
    let _self = this;
    _self.api.api_PrefixNameList(_self.bean.genderId, function (response) {
      _self.prefixList = response;
    });
  }

  setupDropdownList(){
    let _self = this;
    _self.api.api_RaceList(function(response){
      _self.raceList = response;
    });
    _self.api.api_NationalityList(function(response){
      _self.nationalityList = response;
    });
    _self.api.api_ReligionList(function(response){
      _self.religionList = response;
    });
    _self.api.api_OccupationList(function(response){
      _self.occupationList = response;
    });
    _self.api.api_BloodTypeList(function(response){
      _self.bloodTypeList = response;
      console.log(response);
    });
    _self.api.api_RHGroupList(function(response){
      _self.rhGroupList = response;
      console.log(response);
    });
    _self.api.api_EducationList(function(response){
      _self.educationList = response;
    });
    _self.api.api_FamilyStatusList(function(response){
      _self.familyStatusList = response;
    });
  }
  onGenderChange(){
    this.setupPrefix();
  }

  onChangeBirthDate(event: any){

  }

  bindModal(){
    let _self = this;
    $('#modalForm').on('show.bs.modal', function(){
      console.log(">>>>>>");
      console.log(_self.action);
      
      
      if(_self.action == _self.ass_action.ADD){
        _self.modelBirthDate = "";
        _self.bean = _self.api.map(_self.bean);
      }else{
        _self.modelBirthDate = _self.getCurrentDatePickerModel(_self.bean.birthDate);
      }
      _self.strNullToEmpty(_self.bean);
      console.log(_self.bean);

    });
  }

  onSave(){
    this.inputValidate = new InputValidateInfo();
    this.inputValidate.isCheck = true;
    let simpValidate: SimpleValidateForm = new SimpleValidateForm();
    let objsEmpty = simpValidate.getObjectEmpty(this.bean, ["personId"]);
    console.log(objsEmpty);
    if(objsEmpty.length<=0){

    }else{

    }
  }
}