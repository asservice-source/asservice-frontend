import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
import { FilterHeadMosquitoBean } from '../../beans/filter-head-mosquito.bean';


@Component({
  selector: 'app-filter-head-mosquito',
  templateUrl: './filter-head-mosquito.component.html',
  styleUrls: ['./filter-head-mosquito.component.css']
})
export class FilterHeadMosquitoComponent extends BaseComponent implements OnInit {

  @Input() surveyTypeCode: string;
  @Output() notifyFilter: EventEmitter<FilterHeadMosquitoBean> = new EventEmitter<FilterHeadMosquitoBean>();
  @Output() changeFilter: EventEmitter<FilterHeadMosquitoBean> = new EventEmitter<FilterHeadMosquitoBean>();

  public villageNo: string = '0';
  public locationType: string = '0';
  public HomeNo: string = '0';
  public nameLength: number = 10;
  private api: ApiHTTPService;
  public filterBean: FilterHeadMosquitoBean;
  public headerList: any = [];
  public description: any = { round: '', village: 'ทั้งหมด', osm: 'ทั้งหมด', homeType: 'ทั้งหมด', homeName: 'ทั้งหมด' };
  public villageData: any;
  public isDisabledOSM = true;
  public osmData: any;
  public isDisabledName = true;
  public HomeTypeData : any;
  public HomeNameData : any;
  public isStaff: boolean;
  public currentDocumentId: string;

  constructor() {
    super();
    this.api = new ApiHTTPService();
    this.filterBean = new FilterHeadMosquitoBean();
    this.filterBean.villageId = '';
    this.filterBean.osmId = '';
    this.filterBean.fullName = '';
    this.filterBean.homeType = '';
    this.filterBean.homeId = '';

    if(this.userInfo.roleId == '3'){
      this.isStaff = true;
      this.setupVillage();
    }else{
      this.isStaff = false;
      this.filterBean.villageId = this.userInfo.villageId;
      this.filterBean.osmId = this.userInfo.personId;
    }
  }

  ngOnInit() {
    this.setupHeaderList();
    // this.setupVillage();
    this.setupHomeType();
  }

  setupHeaderList() {
    let _self = this;
    this.api.api_SurveyHeaderList(this.surveyTypeCode, function (response) {
      _self.headerList = response;
      for (let item of _self.headerList) {
        _self.filterBean.status = item.status;
        if (item.status == '2') {
          _self.filterBean.rowGUID = item.rowGUID;
          _self.currentDocumentId = item.rowGUID;
          _self.description.round = item.round;
          _self.onSearchFilter();
          break;
        }
      }
    });
  }

  onSearchFilter() {

    let str = '<b>ผลลัพธ์การค้นหา </b>';
    str += 'รอบสำรวจ: ' + this.description.round;
    str += ' , หมู่บ้าน: ' + this.description.village;
    str += ' , อสม.: ' + this.description.osm;
    str += ' , ประเภทสถานที่: ' + this.description.homeType;
    // str += ' , ชื่อ: ' + this.description.homeName;
    this.filterBean.description = str;
    this.notifyFilter.emit(this.filterBean);
    console.log("=== Filter Header Search DocumentId ===");
    console.log(this.filterBean);
  }

  onDropdownChange() {
    this.changeFilter.emit(this.filterBean);
  }

  onChangeRound(select: any) {
    for (let item of select.options) {
      if (item.value == select.value) {
        this.description.round = item.text;
      }
    }

    this.onDropdownChange();
  }

  setupVillage() { // Get list of village no
    let self = this;
    this.api.api_villageList(this.getHospitalCode(),function(response){
      self.villageData = response; 
    });
  }

  onChangeVillage(select: any) {
    for(let item of select.options){
      if(item.value==select.value){
        this.description.village = item.text;
      }
    }
    this.setupOSM();
    // this.setupHomeName();
    this.onDropdownChange();

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

  setupHomeType() {
    let self = this;
    let params = {};
    this.api.post('home/home_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.HomeTypeData = resp.response;
      }
    })
  }

  onChangeHometype(select : any){
    for(let item of select.options){
      if(item.value==select.value){
        this.description.homeType = item.text;
      }
    }
    // this.setupHomeName();
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

  setupHomeName() {
    let self = this;
    let params = {
      "documentId": this.filterBean.rowGUID,
      "villageId": this.filterBean.villageId,
      "homeTypeCode": this.filterBean.homeType
    };

    console.log(params);
    this.api.post('home/home_list_by_village_hometype', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.HomeNameData = resp.response;
      }
      self.filterBean.homeId = '';
    })
  }

  onChangeHomename(select : any){
    for(let item of select.options){
      if(item.value==select.value){
        this.description.homeName = item.text;
      }
    }
  }

  onClearFilter(){
    this.filterBean.rowGUID = this.currentDocumentId;
    this.filterBean.homeType = '';
    if(this.isStaff){
      this.filterBean.villageId = '';
      this.filterBean.osmId = '' 
    }
  }
  

}
