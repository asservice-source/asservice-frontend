import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from "../../../base-component";
import { ActionCustomView_2_Component, ActionCustomSurveyHistoryComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { DeadBean } from '../../../beans/dead.bean';
import { LocalDataSource } from 'ng2-smart-table';
import { Service_SurveyDead } from '../../../api-managements/service-survey-dead';
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
  public action: string = this.ass_action.ADD;
  public source: LocalDataSource;
  public bean: DeadBean = new DeadBean();
  public datas: any = [];
  public filterBean: FilterHeadSurveyBean;
  public currentDocumentId: string;
  public loading: boolean = false;
  public columns: any;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.apiDead = new Service_SurveyDead();
    this.filterBean = new FilterHeadSurveyBean();
    let _self = this;

    this.columns = {
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
          return '<div class="text-center">' + _self.formatCitizenId(cell) + '</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '50px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      deathDate: {
        title: 'วันที่เสียชีวิต',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let displayDeathDate = _self.displayFormatDateTime(cell);
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
        renderComponent: ActionCustomView_2_Component,
        onComponentInitFunction(instance) {
          instance.edit.subscribe(row => {
            _self.onEdit(row);
          });
          instance.delete.subscribe(row => {
            _self.onDelete(row);
          });
        }
      }
    };

    _self.settings =  _self.getTableSetting(_self.columns);

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
    if(_self.currentDocumentId == event.rowGUID){
      _self.columns.action = {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomView_2_Component,
        onComponentInitFunction(instance) {
          instance.edit.subscribe(row => {
            _self.onEdit(row);
          });
          instance.delete.subscribe(row => {
            _self.onDelete(row);
          });
        }
      }

      _self.settings =  _self.getTableSetting(_self.columns);

    }else{
      _self.columns.action = {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyHistoryComponent,
        onComponentInitFunction(instance) {
          instance.view.subscribe(row => {
            _self.onHistory(row);
          });
        }
      }
      _self.settings =  _self.getTableSetting(_self.columns);
    }
    _self.apiDead.getList(event, function (response) {
      _self.source = _self.ng2STDatasource(response);
      _self.loading = false;
      _self.changeRef.detectChanges();
      
      
    });
  }
  onModalForm(action: string) {
    this.action = action;
    this.changeRef.detectChanges();
    $('#modal-add-died').modal('show');
  }
  onHistory(row: any) {
    let _self = this;
    _self.loading=true;
    _self.apiDead.getDeadInfo(row.rowGUID, function(resp){
      _self.loading=false;
      let response = resp.response;
      if(response && resp.status.toUpperCase()=='SUCCESS'){
        _self.bean = _self.cloneObj(response);
        _self.changeRef.detectChanges();
        $('#modal-history-died').modal('show');
      }else{
        _self.message_servNotRespond('','ไม่สามารถทำรายการได้ในขณะนี้');
      }
    });
  }
  onAdd(){
    this.onModalForm(this.ass_action.ADD);
  }
  onEdit(row: any){
    let _self = this;
    _self.loading=true;
    _self.apiDead.getDeadInfo(row.rowGUID, function(resp){
      
      _self.loading=false;
      let response = resp.response;
      if(response && resp.status.toUpperCase()=='SUCCESS'){
        _self.bean = _self.cloneObj(response);
        _self.onModalForm(_self.ass_action.EDIT);
      }else{
        _self.message_servNotRespond('','ไม่สามารถทำรายการได้ในขณะนี้');
      }
    });
  }
  
  onCompleted(event: any) {
    let _seft = this;
    if(event.success){
      this.message_success('', event.message, function(){
        $('#filter-btnSearch').click();
      });
      
    }else{
      this.message_error('',event.message);
    }
  }

  onDelete(bean: DeadBean) {
    let _self = this;
    _self.message_comfirm('', 'ต้องการยกเลิกแจ้งการเสียชีวิต <b>' + bean.fullName + '</b> ใช่หรือไม่', function (resp) {
      if (resp) {
        _self.apiDead.commit_del(bean.rowGUID, function (response) {
          if (response && response.status.toUpperCase() == 'SUCCESS') {
            _self.message_success('', 'ยกเลิกแจ้งการเสียชีวิต <b>' + bean.fullName + '</b> เรียบร้อย', function () {
              $('#filter-btnSearch').click();
            });

          } else {
            _self.message_error('', 'ไม่สามารถยกเลิกแจ้งการเสียชีวิต <b>' + bean.fullName + '</b> ได้');
          }
        });
      }
    });
  }

}
