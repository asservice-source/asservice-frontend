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
  selector: 'app-survey-personal-home-list',
  templateUrl: './survey-personal-home-list.component.html',
  styleUrls: ['./survey-personal-home-list.component.css']
})
export class SurveyPersonalHomeListComponent extends BaseComponent implements OnInit, AfterViewInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private URL_LIST_HOME: string = "home/home_list";

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;

  constructor(private http: Http, private router: Router) {
    super();

    let self = this;

    self.settings = self.getTabelSetting({
      seq: {
        title: 'ลำดับ',
        filter: false,
        sort: false,
        width: '60px',
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
        renderComponent: SurveyPersonalHomeListButtonEditComponent,
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

  }

  ngAfterViewInit() {

  }

  clickSearch(event: FilterBean) {
    let self = this;

    // let villageNo = event.villageID;
    // let homeId = event.homeID;
    // let osmId = event.OSMID;

    // let params = { "hospitalCode": this.getHospitalCode() };
    // this.apiHttp.post(this.URL_LIST_HOME, params, function (d) {
    //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
    //     self.listHomeData = d.list;
    //   }
    // })

    this.http.get("assets/data_test/data_home_personal.json")
      .map(res => res.json())
      .subscribe((data) => {
        self.source = new LocalDataSource(data);
        self.isShowTable = true;
        super.setNg2STDatasource(self.source);
      });
  }

}

@Component({
  template: "<button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">จัดการสมาชิก</button>",
})
export class SurveyPersonalHomeListButtonEditComponent implements ViewCell, OnInit {
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