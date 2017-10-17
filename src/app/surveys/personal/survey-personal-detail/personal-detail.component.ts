import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from '../../../beans/person.bean';
import { ApiHTTPService } from '../../../service/api-http.service';
declare var $;

@Component({
  selector: 'app-survey-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class SurveyPersonalDetailComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private URL_LIST_HOME_MEMBERS: string = "homemember/homemember_by_home";

  private paramHomeId: string;
  public paramsPerson: PersonBean;

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
      status: {
        title: 'สถานะการอยู่อาศัย',
        filter: false
      },
      action: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: SurveyPersonalDetailButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row) => {
            let tmpPerson = new PersonBean();
            tmpPerson.citizenID = row.citizenId;

            self.paramsPerson = tmpPerson;
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

    let params = { "homeId": this.paramHomeId };
    this.apiHttp.post(this.URL_LIST_HOME_MEMBERS, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.listMemberData = d.list;
      }
    })

    // this.http.get("assets/data_test/data_personal.json")
    //   .map(res => res.json())
    //   .subscribe(data => self.listMemberData = data);
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