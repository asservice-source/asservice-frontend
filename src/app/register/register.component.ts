import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiHTTPService } from "../service/api-http.service";
import { BaseComponent } from "../base-component";
import { CompleterService, CompleterData } from 'ng2-completer';
import { RegisterBean } from "../beans/register.bean";

declare var bootbox: any;

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
  public isErrorProvice : boolean = false;
  public isErrorAmphur : boolean = false;
  public isErrorTumbol : boolean = false;

  public isErrorCode9 : boolean = false;
  public isErrorCode5 : boolean = false;
  public isErrorPrefix : boolean = false;
  public isErrorFirstName : boolean = false;
  public isErrorLastName : boolean = false;
  public isErrorEmail : boolean = false;
  public isErrorPhone : boolean = false;
  public isErrorCitizenID : boolean = false;
  


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
        seft.hospitalList = resp.list;
        seft.dataHospitals = seft.completerService.local(resp.list, 'name', 'name');

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
        self.amphurList = resp.list;
      }

    })
  }

  onAmphurChange() {
    let self = this;
    self.registerBean.tumbolID = "0";
    let params = { "amphurCode": this.registerBean.amphurCode };
    this.api.post('address/tumbol', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.tumbolsList = resp.list;
      }

    })
  }

  onTumbolChange() {

  }

  doRegister() {
    let self = this;

    this.validateForm();
    console.log(this.validateForm());
    // let objvalidate = this.validateHostpital();

    // if (objvalidate.addressFail == true) {
    //   bootbox.alert({
    //     size: "large",
    //     title: "<div style='color:#E21B1B;font-weight: bold;'>สถานที่ไม่ตรง</div>",
    //     message: "กรุณาระบุสถานที่ตั้งให้ตรงกับ รพ.สต. ที่ท่านเลือก",
    //     callback: function () { /* your callback code */ }
    //   });
    // }
    // else if (objvalidate.code9Fail == true) {
    //   bootbox.alert({
    //     size: "large",
    //     title: "<b>หมายเลข9หลักไม่ตรง</b>",
    //     message: "กรอกรหัส 9 หลักให้ตรงกับ รพ.สต. ที่ท่านเลือก",
    //     callback: function () { /* your callback code */ }
    //   });
    // }
    // else if (objvalidate.code5Fail == true) {
    //   bootbox.alert({
    //     size: "large",
    //     title: "<b>หมายเลข5หลักไม่ตรง</b>",
    //     message: "กรอกรหัส 5 หลักให้ตรงกับ รพ.สต. ที่ท่านเลือก",
    //     callback: function () { /* your callback code */ }
    //   });
    // } else {
    //   bootbox.alert("ผ่าน");
    // }


    // this.validateHostpital();
    //console.log(this.validateHostpital());




    /*
    this.hospitalBean.code5 = "94261";
    this.hospitalBean.contactPrefix = "003";
    this.hospitalBean.contactFirstName = "ittigorn";
    this.hospitalBean.contactLastName = "หล่อสัดๆ";
    this.hospitalBean.contactCitizenId = "1234567891011";
    this.hospitalBean.contactTelephone = "0812345678";
    this.hospitalBean.contactEmail = "ittigorn_hotmail.com";

   

    let xxx = JSON.stringify(this.hospitalBean);

    let self = this;
    let params = xxx;
    this.api.post('hospital/register_hospital', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        console.log("ไปแล้วววว++");
      }
    
    })

*/
  }

  getProvinceList() {
    let self = this;
    let params = {};
    this.api.post('address/province', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.provinceList = resp.list;
      }

    })
  }

  getPrefixName() {
    let self = this;
    let params = {};
    this.api.post('person/prefix_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.prefixList = resp.list;
      }

    })
  }

  getHospitalList() {
    let self = this;
    let params = {};
    this.api.post('hospital/hospital_list', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.prefixList = resp.list;
      }
    })
  }

  validateHostpital() {
    let self = this;
    
    if (!self.isEmpty(self.registerBean.hospitalName)) {
      let obj = {
        addressFail: true,
        code5Fail: true,
        code9Fail: true
      };

      for (let item of self.hospitalList) {
        if (item.name.trim == this.registerBean.hospitalName.trim) {
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

  validateForm(){
    let self = this;
  
      if (self.isEmpty(self.registerBean.hospitalName)) {
        self.isErrorHospital = true;
      } else {
        self.isErrorHospital = false;
      }

      if (self.registerBean.provinceID == "0") {
        self.isErrorProvice = true;
      } else {
        self.isErrorProvice = false;
      }

      if (self.registerBean.amphurCode == "0") {
        self.isErrorAmphur = true;
      } else {
        self.isErrorAmphur = false;
      }

      if (self.registerBean.tumbolID == "0") {
        self.isErrorTumbol = true;
      } else {
        self.isErrorTumbol = false;
      }

      if (self.isEmpty(self.registerBean.code9) || self.registerBean.code9.length < 9) {
        self.isErrorCode9 = true;
      } else {
        self.isErrorCode9 = false;
      }

      if (self.isEmpty(self.registerBean.code5) || self.registerBean.code5.length < 5) {
        self.isErrorCode5 = true;
      } else {
        self.isErrorCode5 = false;
      }

      if (self.isEmpty(self.registerBean.contactCitizenId) || self.registerBean.contactCitizenId.length < 17) {
        self.isErrorCitizenID = true;
      } else {
        self.isErrorCitizenID = false;
      }

      if (self.registerBean.contactPrefix == "0") {
        self.isErrorPrefix = true;
      } else {
        self.isErrorPrefix = false;
      }

      if (self.isEmpty(self.registerBean.contactFirstName)) {
        self.isErrorFirstName = true;
      } else {
        self.isErrorFirstName = false;
      }

      if (self.isEmpty(self.registerBean.contactLastName)) {
        self.isErrorLastName = true;
      } else {
        self.isErrorLastName = false;
      }

      if (self.isEmpty(self.registerBean.contactEmail)) {
        self.isErrorEmail = true;
      } else {
        self.isErrorEmail = false;
      }

      if (self.isEmpty(self.registerBean.contactTelephone)) {
        self.isErrorPhone = true;
      } else {
        self.isErrorPhone = false;      
      }
    
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

      if (obj_1 >= patternCitizen.length) {
        self.registerBean.contactCitizenId = self.registerBean.contactCitizenId.substr(0, patternCitizen.length - 1);
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

      if (obj_1 >= patternPhone.length) {
        self.registerBean.contactTelephone = self.registerBean.contactTelephone.substr(0, patternPhone.length - 1);
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

  formatForJson(value){
    let pure_value = value.split("-");
    let result = "";
    for(let i=0;i<=pure_value.length-1;i++){
         result = result+pure_value[i];
    }
    return result;
  }

}
