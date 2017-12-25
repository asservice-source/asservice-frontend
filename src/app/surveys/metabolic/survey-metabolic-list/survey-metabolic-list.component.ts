import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { MetabolicBean } from '../../../beans/metabolic.bean';
declare var $: any;

@Component({
  selector: 'app-survey-metabolic-list',
  templateUrl: './survey-metabolic-list.component.html',
  styleUrls: ['./survey-metabolic-list.component.css']
})
export class SurveyMetabolicListComponent extends BaseComponent implements OnInit {

  public year = '2560';
  public citizenID: string = "0";

  public loading;
  public data;
  public mooID: number = 0;
  public xxx: string;
  public check: boolean = false;
  public metabolicHeadID: number = 0;
  public surveyTypeCode: string = "METABOLIC";
  public isShowList: boolean = true;
  public source: LocalDataSource;
  public metabolicbean: MetabolicBean = new MetabolicBean();
  public action: string = this.ass_action.ADD;
  public filtersearch: FilterHeadSurveyBean;

  private api: ApiHTTPService;
  public settings: any;
  public documentId: string;

  constructor(private http: Http, private router: Router, private changeRef: ChangeDetectorRef) {
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
      homeNo: {
        title: 'บ้านเลขที่',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (value) => {
          return '<div class="text-center">' + value + '</div>'
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
        width: '80px',
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
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          instance.edit.subscribe((row: MetabolicBean, cell) => {
            self.metabolicbean = self.cloneObj(row);
            self.onModalFrom(self.ass_action.EDIT);
          });

          instance.delete.subscribe((row: MetabolicBean, cell) => {
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

  save() {
    this.check = true
  }

  loadData(event: FilterHeadSurveyBean) {
    let self = this;
    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "osmId": event.osmId,
      "name": event.fullName
    };
    let params = JSON.stringify(param);
    this.loading = true;
    this.api.post('survey_metabolic/search_metabolic_list', params, function (resp) {
      console.log(resp);
      self.loading = false; //ทำไมมันข้าม
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.data = resp.response;
        self.setUpTable();

      }
      self.changeRef.detectChanges();
    })

  }


  actionDelete(rowguid) {
    let self = this;
    let param = {
      "rowGUID": rowguid
    };
    self.loading = true;
    this.api.post('survey_metabolic/del_metabolic_info', param, function (resp) {
      self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ลบรายการสำเร็จ', function () {
          self.loadData(self.filtersearch);
        });
      }
    })
  }


  openModal(key: string) {
    this.citizenID = key;
    $("#addMetabolicSurvey").modal('show');

  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    //this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
    }
    this.loadData(event);

  }

  setUpTable() {
    this.source = this.ng2STDatasource(this.data);
    this.isShowList = true;
    // this.loading = false;
  }

  onModalFrom(action: string) {
    //
    this.action = action;
    this.getSurveyData(this.metabolicbean.rowGUID);
  }

  reloadData(event: any) {
    let self = this;
    if (event) {
      this.message_success('', 'ท่านได้ทำการส่งแบบสำรวจความเสี่ยงโรค Metabolic แล้ว', function () {
        self.loadData(self.filtersearch);
      });
    } else {
      this.message_error('', 'Error');
    }
  }

  getSurveyData(rowGUID){
    let self=this;
    let param = {
      "rowGUID":rowGUID
    }
    this.api.post('survey_metabolic/metabolic_by_rowguid', param, function (resp) {
      //self.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.metabolicbean = resp.response;
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
    })
  }

}
