import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ViewCell, LocalDataSource } from '../../../ng2-smart-table';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterBean } from "../../../beans/filter.bean";
import { PersonalHomeBean } from '../../../beans/personal-home.bean';
import { HomeBean } from '../../../beans/home.bean';
import { BaseComponent } from '../../../base-component';
import { Service_SurveyPersonal } from '../../../api-managements/service-survey-personal';
declare var $: any;

@Component({
  selector: 'app-survey-personal-home-list',
  templateUrl: './survey-personal-home-list.component.html',
  styleUrls: ['./survey-personal-home-list.component.css']
})
export class SurveyPersonalHomeListComponent extends BaseComponent implements OnInit {

  private api: Service_SurveyPersonal = new Service_SurveyPersonal();
  public action: string = this.ass_action.ADD;
  public homeBean: HomeBean = new HomeBean();
  public paramHome: PersonalHomeBean = new PersonalHomeBean();
  public currentRoundId: string;
  public filterBean: FilterBean;
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
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      holderName: {
        title: 'ชื่อ-สกุล หัวหน้าครอบครัว',
        filter: false
      },
      memberAmount: {
        title: 'จำนวนสมาชิก',
        filter: false,
        width: '130px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      isSurvey: {
        title: 'สถานะ',
        filter: false,
        width: '100px',
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
          instance.action.subscribe((row) => {
            // console.log(row);
            if(row.isCurrent){
              let homeId = row.homeId;
              let roundId = self.currentRoundId;
              let fromPage = 'survey';
              self.router.navigate(['/main/surveys/personal-detail', homeId, roundId, fromPage]);
            }else{
              self.onHistory(row.homeId);
            }
          });
        }
      }
    });
  }

  ngOnInit(): void {

  }


  onClickSearch(event: FilterBean) {
    this.filterBean = event;
    
    if(this.isEmpty(this.currentRoundId)){
      this.currentRoundId = event.roundId;
    }
   console.log(this.filterBean);
    this.bindHomeList(event);
  }

  onHistory(homeId: any){
    window.open('history/surveys/personal/'+homeId+'/'+(this.filterBean.roundId)+'/', '_blank');
  }

  bindHomeList(event: FilterBean) {

    let self = this;
    let roundId = event.roundId;
    let villageId = event.villageId;
    let osmId = event.osmId;
    let homeId = event.homeId;
    let surveyStatus = event.surveyStatus;
    self.loading = true;
    self.api.getListHome(roundId, villageId, osmId, homeId, function (response) {

      let data = [];
      if (surveyStatus == "0") {
        for (let item of response) {
          if (item.isSurvey == true || item.isSurvey == "true") {
            data.push(item);
          }
        }
      } else if (surveyStatus == "1") {
        for (let item of response) {
          if (item.isSurvey == false || item.isSurvey == "false") {
            data.push(item);
          }
        }
      }else {
        data = response;
      }
      let totalRows = data.length;
      self.filterBean.description += '<div class="total-row"><b>'+ totalRows +'</b></div>';
      self.source = self.ng2STDatasource(data);
      self.isShowTable = true;
      self.loading = false;
      self.changeRef.detectChanges();
    });
  }
}

@Component({
  template: '<div class="text-center">'
  +'<button *ngIf="!rowData.isWithoutOSM && rowData.isCurrent" (click)="clickEdit();" class="btn btn-sm btn-primary">ทำแบบสำรวจ</button>'
  +'<a *ngIf="!rowData.isCurrent" (click)="clickHistory();" class="cell-action glyphicon glyphicon-list-alt"></a>'
  +'<label *ngIf="rowData.isWithoutOSM && rowData.isCurrent" class="value">ไม่มี อสม.</label>'
  +'</div>',
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
  clickHistory() {
    this.action.emit(this.rowData);
  }
}
