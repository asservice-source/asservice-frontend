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
    if (self.isStaffRole(self.userInfo.roleId)) {
      self.isStaff = true;
      self.bindVillageNo();
    } else {
      self.isStaff = false;
      self.filterBean.villageId = self.userInfo.villageId;
      self.filterBean.osmId = self.userInfo.personId;
      self.description.village = self.userInfo.villageName;
      self.description.osm = self.userInfo.fullName;
      self.bindHomeNo(self.userInfo.villageId, self.userInfo.personId);
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
    for (let item of options) {
      if (item.value == self.filterBean.villageId) {
        self.description.village = item.text;
        break;
      }
    }
  }

  onChangeOSM(select: any) {
    let self = this;

    self.isDisabledHomeNo = true;
    self.bindHomeNo(self.filterBean.villageId, self.filterBean.osmId);

    let options = select.options;
    for (let item of options) {
      if (item.value == select.value) {
        self.description.osm = item.text;
        break;
      }
    }
  }

  onChangeHome(select: any) {
    let options = select.options;
    for (let item of options) {
      if (item.value == select.value) {
        this.description.homeNo = item.text;
        break;
      }
    }
  }

  onChangeStatus(select: any) {
    let options = select.options;
    for (let item of options) {
      if (item.value == select.value) {
        this.description.status = item.text;
        break;
      }
    }
  }

  bindRound() {
    let self = this;

    self.apiHttp.api_SurveyHeaderList(self.surveyHeaderCode.POPULATION, function (response) {
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

    self.apiHttp.api_villageList(self.getHospitalCode(), function (response) {
      self.listVillageNo = response;
    });
  }

  bindOSM(villageId: string) {
    let self = this;

    self.apiHttp.api_OsmList(villageId, function (response) {
      self.listOsm = response;
      self.filterBean.osmId = "";
      self.isDisabledOSM = false;
    });
  }

  bindHomeNo(villageId: string, osmId: string) {
    let self = this;

    self.apiHttp.api_HomeList(villageId, osmId, "", function (response) {
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
    let self = this;

    console.log('------------description-------------')
    console.log(self.description);

    let str = '<b>ผลลัพธ์การค้นหา </b>';
    str += 'รอบสำรวจ: ' + self.description.round;
    str += ' , หมู่บ้าน: ' + (self.isEmpty(self.description.village) ? 'ทั้งหมด' : self.description.village);
    str += ' , อสม.: ' + (self.isEmpty(self.description.osm) ? 'ทั้งหมด' : self.description.osm);
    str += ' , บ้านเลขที่: ' + (self.isEmpty(self.description.homeNo) ? 'ทั้งหมด' : self.description.homeNo);
    str += ' , สถานะ: ' + (self.isEmpty(self.description.status) ? 'ทั้งหมด' : self.description.status);
    self.filterBean.description = str;
    self.notifyFilter.emit(self.filterBean);
  }

  onClearFilter() {
    let self = this;

    let currentRound = self.getCurrentRound(self.listRound);
    if (currentRound) {
      self.filterBean.roundId = currentRound.rowGUID;
      self.description.round = currentRound.round;
    } else {
      self.filterBean.roundId = "";
    }
    self.description.village = "";
    self.description.osm = "";
    self.description.status = "";
    self.description.homeNo = "";
    self.filterBean.homeId = "";
    self.filterBean.surveyStatus = "";

    if (self.isStaff) {
      self.filterBean.villageId = "";
      self.filterBean.osmId = "";
      self.isDisabledOSM = true;
      self.isDisabledHomeNo = true;
    } else {
      self.description.village = self.userInfo.villageName;
      self.description.osm = self.userInfo.fullName;
    }
  }

}
