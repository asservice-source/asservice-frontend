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
  public description: any = { round: '', village: 'ทั้งหมด', osm: 'ทั้งหมด', name: '' };
  public listSurvey: any = [];
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

    self.bindSurvey();
    self.bindVillageNo();

    self.onSearchFilter();
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

  bindSurvey() {
    let self = this;

    this.apiHttp.api_SurveyHeaderList(self.surveyHeaderCode.POPULATION, function (response) {
      self.listSurvey = response;
      for (let item of self.listSurvey) {
        if (item.status == '2') {
          self.filterBean.roundId = item.rowGUID;
          self.description.round = item.round;
          self.onSearchFilter();
          break;
        }
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

    this.apiHttp.api_HomeList(villageId, osmId, function (response) {
      self.listHomeNo = response;
      self.filterBean.homeId = "";
      self.isDisabledHomeNo = false;
    });
  }

  onChangeRound(select: any) {
    // console.log(select);
    for (let item of select.options) {
      if (item.value == select.value) {
        this.description.round = item.text;
      }
    }
  }

  onSearchFilter() {
    this.notifyFilter.emit(this.filterBean);
  }

  onClearFilter() {
    let self = this;

    self.filterBean.roundId = "";
    self.filterBean.villageId = "";
    self.filterBean.osmId = "";
    self.filterBean.homeId = "";

    self.isDisabledOSM = true;
    self.isDisabledHomeNo = true;
  }

}
