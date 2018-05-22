import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { PregnantBean } from '../../../beans/pregnant.bean';
import { PregnantChildBean } from '../../../beans/pregnant-child.bean';
import { LocalDataSource } from '../../../ng2-smart-table';
import { Service_SurveyPregnant } from '../../../api-managements/service-survey-pregnant';
declare var $;

@Component({
  selector: 'app-survey-pregnant-history',
  templateUrl: './survey-pregnant-history.component.html',
  styleUrls: ['./survey-pregnant-history.component.css']
})
export class SurveyPregnantHistoryComponent extends BaseComponent implements OnInit {

  @Input() data: PregnantBean;

  private apiHttp: Service_SurveyPregnant = new Service_SurveyPregnant();

  public surveyTypePregnant: string = "Pregnant";
  public surveyTypeBorn: string = "Born";
  public bornTypeAbort: string = "4";

  public listBornLocation: any = [];
  public listBornType: any = [];
  public listGender: any = [];
  public listBloodType: any = [];

  public bornDate: string = "";
  public bornLocationId: string = "";
  public bornLocationName: string = "";
  public bornTypeId: string = "";
  public bornTypeName: string = "";
  public abortionCause: string = "";

  public pregnantBean: PregnantBean;

  public settings: any;
  public source: LocalDataSource;

  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.pregnantBean = new PregnantBean();

    self.settingsColumns();

    self.bindBornLocation();
    self.bindBornType();
    self.bindGender();
    self.bindBloodType();
  }

  ngOnInit() {
    let self = this;

    self.onModalEvent();
  }

  onModalEvent() {
    let self = this;

    $('#modal-history-pregnant').on('show.bs.modal', function (e) {
      self.pregnantBean = self.data;
      if (self.pregnantBean.childs && self.pregnantBean.childs.length > 0) {
        self.bornDate = self.displayFormatDate_Thai(self.pregnantBean.childs[0].birthDate);
        self.bornLocationId = self.pregnantBean.childs[0].bornLocationId;
        self.bornLocationName = self.getBornLocation(self.bornLocationId);
        self.bornTypeId = self.pregnantBean.childs[0].bornTypeId;
        if (self.bornTypeId == self.bornTypeAbort) {
          self.abortionCause = self.pregnantBean.childs[0].abortionCause;
        }
        self.bornTypeName = self.getBornType(self.bornTypeId);
        self.bindChildList(self.pregnantBean.childs);
      }
      self.changeRef.detectChanges();
    });

    $('#modal-history-pregnant').on('hidden.bs.modal', function () {

    });
  }

  bindBornLocation() {
    let self = this;

    let params = { "hospitalCode": self.getHospitalCode() };

    self.apiHttp.post("person/born_location_list", params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listBornLocation = d.response;
      } else {
        console.log('survey-personal-history-form(bindBornLocation) occured error(s) => ' + d.message);
      }
    });
  }

  bindBornType() {
    let self = this;

    let params = {};

    self.apiHttp.post("person/born_type_list", params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listBornType = d.response;
      } else {
        console.log('survey-personal-pregnant-history(bindBornType) occured error(s) => ' + d.message);
      }
    });
  }

  bindGender() {
    let self = this;

    let URL_LIST_GENDER: string = "person/gender_list";
    let params = {};

    self.apiHttp.post(URL_LIST_GENDER, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listGender = d.response;
      } else {
        console.log('survey-personal-pregnant-history(bindGender) occured error(s) => ' + d.message);
      }
    });
  }

  bindBloodType() {
    let self = this;

    let URL_LIST_BLOOD_TYPE: string = "person/blood_type_list";
    let params = {};

    self.apiHttp.post(URL_LIST_BLOOD_TYPE, params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listBloodType = d.response;
      } else {
        console.log('survey-personal-pregnant-history(bindBloodType) occured error(s) => ' + d.message);
      }
    });
  }

  getBornLocation(id) {
    let self = this;

    for (let item of self.listBornLocation) {
      if (item.id = id) {
        return item.name;
      }
    }
  }

  getBornType(id) {
    let self = this;

    for (let item of self.listBornType) {
      if (item.id = id) {
        return item.name;
      }
    }
  }

  getGender(id) {
    let self = this;

    for (let item of self.listGender) {
      if (item.id = id) {
        return item.name;
      }
    }
  }

  getBloodType(id) {
    let self = this;

    for (let item of self.listBloodType) {
      if (item.id = id) {
        return item.name;
      }
    }
  }

  bindChildList(list) {
    let self = this;

    self.source = self.ng2STDatasource(list);
  }

  settingsColumns() {
    let self = this;

    self.settings = self.getTableSetting({
      firstName: {
        title: 'ชื่อ',
        width: '70px',
        filter: false,
      },
      lastName: {
        title: 'นามสกุล',
        width: '70px',
        filter: false,
      },
      bornCitizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatCitizenId(cell) + '</div>'
        }
      },
      genderId: {
        title: 'เพศ',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.getGender(cell) + '</div>'
        }
      },
      bloodTypeId: {
        title: 'กรุ๊ปเลือด',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.getBloodType(cell) + '</div>'
        }
      },
      weight: {
        title: 'น้ำหนัก (กรัม)',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + self.formatNumber(cell) + '</div>'
        }
      }
    });
  }

}
