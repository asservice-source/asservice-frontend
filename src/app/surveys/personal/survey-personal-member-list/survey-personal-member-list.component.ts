import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from '../../../beans/person.bean';
import { PersonalMemberBean } from '../../../beans/personal-member.bean';
// import { ApiHTTPService } from '../../../service/api-http.service';
import { Service_SurveyPersonal } from '../../../service/service-survey-personal';
import { PersonalBasicBean } from '../../../beans/personal-basic.bean';
import { Address } from '../../../beans/address';
declare var $;
declare var bootbox: any;

@Component({
  selector: 'app-survey-personal-member-list',
  templateUrl: './survey-personal-member-list.component.html',
  styleUrls: ['./survey-personal-member-list.component.css']
})
export class SurveyPersonalMemberListComponent extends BaseComponent implements OnInit {

  // private apiHttp: ApiHTTPService = new ApiHTTPService();
  private apiHttp: Service_SurveyPersonal = new Service_SurveyPersonal();

  private paramHomeId: string;
  private paramRoundId: string;

  public action: string = this.ass_action.ADD;
  public paramMember: PersonalMemberBean;
  public cloneMember: PersonalMemberBean;
  public memberBean: PersonalBasicBean;
  public address: Address;
  public roundName: string = "";
  public homeAddress: string = "";
  public homeTel: string = "";
  public osmId: string = "";
  public osmFullName: string = "";

  public settings: any;
  public source: LocalDataSource;
  public isShowTable: boolean = false;
  public tempData: Array<any> = [];

  public settings2: any;
  public source2: LocalDataSource;
  public isShowTable2: boolean = false;
  public tempData2: Array<any> = [];

  public isShowInfo: boolean = false;

