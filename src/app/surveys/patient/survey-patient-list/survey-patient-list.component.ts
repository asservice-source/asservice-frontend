import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { ActionCustomViewMapsComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';
import { PatientBean } from '../../../beans/patient.bean'
import { MapsBean } from '../../../multi-maps/multi-maps.component';
declare var $: any;

@Component({
  selector: 'app-survey-patient-list',
  templateUrl: './survey-patient-list.component.html',
  styleUrls: ['./survey-patient-list.component.css']
})
export class SurveyPatientListComponent extends BaseComponent implements OnInit {

  public patientType: number = 0;
  public isShowsick: boolean = true;
  public surveyTypeCode: string = "PATIENT";
  public patientbean: PatientBean = new PatientBean();
  public action: string = this.ass_action.ADD;

  private apiHttp: ApiHTTPService;
  public loading: boolean = false;

  public settings: any;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();

  public healtInsuranceID = 7;
  public filtersearch: FilterHeadSurveyBean;
  public documentId: string;

  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.apiHttp = new ApiHTTPService();
    self.filtersearch = new FilterHeadSurveyBean();

    self.settings = self.getTableSetting({
      fullName: {
        title: 'ชื่อ - นามสกุล',
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
      remark: {
        title: 'สาเหตุความพิการ/ป่วย',
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
        width: '60px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      patientTypeName: {
        title: 'ประเภท',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {

          instance.edit.subscribe((row: PatientBean, cell) => {
            self.patientbean = self.cloneObj(row);
            self.onModalForm(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: PatientBean, cell) => {
            self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + row.fullName + " ใช่หรือไม่", function (confirm) {
              if (confirm) {
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

  ngOnInit() {

  }

  checkPatient() {
    let self = this;

    if (self.patientType == 1) {
      self.isShowsick = false;
    } else if (self.patientType == 2) {
      $("#disabled").hide();
    }
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
      self.loading = false;
      self.changeRef.detectChanges();
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
      self.getSurveyData(self.patientbean.rowGUID);
    } else {
      self.changeRef.detectChanges();
      $('#find-person-md').modal('show');
    }
  }

  onSearch(event: FilterHeadSurveyBean) {
    let self = this;

    self.filtersearch = event;
    if (self.isEmpty(self.documentId)) {
      self.documentId = event.rowGUID;
    }
    self.loadData(event);
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
      self.message_success('', 'ท่านได้ทำการส่งแบบสำรวจผู้พิการ และผู้ป่วยติดเตียงแล้ว', function () {
        // self.loadData(self.filtersearch);
        $('#filter-btnSearch').click();
      });
    } else {
      self.message_error('', 'Error');
    }
  }

  actionDelete(rowguid) {
    let self = this;

    self.loading = true;

    let params = { "rowGUID": rowguid };

    self.apiHttp.post('survey_patient/del', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ลบรายการสำเร็จ', function () {
          // self.loadData(self.filtersearch);
          $('#filter-btnSearch').click();
        });
      }
      self.loading = false;
    });
  }

  displaySubstring(string: string) {
    let strValue;
    if (string) {
      if (string.length > 25) {
        strValue = string.substring(0, 25) + '...';
      } else {
        strValue = string;
      }
      return strValue;
    } else {
      strValue = "";
      return strValue;
    }
  }

  getSurveyData(rowGUID) {
    let self = this;

    self.loading = true;

    let params = { "rowGUID": rowGUID };

    self.apiHttp.post('survey_patient/patient_by_rowguid', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.patientbean = resp.response;
        self.strNullToEmpty(self.patientbean)
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
      self.loading = false;
    });
  }

}
