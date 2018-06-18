import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActionCustomViewMapsComponent, ActionCustomViewHistoryComponent, ActionCustomSurveyHistoryComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from '../../../ng2-smart-table';
import { PatientBean } from '../../../beans/patient.bean'
import { MapsBean } from '../../../multi-maps/multi-maps.component';
import { Service_SurveyPatient } from '../../../api-managements/service-survey-patient';

declare var $: any;

@Component({
  selector: 'app-survey-patient-list',
  templateUrl: './survey-patient-list.component.html',
  styleUrls: ['./survey-patient-list.component.css']
})
export class SurveyPatientListComponent extends BaseComponent implements OnInit {

  private actionView: any;
  public isCurrent: boolean = false;

  private apiPatient: Service_SurveyPatient;

  public patientType: number = 0;
  public isShowsick: boolean = true;
  public surveyTypeCode: string = "PATIENT";
  public patientbean: PatientBean = new PatientBean();
  public action: string = this.ass_action.ADD;
  public loading: boolean = false;

  public settings: any;
  public isShowList: boolean = true;
  public source: LocalDataSource;

  public filtersearch: FilterHeadSurveyBean;
  public documentId: string;

  //maps variable
  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.apiPatient = new Service_SurveyPatient();

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

          instance.edit.subscribe(row => {
            self.getSurveyData(row.rowGUID);
          });

          instance.delete.subscribe(row => {
            self.actionDelete(row.rowGUID, row.fullName);
          });


          instance.maps.subscribe(row => {
            self.loading = true;

            self.apiPatient.getPatientInfo(row.rowGUID, function (d) {
              let data = d.response;
              if (!self.isEmptyObject(data)) {
                self.param_latitude = data.latitude;
                self.param_longitude = data.longitude;
                self.param_info = 'บ้านของ ' + data.fullName;
                self.param_reset++;
                $("#modalMaps").modal("show");
              }
              self.loading = false;
            });
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
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

  onSearch(event: FilterHeadSurveyBean) {

    let self = this;
    self.loading = true;
    self.filtersearch = event;

    console.log(self.filtersearch.status);

    self.changeTableSetting(self.filtersearch.status);

    if (self.isEmpty(self.documentId)) {
      self.documentId = event.rowGUID;
    }
    self.apiPatient.getListPatient(event, function (response) {
      let totalRows = response.length;
      self.filtersearch.description += '<div class="total-row"><b>'+ totalRows +'</b></div>';
      self.source = self.ng2STDatasource(response);
      self.loading = false;
      self.changeRef.detectChanges();
    });
  }

  onClickMultiMaps() {
    let self = this;

    self.loading = true;

    self.apiPatient.getListPatient(self.filtersearch, function (d) {
      if (!self.isEmptyObject(d)) {
        self.bindMultiMaps(d);
        self.param_reset++;
        self.changeRef.detectChanges();
      }
      $("#modalMultiMaps").modal("show");
      self.loading = false;
    });
  }

  viewHistory(rowGUID) {
    let self = this;

    self.loading = true;

    self.apiPatient.getPatientInfo(rowGUID, function (d) {
      if (d.response && d.status.toUpperCase() == 'SUCCESS') {
        self.patientbean = self.strNullToEmpty(self.cloneObj(d.response));
        self.isCurrent = true;
        self.changeRef.detectChanges();
        $('#modal-history-patient').modal('show');
      }
      self.loading = false;
    })
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

  actionDelete(rowGUID, fullName) {
    let self = this;
    self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + fullName + " ใช่หรือไม่", function (resp) {
      if (resp) {
        self.loading = true;
        self.apiPatient.deletePatient(rowGUID, function (resp) {
          if (resp.response && resp.status.toUpperCase() == 'SUCCESS') {
            self.message_success('', 'ลบรายการสำเร็จ', function () {
              //self.onSearch(self.filtersearch);
              $('#filter-btnSearch').click();
            });
          }
          self.loading = false;
        })
      }
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

    self.apiPatient.getPatientInfo(rowGUID, function (resp) {
      if (resp.response && resp.status.toUpperCase() == 'SUCCESS') {
        self.patientbean = self.cloneObj(resp.response);
        self.onModalForm(self.ass_action.EDIT);
      }
      self.loading = false;
    });
  }

  // change table
  changeTableSetting(status) {
    let self = this;

    if (status == '3') {
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
          renderComponent: ActionCustomSurveyHistoryComponent, onComponentInitFunction(instance) {

            instance.view.subscribe(row => {
              self.viewHistory(row.rowGUID);
            });

          }
        }
      });
    } else if (status == '2') {
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
          renderComponent: ActionCustomViewMapsComponent, onComponentInitFunction(instance) {

            instance.edit.subscribe(row => {
              self.getSurveyData(row.rowGUID);
            });

            instance.delete.subscribe(row => {
              self.actionDelete(row.rowGUID, row.fullName);
            });

            instance.maps.subscribe(row => {
              self.loading = true;

              self.apiPatient.getPatientInfo(row.rowGUID, function (d) {
                if (d.response && d.status.toUpperCase() == 'SUCCESS') {
                  let data = d.response;
                  self.param_latitude = data.latitude;
                  self.param_longitude = data.longitude;
                  self.param_info = 'บ้านของ ' + data.fullName;
                  self.param_reset++;
                  $("#modalMaps").modal("show");
                }
                self.loading = false;
              });
            });

          }
        }
      });
    }
  }
}
