import { Component, OnInit } from '@angular/core';
import { UserService } from "./../service/user.service";
import { Router } from "@angular/router";
import { RequestOptions, Headers, URLSearchParams, Http } from '@angular/http';
import { ApiHTTPService } from '../service/api-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  private apiHttp: ApiHTTPService = new ApiHTTPService();

  fixUser = "admin";
  fixPass = "1234";

  constructor(public user: UserService,private http: Http, private router: Router) {

  }

  ngOnInit() {

  }

  login() {
    let self = this;
    // let param = new URLSearchParams()
    // /*    param.append('username', this.username);
    //  param.append('password', this.password);*/
    // let headers = new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   "Authorization": "Basic " + btoa(this.user.username + ":" + this.user.password)
    // });
    // let options = new RequestOptions({headers: headers});
    // this.http.post('http://192.168.1.132:8880/asservice/prefix', param, options).map(res => res.json())
    //   .subscribe(
    //     data => console.log(data),
    //     err => console.log(err),
    //     () => console.log('Fetching complete for Server Metrics')
    //   )

    console.log("username: " + self.user.username);
    console.log("password: " + self.user.password);

    let strUser = self.user.username;
    let strPass = self.user.password;

    // let params = { "username": strUser, "password": strPass };
    // self.apiHttp.post(self.URL_AUTHEN, params, function (d) {
    //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
        
    //   }
    // })

    if (this.fixUser == strUser && this.fixPass == strPass) {
      let uinfo = {"uid": 1, "urid": 2, "ufullName": "นายสมพงศ์ ดวงดี", "hospitalCode5": "04269"};
      localStorage.setItem("uinfo", JSON.stringify(uinfo));
      self.router.navigate([""]);
    } else {
      localStorage.clear();
    }
  }

}
