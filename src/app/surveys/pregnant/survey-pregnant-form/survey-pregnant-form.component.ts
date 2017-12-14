import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { PersonBean } from '../../../beans/person.bean';
import { PregnantBean } from '../../../beans/pregnant.bean'
import { BaseComponent } from '../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
import { PregnantChildBean } from '../../../beans/pregnant-child.bean';
import { ApiHTTPService } from '../../../service/api-http.service';
import { IMyDateModel } from 'mydatepicker-thai';
declare var $: any

@Component({
  selector: 'app-survey-pregnant-form',
  templateUrl: './survey-pregnant-form.component.html',
  styleUrls: ['./survey-pregnant-form.component.css']
})
export class SurveyPregnantFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  @Input() action: string;
  @Input() surveyTypeCode: string;
  @Input() documentId: string;
  @Input() data: PregnantBean;

  mStatusNo = 0;

  isDisable = false;
  isDisableBirth = true;
  isDisableAbort = true;

  public personBean = new PersonBean();
  public pregnantBean: PregnantBean;

  public actionChild: string;
  public listChild: any = [];
  public childBean: PregnantChildBean;
  public tmpChildBean: PregnantChildBean;

  public listBornLocation: any = [];
  public listBornType: any = [];
  public listGender: any = [];
  public listBloodType: any = [];

  public pregnantType: number = 0;
  public bornLocation: string = "";
  public bornType: string = "";
  public resetFind: number = 1;

  public isFindPersonal: boolean = true;
  public isShowForm: boolean = false;
  public isDisplayPregnantType: boolean = false;

  public settings: any;
  public source: LocalDataSource;

  public modelBornDueDate: any = null;
  public modelBornDate: any = null;

  constructor(private changeRef: ChangeDetectorRef) {
    super();

    let self = this;

    self.pregnantBean = new PregnantBean();
    self.childBean = new PregnantChildBean();

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
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '120px',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      genderName: {
        title: 'เพศ',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      bloodTypeName: {
        title: 'กรุ๊ปเลือด',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-center">' + cell + '</div>'
        }
      },
      weight: {
        title: 'น้ำหนัก',
        width: '50px',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          return '<div class="text-right">' + cell + '</div>'
        }
      },
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomView_2_Component, onComponentInitFunction(instance) {

          // instance.view.subscribe(row => {
          //   self.bean = self.cloneObj(row);
          //   self.onModalForm(self.ass_action.EDIT);
          // });

          instance.edit.subscribe(row => {
            self.tmpChildBean = row;
            self.childBean = self.cloneObj(row);
            self.actionChild = self.ass_action.EDIT;
          });

          instance.delete.subscribe(row => {
            self.onDeleteChild(row);
          });

          // instance.action.subscribe((row: DeadBean, cell) => {
          //   console.log(row);
          //   if(row && row.action.toUpperCase()==self.ass_action.EDIT){
          //     self.bean = self.cloneObj(row);
          //     self.onModalForm(self.ass_action.EDIT);
          //   }
          // });
        }
      }
    });

  }

  ngOnInit() {
    let self = this;

    self.clearListChild();

    self.onModalEvent();

    self.bindBornLocation();
    self.bindBornType();
    self.bindChildList();
    self.bindGender();
    self.bindBloodType();
  }

  ngAfterViewInit(): void {

  }

  onChangeStatusNo() {
    let self = this;

    if (self.mStatusNo > 0) {
      if (self.mStatusNo == 1) {
        self.isDisable = true;
        self.isDisableBirth = false;
        self.isDisableAbort = true;
      } else {
        self.isDisable = true;
        self.isDisableBirth = true;
        self.isDisableAbort = false;
      }
    } else {
      self.isDisableBirth = true;
      self.isDisable = false;
      self.isDisableAbort = true;
    }
  }

  onModalEvent() {
    let self = this;

    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        self.onChoosePersonal(self.data);
      }
      self.changeRef.detectChanges();
    })
    $('#find-person-md').on('hidden.bs.modal', function () {
      console.log("hide.bs.modal");
      self.isShowForm = false;
      self.isFindPersonal = true;
      self.resetFind = self.resetFind + 1;
      self.changeRef.detectChanges();
    });
  }

  bindChildList() {
    let self = this;

    self.source = new LocalDataSource(self.listChild);
    self.setNg2STDatasource(self.source);
  }

  bindBornLocation() {
    let self = this;

    let params = {};

    self.apiHttp.post("person/born_location_list", params, function (d) {
      if (d != null && d.status.toUpperCase() == "SUCCESS") {
        // console.log(d);
        self.listBornLocation = d.response;
      } else {
        console.log('survey-personal-pregnant-form(bindBornLocation) occured error(s) => ' + d.message);
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
        console.log('survey-personal-pregnant-form(bindBornType) occured error(s) => ' + d.message);
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
        console.log('survey-personal-pregnant-form(bindGender) occured error(s) => ' + d.message);
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
        console.log('survey-personal-pregnant-form(bindBloodType) occured error(s) => ' + d.message);
      }
    });
  }

  onChoosePersonal(bean: any): void {
    let self = this;

    self.isFindPersonal = false;
    self.isShowForm = true;

    self.pregnantBean = bean;

    self.onChangePregnantType();

    self.modelBornDueDate = self.getDatePickerModel(self.pregnantBean.bornDueDate);

    self.clearListChild();
    if (self.pregnantBean.childs) {

      self.modelBornDate = self.getDatePickerModel(self.pregnantBean.childs[0].birthDate);
      self.pregnantBean.bornLocationId = self.pregnantBean.childs[0].bornLocationId;
      self.pregnantBean.bornTypeId = self.pregnantBean.childs[0].bornTypeId;
      self.pregnantBean.abortionCause = self.pregnantBean.childs[0].abortionCause;

      for (let item of self.pregnantBean.childs) {
        let child = new PregnantChildBean();
        child.genderId = item.genderId;
        child.genderName = self.findGenderName(item.genderId);
        child.citizenId = item.bornCitizenId;
        child.firstName = item.firstName;
        child.lastName = item.lastName;
        child.bloodTypeId = item.bloodTypeId;
        child.bloodTypeName = self.findBloodTypeName(item.bloodTypeId);
        child.weight = item.weight;
        self.listChild.push(child);
      }
    }
    self.bindChildList();

    self.clearInputChild();
  }

  onChangePregnantType() {
    let self = this;

    if (self.pregnantBean.pSurveyTypeCode == "Born") {
      self.isDisplayPregnantType = true;
    } else {
      self.isDisplayPregnantType = false;
    }
  }

  onChangeBornDueDate(event: IMyDateModel) {
    let self = this;

    // console.log(event);
    self.pregnantBean.bornDueDate = self.getStringDateForDatePickerModel(event.date);
  }
  
  onChangeBornDate(event: IMyDateModel) {
    let self = this;

    // console.log(event);
    self.pregnantBean.bornDate = self.getStringDateForDatePickerModel(event.date);
  }

  onClickConfirmChild() {
    let self = this;

    self.childBean.genderName = self.findGenderName(self.childBean.genderId);
    self.childBean.bloodTypeName = self.findBloodTypeName(self.childBean.bloodTypeId);

    if (self.actionChild == self.ass_action.ADD) {
      self.listChild.push(self.cloneObj(self.childBean));
    } else {
      self.copyObj(self.childBean, self.tmpChildBean);
    }

    self.bindChildList();
    self.clearInputChild();
  }

  onClickClearChild() {
    let self = this;

    self.clearInputChild();
  }

  onDeleteChild(child: PregnantChildBean) {
    let self = this;

    self.message_comfirm('', 'คุณต้องการลบ "' + child.citizenId + '" หรือไม่?', function (confirm) {
      if (confirm == true) {
        let index = self.listChild.indexOf(child);
        if (index >= 0) {
          self.listChild.splice(index, 1);
        }
      }
    });
  }

  onClickBack() {
    let self = this;

    if (self.action == self.ass_action.ADD) {
      self.isFindPersonal = true;
      self.isShowForm = false;
    } else {
      $("#find-person-md").modal("hide");
    }
  }

  clearInputChild() {
    let self = this;

    self.actionChild = self.ass_action.ADD;
    self.childBean = new PregnantChildBean();
  }

  clearListChild() {
    let self = this;

    self.listChild = [];
  }

  findGenderName(genderId) {
    let self = this;

    genderId = genderId.toString();
    if (!self.isEmpty(genderId)) {
      for (let item of self.listGender) {
        if (genderId == item.id) {
          return item.name;
        }
      }
    }
    return "";
  }

  findBloodTypeName(bloodTypeId) {
    let self = this;

    bloodTypeId = bloodTypeId.toString();
    if (!self.isEmpty(bloodTypeId)) {
      for (let item of self.listBloodType) {
        if (bloodTypeId == item.id) {
          return item.name;
        }
      }
    }
    return "";
  }
}
