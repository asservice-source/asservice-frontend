import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from '../../../beans/person.bean';
import { ApiHTTPService } from '../../../service/api-http.service';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
declare var $;

@Component({
  selector: 'app-survey-personal-member-list',
  templateUrl: './survey-personal-member-list.component.html',
  styleUrls: ['./survey-personal-member-list.component.css']
})
export class SurveyPersonalMemberListComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  private paramHomeId: string;
  public paramMember: PersonalMemberBean;

  public settings: any;
  public source: LocalDataSource;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {
    super();

    let self = this;

    self.settings = this.getTabelSetting({
      fullName: {
        title: 'ชื่อ-สกุล',
        filter: false,
        width: '300px'
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '300px'
      },
      genderName: {
        title: 'เพศ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      status: {
        title: 'สถานะผู้อยู่อาศัย',
        filter: false,
        width: '200px',
        type: 'html'
      },
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: SurveyPersonalMemberListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row) => {
            self.paramMember = row;
            $("#modalMember").modal({ backdrop: 'static', keyboard: false });
          });
        }
      }
    });
  }

  ngOnInit() {
    this.receiveParameters();
    this.bindHomeMemberList();
    this.onReadyjQuery();
  }

  receiveParameters() {
    this.route.params.subscribe(params => {
      this.paramHomeId = params['homeId'];
    });
  }

  bindHomeMemberList() {
    let self = this;

    let URL_LIST_HOME_MEMBERS: string = "homemember/homemember_by_home";
    let params = { "homeId": this.paramHomeId };

    self.apiHttp.post(URL_LIST_HOME_MEMBERS, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);
        let tmp = self.mappingPersonalMemberBean(d.list);
        self.source = new LocalDataSource(tmp);
        self.setNg2STDatasource(self.source);
      } else {
        console.log('survey-personal-member-list(bindHomeMemberList) occured error(s) => ' + d.message);
      }
    });

    // this.http.get("assets/data_test/data_personal.json")
    //   .map(res => res.json())
    //   .subscribe((data) => {
    //     self.source = new LocalDataSource(data);
    //     self.setNg2STDatasource(self.source);
    //   });
  }

  mappingPersonalMemberBean(data: any): Array<PersonalMemberBean> {
    let self = this;

    let memberList: Array<PersonalMemberBean> = new Array<PersonalMemberBean>();
    for (let item of data) {
      if (item) {
        let member: PersonalMemberBean = new PersonalMemberBean();
        if (item.person && item.person.prefix) {
          member.fullName = self.getFullName(item.person.prefix.name, item.person.firstName, item.person.lastName);
        }
        member.citizenId = item.citizenId || '';
        if (item.person && item.person.gender) {
          member.genderName = item.person.gender.name
        }
        if (item.person) {
          member.age = self.getAge(item.person.birthDate).toString();
        }
        if (item.discharge) {
          member.dischargeName = item.discharge.name;
        }
        memberList.push(member);
      }
    }
    return memberList;
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