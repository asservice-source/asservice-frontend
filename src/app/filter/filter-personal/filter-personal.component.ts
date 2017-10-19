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
  public list_village_no;
  public list_home_no;
  public list_osm;

  public isDisabledOSM: boolean = true;
  public isDisabledHomeNo: boolean = true;

  constructor(private http: Http) {
    super();

    this.filterBean = new FilterBean();
  }

  ngOnInit() {
    let self = this;

    self.bindVillageNo();
  }

  onChangeVillageNo() {
    let self = this;

    self.isDisabledOSM = true;
    self.isDisabledHomeNo = true;

    if (self.filterBean.villageId == "") {
      self.list_osm = [];
      self.list_home_no = [];

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

    let URL_LIST_VILLAGE_NO: string = "village/village_no_list_by_hospital";
    let params_getVillageNo = { "hospitalCode": this.getHospitalCode() };

    self.apiHttp.post(URL_LIST_VILLAGE_NO, params_getVillageNo, function (d) {
      if (d && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.list_village_no = d.list;
      }
    })
  }

  bindOSM(villageId: string) {
    let self = this;

    let URL_LIST_OSM: string = "osm/osm_list_by_village";
    let params_getOSM = { "id": self.filterBean.villageId };

    self.apiHttp.post(URL_LIST_OSM, params_getOSM, function (d) {
      if (d && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.list_osm = d.list;
        self.filterBean.osmId = "";
        self.isDisabledOSM = false;
      }
    });
  }

  bindHomeNo(villageId: string, osmId: string) {
    let self = this;

    let URL_LIST_HOME_NO: string = "home/home_no_list_by_village_or_osm";
    let params_getHomeNo = { "id": villageId, "osmId": osmId };

    self.apiHttp.post(URL_LIST_HOME_NO, params_getHomeNo, function (d) {
      if (d && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.list_home_no = d.list;
        self.filterBean.homeId = "";
        self.isDisabledHomeNo = false;
      }
    });
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
