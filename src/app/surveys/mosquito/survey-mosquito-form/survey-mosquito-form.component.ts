import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { MosquitoBean } from '../../../beans/mosquito.bean';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { HomeBean } from '../../../beans/home.bean'
import {SelectHomeListButton} from '../../../filter/filter-find-mosquito/filter-find-mosquito.component';
import {LocalDataSource} from 'ng2-smart-table';

declare var $: any;
@Component({
  selector: 'app-survey-mosquito-form',
  templateUrl: './survey-mosquito-form.component.html',
  styleUrls: ['./survey-mosquito-form.component.css']
})
export class SurveyMosquitoFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() data: MosquitoBean;
  @Input() documentId: string;
  @Input() placeData: any;
  @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  public isShowForm: boolean = false;
  public isShowFind: boolean= true;
  public isStaff: boolean;
  public isFromPending: boolean = false;

  private api: ApiHTTPService;
  public containerTypeList: any;
  public loading: boolean = false;
  public homebean: HomeBean = new HomeBean();
  public obj = [];
  public isShowAddPlace = false;
  public mosquitobean: MosquitoBean;

  public settings: any;
  public source: LocalDataSource;

  public listVillages: Array<any> = [];
  public listOsm: Array<any> = [];
  public listHomeTypes: Array<any> = [];
  public listHomes: Array<any> = [];

  public findVillageId: string = '';
  public findHomeTypeCode: string = '';
  public findOsmId: string = '';

  public isShowListHome: boolean;
  public isVillageDisabled: boolean = true;
  public isOsmDisabled: boolean = true;
  public isHomeTypeDisabled: boolean = true;

  public valSurveyTotal: any = {};
  ngAfterViewInit(): void {

  }

  constructor(private changeRef: ChangeDetectorRef) {
    super();
    this.mosquitobean = new MosquitoBean();
    this.api = new ApiHTTPService();
    this.homebean = new HomeBean();
  }

  ngOnInit() {
    this.isStaff = this.isStaffRole(this.userInfo.roleId);
    this.bindModalEvent();
    this.getContainerType();
    if(!this.isStaff){
      this.findOsmId = this.userInfo.personId;
      this.findVillageId = this.userInfo.villageId;
    }

  }
  setListVillages(){
    this.isVillageDisabled = true;
    this.api.api_villageList(super.getHospitalCode(), (data)=> {
      this.listVillages = data;
      this.isVillageDisabled = false;
    })
  }
  setListOSMs(){
    this.isOsmDisabled = true;
    if(this.findVillageId){
      this.api.api_OsmList(this.findVillageId, (data)=> {
        this.listOsm = data;
        this.isOsmDisabled = false;
      });
    }
  }
  setListHomeTypes(){
    this.isHomeTypeDisabled = true;
    this.api.api_HomeTypeList((data)=>{
      this.listHomeTypes = data;
      this.isHomeTypeDisabled = false;
    });
  }
  onFindVillageChange(){
    this.setListOSMs();
  }
  onFindSearch() {
    this.changeTableSetting();
    let parameters = {
      "villageId": this.findVillageId,
      "homeTypeCode": this.findHomeTypeCode,
      "documentId": this.documentId,
      "osmId": this.findOsmId
    };

    console.log("parameters", parameters);
    this.loading = true;
    this.api.post('home/home_list_by_village_hometype', parameters, (resp)=> {
      this.isShowListHome = true;
      this.loading = false;
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        this.listHomes = resp.response;
        this.source = this.ng2STDatasource(this.listHomes);
        this.changeRef.detectChanges();
      }
      this.changeRef.detectChanges();
    });
  }

  onAddPlaceOrHome(){
    $('#find-person-md').modal('hide');
    this.homebean = new HomeBean();
    this.homebean.homeId = "";
    this.homebean.registrationId = "";
    this.homebean.homeNo = "";
    this.homebean.soi = "";
    this.homebean.road = "";
    this.homebean.latitude = "";
    this.homebean.longitude = "";
    this.homebean.homeTypeCode = "";
    this.homebean.villageId = this.findVillageId;
    this.homebean.osmId = this.findOsmId;

    this.isShowAddPlace = true;
    this.changeRef.detectChanges();
    $('#modalFormHome').modal('show');
  }


  onCancel() {
    this.mosquitobean = new MosquitoBean();

    for (let i = 0; i < this.containerTypeList.length; i++) {
      this.obj[i] = false;
    }

    this.isShowFind = true;
    this.isShowForm = false;
    if (this.ass_action.EDIT == this.action || this.isFromPending) {
      $('#find-person-md').modal('hide');
    }
  }

  onChoosePlace(bean: any): void {
    this.isShowFind = false;
    this.mosquitobean = new MosquitoBean();
    this.mosquitobean = bean;
    this.isShowForm = true;
    if (this.action == this.ass_action.ADD) {
      this.setListContainerTypeDefault();
    }
  }

  bindModalEvent() {
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.isFromPending = false;
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePlace(self.data);
      }else if(self.action == self.ass_action.ADD && self.placeData){
        self.onChoosePlace(self.placeData);
        self.isFromPending = true;
      }else{
        self.isShowFind = true;
        if(self.isStaff){
          self.setListVillages();
        }else{
          self.findOsmId = self.userInfo.personId;
          self.findVillageId = self.userInfo.villageId;
        }
        self.setListHomeTypes();

      }
      self.changeRef.detectChanges();
    })

    $('#find-person-md').on('hidden.bs.modal', function () {
      self.isShowListHome = false;
      self.isShowForm = false;
      self.clearFormSearch();
      self.changeRef.detectChanges();
    });
  }
  clearFormSearch(){
    this.findOsmId = '';
    this.findVillageId = '';
    this.findHomeTypeCode = '';
    this.listOsm = [];
    this.isOsmDisabled = true;
    this.listHomes = [];
    this.source = this.ng2STDatasource(this.listHomes);
  }
  setListContainerTypeDefault() {
    let self = this;
    if (self.action == self.ass_action.ADD) {
      self.mosquitobean.listContainerType = [];
      for (let item of self.containerTypeList) {
        let contain = {
          "documentId": self.documentId,
          "homeId": self.mosquitobean.homeId,
          "osmId": self.mosquitobean.osmId,
          "containerTypeId": item.containerTypeId,
          "totalSurvey": 0,
          "totalDetect": 0,
          "locateTypeId": 1
        }
        self.mosquitobean.listContainerType.push(contain);
      }
    }
  }
  getContainerType() {
    let self = this;
    let params = {};
    this.api.post('survey_hici/container_type_list', params, function (resp) {

      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.containerTypeList = resp.response;
      }
    })
  }

  setNullContainerTypeSurvey(total, containerType) {
    if (!total) {
      this.mosquitobean.listContainerType[containerType].totalSurvey = "0";
    }
  }

  setNullContainerTypeDetect(total, containerType) {
    if (!total) {
      this.mosquitobean.listContainerType[containerType].totalDetect = "0";
    }
  }

  validateSum(): boolean {
    let self = this;
    let validate = true;
    self.obj = [];
    for (let i = 0; i < this.containerTypeList.length; i++) {
      if (parseInt(this.mosquitobean.listContainerType[i].totalDetect) > parseInt(this.mosquitobean.listContainerType[i].totalSurvey)) {
        self.obj[i] = true;
        validate = false;
      } else {
        self.obj[i] = false;
      }
    }
    return validate;
  }
  changeTableSetting() {

    let self = this;
    if (this.findHomeTypeCode == "01") {
      this.settings = this.getTableSetting({
        homeNo: {
          title: 'เลขที่',
          filter: false,
          width: '80px',
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return '<div class="text-center">' + cell + '</div>'
          }
        },
        homeTypeName: {
          title: 'ประเภท',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return '<div class="text-center">' + cell + '</div>'
          }
        },
        address: {
          title: 'ที่อยู่',
          filter: false
        },
        action: {
          title: '',
          filter: false,
          width: '70',
          type: 'custom',
          renderComponent: SelectHomeListButton,
          onComponentInitFunction(instance) {
            instance.action.subscribe((row: HomeBean) => {
              self.onChoosePlace(row);
            });
          }
        }
      });
    } else {
      this.settings = this.getTableSetting({
        name: {
          title: 'ชื่อ',
          filter: false
        },
        homeTypeName: {
          title: 'ประเภท',
          filter: false,
          type: 'html',
          valuePrepareFunction: (cell, row) => {
            return '<div class="text-center">' + cell + '</div>'
          }
        },
        address: {
          title: 'ที่อยู่',
          filter: false
        },
        action: {
          title: '',
          filter: false,
          width: '70',
          type: 'custom',
          renderComponent: SelectHomeListButton,
          onComponentInitFunction(instance) {
            instance.action.subscribe((row: HomeBean) => {
              self.onChoosePlace(row);
            });
          }
        }
      });
    }
  }
  addSurvey() {

    let self = this;
    for (let item of this.mosquitobean.listContainerType) {
      delete item.containerTypeName;
      item.osmId = this.findOsmId;
    }
    let objs = {
      listContainerType: this.mosquitobean.listContainerType
    }
    let params = JSON.stringify(objs);

    let sumtotal = 0;
    for (let i = 0; i < this.containerTypeList.length; i++) {
      sumtotal += parseInt(this.mosquitobean.listContainerType[i].totalSurvey);
    }
    console.log('=> params =>',params);

    if (this.validateSum()) {
      if (sumtotal <= 0) {
        this.message_error('', 'กรุณาระบุจำนวนภาชนะที่สำรวจ');
      } else {
        self.message_comfirm('', 'ยืนยันการทำแบบสำรวจ', function (confirm) {
          if (confirm) {
            self.loading = true;
            self.api.post('survey_hici/ins_upd_hici_info', params, function (resp) {
              self.loading = false;
              if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
                $("#find-person-md").modal('hide');
                self.completed.emit(true);
              }
            })
          }
        })
      }
    }
  }

  onComplete(isSuccess) {
    let self = this;
    if (isSuccess.success) {
      self.message_success('', 'เพิ่มสถานที่สำเร็จ', function (confirm) {

      })
    }
  }


}
