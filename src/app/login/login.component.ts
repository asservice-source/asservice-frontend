import { Component, OnInit } from '@angular/core';
import { UserService } from "./../service/user.service";
import { Router } from "@angular/router";
import { RequestOptions, Headers, URLSearchParams, Http } from '@angular/http';
import { ApiHTTPService } from '../api-managements/api-http.service';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private api: ApiHTTPService = new ApiHTTPService();
  private baseComponent: BaseComponent = new BaseComponent();
  public loading: boolean = false;
  public isErrorLogin: boolean = false;
  public msgErrorLogin: string = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  constructor(public user: UserService, private http: Http, private router: Router) {

  }

  ngOnInit() {
    let jsonUInfo: any = localStorage.getItem("uinfo");
    if(jsonUInfo){
      this.router.navigate(["main"]);
    }
  }

  login():any {
    let self = this;
    self.isErrorLogin = false;
    console.log("username: " + self.user.username);
    console.log("password: " + self.user.password);
    let strUser = self.user.username;
    let strPass = self.user.password;

    if(self.baseComponent.isEmpty(strUser) || self.baseComponent.isEmpty(strPass)){
      self.msgErrorLogin = "กรุณาใส่ชื่อผู้ใช้หรือรหัสผ่าน";
      self.isErrorLogin = true;
      return false;
    }
    self.loading = true;
    let params = { "userName": strUser, "password": strPass };
    this.api.post('user/login', params, function(resp){
      console.log(resp);
      self.loading = false;
      if(resp && resp.status.toString().toUpperCase() == 'SUCCESS' && resp.response.login){
        console.log('Passed');
        let obj = self.baseComponent.strNullToEmpty(resp.response);
        self.user.set(obj);
        localStorage.setItem("uinfo", JSON.stringify(obj));
        self.router.navigate([""]);
      }else{
        console.log('No Pass');
        localStorage.clear();
        self.msgErrorLogin = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        self.isErrorLogin = true;
      }
    });
  }


  signin(){
    let param = new URLSearchParams()
    /*    param.append('username', this.username);
     param.append('password', this.password);*/
    let headers = new Headers({
      'Authorization': 'Basic YXNzZXJ2aWNlLXRydXN0ZWQtY2xpZW50OnNlY3JldA==',// + btoa(this.user.username + ":" + this.user.password)
      //'Content-Type': 'application/x-www-form-urlencoded'
      
    });
    
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // headers.append('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); 
    // headers.append('Access-Control-Allow-Credentials', 'true'); 
    let options = new RequestOptions({headers: headers});
    this.http.post('http://192.168.1.203:8080/api-asservice/oauth/token?grant_type=password&username=anamai01&password=an123401', param, options).map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('Fetching complete for Server Metrics')
      )
  }

  onClickRegister(){
    this.router.navigate(["register"]);
  }

}
