import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from "../../../base-component";
import { ApiHTTPService } from "../../../service/api-http.service";
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { DeadBean } from '../../../beans/dead.bean';
import { LocalDataSource } from 'ng2-smart-table';
import { Service_SurveyDead } from '../../../service/service-survey-dead';
declare var $: any;

@Component({
  selector: 'app-survey-died-list',
  templateUrl: './survey-died-list.component.html',
  styleUrls: ['./survey-died-list.component.css']
})
export class SurverDiedListComponent extends BaseComponent implements OnInit {

  private apiDead: Service_SurveyDead;
  public settings: any;
  public surveyTypeCode: string = this.surveyHeaderCode.DEATH;
  public isShowList: boolean = false;
  public action: string = this.ass_action.ADD;
  public source: LocalDataSource;
  public bean: DeadBean = new DeadBean();
  public datas: any = [];
  public filterBean: FilterHeadSurveyBean;
  public currentDocumentId: string;
  public loading: boolean = false;
  constructor(private changeRef: ChangeDetectorRef) {
    super();

    this.source = new LocalDataSource();
    this.apiDead = new Service_SurveyDead();
    this.filterBean = new FilterHeadSurveyBean();
    let self = this;

    let columns = {
      fullName: {
        title: 'ชื่อ - นามสกุล',
        width: '120px',
        filter: false
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '50px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          // if (!cell) {
          //   cell = "";
          // }
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      deathDate: {
        title: 'วันที่เสียชีวิต',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let displayDeathDate = self.displayFormatDateTime(cell);
          return '<div class="text-center">' + displayDeathDate + '</div>'
        }
      },
      causeOfDeath: {
        title: 'สาเหตุการเสียชีวิต',
        filter: false,
        width: '230px',
      },
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {

          instance.view.subscribe(row => {
            self.bean = self.cloneObj(row);
            self.onModalForm(self.ass_action.EDIT);
          });

          instance.edit.subscribe(row => {
            self.bean = self.cloneObj(row);
            self.onModalForm(self.ass_action.EDIT);
          });
          instance.delete.subscribe(row => {
            self.onDelete(row);
          });

          // instance.action.subscribe((row: DeadBean, cell) => {
          //   console.log(row);
          //   if(row && row.action.toUpperCase()==self.ass_action.EDIT){
          //     self.bean = self.cloneObj(row);
          //     self.onModalForm(self.ass_action.EDIT);
          //   }
          // });
        }
      }
    };

    this.settings = this.getTableSetting(columns);

  }

  ngOnInit() {

  }

  onChangeFilter(event: FilterHeadSurveyBean) {

  }

  onSearch(event: FilterHeadSurveyBean) {
    this.loading = true;
    this.filterBean = event;
    if (this.isEmpty(this.currentDocumentId)) {
      this.currentDocumentId = event.rowGUID;
    }
    let _self = this;
    this.apiDead.getList(event, function (response) {
      _self.datas = response;
      _self.setupTable();
      _self.loading = false;
    });
  }

  onModalForm(action: string) {
    this.action = action;
    this.changeRef.detectChanges();
    $('#modal-add-died').modal('show');
  }

  onCommit(event: any) {
    console.log(">>> OnCommit");
    this.onSearch(this.filterBean);
  }

  setupTable() {
    this.source = super.ng2STDatasource(this.datas);
    this.isShowList = true;
    this.changeRef.detectChanges();
  }

  onDelete(bean: DeadBean) {
    let _self = this;
    _self.message_comfirm('', 'ต้องการยกเลิกแจ้งการเสียชีวิต <b>' + bean.fullName + '</b> ใช่หรือไม่', function (resp) {
      if (resp) {
        _self.apiDead.commit_del(bean.rowGUID, function (response) {
          if (response && response.status.toUpperCase() == 'SUCCESS') {
            _self.message_success('', 'ยกเลิกแจ้งการเสียชีวิต <b>' + bean.fullName + '</b> เรียบร้อย', function () {
              _self.onSearch(_self.filterBean);
            });

          } else {
            _self.message_error('', 'ไม่สามารถยกเลิกแจ้งการเสียชีวิต <b>' + bean.fullName + '</b> ได้');
          }
        });
      }
    });
  }

}
