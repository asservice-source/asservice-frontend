import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import {ReportPath} from '../../global-config';
import {InputValidateInfo} from '../../directives/inputvalidate.directive';
import {ApiHTTPService} from '../../api-managements/api-http.service';

declare var $:any;

@Component({
  selector: 'app-summary-mosquito-hici',
  templateUrl: './summary-mosquito-hici.component.html',
  styleUrls: ['./summary-mosquito-hici.component.css']
})
export class SummaryMosquitoHICIComponent extends BaseComponent implements OnInit {
  private api: ApiHTTPService;
  public inputvalidate: InputValidateInfo;
  public isStaff: boolean;
  public listRounds: Array<any>;
  public listVillages: Array<any>;
  public listOsm: Array<any>;
  public listHomes: Array<any>;
  public roundRowGuid: string = '';
  public villageId: string = '';
  public osmId: string = '';
  public homeId: string = '';
  public personId: string;
  public isOffVillage: boolean = true;
  public isOffOsm: boolean = true;
  public isOffHome: boolean = true;
  public statusId: string = '1';

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    this.isStaff = this.isStaffRole(this.userInfo.roleId);
    this.inputvalidate = new InputValidateInfo();
  }
  ngOnInit() {

    this.setDropdownListRounds();

    if(this.isStaff){
      this.setDropdownListVillages();
    }else{
      
      this.osmId = this.userInfo.personId;
      this.villageId = this.userInfo.villageId;
      this.setDropdownListHomes();
    }

    this.personId = this.userInfo.personId;
  }
  setDropdownListRounds(){
    this.listRounds = new Array<any>();
    this.api.api_SurveyHeaderList(this.surveyHeaderCode.MONITORHICI, data =>{
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
    this.isOffHome = true;
    this.listOsm = new Array<any>();
    this.api.api_OsmList(this.villageId, data=>{
      this.listOsm = data;
      this.isOffOsm = false;

    });
  }
  setDropdownListHomes(){
    this.isOffHome = true;
    this.listHomes = new Array<any>();
    this.api.api_HomeList(this.villageId,this.osmId, '',(data)=>{
      this.listHomes = data;
      this.isOffHome = false;
    });
  }
  onChangeVillage(){
    this.osmId = '';
    this.homeId = '';
    this.isOffOsm = true;
    this.isOffHome = true;
    if(this.villageId){
      this.setDropdownListOsm();
      this.setDropdownListHomes();
    }
  }
  onChangeOSM(){
    this.homeId = '';
    this.setDropdownListHomes();
    console.log(this.osmId);
  }
  onReporting(blankForm:boolean = false){
    let $form: any;
    if(blankForm){
      $form = $('<form method="post" target="_blank" name="mfrm" action="'+ReportPath.MOSQUITO_HICI_BLANK_FORM+'"></form>');
    }else{
      this.inputvalidate = new InputValidateInfo();
      this.inputvalidate.isCheck = true;
      if(this.roundRowGuid){
        if(this.homeId == '-1'){

        }
        console.log('SurveyHeaderRowGUID',this.roundRowGuid);
        console.log('UserPersonID',this.personId);
        console.log('OSMPersonID',this.osmId);
        console.log('VillageID',this.villageId);
        console.log('HomeID',this.homeId);

        let $params = '<input type="hidden" name="SurveyHeaderRowGUID" value="'+this.roundRowGuid+'" >';
        $params += ' <input type="hidden" name="HomeID" value="'+this.homeId+'" >';
        $params += ' <input type="hidden" name="OSMPersonID" value="'+this.osmId+'" >';
        $params += ' <input type="hidden" name="VillageID" value="'+this.villageId+'" >';
        $params += ' <input type="hidden" name="UserPersonID" value="'+this.personId+'" >';
        $params += ' <input type="hidden" name="StatusID" value="'+this.statusId+'" >';
        // $params += ' <input name="sid" value="'+this.userInfo.sid+'" >';
        $form = $('<form method="post" target="_blank" name="mfrm" action="'+ ReportPath.MOSQUITO_HICI+'"></form>');
       
        console.log('$params', $params);
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
    this.homeId = '';
    this.isOffOsm = true;
    this.isOffHome = true;
    this.listOsm = [];
    
    if(this.isStaff){
      this.osmId = '';
      this.villageId = '';
      this.listHomes = [];
    }
  }
}
