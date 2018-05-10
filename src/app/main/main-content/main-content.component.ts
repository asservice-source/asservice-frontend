import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AppComponent } from '../../app.component';
import { ApiHTTPService } from '../../api-managements/api-http.service';
import { BaseComponent } from '../../base-component';
import { RequestOptions, Headers } from '@angular/http';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
@Injectable()
export class MainContentComponent implements OnInit {
  public api: ApiHTTPService;
  public baseComponent: BaseComponent;
  constructor(public userInfo: UserService) {
    this.api = new ApiHTTPService();
    this.baseComponent = new BaseComponent();
  }
  ngOnInit() {
    // Update the AdminLTE layouts
    AdminLTE.init();
  }


}
