import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private route: Router, private user: UserService) {

  }

  ngOnInit() {

  }

  onGotoIndex() {
    this.route.navigate(['']);
  }

  logout(){
    localStorage.clear();
    this.user = new UserService();
    console.log('XXX == ', this.user);
    this.route.navigate(['/']);
  }

}
