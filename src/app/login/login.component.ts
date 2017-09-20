import { Component, OnInit } from '@angular/core';
import { UserService } from "./../sevice/user.service";
import { Router } from "@angular/router";
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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    
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
