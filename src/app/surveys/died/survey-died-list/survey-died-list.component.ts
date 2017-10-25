import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from "../../../base-component";
import { ApiHTTPService } from "../../../service/api-http.service";
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { DiedBean } from '../../../beans/died.bean';
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
  public isShowList: boolean = true;
  public action: string = this.ass_action.ADD;
  public source: LocalDataSource = new LocalDataSource();
  public diedBean: DiedBean = new DiedBean();
  public datas = [
    {
      seq: 1,
      fullName: "Mr. Leanne Graham",
      citizenId: "1-4113-00-1349-8-9",
      causeName: "ลืมหายใจ",
      causeCode: "1",
      age: 38,
    },
    {
      seq: 2,
      fullName: "Mr. Ervin Howell",
      citizenId: "1-4113-00-1349-8-0",
      causeName: "ลืมหายใจ",
      causeCode: "1",
      age: 37,
    },
    {
      seq: 11,
      fullName: "Mr. Nicholas DuBuque",
      citizenId: "1-4113-00-2259-6-4",
      causeName: "ลืมหายใจ",
      causeCode: "1",
      age: 3,
    },
    {
      seq: 12,
      fullName: "Mr. Nicholas DuBuque",
      citizenId: "1-4113-00-2254-6-2",
      causeName: "ลืมหายใจ",
      causeCode: "1",
      age: 4,
    },
    {
      seq: 13,
      fullName: "Mr. Nicholas DuBuque",
      citizenId: "1-4113-00-3259-6-5",
      causeName: "ลืมหายใจ",
      causeCode: "1",
      age: 42,

    },
  ];

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.api = new ApiHTTPService();
    let self = this;
    let columns = {
      fullName: {
        title: 'ชื่อ - นามสกุล',
        filter: false
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      cause: {
        title: 'สาเหตุการเสียชีวิต',
        filter: false,
        width: '180px',
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
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
          instance.action.subscribe((row: DiedBean, cell) => {
            console.log(row);
            if(row && row.action.toUpperCase()==self.ass_action.EDIT){
              self.diedBean = row;
              self.onModalFrom(self.ass_action.EDIT);
            }
          });
        }
      }
    };

    this.settings = this.getTabelSetting(columns);

  }
  ngOnInit() {
    this. setUpTable();
  }
  onChangeFilter(event: FilterHeadSurveyBean) {
   // this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
    this. setUpTable();
  }

  onModalFrom(action: string){
    this.action = action;
    this.changeRef.detectChanges();
    $('#modal-add-died').modal('show');
  }

  setUpTable(){               
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }
  
}
