import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../base-component';
import { ViewCell } from 'ng2-smart-table';
declare var $;

@Component({
  selector: 'app-survey-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class SurveyPersonalDetailComponent extends BaseComponent implements OnInit {

  private paramHomeId: string;
  public paramCitizenId: string;

  public settings: any;
  public listMemberData: any = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    super();

    let self = this;

    self.settings = this.getTabelSetting({
      no: {
        title: 'ลำดับ',
        filter: false
      },
      name: {
        title: 'ชื่อ-สกุล สมาชิก',
        filter: false
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false
      },
      dateOfBirth: {
        title: 'วัน/เดือน/ปี เกิด',
        filter: false
      },
      age: {
        title: 'อายุ',
        filter: false
      },
      action: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: SurveyPersonalDetailButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row) => {
            self.paramCitizenId = row.citizenId;
          });
        }
      }
    });
  }

  ngOnInit() {
    this.receiveParameters();
    this.loadData();
    this.onReadyjQuery();
  }

  receiveParameters() {
    this.route.params.subscribe(params => {
      this.paramHomeId = params['homeId'];
    });
  }

  loadData() {
    let self = this;

    this.http.get("assets/data_test/data_personal.json")
      .map(res => res.json())
      .subscribe(data => self.listMemberData = data);

    // var tbl = $("#tableMember").dataTable({
    //   "order": [[1, "asc"]],
    //   "searching": false,
    //   "paging": false,
    //   "ajax": {
    //     // "url": "http://192.168.1.203:8080/api-asservice/address/province",
    //     "url": "assets/data_test/data_personal.json",
    //     "type": "GET",
    //     "datatype": "json",
    //     // "data": function (params) {
    //     //   params.myKey = villageNo;
    //     // },
    //     "dataSrc": ""
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
    //       "title": "ชื่อ-สกุล สมาชิก",
    //       "data": "name",
    //       "className": "text-left",
    //       "orderable": true
    //     },
    //     {
    //       "title": "รหัสประจำตัวประชาชน",
    //       "data": "citizen_id",
    //       "className": "text-center",
    //       "orderable": true
    //     },
    //     {
    //       "title": "วัน/เดือน/ปี เกิด",
    //       "data": "sex",
    //       "className": "text-center",
    //       "orderable": true
    //     },
    //     {
    //       "title": "อายุ",
    //       "data": "blood_type",
    //       "orderable": true
    //     },
    //     {
    //       "title": "สถานะ",
    //       "data": "date_of_birth",
    //       "className": "text-center",
    //       "orderable": true
    //     },
    //     {
    //       "data": null,
    //       "orderable": false,
    //       "className": "text-center",
    //       "render": function (row) {
    //         var citizenId = row.citizen_id;
    //         var btnEdit = "<button style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\" id=\"btnEdit\" citizen_id=\"" + citizenId + "\" >จัดการ</button>";
    //         return btnEdit;
    //       }
    //     }]
    // });

    // // Rerender data tables
    // tbl.api().ajax.reload();
  }

  clickBack() {
    this.router.navigate(['/main/surveys/personal']);
  }

  onReadyjQuery() {

    $(function () {

      $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
      });

    });

  }

}

@Component({
  template: "<button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">แก้ไข</button>",
})
export class SurveyPersonalDetailButtonEditComponent implements ViewCell, OnInit {
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