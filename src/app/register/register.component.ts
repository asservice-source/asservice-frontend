import { Component, OnInit} from '@angular/core';
import { ApiHTTPService} from "../sevice/api-http.service";
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
  public provinceID: number = 0;
  public amphurID: number = 0;
  public tumbolID: number = 0;
  public hospitalName: string;
  public dataHospitals: CompleterData;
  public apiHttp = new ApiHTTPService();
  constructor(private completerService: CompleterService) {
    super();
    this.hospitalBean = new HospitalBean();
    this.personBean = new PersonBean();
    this.api_province();
    this.api_hospital();
   
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
    let seft = this;
    this.apiHttp.get('address/amphur', {provinceCode: seft.provinceID} ,function(data){
      seft.amphurs = data;
    });
  }

  onAmphurChange(){
    let seft = this;
    this.apiHttp.get('address/tumbol', {amphurCode: seft.amphurID} ,function(data){
      seft.tumbols = data;
    });
  }

  onTumbolChange(){

  }

  doRegister() : void{
    this.loadingCMD = 'show';
  }
}