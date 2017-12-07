import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
import { findHomeBean } from '../../beans/findhome.bean';
import { HomeBean } from '../../beans/home.bean';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

declare var $: any;

@Component({
  selector: 'app-filter-find-mosquito',
  templateUrl: './filter-find-mosquito.component.html',
  styleUrls: ['./filter-find-mosquito.component.css']
})
export class FilterFindMosquitoComponent extends BaseComponent implements OnInit {

  @Input() findHome: boolean;
  @Input() reset: any;
  @Input() documentId : string;
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

  constructor() {
    super();
    this.api = new ApiHTTPService();
    this.homeBean = new HomeBean();
    this.isHomeDisable = true;
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
    this.api.post('home/home_type_list_hici', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log(resp.response);
        self.HomeTypeData = resp.response;
      }
    })
  }

  searchPlace() {
    this.setupHomeName();
    if(this.findhomebean.homeTypeId){
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
      "homeTypeCode" : this.findhomebean.homeTypeId,
      "documentId": self.documentId
    };
    this.api.post('home/home_list_by_village_hometype', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.HomeNameData = resp.response;
      }
      self.setUpTable();
    })
  }

  setUpTable() {
    this.source = super.ng2STDatasource(this.HomeNameData);
    this.isShowPlace = true;
  }

  changetable(){

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