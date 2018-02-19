import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {BaseComponent} from '../../base-component';
import {ApiHTTPService} from '../../api-managements/api-http.service';
import {InputValidateInfo} from '../../directives/inputvalidate.directive';
declare var $:any;
@Component({
  selector: 'app-summary-personal',
  templateUrl: './summary-personal.component.html',
  styleUrls: ['./summary-personal.component.css']
})
export class SummarytPersonalComponent extends BaseComponent implements OnInit {

  private api: ApiHTTPService;
  public isStaff: boolean;
  public listRounds: Array<any>;
  public listVillages: Array<any>;
  public listOsm: Array<any>;
  public listHomes: Array<any>;
  public inputvalidate: InputValidateInfo;
  public roundRowGuid: string = '';
  public villageId: string = '';
  public osmId: string = '';
  public homeId: string = '';
  public personId: string;
  public isOffVillage: boolean = true;
  public isOffOsm: boolean = true;
  public isOffHome: boolean = true;

  constructor() {
    super();
    this.api = new ApiHTTPService();
    this.isStaff = this.isStaffRole(this.userInfo.roleId);
    this.inputvalidate = new InputValidateInfo();
  }

  ngOnInit() {

    this.setDropdownListRounds();
    if(!this.isStaff){
      this.osmId = this.userInfo.personId;
      //this.personId = this.userInfo.personId;
      this.villageId = this.userInfo.villageId;
      this.setDropdownListHomes();
    }else{
      this.setDropdownListVillages();
    }

    this.personId = this.userInfo.personId;
  }
  setDropdownListRounds(){
    this.listRounds = new Array<any>();
    this.api.api_SurveyHeaderList(this.surveyHeaderCode.POPULATION, data =>{
      this.listRounds = data;
    });
  }
  setDropdownListVillages(){
    this.isOffVillage = true;
    this.listVillages = new Array<any>();
    this.api.api_villageList(this.getHospitalCode(), data=>{
      this.listVillages = data;
      this.isOffVillage = false;
    });
  }
  setDropdownListOsm(){
    this.isOffOsm = true;
    this.listOsm = new Array<any>();
    this.api.api_OsmList(this.villageId, data=>{
      this.listOsm = data;
      this.isOffOsm = false;
    });
  }
  setDropdownListHomes(){
    this.isOffHome = true;
    this.listHomes = new Array<any>();
    this.api.api_HomeList(this.villageId, this.osmId,'',data =>{
      this.listHomes = data;
      this.isOffHome = false;
    });
  }
  onChangeVillage(){
    this.osmId = '';
    this.homeId = '';
    if(this.villageId){
      this.setDropdownListOsm();
      this.setDropdownListHomes();
    }
  }
  onChangeOsm(){
    this.homeId = '';
    this.setDropdownListHomes();
  }
  onReporting(){
    this.inputvalidate = new InputValidateInfo();
    this.inputvalidate.isCheck = true;
    if(this.roundRowGuid){
      console.log(this.personId);
      console.log(this.villageId);
      console.log(this.homeId);
      let $params = '<input name="SurveyHeaderRowGUID" value="'+this.roundRowGuid+'" >';
      $params += ' <input name="HomeID" value="'+this.homeId+'" >';
      $params += ' <input name="OSMPersonID" value="'+this.osmId+'" >';
      $params += ' <input name="VillageID" value="'+this.villageId+'" >';
      $params += ' <input name="UserPersonID" value="'+this.personId+'" >';
      let $form = $('<form method="post" target="_blank" name="mfrm" action="http://192.168.1.203:8080/api-asservice-front/report/population/ViewYearlyReport"></form>');
      $form.append($params);
      $form.css('display', 'none');
      $('body').append($form);

      $form.submit();
      $form.remove();
    }
  }
  clear(){
    this.roundRowGuid = '';
    this.villageId = '';
    this.homeId = '';
    this.osmId = '';
    this.isOffOsm = true;
    this.isOffHome = true;
    this.listOsm = [];
    this.listHomes = [];
  }
}
