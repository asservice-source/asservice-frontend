import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Http, Response, RequestOptions, RequestMethod } from "@angular/http";
import { FilterHeadSurveyBean } from '../../beans/filter-head-survey.bean';
import { ApiHTTPService } from '../../service/api-http.service';
import { BaseComponent } from '../../base-component';
import { UserService } from '../../service/user.service';

declare var $: any;

@Component({
  selector: 'app-filter-head-survey',
  templateUrl: './filter-head-survey.component.html',
  styleUrls: ['./filter-head-survey.component.css']
})
export class FilterHeadSurveyComponent extends BaseComponent implements OnInit {

  @Input() surveyTypeCode: string;
  @Output() notifyFilter: EventEmitter<FilterHeadSurveyBean> = new EventEmitter<FilterHeadSurveyBean>();
  @Output() changeFilter: EventEmitter<FilterHeadSurveyBean> = new EventEmitter<FilterHeadSurveyBean>();

  private api: ApiHTTPService;
  public filterBean: FilterHeadSurveyBean;
  public villageData: any;
  public osmData: any;
  public isDisabledOSM = true;
  public isDisabledName = true;
  public description: any = {round: '', village: 'ทั้งหมด', osm: 'ทั้งหมด', name: ''};
  public headerList: any = [];
  public isStaff: boolean;
  public currentDocumentId: string;

  constructor(private http: Http) {
    super();
    this.api = new ApiHTTPService();
    this.filterBean = new FilterHeadSurveyBean();
    this.filterBean.villageId = '';
    this.filterBean.osmId = '';
    this.filterBean.fullName = '';
    if(this.isStaffRole(this.userInfo.roleId)){
      this.isStaff = true;
      this.setupVillage();
    }else{
      this.isStaff = false;
      this.filterBean.villageId = this.userInfo.villageId;
      this.filterBean.osmId = this.userInfo.personId;
      this.description.village = this.userInfo.villageName;
      this.description.osm = this.userInfo.fullName;
    }
     
  } 

  ngOnInit() {
    this.setupHeaderList();
  }
  setupHeaderList(){
    let _self = this;
    this.api.api_SurveyHeaderList(this.surveyTypeCode, function(response){
      _self.headerList = response;
      for(let item of _self.headerList){
        _self.filterBean.status = item.status;
        if(item.status == '2'){
          _self.filterBean.rowGUID = item.rowGUID;
          _self.currentDocumentId = item.rowGUID;
          _self.description.round = item.round;
          _self.onSearchFilter();
          break;
        }
      }
    });
  }

  setupVillage() { // Get list of village no
    let self = this;
    this.api.api_villageList(this.getHospitalCode(),function(response){
      self.villageData = response; 
    });
  }
  setupOSM() {
    
    let self = this;
    self.filterBean.osmId='';
    self.isDisabledOSM = false;
    this.api.api_OsmList(this.filterBean.villageId, function (response) {
      self.osmData = response;
      self.isDisabledOSM = false;
      self.isDisabledName = false;
    })

  }

  onChangeRound(select:any) {
    console.log(select);
    for(let item of select.options){
      if(item.value==select.value){
        this.description.round = item.text;
      }
    }

    this.onDropdownChange();
  }

  onChangeVillage(select: any) {
    for(let item of select.options){
      if(item.value==select.value){
        this.description.village = item.text;
      }
    }
    this.setupOSM();
    this.onDropdownChange();
  }

  onChangeOSM(select: any) {
    for(let item of select.options){
      if(item.value==select.value){
        this.description.osm = item.text;
      }
    }
    this.onDropdownChange();
  }

  onSearchFilter() {

    let str = '<b>ผลลัพธ์การค้นหา </b>';
    str +='รอบสำรวจ: ' + this.description.round;
    str += ' , หมู่บ้าน: ' + this.description.village;
    str += ' , อสม.: ' + this.description.osm;
    str += ' , ชื่อ: ' + this.filterBean.fullName;
    this.filterBean.description = str;
    this.notifyFilter.emit(this.filterBean);
    console.log("=== Filter Header Search DocumentId ===");
    console.log(this.filterBean);
  }

  onDropdownChange() {
    this.changeFilter.emit(this.filterBean);
  }

  onClearFilter(){
    this.filterBean.rowGUID = this.currentDocumentId;
    this.filterBean.villageId = '';
    this.filterBean.osmId = '';
    this.filterBean.fullName = '';
  }
}
