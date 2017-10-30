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

@Component({
  selector: 'app-survey-personal-member-list',
  templateUrl: './survey-personal-member-list.component.html',
  styleUrls: ['./survey-personal-member-list.component.css']
})
export class SurveyPersonalMemberListComponent extends BaseComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  private paramHomeId: string;
  public paramMember: PersonalMemberBean = new PersonalMemberBean();

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;
  public tempData: Array<any>;

  public action: string = this.ass_action.ADD;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private changeRef: ChangeDetectorRef) {
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
        console.log(d);
        self.tempData = d.response;
        self.source = new LocalDataSource(self.tempData);
        self.setNg2STDatasource(self.source);
        self.isShowTable = true;
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

  // onUpdatedMember(member: PersonalMemberBean) {
  //   let self = this;

  //   for (let item of self.tempData) {
  //     if (item.citizenId == member.citizenId) {
  //       let index = self.tempData.indexOf(item);
  //       self.tempData[index] = member;

  //       let prefix = '';
  //       if (member.listPrefix) {
  //         for (let p of member.listPrefix) {
  //           if (p.code == member.prefixCode) {
  //             prefix = p.name;
  //             break;
  //           }
  //         }
  //       }
  //       self.tempData[index].fullName = self.getFullName(prefix, member.firstName, member.lastName);

  //       let gender = '';
  //       if (member.listGender) {
  //         for (let g of member.listGender) {
  //           if (g.code == member.genderCode) {
  //             gender = g.name;
  //             break;
  //           }
  //         }
  //       }
  //       self.tempData[index].genderName = gender;

  //       let familyStatus = '';
  //       if (member.listFamilyStatus) {
  //         for (let g of member.listFamilyStatus) {
  //           if (g.code == member.familyStatusCode) {
  //             familyStatus = g.name;
  //             break;
  //           }
  //         }
  //       }
  //       self.tempData[index].familyStatusName = familyStatus;
  //     }
  //   }

  //   self.source.refresh();

  //   $("#modalMember").modal('hide');
  // }

  onUpdatedMember(member: PersonalMemberBean) {
    let self = this;

    let index = -1;
    let tmpMember = member;

    for (let item of self.tempData) {
      if (item.citizenId == member.citizenId) {
        index = self.tempData.indexOf(item);
      }
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
        if (g.code == member.genderCode) {
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

    if (index >= 0) {
      self.tempData[index] = tmpMember;
    } else {
      self.tempData.push(tmpMember);
    }

    self.source.refresh();

    $("#modalMember").modal('hide');
  }

  mappingPersonalMemberBean(data: any): Array<PersonalMemberBean> {
    let self = this;

    let memberList: Array<PersonalMemberBean> = new Array<PersonalMemberBean>();
    for (let item of data) {
      if (item) {
        let member: PersonalMemberBean = new PersonalMemberBean();

        member.citizenId = item.citizenId || '';

        if (item.person) {

          if (item.person.prefix) {
            member.prefixCode = item.person.prefix.code;
            member.fullName = self.getFullName(item.person.prefix.name, item.person.firstName, item.person.lastName);
          }

          if (item.person.gender) {
            member.genderCode = item.person.gender.code;
            member.genderName = item.person.gender.name;
          }

          member.birthDate = self.displayFormatDate(item.person.birthDate);
          member.age = self.getAge(item.person.birthDate).toString();

          if (item.person.typeArea) {
            member.typeAreaCode = item.person.typeArea.code;
          }

          member.firstName = item.person.firstName;
          member.lastName = item.person.lastName;

          if (item.person.race) {
            member.raceCode = item.person.race.code;
          }

          if (item.person.nationality) {
            member.nationalityCode = item.person.nationality.code;
          }

          if (item.person.religion) {
            member.religionCode = item.person.religion.code;
          }

          if (item.person.bloodType) {
            member.bloodTypeId = item.person.bloodType.id;
          }

          if (item.person.rhGroup) {
            member.rhGroupId = item.person.rhGroup.id;
          }

          if (item.person.education) {
            member.educationCode = item.person.education.code;
          }

          if (item.person.occupation) {
            member.occupationId = item.person.occupation.id;
          }

          if (item.familyStatus) {
            member.familyStatusCode = item.familyStatus.code;
          }

        }

        if (item.discharge) {
          member.dischargeName = item.discharge.name;
        }

        memberList.push(member);
      }
    }
    return memberList;
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