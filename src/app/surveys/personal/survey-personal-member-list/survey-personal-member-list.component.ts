import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { PersonBean } from '../../../beans/person.bean';
import { Service_SurveyPersonal } from '../../../api-managements/service-survey-personal';
import { PersonalBasicBean } from '../../../beans/personal-basic.bean';
import { Address } from '../../../beans/address';
declare var $;

@Component({
  selector: 'app-survey-personal-member-list',
  templateUrl: './survey-personal-member-list.component.html',
  styleUrls: ['./survey-personal-member-list.component.css']
})
export class SurveyPersonalMemberListComponent extends BaseComponent implements OnInit {
  private apiHttp: Service_SurveyPersonal = new Service_SurveyPersonal();

  private paramHomeId: string;
  private paramRoundId: string;

  public action: string = this.ass_action.ADD;
  public paramMember: PersonalBasicBean;
  public cloneMember: PersonalBasicBean;
  public memberBean: PersonalBasicBean;
  public address: Address;
  public roundName: string = "";
  public homeAddress: string = "";
  public homeTel: string = "";
  public osmId: string = "";
  public osmFullName: string = "";
  public homeInfo: any = {};

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

  public isEditing: boolean = false;
  public isSaveData: boolean = false;
  public warningLeavPage = 'เมื่อกดยกเลิกหรือย้อนกับ ข้อมูลการแก้ไขแบบสำรวจจะยังไม่ถูกบันทึกลงฐานข้อมูล<br>ต้องการทำต่อใช่หรือไม่?';

  constructor(private http: Http, private route: Router, private routeAct: ActivatedRoute, private changeRef: ChangeDetectorRef) {
    super();
    this.isEditing = false;
    this.paramMember = new PersonalBasicBean();
    this.cloneMember = new PersonalBasicBean();
    this.memberBean = new PersonalBasicBean();
    this.address = new Address();
    this.settingColumn();
  }

  ngOnInit() {
    this.receiveParameters();
    this.bindRoundName();
    this.bindHomeInfo();
    this.bindHomeMemberList();

    let _self = this;
    // window.onbeforeunload = function() {
    //   return _self.warningLeavPage;
    // };
    // $(window).bind('beforeunload', function(){
    //   return _self.warningLeavPage;
    // });
  }

