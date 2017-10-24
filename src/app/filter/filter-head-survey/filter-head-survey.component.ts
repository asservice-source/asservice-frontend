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

  private api: ApiHTTPService;
  public filterBean: FilterHeadSurveyBean;
  public typeCode: string;
  public villageData: any;
  public osmData: any;
  public isDisabledOSM = true;
  public isDisabledName = true;

  constructor(private http: Http) {
    super();
    this.api = new ApiHTTPService();
    this.filterBean = new FilterHeadSurveyBean();
    this.filterBean.roundId = '1';
    this.filterBean.villageId = '';
    this.filterBean.osmId = '';
    this.filterBean.name = '';
  } 

  ngOnInit() {
    this.setUpVillage();
  }

  setUpVillage() { // Get list of village no
    let self = this;
    let params = { "hospitalCode": super.getHospitalCode() };
    this.api.post('village/village_no_list_by_hospital', params, function (resp) {
      console.log(self.villageData);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.villageData = resp.list; 
      }
    })
  }
  setUpOSM() {
    
    let self = this;
    self.filterBean.osmId='';
    self.isDisabledOSM = false;
    let params = { "id": this.filterBean.villageId};
    this.api.post('osm/osm_list_by_village', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.osmData = resp.list;
        self.isDisabledOSM = false;
        self.isDisabledName = false;
      }
    })
  }

  onChangeRound() {
    this.onDropdownChange();
  }

  onChangeVillage() {
    this.setUpOSM();
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
