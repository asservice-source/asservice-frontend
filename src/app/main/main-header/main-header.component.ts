import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(private route: Router) {

  }

  ngOnInit() {

  }

  onGotoIndex() {
    this.route.navigate(['']);
  }

  onClickChangePassword() {
    this.route.navigate(['/main/profile/change-password']);
  }

}
