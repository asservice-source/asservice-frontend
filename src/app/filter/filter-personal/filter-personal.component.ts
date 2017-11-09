import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { FilterBean } from "../../beans/filter.bean";
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
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
  public listVillageNo;
  public listOsm;
  public listHomeNo;

  public isDisabledOSM: boolean = true;
  public isDisabledHomeNo: boolean = true;

  constructor(private http: Http) {
    super();

    this.filterBean = new FilterBean();
  }

  ngOnInit() {
    let self = this;

    self.bindVillageNo();

    self.doSearchFilter();
  }

  onChangeVillageNo() {
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
  }

  onChangeOSM() {
    let self = this;

    self.isDisabledHomeNo = true;

    self.bindHomeNo(self.filterBean.villageId, self.filterBean.osmId);
  }

  bindVillageNo() {
    let self = this;

    this.apiHttp.api_villageList(this.getHospitalCode(), function (response) {
      self.listVillageNo = response;
    });
    // let URL_LIST_VILLAGE_NO: string = "village/village_no_list_by_hospital";
    // let params = { "hospitalCode": this.getHospitalCode() };

    // self.apiHttp.post(URL_LIST_VILLAGE_NO, params, function (d) {
    //   if (d && d.status.toUpperCase() == "SUCCESS") {
    //     // console.log(d);
    //     self.list_village_no = d.response;
    //   } else {
    //     console.log('filter-personal(bindVillageNo) occured error(s) => ' + d.message);
    //   }
    // });
  }

  bindOSM(villageId: string) {
    let self = this;

    this.apiHttp.api_OsmList(villageId, function (response) {
      self.listOsm = response;
      self.filterBean.osmId = "";
      self.isDisabledOSM = false;
    });
    // let URL_LIST_OSM: string = "osm/osm_list_by_village";
    // let params = { "villageId": self.filterBean.villageId };

    // self.apiHttp.post(URL_LIST_OSM, params, function (d) {
    //   if (d && d.status.toUpperCase() == "SUCCESS") {
    //     // console.log(d);
    //     self.listOsm = d.response;
    //     self.filterBean.osmId = "";
    //     self.isDisabledOSM = false;
    //   } else {
    //     console.log('filter-personal(bindOSM) occured error(s) => ' + d.message);
    //   }
    // });
  }

  bindHomeNo(villageId: string, osmId: string) {
    let self = this;

    this.apiHttp.api_HomeList(villageId, osmId, function (response) {
      self.listHomeNo = response;
      self.filterBean.homeId = "";
      self.isDisabledHomeNo = false;
    });
    // let URL_LIST_HOME_NO: string = "home/home_no_list_by_village_or_osm";
    // let params = { "villageId": villageId, "osmId": osmId };

    // self.apiHttp.post(URL_LIST_HOME_NO, params, function (d) {
    //   if (d && d.status.toUpperCase() == "SUCCESS") {
    //     // console.log(d);
    //     self.listHomeNo = d.response;
    //     self.filterBean.homeId = "";
    //     self.isDisabledHomeNo = false;
    //   } else {
    //     console.log('filter-personal(bindHomeNo) occured error(s) => ' + d.message);
    //   }
    // });
  }

  doSearchFilter() {
    this.notifyFilter.emit(this.filterBean);
  }

  doClearFilter() {
    let self = this;

    this.filterBean.villageId = "";
    this.filterBean.osmId = "";
    this.filterBean.homeId = "";

    self.isDisabledOSM = true;
    self.isDisabledHomeNo = true;
  }

}
