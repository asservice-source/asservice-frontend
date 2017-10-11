import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FilterBean } from "../../beans/filter.bean";
import { ApiHTTPService } from '../../service/api-http.service';
import { BaseComponent } from '../../base-component';
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';
import { ViewCell } from 'ng2-smart-table';
declare var $: any;

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent extends BaseComponent implements OnInit, AfterViewInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private URL_LIST_HOME: string = "";

  public settings: any;
  public listHomeData: any = [];

  constructor(private http: Http, private router: Router) {
    super();

    let self = this;

    self.settings = this.getTabelSetting({
      no: {
        title: 'ลำดับ',
        filter: false
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
        renderComponent: PersonalButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe(row => {
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

    // let params = { "hospitalCode": "" };
    // this.apiHttp.post(this.URL_LIST_HOME, params, function (d) {
    //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
    //     self.listHomeData = d.list;
    //   }
    // })

    this.http.get("assets/data_test/data_home_personal.json")
      .map(res => res.json())
      .subscribe(data => self.listHomeData = data);

    // jsonParams["villageNo"] = event.villageID;
    // jsonParams["osmId"] = event.OSMID;
    // jsonParams["id"] = event.homeID;

    // var tbl = $("#tablePersonal").dataTable({
    //   "order": [[1, "asc"]],
    //   "searching": false,
    //   "ajax": {
    //     "url": "http://192.168.2.227:8080/API-ASService/home/home_list",
    //     // "url": "assets/data_test/data_home_personal.json",
    //     "type": "POST",
    //     "datatype": "json",
    //     "contentType": "application/json",
    //     "data": function () {
    //       return JSON.stringify(jsonParams);
    //     },
    //     "dataSrc": "list"
    //   },
    //   "columns": [
    //     {
    //       "title": "ลำดับ",
    //       "data": null,
    //       "orderable": false,
    //       "className": "text-center",
    //       "render": function (data, type, row, meta) {
    //         return meta.row + 1;
    //       }
    //     },
    //     {
    //       "title": "หมู่",
    //       "data": "villageNo",
    //       "className": "text-center",
    //       "orderable": true
    //     },
    //     {
    //       "title": "บ้านเลขที่",
    //       "data": "homeNo",
    //       "className": "text-center",
    //       "orderable": true
    //     },
    //     {
    //       "title": "ชื่อ-สกุล เจ้าบ้าน",
    //       "data": null,
    //       "className": "dt-head-center dt-body-left",
    //       "orderable": true,
    //       "render": function (row) {
    //         var fullName = row.holder.firstName + " " + row.holder.lastName;
    //         return fullName;
    //       }
    //     },
    //     {
    //       "title": "จำนวนสมาชิก",
    //       "data": "memberAmount",
    //       "className": "dt-head-center dt-body-right",
    //       "orderable": true
    //     },
    //     {
    //       "title": "สถานะ",
    //       "data": "osmId",
    //       "className": "text-center",
    //       "orderable": true
    //     },
    //     {
    //       "data": null,
    //       "orderable": false,
    //       "className": "text-center",
    //       "render": function (row) {
    //         var homeId = row.home_id;
    //         var btnManage = "<button style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\" id=\"btnManage\" home_id=\"" + homeId + "\" >จัดการ</button>";
    //         return btnManage;
    //       }
    //     }]
    // });

    // // Rerender data tables
    // tbl.api().ajax.reload();

    $("#panel_table_personal").show();
  }

}

@Component({
  template: "<button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">จัดการ</button>",
})
export class PersonalButtonEditComponent implements ViewCell, OnInit {
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