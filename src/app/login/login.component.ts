import { Component, OnInit } from '@angular/core';
import { UserService } from "./../sevice/user.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user = new UserService();
  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log(this.user.password);
  }
}
