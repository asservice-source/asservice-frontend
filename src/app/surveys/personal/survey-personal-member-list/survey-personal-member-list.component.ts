import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from '../../../beans/person.bean';
import { ApiHTTPService } from '../../../service/api-http.service';
declare var $;

@Component({
  selector: 'app-survey-personal-member-list',
  templateUrl: './survey-personal-member-list.component.html',
  styleUrls: ['./survey-personal-member-list.component.css']
})
export class SurveyPersonalMemberListComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  private paramHomeId: string;
  public paramsPerson: PersonBean;

  public settings: any;
  public source: LocalDataSource;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    super();

    let self = this;

    self.settings = this.getTabelSetting({
      person: {
        title: 'ชื่อ-สกุล สมาชิก',
        filter: false,
        width: '200px',
        valuePrepareFunction: (cell, row) => {
          return self.getFullName(cell.prefix.shortName, cell.firstName, cell.lastName);
        }
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px'
      },
      birthDate: {
        title: 'วัน/เดือน/ปี เกิด',
        filter: false,
        width: '150px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let birthDate = row.person.birthDate;
          let date = new Date(birthDate);
          return '<div class="text-center">' + self.displayFormatDate(birthDate) + '</div>';
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let birthDate = row.person.birthDate;
          return '<div class="text-center">' + self.getAge(birthDate) + '</div>';
        }
      },
      status: {
        title: 'ประเภทการเข้าอยู่อาศัย',
        filter: false,
        width: '200px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let guestDesc = (row.guest === true) ? 'มีชื่อในทะเบียนบ้านจริง' : 'ไม่มีชื่อในทะเบียนบ้าน';
          return '<div class="text-center">' + guestDesc + '</div>';
        }
      },
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: SurveyPersonalMemberListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonBean) => {
            self.paramsPerson = row;
            $("#modalMember").modal({ backdrop: 'static', keyboard: false });
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

    let URL_LIST_HOME_MEMBERS: string = "homemember/homemember_by_home";
    let params = { "homeId": this.paramHomeId };

    self.apiHttp.post(URL_LIST_HOME_MEMBERS, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);
        self.source = new LocalDataSource(d.list);
        self.setNg2STDatasource(self.source);
      }
    })

    // this.http.get("assets/data_test/data_personal.json")
    //   .map(res => res.json())
    //   .subscribe((data) => {
    //     self.source = new LocalDataSource(data);
    //     self.setNg2STDatasource(self.source);
    //   });
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
  template: "<div class=\"text-center\"><button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">แก้ไข</button></div>",
})
export class SurveyPersonalMemberListButtonEditComponent implements ViewCell, OnInit {
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