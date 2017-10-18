import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from "../../../base-component";
import { ApiHTTPService } from "../../../service/api-http.service";
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';

declare var $: any;

@Component({
  selector: 'app-survey-died-list',
  templateUrl: './survey-died-list.component.html',
  styleUrls: ['./survey-died-list.component.css']
})
export class SurverDiedListComponent extends BaseComponent implements OnInit {
  // Datatables options
  // dtOptions: DataTables.Settings = {};
  private api: ApiHTTPService;
  public settings: any;
  public surveyTypeCode: string = 'DEATH';
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  public datas = [
    {
      seq: 1,
      name: "Leanne Graham",
      citizenId: "1-4113-00-1349-8-9",
      reason: "ลืมหายใจ",
      age: 38,
      status: "ยืนยัน"
    },
    {
      seq: 2,
      name: "Ervin Howell",
      citizenId: "1-4113-00-1349-8-0",
      reason: "ลืมหายใจ",
      age: 54,
      status: "ยืนยัน"

    },
    {
      seq: 11,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2259-6-4",
      reason: "ลืมหายใจ",
      age: 32,
      status: "ยืนยัน"

    },
    {
      seq: 12,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2254-6-2",
      reason: "ลืมหายใจ",
      age: 62,
      status: "ยืนยัน"

    },
    {
      seq: 13,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-3259-6-5",
      reason: "ลืมหายใจ",
      age: 42,
      status: "ยืนยัน"

    },
  ];

  constructor() {
    super();
    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTabelSetting({
      seq: {
        title: 'ลำดับ',
        filter: false,
        sort: false,
        width: '60px',
      },
      name: {
        title: 'ชื่อ - นามสกุล',
        filter: false
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
      },
      reason: {
        title: 'สาเหตุการเสียชีวิต',
        filter: false,
        width: '180px',
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
      },
      status: {
        title: 'สถานะ',
        filter: false,
        width: '90px',
      },
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          /*
          instance.view.subscribe(row => {
             self.doClick(row);
           });
           instance.edit.subscribe(row => {
             self.doClick(row);
           });
           instance.delete.subscribe(row => {
             self.doClick(row);
           });
           */
          instance.action.subscribe(row => {
            alert(row.action);
          });
        }
      }
    });

  }
  ngOnInit() {

  }
  onChangeFilter(event: FilterHeadSurveyBean) {
    this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

}
