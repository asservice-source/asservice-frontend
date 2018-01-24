import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from "../../base-component";
import { PersonBean } from "../../beans/person.bean";
import { VillageBean } from '../../beans/village.bean';
import { HomeBean } from '../../beans/home.bean';
import { RequestOptions, Headers, Http } from '@angular/http';
import { ApiHTTPService } from '../../api-managements/api-http.service';
import { FilterBean } from '../../beans/filter.bean';
import { ViewCell, LocalDataSource } from 'ng2-smart-table';
declare var $: any;

@Component({
  selector: 'app-filter-find-person',
  templateUrl: './filter-find-person.component.html',
  styleUrls: ['./filter-find-person.component.css']
})
export class FilterFindPersonComponent extends BaseComponent implements OnInit {
  @Input() findPersonal: boolean;
  @Input() reset: any;
  @Input() surveyTypeCode:string;
  @Input() documentId : string;
  @Output() choosePersonal: EventEmitter<PersonBean> = new EventEmitter<PersonBean>();

  private api: ApiHTTPService;
  public isShowFind: boolean = true;
  public isShowPersons: boolean = false;
  public filterBean: FilterBean = new FilterBean();
  public personBean: PersonBean;
  public villageData: any;
  public osmData: any;
  public isDisabledOSM = true;
  public isDisabledHomeNo = true;
  public isDisabledPerson = true;
  public isDisableBtnSearch = true;
  public personData: any = []//[{ citizenId: '1-11-3-2290343-2-4', fullName: 'นายโอดอวย หวยโหย', age: 34, status: 'ผู้อาศัย' }, { citizenId: '6-00-3-2290344-5-0', fullName: 'นายต้องเต ไทบ้านนอก', age: 41, status: 'เจ้าบ้าน' }];
  public homeData: any;

  public settings: any;
  public source: LocalDataSource;
  public loading: boolean = false;
  public isStaff: boolean;

  constructor(private changeRef: ChangeDetectorRef ) {
    super();
    this.api = new ApiHTTPService();
    this.personBean = new PersonBean();
    this.personBean.citizenId = "";
    this.personBean.fullName;

    if(this.isStaffRole(this.userInfo.roleId)){
      this.isStaff = true;
      this.setupVillage();
    }else{
      this.isStaff = false;
      this.filterBean.villageId = this.userInfo.villageId;
      this.filterBean.osmId = this.userInfo.personId;
      this.setupHome();
    }

    this.settingTable();

  }

  ngOnInit() {
    
  }

  ngOnChanges(changes): void {
    if (changes['findPersonal']) {
      this.isShowFind = this.findPersonal;
    }
    if (changes['reset']) {
      this.filterBean.villageId = "";
      this.changVillageNo();

    }
    if(!this.isStaff){
      this.isDisabledHomeNo = false;
    }
  }

  changVillageNo() {
    this.filterBean.osmId = "";
    this.filterBean.homeId = "";
    this.personBean.citizenId = '';
    
    if (this.filterBean.villageId) {
      this.setupOSM();
      this.setupHome();
    } else {
      this.isDisabledHomeNo = true;
      this.isDisabledOSM = true;
    }
    
    this.filterChanges();
  }

  changeOSM() {
    this.setupHome();
    this.filterChanges();
    this.filterBean.homeId = "";
  }

  changHomeNo() {
    if (this.filterBean.homeId) {
      this.isDisableBtnSearch = false;
    } else {
      this.isDisableBtnSearch = true;
    }
    this.personBean.citizenId = '';
    this.filterChanges();
  }

  doSearchPerson() {
    this.isDisabledPerson = false;
    this.setupSurveyHomeMemberList();
  }

  //call with duplicate filter
  setupSurveyHomeMemberList(){

    console.log(this.documentId);
    console.log(this.surveyTypeCode);
    console.log(this.filterBean.homeId);

    let _self = this;
        _self.loading = true;
        _self.api.api_SurveyHomeMemberList(_self.documentId,_self.surveyTypeCode,_self.filterBean.homeId,function(response){
          _self.source = _self.ng2STDatasource(response);
          _self.isShowPersons = true;
          _self.loading = false;
          console.log("detect");
          _self.source.refresh();
          _self.changeRef.detectChanges();
          setTimeout(function(){
            $('.sequenceNo').click();
          }, 100);
          
        });
  }

  setupMemberList() {
    let _self = this;

    _self.loading = true;

    _self.api.api_HomeMemberList(_self.filterBean.homeId, function (response) {
      _self.source = _self.ng2STDatasource(response);
      // _self.personData = response;
      _self.isShowPersons = true;
      _self.loading = false;
      _self.changeRef.detectChanges();
    });
  }

  setupVillage() {
    let self = this;
    this.api.api_villageList(super.getHospitalCode(), function (response) {
      self.villageData = response;
    })
  }

  setupOSM() {
    this.isDisabledOSM = true;
    let self = this;
    this.api.api_OsmList(this.filterBean.villageId, function (response) {
      self.osmData = response;
      self.isDisabledOSM = false;
      self.changeRef.detectChanges();
    })
  }

  setupHome() {
    let self = this;
    self.isDisabledHomeNo = true;

    console.log(self.documentId);
    console.log(self.filterBean.villageId);
    console.log(self.filterBean.osmId);
    console.log(self.surveyTypeCode);

    self.api.api_HomeListByHeader(self.documentId,self.filterBean.villageId,self.filterBean.osmId,self.surveyTypeCode
      , function (response) {
        self.homeData = response;
        self.isDisabledHomeNo = false;
        self.changeRef.detectChanges();
      });
  }

  onChoosePerson(person: PersonBean) {
    this.isShowFind = false;
    this.choosePersonal.emit(person);
  }

  filterChanges() {
    this.isShowPersons = false;
  }

  settingTable(){
    let self = this;
    self.settings = self.getTableSetting({
      fullName: {
        title: 'ชื่อ - นามสกุล',
        filter: false,
        width: '180px',
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '180px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      familyStatusName: {
        title: 'สถานะ',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '120px',
        type: 'custom',
        renderComponent: FilterFindPersonButtonChooseComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PersonBean, cell) => {
            console.log(row);
            self.onChoosePerson(row);
          });
        }
      }
    });
  }
}

@Component({
  template: "<div class=\"text-center\"><button (click)=\"clickChoose();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">เลือก</button></div>",
})
export class FilterFindPersonButtonChooseComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  clickChoose() {
    this.action.emit(this.rowData);
  }
}