import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from "../../../beans/person.bean";
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { MetabolicBean } from '../../../beans/metabolic.bean';
import { ActionCustomViewMapsComponent } from '../../../action-custom-table/action-custom-view.component';
import { MapsBean } from '../../../multi-maps/multi-maps.component';
import { Service_SurveyMetabolic } from '../../../api-managements/service-survey-metabolic';

declare var $: any;

@Component({
  selector: 'app-survey-metabolic-list',
  templateUrl: './survey-metabolic-list.component.html',
  styleUrls: ['./survey-metabolic-list.component.css']
})
export class SurveyMetabolicListComponent extends BaseComponent implements OnInit {

  private apiMetabolic: Service_SurveyMetabolic;

  public loading;
  public surveyTypeCode: string = "METABOLIC";
  public isShowList: boolean = true;
  public source: LocalDataSource;
  public metabolicbean: MetabolicBean = new MetabolicBean();
  public action: string = this.ass_action.ADD;
  public filtersearch: FilterHeadSurveyBean;


  //maps variable
  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  public settings: any;
  public documentId: string;

  constructor(private http: Http, private router: Router, private changeRef: ChangeDetectorRef) {
    super();

    this.apiMetabolic = new Service_SurveyMetabolic();

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

          instance.edit.subscribe(row => {
            self.getSurveyData(row.rowGUID);
          });

          instance.delete.subscribe(row => {
            self.actionDelete(row.rowGUID, row.fullName);
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

  actionDelete(rowGUID, fullName) {
    let self = this;

    self.message_comfirm("", "ต้องการยกเลิกการทำรายการสำรวจของ " + fullName + " ใช่หรือไม่", function (resp) {
      if (resp) {
        self.loading = true;
        self.apiMetabolic.deleteMetabolic(rowGUID, function (resp) {
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


  onChangeFilter(event: FilterHeadSurveyBean) {

  }


  onSearch(event: FilterHeadSurveyBean) {
    let _self = this;
    _self.loading = true;
    _self.filtersearch = event;

    if (_self.isEmpty(this.documentId)) {
      _self.documentId = event.rowGUID;
    }
    _self.apiMetabolic.getListMetabolic(event, function (response) {
      _self.source = _self.ng2STDatasource(response);
      _self.loading = false;
      _self.changeRef.detectChanges();
    });
  }

  onModalForm(action: string) {
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
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
    self.apiMetabolic.getMetabolicInfo(rowGUID, function (resp) {
      if (resp.response && resp.status.toUpperCase() == 'SUCCESS') {
        self.metabolicbean = self.cloneObj(resp.response);
        self.onModalForm(self.ass_action.EDIT);
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
