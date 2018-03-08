import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { CancerBean } from '../../../beans/cancer.bean';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { FilterBean } from "../../../beans/filter.bean";
import { ActionCustomViewMapsComponent, ActionCustomViewHistoryComponent, ActionCustomSurveyHistoryComponent } from '../../../action-custom-table/action-custom-view.component';
import { MapsBean } from '../../../multi-maps/multi-maps.component';
declare var $;

@Component({
  selector: 'app-survey-cancer-list',
  templateUrl: './survey-cancer-list.component.html',
  styleUrls: ['./survey-cancer-list.component.css']
})
export class SurveyCancerListComponent extends BaseComponent implements OnInit {

  private actionView: any;
  private isCurrent: boolean;

  public cancerType: number = 0;
  public isShowsick: boolean = true;
  public surveyTypeCode: string = "CANCER";
  public cancerbean: CancerBean = new CancerBean();
  public action: string = this.ass_action.ADD;

  public settings: any;
  public columns: any;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();

  public healtInsuranceID = 7;
  public filtersearch: FilterHeadSurveyBean;
  public current_documentId: string;
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

    self.apiHttp = new ApiHTTPService();
    self.filtersearch = new FilterHeadSurveyBean();
    self.columns = {

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
      diseaseStatusType: {
        title: 'สถานะ',
        filter: false,
        type: 'html',
        width: '120px',
        valuePrepareFunction: (cell, row) => {
          let cssClass = (row.diseaseStatusTypeId == '1') ? ' text-inactive' : ' text-active';
          return '<div class="text-center' + cssClass + '">' + row.diseaseStatusTypeName + '</div>';
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
            self.onModalForm(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: CancerBean, cell) => {
            self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + row.fullName + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.rowGUID);
              }
            });
          });

          instance.maps.subscribe(row => {
            self.loading = true;

            let param = { "rowGUID": row.rowGUID };

            self.apiHttp.post('survey_patient/patient_by_rowguid', param, function (d) {
              let data = d.response;
              if (!self.isEmptyObject(data)) {
                self.param_latitude = row.latitude;
                self.param_longitude = row.longitude;
                self.param_info = 'บ้านของ ' + row.fullName;
                self.param_reset++;
                $("#modalMaps").modal("show");
              }
              self.loading = false;
            });
          });

        }
      }
    };
    self.settings = self.getTableSetting(self.columns);
  }

  ngOnInit(): void {

  }

  onChangeFilter(event: FilterHeadSurveyBean) {

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

    self.apiHttp.post('survey_patient/filter', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(resp.response);
        self.source = self.ng2STDatasource(resp.response);
        self.isShowList = true;
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

  onModalForm(action: string) {
    let self = this;

    self.action = action;
    if (action == self.ass_action.EDIT) {
      self.getSurveyData(self.cancerbean.rowGUID);
    } else {
      self.changeRef.detectChanges();
      $('#find-person-md').modal('show');
    }
  }

  onSearch(event: FilterHeadSurveyBean) {
    let self = this;

    self.filtersearch = event;
    if (self.isEmpty(self.current_documentId)) {
      self.current_documentId = event.rowGUID;
    }

    if (self.current_documentId == event.rowGUID) {
      self.columns.action = {
        title: 'การทำงาน',
        filter: false,
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: CancerBean, cell) => {
            self.cancerbean = self.cloneObj(row);
            self.onModalForm(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: CancerBean, cell) => {
            self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + row.fullName + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.rowGUID);
              }
            });
          });

          instance.maps.subscribe(row => {
            self.loading = true;

            let param = { "rowGUID": row.rowGUID };

            self.apiHttp.post('survey_patient/patient_by_rowguid', param, function (d) {
              let data = d.response;
              if (!self.isEmptyObject(data)) {
                self.param_latitude = row.latitude;
                self.param_longitude = row.longitude;
                self.param_info = 'บ้านของ ' + row.fullName;
                self.param_reset++;
                $("#modalMaps").modal("show");
              }
              self.loading = false;
            });
          });

        }
      };
      self.settings = self.getTableSetting(self.columns);
    } else {
      self.columns.action = {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomSurveyHistoryComponent, onComponentInitFunction(instance) {
          instance.view.subscribe(row => {
            self.onHistory(row);
          });
        }
      }
      self.settings = self.getTableSetting(self.columns);
    }

    self.loadData(event);
  }

  onClickMultiMaps() {
    let self = this;

    self.loading = true;

    let param = { "documentId": self.filtersearch.rowGUID, "villageId": self.filtersearch.villageId, "osmId": self.filtersearch.osmId, "name": self.filtersearch.fullName, };

    let params = JSON.stringify(param);

    self.apiHttp.post('survey_patient/filter', params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(d.response);
        self.param_reset++;
        self.changeRef.detectChanges();
      }
      $("#modalMultiMaps").modal("show");
      self.loading = false;
    });

  }

  reloadData(event: any) {
    let self = this;

    if (event) {
      self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจผู้ป่วยมะเร็ง', function () {
        // self.loadData(self.filtersearch);
        $('#filter-btnSearch').click();
      });
    } else {
      self.message_error('', 'Error');
    }
  }

  onHistory(row) {
    let self = this;

    self.loading = true;

    let param = { "rowGUID": row.rowGUID };

    self.apiHttp.post('survey_patient/patient_by_rowguid', param, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.cancerbean = d.response;
        self.changeRef.detectChanges();
        $('#modal-cancer-history').modal('show');
      }
      self.loading = false;
    });
  }

  changStatusNo() {
    let self = this;

    if (self.mStatusNo == 21) {
      self.isDisable = false;
    } else {
      self.isDisable = true;
    }
  }

  actionDelete(rowguid) {
    let self = this;
    self.loading = true;
    let param = {
      "rowGUID": rowguid
    };

    self.apiHttp.post('survey_patient/del', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ลบรายการสำเร็จ', function () {
          $('#filter-btnSearch').click();
        });
      }
      self.loading = false;
    });
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
    let param = { "rowGUID": rowGUID };
    self.apiHttp.post('survey_patient/patient_by_rowguid', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.cancerbean = resp.response;
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
      self.loading = false;
    });
  }

}