  public loading: boolean = false;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private changeRef: ChangeDetectorRef) {
    super();
    this.paramMember = new PersonalMemberBean();
    this.cloneMember = new PersonalMemberBean();
    this.memberBean = new PersonalBasicBean();
    this.address = new Address();
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
            row.homeId = self.paramHomeId;
            self.cloneMember = self.cloneObj(row);
            self.paramMember = row;
            self.paramMember = self.strNullToEmpty(self.paramMember);

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
            row.homeId = self.paramHomeId;
            self.cloneMember = self.cloneObj(row);
            self.paramMember = row;
            self.paramMember = self.strNullToEmpty(self.paramMember);

            self.changeRef.detectChanges();
            $("#modalMember").modal({ backdrop: 'static', keyboard: false });
          });
        }
      }
    });
  }

  ngOnInit() {
    this.receiveParameters();
    this.bindRoundName();
    this.bindHomeInfo();
    this.bindHomeMemberList();
  }

  receiveParameters() {
    this.route.params.subscribe(params => {
      this.paramHomeId = params['homeId'];
      this.paramRoundId = params['roundId'];
    });
  }

  bindRoundName() {
    let self = this;

    self.apiHttp.getRound_byDocumentId(self.surveyHeaderCode.POPULATION, self.paramRoundId, function (d) {
      self.roundName = d.name;

      if(!self.isEmpty(self.homeAddress)) {
        self.isShowInfo = true;
      }
    });
  }

  bindHomeInfo() {
    let self = this;
    let params = { "homeId": parseInt(this.paramHomeId) };
    self.apiHttp.api_HomrInfo(self.paramHomeId, function (d) {
      if (d && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);
        let homeInfo = d.response;
        self.homeAddress = homeInfo.address;
        self.homeTel = homeInfo.telephone;
        self.osmId = homeInfo.osmId;
        self.osmFullName = homeInfo.osmFullName;

        self.address.homeNo = homeInfo.homeNo;
        self.address.mooNo = homeInfo.villageNo;
        self.address.road = homeInfo.road;
        self.address.tumbolCode = homeInfo.tumbolCode;
        self.address.amphurCode = homeInfo.amphurCode;
        self.address.provinceCode = homeInfo.provinceCode;

      } else {
        console.log('survey-personal-member-list(bindHomeInfo) occured error(s) => ' + d.message);
      }

      if(!self.isEmpty(self.roundName)) {
        self.isShowInfo = true;
      }
    });
  }

  bindHomeMemberList() {
    let self = this;
    self.loading = true;
    self.apiHttp.getListMember(self.paramRoundId, self.paramHomeId, function (data) {
      for (let item of data) {
        if (item && item.isGuest === true) {
          self.tempData2.push(item);
        } else {
          self.tempData.push(item);
        }
      }
      self.source = self.ng2STDatasource(self.tempData);
      self.isShowTable = true;
      self.source2 = self.ng2STDatasource(self.tempData2);
      self.isShowTable2 = true;
      self.loading = false;
      self.changeRef.detectChanges();
    });
  }

  onUpdatedMember(member: PersonalMemberBean) {
    let self = this;

    self.copyObj(member, self.paramMember);

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
      // for (let item of listAll) {
      //   if (item.citizenId == tmpMember.citizenId) {
      //     index = listAll.indexOf(item);
      //   }
      // }
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
      self.message_error('', 'ไม่สามารถเพิ่มยข้อมูลได้เนื่องจากมีข้อมูลซ้ำซ้อน');
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

    if (member.birthDate) {
      tmpMember.age = self.getAge(member.birthDate).toString();
    } else {
      tmpMember.age = '';
    }

    let familyStatus = '';
    if (member.listFamilyStatus) {
      for (let g of member.listFamilyStatus) {
        if (g.id == member.familyStatusId) {
          familyStatus = g.name;
          break;
        }
      }
    }
    tmpMember.familyStatusName = familyStatus;

    if (!isActionAdd) {
      // listAll[index] = tmpMember;
      let deleteIndex1 = -1;
      let pushItem1 = null;
      for (let item of self.tempData) {
        if (item.isGuest == true) {
          pushItem1 = item;
          deleteIndex1 = self.tempData.indexOf(item)
        }
      }

      let deleteIndex2 = -1;
      let pushItem2 = null;
      for (let item of self.tempData2) {
        if (item.isGuest == false) {
          pushItem2 = item;
          deleteIndex2 = self.tempData2.indexOf(item)
        }
      }

      if (deleteIndex1 >= 0) {
        self.tempData.splice(deleteIndex1, 1);
      }
      if (deleteIndex2 >= 0) {
        self.tempData2.splice(deleteIndex2, 1);
      }

      if (pushItem1 != null) {
        self.tempData2.push(pushItem1);
      }
      if (pushItem2 != null) {
        self.tempData.push(pushItem2);
      }

    } else {
      if (tmpMember.isGuest == true) {
        self.tempData2.push(tmpMember);
      } else {
        self.tempData.push(tmpMember);
      }
    }

    // console.log(self.tempData);
    // console.log(self.tempData2);

    self.source.refresh();
    self.source2.refresh();

    $("#modalMember").modal('hide');
  }

  onClickAdd() {
    let self = this;

    self.action = this.ass_action.ADD;
    self.cloneMember = new PersonalMemberBean();
    self.paramMember = new PersonalMemberBean();
    self.paramMember.homeId = this.paramHomeId;

    //self.changeRef.detectChanges();
   // $("#modalMember").modal({ backdrop: 'static', keyboard: false });

    this.onModalManagementMemberForm();

  }

  onClickPrint() {

  }

  onClickSave() {
    let self = this;

    let listAll: Array<any> = [];
    for (let item of self.tempData) {
      listAll.push(item);
    }
    for (let item of self.tempData2) {
      listAll.push(item);
    }

    self.apiHttp.commit_save_survey(self.paramHomeId, self.osmId, self.paramRoundId, listAll, function (d) {
      console.log(d);
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'เพิ่มข้อมูลการสำรวจสำเร็จ');
      } else {
        self.message_error('', 'เพิ่มข้อมูลการสำรวจไม่สำเร็จ');
      }
    });
  }

  onClickBack() {
    this.router.navigate(['/main/surveys/personal']);
  }

  onModalForm(row: PersonalMemberBean) {
    $("#modalMember").modal({ backdrop: 'static', keyboard: false });
  }

  onModalManagementMemberForm(){
    this.memberBean = new PersonalBasicBean();
    this.memberBean.homeId = this.paramHomeId;
    this.changeRef.detectChanges();
    $("#modal-management-home-member-form").modal('show');
  }
  onSaveCompleted(event: any){
    let self = this;
    if(event.success){
      $("#modal-management-home-member-form").modal('hide');
      let update: PersonalMemberBean = new PersonalMemberBean();
      let bean: PersonalBasicBean = event.bean;
      // update.personId = bean.personId;
      // update.citizenId = bean.citizenId;
      // update.genderId = bean.genderId;
      // update.prefixCode = bean.prefixCode;
      // update.firstName = bean.firstName;
      // update.lastName = bean.lastName;
      // update.birthDate = bean.birthDate;
      // update.educationCode = bean.educationCode;
      // update.occupationCode = bean.occupationCode;
      // update.bloodTypeId = bean.bloodTypeId;
      // update.rhGroupId = bean.rhGroupId;
      // update.familyStatusId = bean.familyStatusId;
      // update.isGuest = bean.isGuest;

      self.copyObj(bean, update);
      this.message_success('',event.message, function(){
        self.onUpdatedMember(update);
      });

    }else{

    }
    console.log(event);
  }

}

@Component({
  template: "<div class=\"text-center\"><button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">สำรวจ</button></div>",
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