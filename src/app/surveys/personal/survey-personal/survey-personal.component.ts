import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { FilterBean } from "../../../beans/filter.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { BaseComponent } from '../../../base-component';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
declare var $: any;

@Component({
  selector: 'app-survey-personal',
  templateUrl: './survey-personal.component.html',
  styleUrls: ['./survey-personal.component.css']
})
export class SurveyPersonalComponent extends BaseComponent implements OnInit, AfterViewInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private URL_LIST_HOME: string = "home/home_list";

  public settings: any;
  public listHomeData: any = [];
  public source: LocalDataSource;

  constructor(private http: Http, private router: Router) {
    super();

    let self = this;

    self.settings = self.getTabelSetting({
      no: {
        title: 'ลำดับ',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          // let x= cell;
          // let y = row;
          return "";
        },
        class: "running_no"
      },
      villageNo: {
        title: 'หมู่',
        filter: false
      },
      homeNo: {
        title: 'บ้านเลขที่',
        filter: false
      },
      holderName: {
        title: 'ชื่อ-สกุล เจ้าของบ้าน',
        filter: false
      },
      memberAmount: {
        title: 'จำนวนสมาชิก',
        filter: false
      },
      action: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: SurveyPersonalButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row) => {
            let homeId = row.homeId;
            self.router.navigate(['/main/surveys/personal-detail', homeId]);
          });
        }
      }
    });
  }

  ngOnInit(): void {
    // let username: string = 'asservice-trusted-client';
    // let password: string = 'secret';
    // let param = new URLSearchParams()
    // param.append('grant_type', 'password')
    // param.append('username', 'anamai01');
    // param.append('password', 'an123401');
    // let headers = new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Authorization': 'Basic ' + btoa(username + ':' + password),
    //   'Access-Control-Allow-Origin': '*'
    // });
    // let options = new RequestOptions({ headers: headers });
    // this.http.post("http://192.168.1.203:8080/api-asservice/oauth/token", param, options)
    //   .map(res => res.json())
    //   .subscribe(data => console.log(data.access_token),
    //   err => console.log(err),
    //   () => console.log('Fetching complete for Server Metrics'));
  }

  ngAfterViewInit() {

  }

  clickSearch(event: FilterBean) {
    let self = this;

    let villageNo = event.villageID;
    let homeId = event.homeID;
    let osmId = event.OSMID;

    let params = { "hospitalCode": this.getHospitalCode() };
    this.apiHttp.post(this.URL_LIST_HOME, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.listHomeData = d.list;
      }
    })

    self.source = new LocalDataSource(self.listHomeData);
    super.setNg2STDatasource(self.source);

    // this.http.get("assets/data_test/data_home_personal.json")
    //   .map(res => res.json())
    //   .subscribe(data => self.listHomeData = data);
  }

}

@Component({
  template: "<button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">จัดการสมาชิก</button>",
})
export class SurveyPersonalButtonEditComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  clickEdit() {
    this.action.emit(this.rowData);
  }
}