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


  public data;
  public mooID: number = 0;
  public xxx: string;
  public check: boolean = false;
  public metabolicHeadID: number = 0;
  public surveyTypeCode: string = "METABOLIC";
  public isShowList: boolean = true;
  public source: LocalDataSource = new LocalDataSource();
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

          instance.action.subscribe((row: MetabolicBean, cell) => {
            if (row && row.action.toUpperCase() == self.ass_action.EDIT) {
              self.metabolicbean = self.cloneObj(row);
              self.onModalFrom(self.ass_action.EDIT);
            }
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

    this.api.post('survey_metabolic/search_metabolic_list', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.data = resp.response;
        self.setUpTable();
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
    console.log("statusID ====="+this.documentId);
    this.filtersearch = event;
    if (this.isEmpty(this.documentId)) {
      this.documentId = event.rowGUID;
    }
    this.loadData(event);
  }

  setUpTable() {
    this.source = new LocalDataSource(this.data);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

  onModalFrom(action: string) {
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

  reloadData(event: any) {
    if (event) {
      this.loadData(this.filtersearch);
    }
  }

}
