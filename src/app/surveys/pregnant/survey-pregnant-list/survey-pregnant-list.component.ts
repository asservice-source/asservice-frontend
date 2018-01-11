import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { BaseComponent } from "./../../../base-component";
import { PersonBean } from "../../../beans/person.bean";
import { ActionCustomViewMapsComponent } from '../../../action-custom-table/action-custom-view.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PregnantBean } from '../../../beans/pregnant.bean'
import { Service_SurveyPregnant } from '../../../api-managements/service-survey-pregnant';
import { CompileMetadataResolver } from '@angular/compiler';
import { MapsBean } from '../../../multi-maps/multi-maps.component';
declare var $: any

@Component({
  selector: 'app-survey-pregnant-list',
  templateUrl: './survey-pregnant-list.component.html',
  styleUrls: ['./survey-pregnant-list.component.css']
})
export class SurveyPregnantListComponent extends BaseComponent implements OnInit {

  private apiHttp: Service_SurveyPregnant = new Service_SurveyPregnant();

  public action: string = this.ass_action.ADD;
  public surveyTypeCode: string = "PREGNANT";

  public current_documentId: string = "";
  public filter_documentId: string = "";
  public filter_villageId: string = "";
  public filter_osmId: string = "";
  public filter_fullName: string = "";
  public filter_bean: FilterHeadSurveyBean;

  public param_pregnantBean: PregnantBean = new PregnantBean();
  public param_rowGUID: string = "";
  public param_reset: number = 0;
  public param_latitude: string = "";
  public param_longitude: string = "";
  public param_info: string = "";
  public param_listPosition: Array<MapsBean>;

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = true;

  public loading: boolean = false;

  constructor(private http: Http, private router: Router, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.filter_bean = new FilterHeadSurveyBean();

    self.settings = self.getTableSetting({
      fullName: {
        title: 'ชื่อ - นามสกุล',
        width: '180px',
        filter: false,
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatCitizenId(cell) + '</div>'
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
      wombNo: {
        title: 'ครรภ์ที่',
        filter: false,
        width: '50px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      bornDueDate: {
        title: 'กำหนดคลอด/วันที่คลอด',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let birthDate = self.displayFormatDate(cell);
          return '<div class="text-center">' + birthDate + '</div>'
        }
      },
      // date: {
      //   title: 'กำหนดคลอด/วันที่คลอด',
      //   filter: false,
      //   width: '100px',
      //   type: 'html',
      //   valuePrepareFunction: (cell, row) => {
      //     let surveyTypeCode = row.pSurveyTypeCode;
      //     let bornDueDate = self.displayFormatDate(row.bornDueDate);
      //     if (surveyTypeCode == "Born") {
      //       let bornDate = "";
      //       if(row.childs && row.childs.length > 0){
      //         self.displayFormatDate(row.childs[0].birthDate);
      //       }
      //       return '<div class="text-center">' + bornDate + '</div>';
      //     } else {
      //       return '<div class="text-center">' + bornDueDate + '</div>';
      //     }
      //   }
      // },
      pSurveyTypeCode: {
        title: 'สถานะครรภ์',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let wombStatus = "";
          if (cell == "Born") {
            wombStatus = '<div class="text-center text-active">คลอดแล้ว</div>';
          } else {
            wombStatus = '<div class="text-center text-inactive">กำลังตั้งครรภ์</div>';
          }
          return wombStatus;
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '120px',
        type: 'custom',
        renderComponent: ActionCustomViewMapsComponent,
        onComponentInitFunction(instance) {

          instance.action.subscribe((row: PregnantBean, cell) => {
            if (row && row.action.toUpperCase() == self.ass_action.EDIT) {
              self.param_rowGUID = row.rowGUID;
              self.onModalForm(self.ass_action.EDIT);
            }
          });

          instance.delete.subscribe(row => {
            self.onDeleteSurveyPregnant(row);
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
    let self = this;

    self.loading = true;
  }

  onClickSearch(event: FilterHeadSurveyBean) {
    let self = this;

    self.filter_bean = event;

    // รอบปัจจุบัน
    if (self.isEmpty(self.current_documentId))
      self.current_documentId = event.rowGUID;

    self.filter_documentId = event.rowGUID;
    self.filter_villageId = event.villageId;
    self.filter_osmId = event.osmId;
    self.filter_fullName = event.fullName;

    self.bindPregnantList(self.filter_bean);
  }

  onClickMultiMaps() {
    let self = this;

    self.param_reset++;
    self.changeRef.detectChanges();
    $("#modalMultiMaps").modal("show");
  }

  bindPregnantList(bean: FilterHeadSurveyBean) {
    let self = this;

    self.loading = true;

    let params = { "documentId": bean.rowGUID, "villageId": bean.villageId, "osmId": bean.osmId, "name": bean.fullName };

    self.apiHttp.post("survey_pregnant/search_pregnant_info_list", params, function (d) {
      if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.bindMultiMaps(d.response);
        self.source = self.ng2STDatasource(d.response);
        self.isShowTable = true;
      } else {
        console.log('survey-personal-pregnant-list(BindPregnantList) occured error(s) => ' + d.message);
      }
      self.loading = false;
      self.changeRef.detectChanges();
    });

    // this.http.get("assets/data_test/data_home_personal.json")
    //   .map(res => res.json())
    //   .subscribe((data) => {
    //     self.source = new LocalDataSource(data);
    //     self.setNg2STDatasource(self.source);
    //     self.isShowTable = true;
    //   });

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

  onChangeFilter(event: FilterHeadSurveyBean) {

  }

  onModalForm(action: string) {
    let self = this;

    self.action = action;

    if (action == self.ass_action.EDIT) {
      self.onEditSurveyPregnant();
    } else {
      self.changeRef.detectChanges();
      $("#find-person-md").modal("show");
    }
  }

  onEditSurveyPregnant() {
    let self = this;

    self.loading = true;

    self.apiHttp.get_pregnant_info(self.param_rowGUID, function (d) {
      self.param_pregnantBean = d.response;
      self.changeRef.detectChanges();
      $("#find-person-md").modal("show");
      self.loading = false;
    });
  }

  onDeleteSurveyPregnant(bean) {
    let self = this;

    self.message_comfirm('', 'คุณต้องการลบ "<b>' + bean.fullName + '</b>" หรือไม่?', function (confirm) {
      if (confirm == true) {
        self.loading = true;

        self.apiHttp.commit_delete(bean, function (d) {
          self.loading = false;

          if (d.status.toString().toUpperCase() == "SUCCESS") {
            self.message_success('', 'ต้องการยกเลิกแจ้งการเสียชีวิต "<b>' + bean.fullName + '</b>" ใช่หรือไม่', function () {
              // self.bindPregnantList(self.filter_bean);
              $("#filter-btnSearch").click();
            });
          } else {
            self.message_error('', d.message);
          }
        });
      }
    });
  }

  onUpdatedMember(member: PregnantBean) {
    let self = this;

    // self.bindPregnantList(self.filter_bean);
    $("#filter-btnSearch").click();
  }

}
