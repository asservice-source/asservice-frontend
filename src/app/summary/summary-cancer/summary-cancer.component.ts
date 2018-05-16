import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import {ReportPath} from '../../global-config';
import { ApiHTTPService } from '../../api-managements/api-http.service';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
declare var $:any;
@Component({
  selector: 'app-summary-cancer',
  templateUrl: './summary-cancer.component.html',
  styleUrls: ['./summary-cancer.component.css']
})
export class SummaryCancerComponent extends BaseComponent implements OnInit {
  public title = 'แบบสรุปผู้ป่วยมะเร็ง';
  private api: ApiHTTPService;
  public isStaff: boolean;
  public listRounds: Array<any>;
  public listVillages: Array<any>;
  public listOsm: Array<any>;
  public inputvalidate: InputValidateInfo;
  public roundRowGuid: string = '';
  public villageId: string = '';
  public osmId: string = '';
  public searchName: string = '';

  public personId: string;
  public isOffVillage: boolean = true;
  public isOffOsm: boolean = true;

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
      this.villageId = this.userInfo.villageId;
    }else{
      this.setDropdownListVillages();
    }

    this.personId = this.userInfo.personId;
  }
  setDropdownListRounds(){
    this.listRounds = new Array<any>();
    this.api.api_SurveyHeaderList(this.surveyHeaderCode.CANCER, data =>{
      this.listRounds = data;
      for(let item of this.listRounds){
        if(item.status == '2'){
          this.roundRowGuid = item.rowGUID;
        }
      }

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
  onChangeVillage(){
    this.osmId = '';
    if(this.villageId){
      this.setDropdownListOsm();
    }
  }
  onReporting(blankForm: boolean = false){
    let $form: any;
    if(blankForm){
      $form = $('<form method="post" target="_blank" name="mfrm" action="'+ReportPath.CANCER_BLANK_FORM+'"></form>');
    }else{
      this.inputvalidate = new InputValidateInfo();
      this.inputvalidate.isCheck = true;
      if(this.roundRowGuid){
        console.log('report',this.surveyHeaderCode);
        let obj = {'SurveyHeaderRowGUID':this.roundRowGuid,'OSMPersonID':this.osmId,'VillageID':this.villageId,'UserPersonID':this.personId,'DeadName':this.searchName}
        console.log(obj);
        let $params = '<input type="hidden" name="SurveyHeaderRowGUID" value="'+this.roundRowGuid+'" >';
        $params += ' <input type="hidden" name="Name" value="'+this.searchName+'" >';
        $params += ' <input type="hidden" name="OSMPersonID" value="'+this.osmId+'" >';
        $params += ' <input type="hidden" name="VillageID" value="'+this.villageId+'" >';
        $params += ' <input type="hidden" name="UserPersonID" value="'+this.personId+'" >';
        // $params += ' <input name="sid" value="'+this.userInfo.sid+'" >';
        $form = $('<form method="post" target="_blank" name="mfrm" action="'+ReportPath.CANCER+'"></form>');
        $form.append($params);
      }else{
        return;
      }
    }

    $form.css('display', 'none');
    $('body').append($form);
    $form.submit();
    $form.remove();

  }
  clear(){
    this.roundRowGuid = '';
    this.villageId = '';
    this.searchName = '';
    this.osmId = '';
    this.isOffOsm = true;
    this.listOsm = [];
  }

}
