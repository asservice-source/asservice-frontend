import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { CancerBean } from '../../../beans/cancer.bean';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { FilterBean } from "../../../beans/filter.bean";
import { ActionCustomViewMapsComponent } from '../../../action-custom-table/action-custom-view.component';
import { MapsBean } from '../../../multi-maps/multi-maps.component';
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
  public loading: boolean;

  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  mStatusNo = 0;
  isDisable = true;

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private paramHomeId: string;

  public isShowTable: boolean = false;
  public tempData: Array<any> = [];

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.api = new ApiHTTPService();
    self.filtersearch = new FilterHeadSurveyBean();
    self.settings = self.getTableSetting({

      fullName: {
        title: 'ชื่อ-สกุล',
        filter: false,
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      cancerTypeName: {
        title: 'ชนิดของมะเร็ง',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="wrap-text" title="' + cell + '">' + this.displaySubstring(cell) + '</div>'
        }
      },
      genderName: {
        title: 'เพศ',
        filter: false,
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        type: 'html',
        width: '60px',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      diseaseStatusTypeName: {
        title: 'สถานะ',
        filter: false,
        type: 'html',
        width: '120px',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: CancerBean, cell) => {
            self.cancerbean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: CancerBean, cell) => {
            self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + row.fullName + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.rowGUID);
              }
            });
          });

          instance.maps.subscribe(row => {
            self.param_latitude = row.latitude;
            self.param_longitude = row.longitude;
            self.param_info = 'บ้านของ ' + row.fullName;
            $("#modalMaps").modal("show");
          });

        }
      }
    });
  }

  ngOnInit(): void {

  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    //this.isShowList = false;
  }

  loadData(event: FilterHeadSurveyBean) {
    let self = this;

    self.loading = true;

    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "osmId": event.osmId,
      "name": event.fullName,
    };

    let params = JSON.stringify(param);

    self.api.post('survey_patient/filter', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(resp.response);
        self.datas = resp.response;
        self.setUpTable();
      }
      self.changeRef.detectChanges();
      self.loading = false;
    });
  }

  bindMultiMaps(data) {
    let self = this;

    self.param_listPosition = [];
    for (let item of data) {
      if (item.latitude && item.longitude) {
        let map = new MapsBean();
        map.latitude = item.latitude;
        map.longitude = item.longitude;
        map.info = 'บ้านของ ' + item.fullName;
        self.param_listPosition.push(map);
      }
    }
  }

  setUpTable() {
    this.source = this.ng2STDatasource(this.datas);
    this.isShowList = true;
  }

  onModalFrom(action: string) {
    this.action = action;
    if (action == this.ass_action.EDIT) {
      this.getSurveyData(this.cancerbean.rowGUID);
    } else {
      this.changeRef.detectChanges();
      $('#find-person-md').modal('show');
    }
  }

  onSearch(event: FilterHeadSurveyBean) {
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
    }
    this.loadData(event);
  }

  onClickMultiMaps() {
    let self = this;

    self.param_reset++;
    self.changeRef.detectChanges();
    $("#modalMultiMaps").modal("show");
  }

  reloadData(event: any) {
    let self = this;
    if (event) {
      self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจผู้ป่วยมะเร็ง', function () {
        //self.loadData(self.filtersearch);
        $('#filter-btnSearch').click();
      });
    } else {
      self.message_error('', 'Error');
    }
  }

  changStatusNo() {
    if (this.mStatusNo == 21) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }

  actionDelete(rowguid) {
    let self = this;

    self.loading = true;

    let param = {
      "rowGUID": rowguid
    };

    self.api.post('survey_patient/del', param, function (resp) {
      console.log("actionDelete ==== " + resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ลบรายการสำเร็จ', function () {
          //self.loadData(self.filtersearch);
          $('#filter-btnSearch').click();
        });
      }
      self.loading = false;
    })
  }

  displaySubstring(string: string) {
    let strValue;
    if (string.length > 25) {
      strValue = string.substring(0, 25) + '...';
    } else {
      strValue = string;
    }
    return strValue;
  }

  getSurveyData(rowGUID) {
    let self = this;

    self.loading = true;

    let param = {
      "rowGUID": rowGUID
    }

    self.api.post('survey_patient/patient_by_rowguid', param, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.cancerbean = resp.response;
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
    });
  }

}

