import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiHTTPService } from "../../service/api-http.service";
import { BaseComponent } from "../../base-component";
import { CompleterService, CompleterData } from 'ng2-completer';
import { RegisterBean } from "../../beans/register.bean";

declare var bootbox: any;
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent extends BaseComponent implements OnInit {


  public registerBean: RegisterBean
  public loadingCMD: string = 'hide';
  public dataHospitals: CompleterData;
  public apiHttp = new ApiHTTPService();
  private api: ApiHTTPService;
  public provinceList: any;
  public amphurList: any;
  public tumbolsList: any;
  public prefixList: any;
  public hospitalList: any;
  public isErrorHospital: boolean = false;
  public isErrorProvice: boolean = false;
  public isErrorAmphur: boolean = false;
  public isErrorTumbol: boolean = false;

  public isErrorCode9: boolean = false;
  public isErrorCode5: boolean = false;
  public isErrorPrefix: boolean = false;
  public isErrorFirstName: boolean = false;
  public isErrorLastName: boolean = false;
  public isErrorEmail: boolean = false;
  public isErrorPhone: boolean = false;
  public isErrorCitizenID: boolean = false;

  public isFocusHospitalname: boolean = false;
  public isFocusHospitalProvince: boolean = false;
  public isFocusHospitalAmphur: boolean = false;
  public isFocusHospitalTumbol: boolean = false;
  public isFocusHospitalCode9: boolean = false;
  public isFocusHospitalCode5: boolean = false;
  public isFocusCitizenId: boolean = false;
  public isFocusPrefixName: boolean = false;
  public isFocusName: boolean = false;
  public isFocusLastName: boolean = false;
  public isFocusEmail: boolean = false;
  public isFocusPhone: boolean = false;


  constructor(private completerService: CompleterService, private changeRef: ChangeDetectorRef) {
    super();

    this.api = new ApiHTTPService();
    this.registerBean = new RegisterBean();
    this.api_hospital();
    // this.api_province();
    this.getProvinceList();
    this.getPrefixName();
    this.registerBean.provinceID = "0";
    this.registerBean.amphurCode = "0";
    this.registerBean.tumbolID = "0";
    this.registerBean.contactPrefix = "0";

  }

  ngOnInit() {
    
  }

  api_register(): void {

  }

  api_hospital() {
    //this.loadingCMD = 'show';
    let seft = this;
    this.apiHttp.post('hospital/hospital_list', {}, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        seft.hospitalList = resp.response;
        seft.dataHospitals = seft.completerService.local(resp.response, 'hospitalName', 'hospitalName');
        console.log(seft.hospitalList);
      }
      seft.loadingCMD = 'hide';
    });
  }

  // api_province() : void {

  //   let seft = this;
  //   this.apiHttp.get('address/province', {} ,function(data){
  //     seft.provinceList = data;
  //   });
  // }

  onProvinceChange() {
    let self = this;
    self.registerBean.amphurCode = "0";
    self.registerBean.tumbolID = "0";
    let params = { "provinceCode": this.registerBean.provinceID };
    this.api.post('address/amphur', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.amphurList = resp.response;
      }

    })
  }

  onAmphurChange() {
    let self = this;
    self.registerBean.tumbolID = "0";
    let params = { "amphurCode": this.registerBean.amphurCode };
    this.api.post('address/tumbol', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.tumbolsList = resp.response;
      }

    })
  }

  onTumbolChange() {

  }

  doRegister() {
    let self = this;

    //this.validateForm();
    //console.log(this.validateForm());
    if (this.validateForm()) {
      let objvalidate = this.validateHostpital();
      if (objvalidate.addressFail == true) {
        bootbox.alert({
          size: "large",
          title: "<div style='color:#f0ad4e;font-weight: bold;'><span class='glyphicon glyphicon-alert'></span> สถานที่ไม่ตรง</div>",
          message: "กรุณาระบุสถานที่ตั้งให้ตรงกับ รพ.สต. ที่ท่านเลือก",
          callback: function () { /* your callback code */ }
        });
      }
      else if (objvalidate.code9Fail == true) {
        bootbox.alert({
          size: "large",
          title: "<div style='color:#f0ad4e;font-weight: bold;'><span class='glyphicon glyphicon-alert'></span> หมายเลข 9 หลักไม่ตรง</div>",
          message: "กรอกรหัส 9 หลักให้ตรงกับ รพ.สต. ที่ท่านเลือก",
          callback: function () { /* your callback code */ }
        });
      }
      else if (objvalidate.code5Fail == true) {
        bootbox.alert({
          size: "large",
          title: "<div style='color:#f0ad4e;font-weight: bold;'><span class='glyphicon glyphicon-alert'></span> หมายเลข 5 หลักไม่ตรง</div>",
          message: "กรอกรหัส 5 หลักให้ตรงกับ รพ.สต. ที่ท่านเลือก",
          callback: function () { /* your callback code */ }
        });
      } else {
        this.registerBean.contactCitizenId = this.formatForJson(this.registerBean.contactCitizenId);
        this.registerBean.contactTelephone = this.formatForJson(this.registerBean.contactTelephone);
        let params = {
          code5: this.registerBean.code5,
          contactPrefix: this.registerBean.contactPrefix,
          contactFirstName: this.registerBean.contactFirstName,
          contactLastName: this.registerBean.contactLastName,
          contactCitizenId: this.registerBean.contactCitizenId,
          contactTelephone: this.registerBean.contactTelephone,
          contactEmail: this.registerBean.contactEmail
        };
        console.log(params);
        this.api.post('hospital/register_hospital', params, function (resp) {
          console.log(resp);
          if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
            bootbox.alert({
              size: "large",
              title: "<div style='color:#5cb85c;font-weight: bold;'><span class='glyphicon glyphicon-ok'></span> ลงทะเบียนสำเร็จ</div>",
              message: "กรุณาตรวจสอบอีเมลของท่านเพื่อยืนยันการลงทะเบียน",
              callback: function () { location.href = '/login' }
            });
          }
        })
      }
    }

  }

  getProvinceList() {
    let self = this;
    let params = {};
    this.api.post('address/province', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.provinceList = resp.response;
      }

    })
  }

  getPrefixName() {
    let self = this;
    let params = {};
    this.api.post('person/prefix_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.prefixList = resp.response;
      }

    })
  }

  // getHospitalList() {
  //   let self = this;
  //   let params = {};
  //   this.api.post('hospital/hospital_list', params, function (resp) {
  //     if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
  //       self.prefixList = resp.response;
  //     }
  //   })
  // }

  validateHostpital() {
    let self = this;

    if (!self.isEmpty(self.registerBean.hospitalName)) {
      let obj = {
        addressFail: true,
        code5Fail: true,
        code9Fail: true
      };

      for (let item of self.hospitalList) {
        if (item.hospitalName.trim == this.registerBean.hospitalName.trim) {
          if (this.registerBean.provinceID == item.provinceCode
            && this.registerBean.amphurCode == item.amphurCode
            && this.registerBean.tumbolID == item.tumbolCode) {
            obj.addressFail = false;
          }
          if (item.code9 == this.registerBean.code9) {
            obj.code9Fail = false;
          }
          if (item.code5 == this.registerBean.code5) {
            obj.code5Fail = false;
          }
        }
      }
      return obj;
    }
    // else {
    //   self.isErrorHospital = true;
    // }
  }

  validateForm(): boolean {
    let self = this;
    let validateForm = true;
    self.isFocusHospitalname = true;

    if (self.isEmpty(self.registerBean.contactTelephone)) {
      self.isErrorPhone = true;
      validateForm = false;
    } else {
      self.isErrorPhone = false;
    }

    if (self.isEmpty(self.registerBean.contactEmail) || !self.isEmailFormat(self.registerBean.contactEmail)) {
      self.isErrorEmail = true;
      validateForm = false;
    } else {
      self.isErrorEmail = false;
    }

    if (self.isEmpty(self.registerBean.contactLastName)) {
      self.isErrorLastName = true;
      validateForm = false;
    } else {
      self.isErrorLastName = false;
    }

    if (self.isEmpty(self.registerBean.contactFirstName)) {
      self.isErrorFirstName = true;
      validateForm = false;
    } else {
      self.isErrorFirstName = false;
    }

    if (self.registerBean.contactPrefix == "0") {
      self.isErrorPrefix = true;
      validateForm = false;
    } else {
      self.isErrorPrefix = false;
    }

    if (self.isEmpty(self.registerBean.contactCitizenId) || self.registerBean.contactCitizenId.length < 17) {
      self.isErrorCitizenID = true;
      validateForm = false;
    } else {
      self.isErrorCitizenID = false;
    }

    if (self.isEmpty(self.registerBean.code5) || self.registerBean.code5.length < 5) {
      self.isErrorCode5 = true;
      validateForm = false;
    } else {
      self.isErrorCode5 = false;
    }

    if (self.isEmpty(self.registerBean.code9) || self.registerBean.code9.length < 9) {
      self.isErrorCode9 = true;
      validateForm = false;
    } else {
      self.isErrorCode9 = false;
    }

    if (self.registerBean.tumbolID == "0") {
      self.isErrorTumbol = true;
      validateForm = false;
    } else {
      self.isErrorTumbol = false;
    }

    if (self.registerBean.amphurCode == "0") {
      self.isErrorAmphur = true;
      validateForm = false;
    } else {
      self.isErrorAmphur = false;
    }
    if (self.registerBean.provinceID == "0") {
      self.isErrorProvice = true;
      validateForm = false;
    } else {
      self.isErrorProvice = false;
    }

    if (self.isEmpty(self.registerBean.hospitalName)) {
      self.isErrorHospital = true;
      validateForm = false;
    } else {
      self.isErrorHospital = false;
    }

    return validateForm;

  }

  formatCitizenID() {
    let self = this;

    if (!self.isEmpty(self.registerBean.contactCitizenId)) {
      let patternCitizen: string = "_-____-_____-__-_";
      let patternCitizen_ex: string = "-";
      let returnText = "";
      let obj_1: number = self.registerBean.contactCitizenId.length;
      let obj_2 = obj_1 - 1;
      for (let i = 0; i < patternCitizen.length; i++) {
        if (obj_2 == i && patternCitizen.charAt(i + 1) == patternCitizen_ex) {
          returnText += self.registerBean.contactCitizenId + patternCitizen_ex;
          self.registerBean.contactCitizenId = returnText;
        }
      }
    }
  }

  formatPhoneNumber() {
    let self = this;

    if (!self.isEmpty(self.registerBean.contactTelephone)) {
      let patternPhone: string = "__-____-____";
      let patternPhone_ex: string = "-";
      let returnText = "";
      let obj_1: number = self.registerBean.contactTelephone.length;
      let obj_2 = obj_1 - 1;
      for (let i = 0; i < patternPhone.length; i++) {
        if (obj_2 == i && patternPhone.charAt(i + 1) == patternPhone_ex) {
          returnText += self.registerBean.contactTelephone + patternPhone_ex;
          self.registerBean.contactTelephone = returnText;
        }
      }
    }
  }

  setCode9Maxlenght() {
    let self = this;
    if (!self.isEmpty(self.registerBean.code9)) {
      if (self.registerBean.code9.length >= 9) {
        self.registerBean.code9 = self.registerBean.code9.substr(0, 8);
      }
    }
  }

  setCode5Maxlenght() {
    let self = this;
    if (!self.isEmpty(self.registerBean.code5)) {
      if (self.registerBean.code5.length >= 5) {
        self.registerBean.code5 = self.registerBean.code5.substr(0, 4);
      }
    }
  }

  formatForJson(value) {
    let pure_value = value.split("-");
    let result = pure_value.join('');

    // for(let i=0;i<=pure_value.length-1;i++){
    //      result = result+pure_value[i];
    // }
    return result;
  }

}
