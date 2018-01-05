import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterBean } from "../../../beans/filter.bean";
import { PersonalHomeBean } from '../../../beans/personal-home.bean';
import { HomeBean } from '../../../beans/home.bean';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
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
  public currentRoundId: string;
  public filterBean: any;
  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;
  public loading: boolean = false;
  public isStaff: boolean;

  
  constructor(private http: Http, private router: Router, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    if(this.isStaffRole(this.userInfo.roleId)){
      this.isStaff = true;
    }else{
      this.isStaff = false;
    }
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
          if (cell == true || cell == "true") {
            surveyStatus = '<div class="text-center text-green">สำรวจแล้ว</div>';
          } else {
            surveyStatus = '<div class="text-center text-red">ยังไม่สำรวจ</div>';
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
            let roundId = self.currentRoundId;
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
    this.filterBean = event;
    console.log(this.filterBean);
    let self = this;
    let roundId = event.roundId;
    let villageId = event.villageId;
    let osmId = event.osmId;
    let homeId = event.homeId;
    let suyveyStatus = event.suyveyStatus;
    if(this.isEmpty(this.currentRoundId)){
      self.currentRoundId = roundId;
    }
   
    self.bindHomeList(roundId, villageId, osmId, homeId, suyveyStatus);
  }

  onClickAdd() {
    let self = this;

    // this.paramHome = new PersonalHomeBean();
    // this.action = this.ass_action.ADD;
    // this.changeRef.detectChanges();

    // $("app-management-osm-area-form #modalForm").modal({ backdrop: 'static', keyboard: false });

    self.router.navigate(['/main/managements/osm/home/type01']);
  }

  bindHomeList(roundId: string, villageId: string, osmId: string, homeId: string, suyveyStatus: string) {
    let self = this;

    self.loading = true;

    let URL_LIST_HOME: string = "survey_population/search_population_list";
    let params = { "documentId": roundId, "villageId": villageId, "osmId": osmId, "homeId": homeId };

    self.apiHttp.post(URL_LIST_HOME, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);

        let data = [];
        if (suyveyStatus == "0") {
          for (let item of d.response) {
            if (item.isSurvey == true || item.isSurvey == "true") {
              data.push(item);
            }
          }
        } else if (suyveyStatus == "1") {
          for (let item of d.response) {
            if (item.isSurvey == false || item.isSurvey == "false") {
              data.push(item);
            }
          }
        } else {
          data = d.response;
        }

        self.source = new LocalDataSource(data);
        self.setNg2STDatasource(self.source);
        self.isShowTable = true;
      } else {
        console.log('survey-personal-home-list(bindHomeList) occured error(s) => ' + d.message);
      }
      
      self.loading = false;
      self.changeRef.detectChanges();
    });
  }
}

@Component({
  template: "<div class=\"text-center\"><button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">ทำแบบสำรวจ</button></div>",
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