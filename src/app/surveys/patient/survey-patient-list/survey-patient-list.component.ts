import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';
import { PatientBean } from '../../../beans/patient.bean'
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

  private api: ApiHTTPService;
  public settings: any;
  public loading;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  public healtInsuranceID = 7;
  public datas: any = [];
  public filtersearch: FilterHeadSurveyBean;
  public documentId: string;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    this.api = new ApiHTTPService();
    let self = this;
    this.filtersearch = new FilterHeadSurveyBean();
    this.settings = this.getTableSetting({

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
        renderComponent: ActionCustomView_2_Component,
        onComponentInitFunction(instance) {
          instance.edit.subscribe((row: PatientBean, cell) => {
            self.patientbean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: PatientBean, cell) => {
            self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + row.fullName + " ใช่หรือไม่", function (resp) {
              if (resp) {
                self.actionDelete(row.rowGUID);
              }
            });
          });
        }
      }
    });
  }

  ngOnInit() {
  }

  checkPatient() {
    if (this.patientType == 1) {
      this.isShowsick = false;
    } else if (this.patientType == 2) {
      $("#disabled").hide();
    }
  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    //this.isShowList = false;
  }

  loadData(event: FilterHeadSurveyBean) {
    let self = this;
    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "osmId": event.osmId,
      "name": event.fullName,
    };
    let params = JSON.stringify(param);
    console.log(params);
    self.loading = true;
    this.api.post('survey_patient/filter', params, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.datas = resp.response
        // for (let item of resp.response) {
        //   if (item.patientSurveyTypeCode != 'Cancer') {
        //     self.datas.push(item);
        //   }
        // }
        // console.log("==============================================");
        console.log(self.datas);
        self.setUpTable();
      }
      self.changeRef.detectChanges();
    })
  }

  onSearch(event: FilterHeadSurveyBean) {
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
    }
    this.loadData(event);
  }

  setUpTable() {
    // this.source = new LocalDataSource(this.datas);
    // this.isShowList = true;
    // super.setNg2STDatasource(this.source);
    this.source = this.ng2STDatasource(this.datas);
    this.isShowList = true;
  }

  onModalFrom(action: string) {
    this.action = action;
    if (action == this.ass_action.EDIT) {
      this.getSurveyData(this.patientbean.rowGUID);
    } else {
      this.changeRef.detectChanges();
      $('#find-person-md').modal('show');
    }

  }

  reloadData(event: any) {
    // if (event) {
    //   this.loadData(this.filtersearch);
    // }
    let self = this;
    if (event) {
      this.message_success('', 'ท่านได้ทำการส่งแบบสำรวจผู้พิการ และผู้ป่วยติดเตียงแล้ว', function () {
        self.loadData(self.filtersearch);
      });
    } else {
      this.message_error('', 'Error');
    }

  }

  actionDelete(rowguid) {
    let self = this;
    let param = {
      "rowGUID": rowguid
    };
    self.loading = true;
    this.api.post('survey_patient/del', param, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ลบรายการสำเร็จ', function () {
          self.loadData(self.filtersearch);
        });
      }
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
    let param = {
      "rowGUID": rowGUID
    }
    self.loading = true;
    this.api.post('survey_patient/patient_by_rowguid', param, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.patientbean = resp.response;
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
    })
  }

}
