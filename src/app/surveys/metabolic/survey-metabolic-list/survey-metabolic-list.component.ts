import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
declare var $;

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
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();


  private api: ApiHTTPService;
  public settings: any;

  constructor(private http: Http, private router: Router) {
    super();
    this.loadData();
    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTabelSetting({
      id: {
        title: 'ลำดับ',
        filter: false,
        sort: false,
        width: '60px',
      },
      name: {
        title: 'ชื่อ - นามสกุล',
        filter: false,
      },
      cID: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
      },
      homeID: {
        title: 'บ้านเลขที่',
        filter: false,
        width: '100px',
      },
      gender: {
        title: 'เพศ',
        filter: false,
        width: '70px',
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '80px',
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {

          instance.action.subscribe(row => {
            alert(row.action);
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

  loadData() {
    this.http.get("assets/test-list.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);
  }

  openModal(key: string) {
    this.citizenID = key;
    $("#addMetabolicSurvey").modal('show');

  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
    console.log(event);
    this.source = new LocalDataSource(this.data);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);

  }

}
