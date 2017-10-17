import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { FilterBean } from "../beans/filter.bean";
import { BaseComponent } from '../base-component';
import { ApiHTTPService } from '../service/api-http.service';
@Component({
  selector: 'app-filter-personal',
  templateUrl: './filter-personal.component.html',
  styleUrls: ['./filter-personal.component.css']
})
export class FilterPersonalComponent extends BaseComponent implements OnInit {
  private apiHttp = new ApiHTTPService();

  @Output() notifyFilter: EventEmitter<FilterBean> = new EventEmitter<FilterBean>();
  public filterBean: FilterBean;

  // Call api url
  private URL_LIST_VILLAGE_NO: string = "village/village_no_list";
  private URL_LIST_OSM: string = "osm/osm_and_home_list_by_village";
  private URL_LIST_HOME_NO: string = "osm/osm_and_home_list_by_village";

  // Data
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

    // Get list of village no
    let params_getVillageNo = { "hospitalCode": this.getHospitalCode() };
    this.apiHttp.post(this.URL_LIST_VILLAGE_NO, params_getVillageNo, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.list_village_no = d.list;
      }
    })
  }

  changeVillageNo() {
    let self = this;

    self.isDisabledOSM = true;
    self.isDisabledHomeNo = true;

    // Get list of osm
    let params_getOSM = { "id": self.filterBean.villageID };
    this.apiHttp.post(this.URL_LIST_OSM, params_getOSM, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.list_osm = d.list[0].listOSM;
        self.filterBean.OSMID = "";
        self.isDisabledOSM = false;
      }
    });

    // Get list of home no
    let params_getHomeNo = { "id": self.filterBean.villageID };
    this.apiHttp.post(this.URL_LIST_HOME_NO, params_getHomeNo, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.list_home_no = d.list[0].listHome;
        self.filterBean.homeID = "";
        self.isDisabledHomeNo = false;
      }
    });
  }

  doSearchFilter() {
    this.notifyFilter.emit(this.filterBean);
  }
}
