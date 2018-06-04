import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { LocalStorageManagement } from '../../service/localStorage-management';

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
    localStorage.removeItem(LocalStorageManagement.UINFOKEY);
    this.user = new UserService();
    this.route.navigate(['/']);
  }

}
