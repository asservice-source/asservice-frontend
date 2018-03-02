import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import {ReportPath} from '../../global-config';
import {InputValidateInfo} from '../../directives/inputvalidate.directive';
import {ApiHTTPService} from '../../api-managements/api-http.service';

declare var $:any;

@Component({
  selector: 'app-summary-mosquito',
  templateUrl: './summary-mosquito.component.html',
  styleUrls: ['./summary-mosquito.component.css']
})
export class SummaryMosquitoComponent extends BaseComponent implements OnInit {
  public reportPath: string = ReportPath.MOSQUITO;
  public report: string = this.surveyHeaderCode.MONITORHICI;
  private api: ApiHTTPService;
  public inputvalidate: InputValidateInfo;
  public isStaff: boolean;
  public listRounds: Array<any>;
  public listVillages: Array<any>;
  public listOsm: Array<any>;
  public listHomeTypes: Array<any>;
  public roundRowGuid: string = '';
  public villageId: string = '';
  public osmId: string = '';
  public homeTypeCode: string = '';
  public personId: string;
  public isOffVillage: boolean = true;
  public isOffOsm: boolean = true;

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    this.isStaff = this.isStaffRole(this.userInfo.roleId);
    this.inputvalidate = new InputValidateInfo();
  }
  ngOnInit() {

    this.setDropdownListRounds();
    this.setDropdownListHomeType();
    if(!this.isStaff){
      this.osmId = this.userInfo.personId;
      this.villageId = this.userInfo.villageId;

    }else{
      this.setDropdownListVillages();
    }

    this.personId = this.userInfo.personId;
  }
  setDropdownListRounds(){
    this.listRounds = new Array<any>();
    this.api.api_SurveyHeaderList(this.surveyHeaderCode.MONITORHICI, data =>{
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
  setDropdownListHomeType(){
    this.listHomeTypes = new Array<any>();
    this.api.api_HomeTypeList((data)=>{
      this.listHomeTypes = data;
    });
  }
  onChangeVillage(){
    this.osmId = '';
    if(this.villageId){
      this.setDropdownListOsm();
    }
  }
  onReporting(){
    this.inputvalidate = new InputValidateInfo();
    this.inputvalidate.isCheck = true;
    if(this.roundRowGuid){
      console.log('SurveyHeaderRowGUID',this.roundRowGuid);
      console.log('UserPersonID',this.personId);
      console.log('OSMPersonID',this.osmId);
      console.log('VillageID',this.villageId);
      console.log('HomeTypeCode',this.homeTypeCode);
      let $params = '<input name="SurveyHeaderRowGUID" value="'+this.roundRowGuid+'" >';
      $params += ' <input name="HomeTypeCode" value="'+this.homeTypeCode+'" >';
      $params += ' <input name="OSMPersonID" value="'+this.osmId+'" >';
      $params += ' <input name="VillageID" value="'+this.villageId+'" >';
      $params += ' <input name="UserPersonID" value="'+this.personId+'" >';
      let $form = $('<form method="post" target="_blank" name="mfrm" action="'+ this.reportPath+'"></form>');
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
    this.homeTypeCode = '';
    this.osmId = '';
    this.isOffOsm = true;
    this.listOsm = [];
    this.listHomeTypes = [];
  }
}
