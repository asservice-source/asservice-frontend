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

  private api: ApiHTTPService = new ApiHTTPService();

  fixUser = "admin";
  fixPass = "1234";

  constructor(public user: UserService,private http: Http, private router: Router) {

  }

  ngOnInit() {

  }

  login() {
    let self = this;
    console.log("username: " + self.user.username);
    console.log("password: " + self.user.password);
    let strUser = self.user.username;
    let strPass = self.user.password;

    let params = { "userName": strUser, "password": strPass };
    this.api.post('user/login', params, function(resp){
      console.log(resp);
      if(resp && resp.status.toString().toUpperCase() == 'SUCCESS' && resp.response.login){
        console.log('Passed');
        self.user.set(resp.response)
        localStorage.setItem("uinfo", JSON.stringify(self.user));
        self.router.navigate([""]);
      }else{
        console.log('No Pass');

        localStorage.clear();
      }
    });

    if (this.fixUser == strUser && this.fixPass == strPass) {
      let uinfo = {"uid": 1, "urid": 2, "ufullName": "นายสมพงศ์ ดวงดี", "hospitalCode5": "04269"};
      localStorage.setItem("uinfo", JSON.stringify(uinfo));
      self.router.navigate([""]);
    } else {
      localStorage.clear();
    }
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

}
