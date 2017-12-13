import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AppComponent } from '../../app.component';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
@Injectable()
export class MainContentComponent implements OnInit {
  constructor(private userInfo: UserService) {
    
  }
  ngOnInit() {
    // Update the AdminLTE layouts
    AdminLTE.init();
    console.log(this.userInfo);
  }


}
