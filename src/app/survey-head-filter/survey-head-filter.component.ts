import { Component, OnInit,Output, Input ,EventEmitter} from '@angular/core';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Http, Response, RequestOptions, RequestMethod } from "@angular/http";
import {HeadFilterBean} from '../beans/survey-head-filter.Bean';
import { ApiHTTPService } from '../service/api-http.service';
import { BaseComponent } from '../base-component';

declare var $;

@Component({
  selector: 'app-survey-head-filter',
  templateUrl: './survey-head-filter.component.html',
  styleUrls: ['./survey-head-filter.component.css']
})
export class SurveyHeadFilterComponent extends BaseComponent implements OnInit {

  @Input() set surveyTypeCode(surveyTypeCode: string) {
    this.typeCode = surveyTypeCode;
  }
  
  URL_LIST_VILLAGE_NO: string = "village/village_no_list";
  URL_LIST_OSM_AND_HOME_NO: string = "osm/osm_and_home_list_by_village";

  public list_village_no;
  public list_osm;
  public list_round_no;

  private apiHttp = new ApiHTTPService();
  @Output() notifyFilter: EventEmitter<HeadFilterBean> = new EventEmitter<HeadFilterBean>();
  public filterBean: HeadFilterBean;

  public villageID = 0;
  public OSMID = 0;
  public typeCode: string;
  public villageList;
  public roundID : number = 1;

  constructor(private http: Http) {
    super();
    this.filterBean = new HeadFilterBean();
    this.filterBean.villageID = 0;
    this.filterBean.OSMID = 0;
    this.filterBean.roundID = 0;

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

  getOSMbyVillageID(){
    let self = this;
    
        // Get list of village no
        let params_getOSM = { "id": this.filterBean.villageID };
        this.apiHttp.post(this.URL_LIST_OSM_AND_HOME_NO, params_getOSM, function (d) {
          if (d != null && d.status.toUpperCase() == "SUCCESS") {
            self.list_osm = d.list.listOSM;
          }
        })
  }

  doSearchFilter(){
    this.notifyFilter.emit(this.filterBean);
  }
}
