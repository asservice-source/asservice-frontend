import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../api-managements/api-http.service';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
declare var $:any;
@Component({
  selector: 'app-filter-summary',
  templateUrl: './filter-summary.component.html',
  styleUrls: []
})
export class FilterSummaryComponent extends BaseComponent{
    @Input() reportPath: string;
    @Input() report: string;
    @Input() title: string;
    @Output() process: any;
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
      this.api.api_SurveyHeaderList(this.report, data =>{
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
    onReporting(){
      this.inputvalidate = new InputValidateInfo();
      this.inputvalidate.isCheck = true;
      if(this.roundRowGuid){
        let _self=this;
        console.log('report',this.report);
        let obj = {'SurveyHeaderRowGUID':this.roundRowGuid,'OSMPersonID':this.osmId,'VillageID':this.villageId,'UserPersonID':this.personId,'DeadName':this.searchName}
        console.log(obj);
        let path = _self.reportPath;
        let $params = '<input name="SurveyHeaderRowGUID" value="'+this.roundRowGuid+'" >';
        $params += ' <input name="Name" value="'+this.searchName+'" >';
        $params += ' <input name="OSMPersonID" value="'+this.osmId+'" >';
        $params += ' <input name="VillageID" value="'+this.villageId+'" >';
        $params += ' <input name="UserPersonID" value="'+this.personId+'" >';
        let $form = $('<form method="post" target="_blank" name="mfrm" action="'+path+'"></form>');
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
      this.searchName = '';
      this.osmId = '';
      this.isOffOsm = true;
      this.listOsm = [];
    }
}
