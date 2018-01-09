import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { FilterBean } from "../../beans/filter.bean";
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../api-managements/api-http.service';
@Component({
  selector: 'app-filter-personal',
  templateUrl: './filter-personal.component.html',
  styleUrls: ['./filter-personal.component.css']
})
export class FilterPersonalComponent extends BaseComponent implements OnInit {

  private apiHttp = new ApiHTTPService();

  @Output() notifyFilter: EventEmitter<FilterBean> = new EventEmitter<FilterBean>();
  public filterBean: FilterBean;

  // List of Data
  public description: any = { round: '', village: 'ทั้งหมด', osm: 'ทั้งหมด', homeNo: '', status: 'ทั้งหมด' };
  public listRound: any = [];
  public listVillageNo;
  public listOsm;
  public listHomeNo;
  public isDisabledOSM: boolean = true;
  public isDisabledHomeNo: boolean = true;
  public isStaff: boolean;

  constructor(private http: Http) {
    super();
    this.filterBean = new FilterBean();
    

  }

  ngOnInit() {
    let self = this;
    self.bindRound();
    if(this.isStaffRole(this.userInfo.roleId)){
      this.isStaff = true;
      self.bindVillageNo();
    }else{
      this.isStaff = false;
      this.filterBean.villageId = this.userInfo.villageId;
      this.filterBean.osmId = this.userInfo.personId;
      this.description.village = this.userInfo.villageName;
      this.description.osm = this.userInfo.fullName;
      self.bindHomeNo(this.userInfo.villageId, this.userInfo.personId);
    }

    self.onSearchFilter();
  }

  onChangeRound(select: any) {
    let self = this;
    for (let item of select.options) {
      if (item.value == select.value) {
        self.description.round = item.text;
      }
    }
  }

  onChangeVillageNo(select: any) {
    let self = this;

    self.isDisabledOSM = true;
    self.isDisabledHomeNo = true;

    if (self.filterBean.villageId == "") {
      self.listOsm = [];
      self.listHomeNo = [];

      self.filterBean.osmId = "";
      self.filterBean.homeId = "";

      self.isDisabledOSM = true;
      self.isDisabledHomeNo = true;
    } else {
      self.bindOSM(self.filterBean.villageId);
      self.bindHomeNo(self.filterBean.villageId, self.filterBean.osmId);
    }

    let options = select.options;
    for(let item of options){
      if(item.value==this.filterBean.villageId){
        this.description.village = item.text;
        break;
      }
    }
  }

  onChangeOSM(select: any) {
    let self = this;
    self.isDisabledHomeNo = true;
    self.bindHomeNo(self.filterBean.villageId, self.filterBean.osmId);

    let options = select.options;
    for(let item of options){
      if(item.value==select.value){
        this.description.osm = item.text;
        break;
      }
    }
  }

  onChangeHome(select:any){
    let options = select.options;
    for(let item of options){
      if(item.value==select.value){
        this.description.homeNo = item.text;
        break;
      }
    }
  }
  onChangeStatus(select:any){
    let options = select.options;
    for(let item of options){
      if(item.value==select.value){
        this.description.status = item.text;
        break;
      }
    }
  }
  bindRound() {
    let self = this;

    this.apiHttp.api_SurveyHeaderList(self.surveyHeaderCode.POPULATION, function (response) {
      self.listRound = response;

      let currentRound = self.getCurrentRound(self.listRound);
      if (currentRound) {
        self.filterBean.roundId = currentRound.rowGUID;
        self.description.round = currentRound.round;
        self.onSearchFilter();
      }
    });
  }

  bindVillageNo() {
    let self = this;

    this.apiHttp.api_villageList(this.getHospitalCode(), function (response) {
      self.listVillageNo = response;
    });
  }

  bindOSM(villageId: string) {
    let self = this;

    this.apiHttp.api_OsmList(villageId, function (response) {
      self.listOsm = response;
      self.filterBean.osmId = "";
      self.isDisabledOSM = false;
    });
  }

  bindHomeNo(villageId: string, osmId: string) {
    let self = this;

    this.apiHttp.api_HomeList(villageId, osmId,"", function (response) {
      self.listHomeNo = response;
      self.filterBean.homeId = "";
      self.isDisabledHomeNo = false;
    });
  }

  

  public getCurrentRound(listRound) {
    let self = this;

    for (let item of listRound) {
      if (item.status == '2') { // รอบปัจจุบัน
        return item;
      }
    }
  }

  onSearchFilter() {
    console.log('------------description-------------')
    console.log(this.description);
    let self = this;
    let str = '<b>ผลลัพธ์การค้นหา </b>';
    str +='รอบสำรวจ: ' + this.description.round;
    str += ' , หมู่บ้าน: ' + (this.isEmpty(this.description.village)?'ทั้งหมด':this.description.village);
    str += ' , อสม.: ' + (this.isEmpty(this.description.osm)?'ทั้งหมด':this.description.osm);
    str += ' , บ้านเลขที่: ' + (this.isEmpty(this.description.homeNo)?'ทั้งหมด':this.description.homeNo);
    str += ' , สถานะ: ' + (this.isEmpty(this.description.status)?'ทั้งหมด':this.description.status);
    this.filterBean.description = str;
    self.notifyFilter.emit(self.filterBean);
  }

  onClearFilter() {
    let currentRound = this.getCurrentRound(this.listRound);
    if (currentRound) {
      this.filterBean.roundId = currentRound.rowGUID;
      this.description.round = currentRound.round;
    } else {
      this.filterBean.roundId = "";
    }
    this.description.village = '';
    this.description.osm = '';
    this.description.status = '';
    this.description.homeNo = '';
    this.filterBean.homeId = "";
    this.filterBean.suyveyStatus = "";
    if(this.isStaff){
      this.filterBean.villageId = "";
      this.filterBean.osmId = "";
      this.isDisabledOSM = true;
      this.isDisabledHomeNo = true;
      
    }else{
      this.description.village = this.userInfo.villageName;
      this.description.osm = this.userInfo.fullName;
    }
  
    
  }

}
