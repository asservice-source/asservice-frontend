import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers} from "@angular/http";
import { BaseComponent } from "../base-component";
import { HospitalBean } from "../beans/hospital.bean";
import { PersonBean } from "../beans/person.bean";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  public hospitalBean: HospitalBean;
  public personBean: PersonBean;
 
  constructor(private http : Http) {
    super();
    this.hospitalBean = new HospitalBean();
    this.personBean = new PersonBean();
   }

  ngOnInit() {
    this.api_province();
  }

  api_register() : void {
    
  }
  api_province() : void {
    this.http.get( this._GLOBAL.API_SERVER_URL +'address/province', {})
      .subscribe(data => {
      console.log(data);
    });
     
    let username, password, data, err;
    let headers = new Headers({
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa(username + ":" + password)
    });
    let options = new RequestOptions({headers: headers});
    this.http.get(this._GLOBAL.API_SERVER_URL +'address/province')
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => err,
        () => console.log('Fetching complete for Server Metrics')
      )
  }

  doRegister() : void{
    
  }
}