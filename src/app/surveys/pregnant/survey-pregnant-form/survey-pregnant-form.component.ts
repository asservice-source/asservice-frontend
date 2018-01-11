import { Component, OnInit, AfterViewInit, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { PregnantBean } from '../../../beans/pregnant.bean'
import { BaseComponent } from '../../../base-component';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomView_2_Component } from '../../../action-custom-table/action-custom-view.component';
import { PregnantChildBean } from '../../../beans/pregnant-child.bean';
import { Service_SurveyPregnant } from '../../../api-managements/service-survey-pregnant';
import { IMyDateModel } from 'mydatepicker-thai';
import { InputValidateInfo } from '../../../directives/inputvalidate.directive';
import { SimpleValidateForm } from '../../../utils.util';
import { parse } from 'querystring';
declare var $: any

@Component({
  selector: 'app-survey-pregnant-form',
  templateUrl: './survey-pregnant-form.component.html',
  styleUrls: ['./survey-pregnant-form.component.css']
})
export class SurveyPregnantFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;
  @Input() surveyTypeCode: string;
  @Input() documentId: string;
  @Input() data: PregnantBean;
  @Input() rowGUID: string;

  @Output() memberUpdated = new EventEmitter<PregnantBean>();

  private apiHttp: Service_SurveyPregnant = new Service_SurveyPregnant();

  public surveyTypePregnant: string = "Pregnant";
  public surveyTypeBorn: string = "Born";
  public bornTypeAbort: string = "4";

  public pregnantBean: PregnantBean;

  public actionChild: string;
  public tmpChildCitizenId: string;
  public listChild: any = [];
  public childBean: PregnantChildBean;
  public tmpChildBean: PregnantChildBean;

  public listBornLocation: any = [];
  public listBornType: any = [];
  public listGender: any = [];
  public listBloodType: any = [];

  public resetFind: number = 1;

  public isFindPersonal: boolean = true;
  public isShowForm: boolean = false;
  public isShowPregnantType: boolean = false;
  public isHiddenBornTypeAbort: boolean = true;

  public settings: any;
  public source: LocalDataSource;

  public modelBornDueDate: any = null;
  public modelBornDate: any = null;

  public validateCitizenId: InputValidateInfo = new InputValidateInfo();
  public validateWombNo: InputValidateInfo = new InputValidateInfo();
  public validateBornDueDate: InputValidateInfo = new InputValidateInfo();
  public validateBornDate: InputValidateInfo = new InputValidateInfo();

  public validateVerify: InputValidateInfo = new InputValidateInfo();
  public validateSave: InputValidateInfo = new InputValidateInfo();

  public loading: boolean = false;

  public error_message_citizenId: string = "กรุณาระบุ หมายเลขประจำตัว";
  public error_message_wombNo: string = "กรุณาระบุ ครรภ์ที่";
  public error_message_bornDueDate: string = "กรุณาระบุ กำหนดคลอด";
  public error_message_bornDate: string = "กรุณาระบุ วันที่คลอด";

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
          return '<div class="text-center">' + self.formatCitizenId(cell) + '</div>'
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
          return '<div class="text-center">' + self.formatNumber(cell) + '</div>'
        }
      },
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomView_2_Component, onComponentInitFunction(instance) {

          instance.edit.subscribe(row => {
            self.validateCitizenId = new InputValidateInfo();
            self.validateVerify = new InputValidateInfo();

            self.tmpChildCitizenId = row.citizenId;
            self.tmpChildBean = row;
            self.childBean = self.cloneObj(row);
            self.actionChild = self.ass_action.EDIT;
          });

          instance.delete.subscribe(row => {
            self.onDeleteChild(row);
          });

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

  onModalEvent() {
    let self = this;

    $('#find-person-md').on('show.bs.modal', function (e) {
      self.resetFind = self.resetFind + 1;
      if (self.action == self.ass_action.EDIT) {
        // self.onChoosePersonal(self.data);
        // alert(self.rowGUID);
        self.loading = true;
        self.apiHttp.get_pregnant_info(self.rowGUID, function (d) {
          let pregnantInfo = d.response;
          console.log('pregnant info', pregnantInfo);
          self.onChoosePersonal(pregnantInfo);
        });
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
    // self.source = new LocalDataSource(self.listChild);
    // self.setNg2STDatasource(self.source);
    self.source = self.ng2STDatasource(self.listChild);
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

  onChoosePersonal(bean: PregnantBean): void {
    let self = this;

    self.validateCitizenId = new InputValidateInfo();
    self.validateWombNo = new InputValidateInfo();

    self.validateVerify = new InputValidateInfo();
    self.validateSave = new InputValidateInfo();

    self.isFindPersonal = false;
    self.isShowForm = true;

    self.pregnantBean = bean;

    self.pregnantBean.pSurveyTypeCode = self.pregnantBean.pSurveyTypeCode || self.surveyTypePregnant;
    self.pregnantBean.bornDueDate = self.pregnantBean.bornDueDate || "";
    self.modelBornDueDate = self.getDatePickerModel(self.pregnantBean.bornDueDate) || null;
    self.pregnantBean.bornLocationId = self.pregnantBean.bornLocationId || "";
    self.pregnantBean.bornTypeId = self.pregnantBean.bornTypeId || "";
    self.pregnantBean.abortionCause = self.pregnantBean.abortionCause || "";

    self.onChangePregnantType(false);
    self.onChangeBornType();

    // self.modelBornDueDate = self.getDatePickerModel(self.pregnantBean.bornDueDate);

    self.clearListChild();
    if (self.pregnantBean.childs && self.pregnantBean.childs.length > 0) {
      // self.pregnantBean.bornDate = self.pregnantBean.childs[0].birthDate;
      // self.modelBornDate = self.getDatePickerModel(self.pregnantBean.childs[0].birthDate);
      self.pregnantBean.bornDate = self.pregnantBean.bornDueDate;
      self.modelBornDate = self.getDatePickerModel(self.pregnantBean.bornDueDate);
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

    self.loading = false;
  }

  onChangePregnantType(isClearData: boolean) {
    let self = this;

    if (self.pregnantBean.pSurveyTypeCode == self.surveyTypeBorn) {
      self.isShowPregnantType = true;
    } else {
      self.isShowPregnantType = false;
    }

    if (isClearData) {
      self.pregnantBean.bornDueDate = "";
      self.modelBornDueDate = null;

      self.pregnantBean.bornDate = "";
      self.modelBornDate = null;

      self.pregnantBean.bornLocationId = "";
      self.pregnantBean.bornTypeId = "";

      self.clearListChild();
      self.bindChildList();
    }

    self.validateSave = new InputValidateInfo();
  }

  onChangeBornType() {
    let self = this;

    if (self.pregnantBean.bornTypeId == self.bornTypeAbort) {
      self.isHiddenBornTypeAbort = false;
    } else {
      self.isHiddenBornTypeAbort = true;
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

    self.validateVerify = new InputValidateInfo();
    self.validateVerify.isCheck = true;

    self.validateCitizenId = new InputValidateInfo();
    self.validateCitizenId.isCheck = true;

    self.apiHttp.api_PersonByCitizenId(self.childBean.citizenId, function (d) {
      console.log('api_PersonByCitizenId', d.response);
      let duplicateData = d.response;

      if (self.isEmpty(self.childBean.citizenId)) {
        self.error_message_citizenId = "กรุณาระบุ หมายเลขประจำตัว";
        return;
      }

      if (!self.isValidCitizenIdThailand(self.childBean.citizenId)) {
        self.error_message_citizenId = "กรุณาระบุ หมายเลขประจำตัว ให้ถูกต้อง";
        return;
      }

      if (self.actionChild == self.ass_action.ADD) {
        if (duplicateData) {
          self.error_message_citizenId = "บัตรประชาชนซ้ำ";
          self.validateCitizenId = new InputValidateInfo();
          self.validateCitizenId.isCheck = true;
          self.validateCitizenId.isShowError = true;
          // self.message_error('', 'บัตรประชาชนซ้ำ');
          return;
        }
      } else if (self.actionChild == self.ass_action.EDIT) {
        if (duplicateData && duplicateData.citizenId != self.tmpChildCitizenId) {
          self.error_message_citizenId = "บัตรประชาชนซ้ำ";
          self.validateCitizenId = new InputValidateInfo();
          self.validateCitizenId.isCheck = true;
          self.validateCitizenId.isShowError = true;
          // self.message_error('', 'บัตรประชาชนซ้ำ');
          return;
        }
      }

      if (self.isEmpty(self.childBean.firstName)) {
        return;
      }

      if (self.isEmpty(self.childBean.lastName)) {
        return;
      }

      self.childBean.genderName = self.findGenderName(self.childBean.genderId);
      self.childBean.bloodTypeName = self.findBloodTypeName(self.childBean.bloodTypeId);

      if (self.actionChild == self.ass_action.ADD) {
        self.listChild.push(self.cloneObj(self.childBean));
      } else {
        self.copyObj(self.childBean, self.tmpChildBean);
      }

      self.bindChildList();
      self.clearInputChild();
    });
  }

  onClickClearChild() {
    let self = this;

    self.validateCitizenId = new InputValidateInfo();
    self.validateVerify = new InputValidateInfo();

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
        self.bindChildList();
      }
    });
  }

  onClickConfirm() {
    let self = this;

    let errors_count = 0;

    self.validateSave = new InputValidateInfo();
    self.validateSave.isCheck = true;

    self.validateWombNo = new InputValidateInfo();
    self.validateWombNo.isCheck = true;

    self.validateBornDueDate = new InputValidateInfo();
    self.validateBornDueDate.isCheck = false;

    self.validateBornDate = new InputValidateInfo();
    self.validateBornDate.isCheck = false;

    if (self.isEmpty(self.pregnantBean.wombNo)) {
      self.error_message_wombNo = "กรุณาระบุ ครรภ์ที่";
      self.validateWombNo = new InputValidateInfo();
      self.validateWombNo.isCheck = true;
      self.validateWombNo.isShowError = true;
      errors_count++;
    } else {
      let intWombNo = parseInt(self.pregnantBean.wombNo) || 0;
      if (intWombNo <= 0) {
        self.error_message_wombNo = "ครรภ์ที่ ต้องมีค่ามากกว่า 0";
        self.validateWombNo = new InputValidateInfo();
        self.validateWombNo.isCheck = true;
        self.validateWombNo.isShowError = true;
        errors_count++;
      }
    }

    if (self.isEmpty(self.pregnantBean.pSurveyTypeCode)) {
      errors_count++;
    }

    if (self.pregnantBean.pSurveyTypeCode == self.surveyTypeBorn) {
      self.validateBornDate = new InputValidateInfo();
      self.validateBornDate.isCheck = true;

      if (self.isEmpty(self.pregnantBean.bornDate)) {
        self.error_message_bornDate = "กรุณาระบุ วันที่คลอด";
        self.validateBornDate = new InputValidateInfo();
        self.validateBornDate.isCheck = true;
        self.validateBornDate.isShowError = true;
        errors_count++;
      } else if (self.isLessThanCurrentDate(self.pregnantBean.bornDate)) {
        self.error_message_bornDate = "วันที่คลอด ต้องมีค่ามากกว่าหรือเท่ากับวันที่ปัจจุบัน";
        self.validateBornDate = new InputValidateInfo();
        self.validateBornDate.isCheck = true;
        self.validateBornDate.isShowError = true;
        errors_count++;
      }

      if (self.isEmpty(self.pregnantBean.bornLocationId.toString())) {
        errors_count++;
      }

      if (self.isEmpty(self.pregnantBean.bornTypeId.toString())) {
        errors_count++;
      }

      if (self.listChild.length <= 0) {
        self.message_error('', 'กรุณาระบุข้อมูลของเด็กทารก');
        errors_count++;
      }
    } else {
      self.validateBornDueDate = new InputValidateInfo();
      self.validateBornDueDate.isCheck = true;

      if (self.isEmpty(self.pregnantBean.bornDueDate)) {
        self.error_message_bornDueDate = "กรุณาระบุ กำหนดคลอด";
        self.validateBornDueDate = new InputValidateInfo();
        self.validateBornDueDate.isCheck = true;
        self.validateBornDueDate.isShowError = true;
        errors_count++;
      }

      if (self.isLessThanCurrentDate(self.pregnantBean.bornDueDate)) {
        self.error_message_bornDueDate = "กำหนดคลอด ต้องมีค่ามากกว่าหรือเท่ากับวันที่ปัจจุบัน";
        self.validateBornDueDate = new InputValidateInfo();
        self.validateBornDueDate.isCheck = true;
        self.validateBornDueDate.isShowError = true;
        errors_count++;
      }
    }

    if (errors_count > 0) {
      return;
    }

    self.loading = true;

    self.pregnantBean.documentId = self.documentId;
    let bornDate = self.pregnantBean.bornDate;
    let bornLocationId = self.pregnantBean.bornLocationId;
    let bornTypeId = self.pregnantBean.bornTypeId;
    let abortionCause = self.pregnantBean.abortionCause;

    if (self.listChild.length > 0 && self.pregnantBean.bornTypeId != self.bornTypeAbort) {
      for (let item of self.listChild) {
        item.birthDate = bornDate;
        item.bornLocationId = bornLocationId;
        item.bornTypeId = bornTypeId;
        item.abortionCause = abortionCause;
      }
      self.pregnantBean.childs = self.listChild;
    } else {
      self.pregnantBean.childs = [];
    }

    self.apiHttp.commit_save(self.pregnantBean, function (d) {
      if (d.status.toString().toUpperCase() == "SUCCESS") {
        self.bindChildList();
        self.memberUpdated.emit(self.pregnantBean);
        $("#find-person-md").modal("hide");
      } else {
        self.message_error('', d.message);
      }

      self.loading = false;
    });
  }

  onClickBack() {
    let self = this;

    if (self.action == self.ass_action.ADD) {
      self.clearInputPregnant();
      self.isFindPersonal = true;
      self.isShowForm = false;
    } else {
      $("#find-person-md").modal("hide");
    }
  }

  clearInputPregnant() {
    let self = this;

    self.pregnantBean.wombNo = "";
    self.pregnantBean.pSurveyTypeCode = self.surveyTypePregnant;
    self.pregnantBean.bornDueDate = "";
    self.modelBornDueDate = null;
    self.pregnantBean.bornDate = "";
    self.modelBornDate = null;
    self.pregnantBean.bornLocationId = "";
    self.pregnantBean.bornTypeId = "";
    self.pregnantBean.abortionCause = "";
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

    genderId = (genderId) ? genderId.toString() : "";
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

    bloodTypeId = (bloodTypeId) ? bloodTypeId.toString() : "";
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
