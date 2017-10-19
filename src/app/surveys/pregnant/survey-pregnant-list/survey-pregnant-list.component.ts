import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { BaseComponent } from "./../../../base-component";
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';
declare var $: any

@Component({
  selector: 'app-survey-pregnant-list',
  templateUrl: './survey-pregnant-list.component.html',
  styleUrls: ['./survey-pregnant-list.component.css']
})
export class SurveyPregnantListComponent extends BaseComponent implements OnInit {

  public surveyTypeCode: string = "PREGNANT";
  private api: ApiHTTPService;
  public settings: any;
  public data;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();

  constructor(private http: Http, private router: Router) {
    super();
    this.loadData();
    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTabelSetting({
      name: {
        title: 'ชื่อ - นามสกุล',
        filter: false,
      },
      cID: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      wombNo: {
        title: 'ครรภ์ที่',
        filter: false,
        width: '90px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      bornDueDate: {
        title: 'วันกำหนดคลอด',
        filter: false,
        width: '150px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '120px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe(row => {
            alert(row.action);
          });
        }
      }
    });
  }
  ngOnInit() {
  }

  loadData() {
    this.http.get("assets/test-list.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);

  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
    console.log(event);
    this.source = new LocalDataSource(this.data);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

}
