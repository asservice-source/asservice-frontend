import { Component, OnInit } from '@angular/core';
import { UserService } from "./../sevice/user.service";
import { Router } from "@angular/router";
import { RequestOptions, Headers, URLSearchParams, Http } from '@angular/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user = new UserService();
  fixUser = "admin";
  fixPass = "1234";
  constructor(private http:Http,private router: Router) { }

  ngOnInit() {
  }

  login(){
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
    
    console.log(this.user.password);
      let strUser = this.user.username;
      let strPass = this.user.password;

      if(this.fixUser == strUser && this.fixPass == strPass){
          localStorage.setItem("login", "1");
          this.router.navigate([""]);
      }else{
          localStorage.setItem("login", "0");
      }

  }
}
