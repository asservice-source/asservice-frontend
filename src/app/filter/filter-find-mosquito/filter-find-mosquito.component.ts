import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../api-managements/api-http.service';
import { findHomeBean } from '../../beans/findhome.bean';
import { HomeBean } from '../../beans/home.bean';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-filter-find-mosquito',
  templateUrl: './filter-find-mosquito.component.html',
  styleUrls: ['./filter-find-mosquito.component.css']
})
export class FilterFindMosquitoComponent extends BaseComponent implements OnInit {

  @Input() findHome: boolean;
  @Input() reset: any;
  @Input() documentId: string;
  @Output() choosePlace: EventEmitter<HomeBean> = new EventEmitter<HomeBean>();

  public villageData: any;
  private api: ApiHTTPService;
  public isShowFind = true;
  public HomeTypeData: any;
  public HomeNameData: any;
  public isHomeDisable: boolean = true;
  public findhomebean: findHomeBean = new findHomeBean();
  public homeBean: HomeBean;
  public source: LocalDataSource = new LocalDataSource();
  public settings: any;
  public isShowPlace: boolean = false;
  public isShowAddPlace: boolean = false;
  public loading: boolean = false;

  constructor(private route: Router, private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    this.homeBean = new HomeBean();
    this.isHomeDisable = true;
    // if(this.userInfo.roleId == '3'){
    //   this.isStaff = true;
    //   this.setupVillage();
    // }else{
    //   this.isStaff = false;
    //   this.filterBean.villageId = this.userInfo.villageId;
    //   this.filterBean.osmId = this.userInfo.personId;
    //   this.setupHome();
    // }

  }

  ngOnInit() {
    this.setupVillage();
    this.setupHomeType();
  }

  ngOnChanges(changes): void {
    console.log("OnChanges");
    console.log(changes);
    if (changes['findHome']) {
      this.isShowFind = this.findHome;

    }
    if (changes['reset']) {
      this.findhomebean.villageId = "";
      this.findhomebean.homeTypeId = "";
      this.filterChanges();

    }
  }

  setupVillage() {
    let self = this;
    this.api.api_villageList(super.getHospitalCode(), function (response) {
      self.villageData = response;
    })
  }

  setupHomeType() {
    let self = this;
    let params = {};
    this.api.post('home/home_type_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log(resp.response);
        self.HomeTypeData = resp.response;
      }
    })
  }

  searchPlace() {
    //this.isShowAddPlace = false;
    this.setupHomeName();
    if (this.findhomebean.homeTypeId) {
      this.changetable();
    }
  }

  unlock() {
    this.isHomeDisable = false;
  }

  setupHomeName() {
    let self = this;
    let params = {
      "villageId": this.findhomebean.villageId,
      "homeTypeCode": this.findhomebean.homeTypeId,
      "documentId": self.documentId,
      "osmId": this.userInfo.roleId == '3' ? "" : this.userInfo.personId
    };

    console.log(params);
    this.loading = true;
    this.api.post('home/home_list_by_village_hometype', params, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.HomeNameData = resp.response;
      }
      self.setUpTable();
      self.changeRef.detectChanges();
    })
  }

  setUpTable() {
    this.source = super.ng2STDatasource(this.HomeNameData);
    this.isShowPlace = true;
  }

  changetable() {

    let self = this;
    if (this.findhomebean.homeTypeId == "01") {
      this.settings = this.getTableSetting({
        homeNo: {
          title: 'เลขที่',
          filter: false,
          width: '80px',
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return '<div class="text-center">' + cell + '</div>'
          }
        },
        homeTypeName: {
          title: 'ประเภท',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return '<div class="text-center">' + cell + '</div>'
          }
        },
        address: {
          title: 'ที่อยู่',
          filter: false
        },
        action: {
          title: '',
          filter: false,
          width: '70',
          type: 'custom',
          renderComponent: SelectHomeListButton,
          onComponentInitFunction(instance) {
            instance.action.subscribe((row: HomeBean) => {
              self.onChoosePlace(row);
            });
          }
        }
      });
    } else {
      this.settings = this.getTableSetting({
        name: {
          title: 'ชื่อ',
          filter: false
        },
        homeTypeName: {
          title: 'ประเภท',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return '<div class="text-center">' + cell + '</div>'
          }
        },
        address: {
          title: 'ที่อยู่',
          filter: false
        },
        action: {
          title: '',
          filter: false,
          width: '70',
          type: 'custom',
          renderComponent: SelectHomeListButton,
          onComponentInitFunction(instance) {
            instance.action.subscribe((row: HomeBean) => {
              self.onChoosePlace(row);
            });
          }
        }
      });
    }
  }

  onChoosePlace(homeBean: HomeBean) {
    console.log(homeBean);
    this.isShowFind = false;
    this.choosePlace.emit(homeBean);
  }

  filterChanges() {
    this.isShowPlace = false;
  }

}

@Component({
  template: "<div class=\"text-center\"><button (click)=\"choose();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">เลือก</button></div>",
})
export class SelectHomeListButton implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    // this.renderValue = this.value.toString();
  }

  choose() {
    // console.log(this.rowData);
    this.action.emit(this.rowData);
  }
}