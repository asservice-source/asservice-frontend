import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { CancerBean } from '../../../beans/cancer.bean';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { FilterBean } from "../../../beans/filter.bean";
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';

declare var $;

@Component({
  selector: 'app-survey-cancer-list',
  templateUrl: './survey-cancer-list.component.html',
  styleUrls: ['./survey-cancer-list.component.css']
})
export class SurveyCancerListComponent extends BaseComponent implements OnInit {

  public cancerType: number = 0;
  public isShowsick: boolean = true;
  public surveyTypeCode: string = "CANCER";
  public cancerbean: CancerBean = new CancerBean();
  public action: string = this.ass_action.ADD;

  private api: ApiHTTPService;
  public settings: any;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  public healtInsuranceID = 7;
  public datas: any = [];
  public filtersearch: FilterHeadSurveyBean;
  public documentId: string;

  mStatusNo = 0;
  isDisable = true;

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private paramHomeId: string;

  
  public isShowTable: boolean = false;
  public tempData: Array<any> = [];

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;
    this.api = new ApiHTTPService();
    this.filtersearch = new FilterHeadSurveyBean();
    this.settings = this.getTableSetting({

      fullName: {
        title: 'ชื่อ-สกุล',
        filter: false,
      },
      age: {
        title: 'อายุ',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      cancerTypeName: {
        title: 'ชนิดของมะเร็ง',
        filter: false,
      },
      patientDate: {
        title: 'วันที่ป่วย',
        filter: false
      },
      telephone: {
        title: 'เบอร์ติดต่อ',
        filter: false
      },
      diseaseStatusTypeName: {
        title: 'สถานะ',
        filter: false
      },
      action: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: CancerBean) => {
            
            $("#modalCancer").modal({ backdrop: 'static', keyboard: false });
          });

          instance.edit.subscribe((row: CancerBean, cell) => {
            self.cancerbean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
        });

        instance.delete.subscribe((row: CancerBean, cell) => {
          self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ : " + row.fullName + " ใช่หรือไม่", function (resp) {
            if (resp) {
              self.actionDelete(row.cancerType);
              self.loadData(self.filtersearch);
            }
          });
         });
        }
      }
    });
  }


  ngOnInit(): void {
    
  }
  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    this.isShowList = false;
  }
  loadData(event: FilterHeadSurveyBean){
    let self = this;
    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "osmId": event.osmId,
      "name": event.fullName,
      "rowGUID": ""
    };
    let params = JSON.stringify(param);

    this.api.post('survey_patient/filter', params, function (resp) {
      console.log("loadData ==== " + resp.status);
      
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.datas = [];
        console.log(resp);
        for (let item of resp.response) {
          console.log("dataCancer2 ____________ " + item.patientSurveyTypeCode);
          if (item.patientSurveyTypeCode == 'Cancer') {          
            self.datas.push(item);
          } 
        }
        self.setUpTable();
      }
    })
  }

  setUpTable() {
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

  actionDelete(rowguid) {
    let self = this;
    let param = {
      "rowGUID": rowguid
    };
    this.api.post('survey_patient/del', param, function (resp) {
      console.log("actionDelete ==== " + resp);

      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
      }
    })
  }

  onModalFrom(action: string) {
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

  onSearch(event: FilterHeadSurveyBean) {
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
    }
    this.loadData(event);
  }

  reloadData(event: any) {
    if (event) {
      this.loadData(this.filtersearch);
    }
  }

  changStatusNo() {
    if (this.mStatusNo == 21) {
      this.isDisable = false;

    } else {
      this.isDisable = true;
    }
  }

  
}

