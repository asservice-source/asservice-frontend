import { Component, OnInit, AfterViewInit, Input, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { MosquitoBean } from '../../../beans/mosquito.bean';
import { ApiHTTPService } from '../../../api-managements/api-http.service';
import { HomeBean } from '../../../beans/home.bean'

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
  @Output() completed: EventEmitter<any> = new EventEmitter<any>();

  public isFindHome: boolean = true;
  public isShowForm: boolean = false;
  public resetFind: number = 1;
  private api: ApiHTTPService;
  public containerTypeList: any;
  public loading: boolean = false;
  public homebean: HomeBean = new HomeBean();
  public obj = [];
  public isShowAddPlace = false;
  public mosquitobean: MosquitoBean;

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
    this.onModalEvent();
    this.getContainerType();

  }

  addplace(villageId) {
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
    this.homebean.villageId = villageId;
    if (!this.isStaffRole(this.userInfo.roleId)) {
      this.homebean.osmId = this.userInfo.personId;
    }
    this.isShowAddPlace = true;
    this.changeRef.detectChanges();
    $('#modalFormHome').modal('show');

  }

  onBack() {
    this.mosquitobean = new MosquitoBean();

    for (let i = 0; i < this.containerTypeList.length; i++) {
      this.obj[i] = false;
    }

    this.isFindHome = true;
    this.isShowForm = false;
    if (this.ass_action.EDIT == this.action) {
      $('#find-person-md').modal('hide');
    }
  }

  onChoosePlace(bean: any): void {
    this.mosquitobean = new MosquitoBean();
    this.mosquitobean = bean;
    this.isFindHome = false;
    this.isShowForm = true;
    if (this.action == this.ass_action.ADD) {
      this.setListContainerTypeDefault();
    }
  }

  onModalEvent() {
    let self = this;
    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      console.log(self.action)
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePlace(self.data);
      }
      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindHome = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
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
      console.log(resp);
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
    console.log(this.obj);
    console.log(validate);
    return validate;
  }

  addSurvey() {

    let self = this;
    for (let item of this.mosquitobean.listContainerType) {
      delete item.containerTypeName;
    }
    let objs = {
      listContainerType: this.mosquitobean.listContainerType
    }
    let params = JSON.stringify(objs);
    console.log(objs);

    let sumtotal = 0;
    for (let i = 0; i < this.containerTypeList.length; i++) {
      sumtotal += parseInt(this.mosquitobean.listContainerType[i].totalSurvey);
    }


    if (this.validateSum()) {
      if (sumtotal <= 0) {
        this.message_error('', 'กรุณาระบุจำนวนภาชนะที่สำรวจ');
      } else {
        self.message_comfirm('', 'ยืนยันการทำแบบสำรวจ', function (confirm) {
          if (confirm) {
            self.loading = true;
            self.api.post('survey_hici/ins_upd_hici_info', params, function (resp) {
              console.log(resp);
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
