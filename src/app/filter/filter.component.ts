import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { FilterBean } from "../beans/filter.bean";
import { BaseComponent } from '../base-component';
import { ApiHTTPService } from '../service/api-http.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent extends BaseComponent implements OnInit {

  private apiHttp = new ApiHTTPService();

  @Output() notifyFilter: EventEmitter<FilterBean> = new EventEmitter<FilterBean>();
  public filterBean: FilterBean;

  // Call api url
  URL_LIST_VILLAGE_NO: string = "village/village_no_list";
  URL_LIST_OSM_AND_HOME_NO: string = "osm/osm_and_home_list_by_village";

  // Data
  public list_village_no;
  public list_home_no;
  public list_osm;

  constructor(private http: Http) {
    super();
    this.filterBean = new FilterBean();
    this.filterBean.villageID = 0;
    this.filterBean.homeID = 0;
    this.filterBean.OSMID = 0;
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

    // // Get list of osm and home no.
    let params_getOSM = { "id": "1" };
    this.apiHttp.post(this.URL_LIST_OSM_AND_HOME_NO, params_getOSM, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.list_osm = d.listOSM;
        self.list_home_no = d.listHome;
      }
    })

  }

  doSearchFilter() {
    this.notifyFilter.emit(this.filterBean);
  }
}
