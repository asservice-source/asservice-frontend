import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterBean } from "../../../beans/filter.bean";
import { PersonalHomeBean } from '../../../beans/personal-home.bean';
import { HomeBean } from '../../../beans/home.bean';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
declare var $: any;

@Component({
  selector: 'app-survey-personal-home-list',
  templateUrl: './survey-personal-home-list.component.html',
  styleUrls: ['./survey-personal-home-list.component.css']
})
export class SurveyPersonalHomeListComponent extends BaseComponent implements OnInit, AfterViewInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  public action: string = this.ass_action.ADD;
  public homeBean: HomeBean = new HomeBean();
  public paramHome: PersonalHomeBean = new PersonalHomeBean();

  public filterRoundId: string = "";

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;

  constructor(private http: Http, private router: Router, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.settings = self.getTableSetting({
      villageNo: {
        title: 'หมู่',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      homeNo: {
        title: 'บ้านเลขที่',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      holderName: {
        title: 'ชื่อ-สกุล หัวหน้าครอบครัว',
        filter: false,
        width: '200px'
      },
      memberAmount: {
        title: 'จำนวนสมาชิก',
        filter: false,
        width: '110px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      isSurvey: {
        title: 'สถานะการสำรวจ',
        filter: false,
        width: '110px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          var surveyStatus = '';
          if (cell === true) {
            surveyStatus = '<div class="text-center" style="color: green;">สำรวจแล้ว</div>';
          } else {
            surveyStatus = '<div class="text-center" style="color: red;">ยังไม่สำรวจ</div>';
          }
          return surveyStatus;
        }
      },
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: SurveyPersonalHomeListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonalHomeBean) => {
            // console.log(row);
            let homeId = row.homeId;
            let roundId = self.filterRoundId;
            self.router.navigate(['/main/surveys/personal-detail', homeId, roundId]);
          });
        }
      }
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  onClickSearch(event: FilterBean) {
    let self = this;

    let roundId = event.roundId;
    let villageId = event.villageId;
    let osmId = event.osmId;
    let homeId = event.homeId;
    self.filterRoundId = roundId;

    self.bindHomeList(roundId, villageId, osmId, homeId);

    // this.http.get("assets/data_test/data_home_personal.json")
    //   .map(res => res.json())
    //   .subscribe((data) => {
    //     self.source = new LocalDataSource(data);
    //     self.setNg2STDatasource(self.source);
    //     self.isShowTable = true;
    //   });
  }

  onClickAdd() {
    this.paramHome = new PersonalHomeBean();
    this.action = this.ass_action.ADD;
    this.changeRef.detectChanges();
    
    $("app-management-osm-area-form #modalForm").modal({ backdrop: 'static', keyboard: false });
  }

  bindHomeList(roundId: string, villageId: string, osmId: string, homeId: string) {
    let self = this;

    self.loading = true;
    
    let URL_LIST_HOME: string = "survey_population/search_population_list";
    let params = { "documentId": roundId, "villageId": villageId, "osmId": osmId, "homeId": homeId };

    self.apiHttp.post(URL_LIST_HOME, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);
        self.source = new LocalDataSource(d.response);
        self.setNg2STDatasource(self.source);
        self.isShowTable = true;
      } else {
        console.log('survey-personal-home-list(bindHomeList) occured error(s) => ' + d.message);
      }
      self.loading = false;
    });
  }
}

@Component({
  template: "<div class=\"text-center\"><button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">จัดการสมาชิก</button></div>",
})
export class SurveyPersonalHomeListButtonEditComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  clickEdit() {
    this.action.emit(this.rowData);
  }
}