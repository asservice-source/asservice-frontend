import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { MetabolicBean } from '../../../beans/metabolic.bean';
import { ActionCustomViewMapsComponent } from '../../../action-custom-table/action-custom-view.component';
import { MapsBean } from '../../../multi-maps/multi-maps.component';

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

  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;


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
        renderComponent: ActionCustomViewMapsComponent,
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

  save() {
    this.check = true
  }

  loadData(event: FilterHeadSurveyBean) {
    let self = this;
    this.loading = true;
    let param = {
      "documentId": event.rowGUID,
      "villageId": event.villageId,
      "osmId": event.osmId,
      "name": event.fullName
    };
    let params = JSON.stringify(param);
    this.api.post('survey_metabolic/search_metabolic_list', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.bindMultiMaps(resp.response);
        self.source = self.ng2STDatasource(resp.response);
        self.isShowList = true;
        // self.data = resp.response;
        // self.setUpTable();
      }
      self.changeRef.detectChanges();
      self.loading = false;
    })

  }


  actionDelete(rowguid) {
    let self = this;
    self.loading = true;
    let param = {
      "rowGUID": rowguid
    };
    this.api.post('survey_metabolic/del_metabolic_info', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
          self.message_success('', 'ลบรายการสำเร็จ', function () {
          $('#filter-btnSearch').click();
        });
      }
      self.loading = false;
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

  onModalFrom(action: string) {
    this.action = action;
    //console.log(action);
   

    if(action == this.ass_action.EDIT){
      this.getSurveyData(this.metabolicbean.rowGUID);
    }else{
      this.changeRef.detectChanges();
      $('#find-person-md').modal('show');
    }
    
  }

  reloadData(event: any) {
    let self = this;
    if (event) {
      this.message_success('', 'ท่านได้ทำการส่งแบบสำรวจความเสี่ยงโรค Metabolic แล้ว', function () {
        $('#filter-btnSearch').click();
      });
    } else {
      this.message_error('', 'Error');
    }
  }

  getSurveyData(rowGUID) {
    let self = this;
    self.loading = true;
    let param = {
      "rowGUID": rowGUID
    }
    this.api.post('survey_metabolic/metabolic_by_rowguid', param, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.metabolicbean = resp.response;
        self.changeRef.detectChanges();
        $('#find-person-md').modal('show');
      }
      self.loading = false;
    })
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

  
  onClickMultiMaps() {
    let self = this;

    self.param_reset++;
    self.changeRef.detectChanges();
    $("#modalMultiMaps").modal("show");
  }

}
