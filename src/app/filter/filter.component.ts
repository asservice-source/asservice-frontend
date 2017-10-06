import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { FilterBean } from "../beans/filter.bean";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() notifyFilter: EventEmitter<FilterBean> = new EventEmitter<FilterBean>();
  public filterBean: FilterBean;

  // Call api url
  URL_LIST_VILLAGE_NO: string = "http://192.168.2.227:8080/API-ASService/village/village_no_list?hospitalCode=04269"; //?hospitalCode=04269
  URL_LIST_HOME_NO: string = "";
  URL_LIST_OSM: string = "";

  // Data
  list_village_no: any = [];
  list_home_no: any = [];
  list_osm: any = [];

  constructor(private http: Http) {
    this.filterBean = new FilterBean();
    this.filterBean.villageID = 0;
    this.filterBean.homeID = 0;
    this.filterBean.OSMID = 0;
  }

  ngOnInit() {

    // Get list of village no
    this.http.get(this.URL_LIST_VILLAGE_NO)
      .map(res => res.json().list)
      .subscribe(data => this.list_village_no = data);

    // // Get list of home no
    // this.http.get(this.URL_LIST_HOME_NO)
    //   .map(res => res.json().list)
    //   .subscribe(data => this.list_home_no = data);

    // // Get list of osm
    // this.http.get(this.URL_LIST_OSM)
    //   .map(res => res.json().list)
    //   .subscribe(data => this.list_osm = data);

  }

  doSearchFilter() {
    this.notifyFilter.emit(this.filterBean);
  }
}
