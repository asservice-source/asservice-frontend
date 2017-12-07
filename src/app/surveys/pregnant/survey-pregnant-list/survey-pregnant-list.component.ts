import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { BaseComponent } from "./../../../base-component";
import { PersonBean } from "../../../beans/person.bean";
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PregnantBean } from '../../../beans/pregnant.bean'
import { Service_SurveyPregnant } from '../../../service/service-survey-pregnant';
declare var $: any

@Component({
  selector: 'app-survey-pregnant-list',
  templateUrl: './survey-pregnant-list.component.html',
  styleUrls: ['./survey-pregnant-list.component.css']
})
export class SurveyPregnantListComponent extends BaseComponent implements OnInit {

  public surveyTypeCode: string = "PREGNANT";
  private apiHttp: Service_SurveyPregnant = new Service_SurveyPregnant();

  public action: string = this.ass_action.ADD;
  public documentId: string;
  public pregnantBean: PregnantBean = new PregnantBean();

  public settings: any;
  public source: LocalDataSource = new LocalDataSource();
  public isShowTable: boolean = true;

  constructor(private http: Http, private router: Router, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.settings = self.getTableSetting({
      fullName: {
        title: 'ชื่อ - นามสกุล',
        width: '120px',
        filter: false,
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      wombNo: {
        title: 'ครรภ์ที่',
        filter: false,
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      bornDueDate: {
        title: 'วันกำหนดคลอด',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let birthDate = self.displayFormatDate(cell);
          return '<div class="text-center">' + birthDate + '</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '120px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PregnantBean, cell) => {
            console.log(row);
            if (row && row.action.toUpperCase() == self.ass_action.EDIT) {
              self.pregnantBean = row;
              self.onModalForm(self.ass_action.EDIT);
            }
          });
        }
      }
    });
  }

  ngOnInit() {
    let self = this;
  }

  onClickSearch(event: FilterHeadSurveyBean) {
    let self = this;

    if (self.isEmpty(self.documentId))
      self.documentId = event.rowGUID;

    let villageId = event.villageId;
    let osmId = event.osmId;
    let name = event.fullName;

    self.BindPregnantList(self.documentId, villageId, osmId, name);

    // this.http.get("assets/data_test/data_home_personal.json")
    //   .map(res => res.json())
    //   .subscribe((data) => {
    //     self.source = new LocalDataSource(data);
    //     self.setNg2STDatasource(self.source);
    //     self.isShowTable = true;
    //   });
  }

  BindPregnantList(roundId, villageId, osmId, name) {
    let self = this;

    self.loading = true;

    let params = { "documentId": roundId, "villageId": villageId, "osmId": osmId, "name": name };

    self.apiHttp.post("survey_pregnant/search_pregnant_info_list", params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);
        self.source = self.ng2STDatasource(d.response);
        self.isShowTable = true;
      } else {
        console.log('survey-personal-pregnant-list(BindPregnantList) occured error(s) => ' + d.message);
      }
      self.loading = false;
    });

    // self.http.get("assets/test-list.json")
    //   .map(res => res.json())
    //   .subscribe(function (response) {
    //     self.data = response;
    //     self.setUpTable();
    //   });

  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    let self = this;

    // console.log("ChangeFilter");
    // self.isShowTable = false;
  }

  onModalForm(action: string) {
    let self = this;

    self.action = action;
    self.changeRef.detectChanges();
    $("#find-person-md").modal("show");
  }

  // setUpTable() {
  //   let self = this;

  //   self.source = new LocalDataSource(self.data);
  //   self.isShowTable = true;
  //   self.setNg2STDatasource(self.source);
  // }

}
