import { Component, OnInit} from '@angular/core';
import { ApiHTTPService} from "../service/api-http.service";
import { BaseComponent } from "../base-component";
import { HospitalBean } from "../beans/hospital.bean";
import { PersonBean } from "../beans/person.bean";
import { CompleterService, CompleterData } from 'ng2-completer';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  public hospitalBean: HospitalBean;
  public personBean: PersonBean;
  public loadingCMD: string = 'hide';
  public provinces: any = [{}];
  public amphurs: any = [{}];
  public tumbols: any = [{}];
  public provinceID: string = '0';
  public amphurID: string = '0';
  public tumbolID: string = '0';
  public hospitalName: string;
  public dataHospitals: CompleterData;
  public apiHttp = new ApiHTTPService();
  private api: ApiHTTPService;
  public provinceList : any;
  public amphurList : any;
  public tumbolsList :any;
  public prefixList:any;

  constructor(private completerService: CompleterService) {
    super();
    this.api = new ApiHTTPService();
    this.hospitalBean = new HospitalBean();
    this.personBean = new PersonBean();
    this.api_province();
    this.api_hospital();
    this.getVillageList();
    this.getPrefixName();
   
   }

  ngOnInit() {

  }

  api_register() : void {
    
  }

  api_hospital(){
    let seft = this;
    this.apiHttp.get('hospital/hospital_list', {} ,function(data){
      seft.dataHospitals = seft.completerService.local(data, 'name', 'name');
    });
  }

  api_province() : void {
 
    let seft = this;
    this.apiHttp.get('address/province', {} ,function(data){
      seft.provinces = data;
    });
  }

  onProvinceChange(){
    let self = this;
    self.amphurID = "0";
    self.tumbolID = "0";
    let params = {"provinceCode": this.provinceID};
    this.api.post('address/amphur', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.amphurList = resp.list;
      }
    
    })
  }

  onAmphurChange(){
    let self = this;
    self.tumbolID = "0";
    let params = {"amphurCode": this.amphurID};
    this.api.post('address/tumbol', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.tumbolsList = resp.list;
      }
    
    })
  }

  onTumbolChange(){

  }

  doRegister(){
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


  }

  getVillageList(){

    let self = this;
    let params = {};
    this.api.post('address/province', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.provinceList = resp.list;
      }
    
    })
  }

  getPrefixName(){
    let self = this;
    let params = {};
    this.api.post('person/prefix_list', params, function (resp) {
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.prefixList = resp.list;
      }
    
    })
  }
}