  receiveParameters() {
    this.routeAct.params.subscribe(params => {
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
    self.loading = true;
    self.apiHttp.api_HomrInfo(self.paramHomeId, function (d) {
      if (d && d.status.toUpperCase() == "SUCCESS") {
        console.log(d);
        self.homeInfo = d.response;
        let homeInfo = self.homeInfo;
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

  onUpdatedMember(member: PersonalBasicBean) {
    console.log(member);
    this.isEditing = true;
    let self = this;
    member.fullName = self.getFullName(member.prefixName, member.firstName, member.lastName);
    if(member.birthDate) {
      member.age = self.getAge(member.birthDate).toString();
    } else {
      member.age = '';
    }
    self.copyObj(member, self.paramMember);
    let tmpMember = member;
    let isActionAdd = (self.action == self.ass_action.ADD);
    let citizenIdsDup: Array<string> = []
    let index = -1;
    

    let listAll: Array<any> = [];
    for (let item of self.tempData) {
      listAll.push(item);
    }
    for (let item of self.tempData2) {
      listAll.push(item);
    }

    if (!isActionAdd) {
      // check CitizenId Duplicate in List
      for (let item of listAll) {
        if (item.citizenId == tmpMember.citizenId && item.personId != tmpMember.personId) {
          citizenIdsDup.push(item.citizenId);
        }
      }

      if (citizenIdsDup.length>0) {
        self.message_error('', 'ไม่สามารถแก้ไขข้อมูลได้เนื่องจากหมายเลขประชาชนซ้ำ <br>' + citizenIdsDup);
        return;
      }

      let moveIndex1 = -1;
      let pushItem1 = null;
      for (let item of self.tempData) {
        if (item.isGuest == true) {
          pushItem1 = item;
          moveIndex1 = self.tempData.indexOf(item)
        }
      }

      let moveIndex2 = -1;
      let pushItem2 = null;
      for (let item of self.tempData2) {
        if (item.isGuest == false) {
          pushItem2 = item;
          moveIndex2 = self.tempData2.indexOf(item)
        }
      }

      if (moveIndex1 >= 0) {
        self.tempData.splice(moveIndex1, 1);
      }
      if (moveIndex2 >= 0) {
        self.tempData2.splice(moveIndex2, 1);
      }

      if (pushItem1 != null) {
        self.tempData2.push(pushItem1);
      }
      if (pushItem2 != null) {
        self.tempData.push(pushItem2);
      }

    } else {
      if (tmpMember.isGuest) {
        self.tempData2.push(tmpMember);
      } else {
        self.tempData.push(tmpMember);
      }
      listAll.push(tmpMember);
    }

    for (let item of listAll) {
      if(item.personId != tmpMember.personId && item.familyStatusId=='1' && tmpMember.familyStatusId=='1'){
        item.familyStatusId='2';
        item.familyStatusName = 'ผู้อาศัย'
      }
    }

    self.source.refresh();
    self.source2.refresh();
    console.log(self.tempData);
    console.log(self.tempData2);
    $("#modalMember").modal('hide');
    self.message_success('', 'แก้ไขข้อมูลบุคคล <b>' + member.fullName + '</b> เรียบร้อย');
  }

  onClickAdd() {
    let self = this;
    self.action = this.ass_action.ADD;
    self.cloneMember = new PersonalBasicBean();
    self.paramMember = new PersonalBasicBean();
    self.paramMember.homeId = this.paramHomeId;
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
    if(listAll.length<=0){
      this.message_error('','สมาชิกในบ้านจะต้องมีอย่างน้อย 1 คน');
      return;
    }
    self.apiHttp.commit_save_survey(self.paramHomeId, self.osmId, self.paramRoundId, listAll, function (d) {
      console.log(d);
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        self.message_success('', 'ส่งข้อมูลการสำรวจสำเร็จ', function(){
          self.isSaveData = true;
          $('#btnBack').click();
          self.changeRef.detectChanges();
        });
      } else {
        self.message_error('', 'ส่งข้อมูลการสำรวจไม่สำเร็จ');
      }
    });
  }
  onClickBackNavigate(){
    $('#btnBack').click();
  }
  onClickBack() {
    let _self = this;
    if(this.isEditing && !this.isSaveData){
      this.message_comfirm('', this.warningLeavPage
        , function(isConfirm){
          if(isConfirm){
            _self.route.navigate(['/main/surveys/personal']);
          }
      });
    }else{
      _self.route.navigate(['/main/surveys/personal']);
    }
    
  }

  onModalForm(row: PersonalBasicBean) {
    let self = this;
    self.action = self.ass_action.EDIT;
    row.homeId = self.paramHomeId;
    self.cloneMember = self.cloneObj(row);
    self.paramMember = row;
    self.paramMember = self.strNullToEmpty(self.paramMember);

    self.changeRef.detectChanges();
    $("#modalMember").modal();
  }

  onModalManagementMemberForm(){
    this.memberBean = new PersonalBasicBean();
    this.memberBean.homeId = this.paramHomeId;
    this.changeRef.detectChanges();
    $("#modal-management-home-member-form").modal('show');
  }
  onSaveCompleted(event: any){
    console.log(event);
    let self = this;
    if(event.success){
      $("#modal-management-home-member-form").modal('hide');
      let update: PersonalBasicBean = new PersonalBasicBean();
      let bean: PersonalBasicBean = event.bean;
      self.copyObj(bean, update);
      self.message_success('',event.message, function(){
        self.onUpdatedMember(update);
      });

    }else{

    }
    
  }


  settingColumn(){
    let self = this;
    self.settings = this.getTableSetting({
      fullName: {
        title: 'ชื่อ-สกุล',
        filter: false,
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatCitizenId(cell) + '</div>';
        }
      },
      genderName: {
        title: 'เพศ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      familyStatusName: {
        title: 'สถานะ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      rowGUID: {
        title: 'การสำรวจ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let text = '';
          if(cell || row.isSurveyed){
            text = 'สำรวจแล้ว';
          }else{
            text = 'ยังไม่สำรวจ';
          }
          console.log(cell);
          return '<div class="text-center">' + text + '</div>';
        }
      }
      ,
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: SurveyPersonalMemberListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonalBasicBean) => {
            // console.log(row);
            self.onModalForm(row);
          });
        }
      }
    });

    self.settings2 = this.getTableSetting({
      fullName: {
        title: 'ชื่อ-สกุล',
        filter: false,
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatCitizenId(cell) + '</div>';
        }
      },
      genderName: {
        title: 'เพศ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      familyStatusName: {
        title: 'สถานะ',
        filter: false,
        width: '80px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>';
        }
      },
      rowGUID: {
        title: 'การสำรวจ',
        filter: false,
        width: '100px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          let text = '';
          if(cell.rowGUID){
            text = 'สำรวจแล้ว';
          }else{
            text = 'ยังไม่สำรวจ';
          }
          return '<div class="text-center">' + text + '</div>';
        }
      },
      action: {
        title: '',
        filter: false,
        width: '100px',
        type: 'custom',
        renderComponent: SurveyPersonalMemberListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonalBasicBean) => {
            // console.log(row);
            
            self.onModalForm(row);
          });
        }
      }
    });
  }

}

@Component({
  template: '<div class="text-center"><button (click)="clickEdit();" class="btn btn-sm btn-primary">สำรวจ</button></div>',
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