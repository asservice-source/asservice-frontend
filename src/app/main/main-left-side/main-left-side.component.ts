import { Component, OnInit,Input } from '@angular/core';
import { ApiHTTPService } from "../../service/api-http.service";

@Component({
  selector: 'app-main-left-side',
  templateUrl: './main-left-side.component.html',
  styleUrls: ['./main-left-side.component.css']
})
export class MainLeftSideComponent implements OnInit {
  //@Input() links: Array<any> = [];
  public links: Array<any> = [];
  private api: ApiHTTPService = new ApiHTTPService();
  constructor() { }

  ngOnInit() {
    this.setUpMenu();
  }

  setUpMenu(){
    let self = this;
    this.api.post('app/menu',{}, function(response){
        console.log(response);
        self.links = response;
    });
  }

}
