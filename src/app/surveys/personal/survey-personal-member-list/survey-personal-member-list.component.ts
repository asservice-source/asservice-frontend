import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from '../../../beans/person.bean';
import { ApiHTTPService } from '../../../service/api-http.service';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
declare var $;
declare var bootbox: any;

@Component({
  selector: 'app-survey-personal-member-list',
  templateUrl: './survey-personal-member-list.component.html',
  styleUrls: ['./survey-personal-member-list.component.css']
})
export class SurveyPersonalMemberListComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  private paramHomeId: string;

  public action: string = this.ass_action.ADD;
  public paramMember: PersonalMemberBean = new PersonalMemberBean();

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;
  public tempData: Array<any> = [];

  public settings2: any;
  public source2: LocalDataSource;
  public isShowTable2: boolean = false;
  public tempData2: Array<any> = [];

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.settings = this.getTableSetting({
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
      familyStatusName: {
        title: 'สถานะผู้อยู่อาศัย',
        filter: false,
        width: '200px',
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
        renderComponent: SurveyPersonalMemberListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonalMemberBean) => {
            // console.log(row);
            self.action = self.ass_action.EDIT;
            self.paramMember = row;
            self.changeRef.detectChanges();
            $("#modalMember").modal({ backdrop: 'static', keyboard: false });
          });
        }
      }
    });

    self.settings2 = this.getTableSetting({
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
      familyStatusName: {
        title: 'สถานะผู้อยู่อาศัย',
        filter: false,
        width: '200px',
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
        renderComponent: SurveyPersonalMemberListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonalMemberBean) => {
            // console.log(row);
            self.action = self.ass_action.EDIT;
            self.paramMember = row;
            self.changeRef.detectChanges();
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
        // console.log(d);
        let data = d.response;
        for (let item of data) {
          if (item && item.isGuest === true) {
            self.tempData2.push(item);
          } else {
            self.tempData.push(item);
          }
        }

        console.log(self.tempData);
        console.log(self.tempData2);

        // self.tempData = d.response;
        self.source = self.ng2STDatasource(self.tempData);
        self.isShowTable = true;

        // self.tempData2 = d.response;
        self.source2 = self.ng2STDatasource(self.tempData2);
        self.isShowTable2 = true;
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

  onUpdatedMember(member: PersonalMemberBean) {
    let self = this;

    let isActionAdd = (self.action == self.ass_action.ADD);
    let isDuplicated = false;

    let index = -1;
    let tmpMember = member;

    let listAll: Array<any> = [];
    for (let item of self.tempData) {
      listAll.push(item);
    }
    for (let item of self.tempData2) {
      listAll.push(item);
    }

    if (!isActionAdd) {
      for (let item of listAll) {
        if (item.citizenId == tmpMember.citizenId) {
          index = listAll.indexOf(item);
        }
      }
    } else {
      for (let item of listAll) {
        if (item.citizenId == tmpMember.citizenId) {
          isDuplicated = true;
          break;
        }
      }
    }

    if (isDuplicated) {
      bootbox.alert('Duplicated');
      return;
    }

    let prefix = '';
    if (member.listPrefix) {
      for (let p of member.listPrefix) {
        if (p.code == member.prefixCode) {
          prefix = p.name;
          break;
        }
      }
    }
    tmpMember.fullName = self.getFullName(prefix, member.firstName, member.lastName);

    let gender = '';
    if (member.listGender) {
      for (let g of member.listGender) {
        if (g.id == member.genderId) {
          gender = g.name;
          break;
        }
      }
    }
    tmpMember.genderName = gender;

    let familyStatus = '';
    if (member.listFamilyStatus) {
      for (let g of member.listFamilyStatus) {
        if (g.code == member.familyStatusCode) {
          familyStatus = g.name;
          break;
        }
      }
    }
    tmpMember.familyStatusName = familyStatus;

    if (!isActionAdd) {
      listAll[index] = tmpMember;
    } else {
      if (tmpMember.isGuest.toUpperCase() == 'TRUE') {
        self.tempData2.push(tmpMember);
      } else {
        self.tempData.push(tmpMember);
      }
    }

    self.source.refresh();
    self.source2.refresh();

    $("#modalMember").modal('hide');
  }

  onClickAdd() {
    this.paramMember = new PersonalMemberBean();
    this.action = this.ass_action.ADD;
    this.changeRef.detectChanges();
    $("#modalMember").modal({ backdrop: 'static', keyboard: false });
  }

  onClickPrint() {

  }

  onClickSave() {

  }

  onClickBack() {
    this.router.navigate(['/main/surveys/personal']);
  }

  onModalForm(row: PersonalMemberBean) {
    $("#modalMember").modal({ backdrop: 'static', keyboard: false });
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