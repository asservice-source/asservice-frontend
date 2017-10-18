import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Http, Response, RequestOptions, RequestMethod } from "@angular/http";
import { FilterHeadSurveyBean } from '../../beans/filter-head-survey.Bean';
import { ApiHTTPService } from '../../service/api-http.service';
import { BaseComponent } from '../../base-component';

declare var $: any;

@Component({
  selector: 'app-filter-head-survey',
  templateUrl: './filter-head-survey.component.html',
  styleUrls: ['./filter-head-survey.component.css']
})
export class FilterHeadSurveyComponent extends BaseComponent implements OnInit {

  @Input() set surveyTypeCode(surveyTypeCode: string) {
    this.typeCode = surveyTypeCode;
    console.log(this.typeCode);
  }

  @Output() notifyFilter: EventEmitter<FilterHeadSurveyBean> = new EventEmitter<FilterHeadSurveyBean>();
  @Output() changeFilter: EventEmitter<FilterHeadSurveyBean> = new EventEmitter<FilterHeadSurveyBean>();

  URL_LIST_VILLAGE_NO: string = "village/village_no_list";
  URL_LIST_OSM_AND_HOME_NO: string = "osm/osm_and_home_list_by_village";

  public list_village_no;
  public list_osm;
  public list_round_no;

  private apiHttp: ApiHTTPService;
  public filterBean: FilterHeadSurveyBean;
  public typeCode: string;
  public villageList;

  constructor(private http: Http) {
    super();
    this.apiHttp = new ApiHTTPService();
    this.filterBean = new FilterHeadSurveyBean();
    this.filterBean.roundID = 1;
    this.filterBean.villageID = 0;
    this.filterBean.OSMID = 0;
    this.filterBean.name = '';
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

  // getVillageNo() {
  //   let param = { "hospitalCode": "04269" };
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers, method: "post" });

  //   this.http.post("http://192.168.1.203:8080/API-ASService/village/village_no_list", param, options)
  //     .map(res => res.json())
  //     .subscribe(data => this.villageList=data.list);
  // }

  getOSMbyVillageID() {
    let self = this;
    // Get list of village no
    let params_getOSM = { "id": this.filterBean.villageID };
    this.apiHttp.post(this.URL_LIST_OSM_AND_HOME_NO, params_getOSM, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.list_osm = d.list.listOSM;
      }
    })

  }

  onChangeRound() {
    this.onDropdownChange();
  }

  onChangeVillage() {
    this.onDropdownChange();
  }

  onChangeOSM() {
    this.onDropdownChange();
  }

  onSearchFilter() {
    this.notifyFilter.emit(this.filterBean);
  }

  onDropdownChange() {
    this.changeFilter.emit(this.filterBean);
  }

}
