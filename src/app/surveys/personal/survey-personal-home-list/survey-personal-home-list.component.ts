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

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;

  constructor(private http: Http, private router: Router) {
    super();

    let self = this;

    self.settings = self.getTabelSetting({
      village: {
        title: 'หมู่',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell.villageNo + '</div>';
        }
      },
      homeNo: {
        title: 'บ้านเลขที่',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      holder: {
        title: 'ชื่อ-สกุล เจ้าของบ้าน',
        filter: false,
        width: '300px',
        valuePrepareFunction: (cell, row) => {
          return self.getFullName(cell.prefix.shortName, cell.firstName, cell.lastName);
        }
      },
      memberAmount: {
        title: 'จำนวนสมาชิก',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: SurveyPersonalHomeListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row) => {
            let homeId = row.id;
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

    let villageId = event.villageId;
    let osmId = event.osmId;
    let homeId = event.homeId;

    self.bindHomeList(villageId, osmId, homeId);

    // this.http.get("assets/data_test/data_home_personal.json")
    //   .map(res => res.json())
    //   .subscribe((data) => {
    //     self.source = new LocalDataSource(data);
    //     self.setNg2STDatasource(self.source);
    //     self.isShowTable = true;
    //   });
  }

  bindHomeList(villageId: string, osmId: string, homeId: string) {
    let self = this;

    let URL_LIST_HOME: string = "home/home_list_search_by_village_osm_home";
    let params = { "villageId": villageId, "osmId": osmId, "id": homeId };

    self.apiHttp.post(URL_LIST_HOME, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.source = new LocalDataSource(d.list);
        self.setNg2STDatasource(self.source);
        self.isShowTable = true;
      } else {
        console.log('survey-personal-home-list(bindHomeList) occured error(s) => ' + d.message);
      }
    });
  }

}

@Component({
  template: "<div class=\"text-center\"><button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">จัดการสมาชิก</button></div>",
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