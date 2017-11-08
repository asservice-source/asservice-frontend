import { Component, OnInit,Input } from '@angular/core';
import { ApiHTTPService } from "../../service/api-http.service";

@Component({
  selector: 'app-main-left-side',
  templateUrl: './main-left-side.component.html',
  styleUrls: ['./main-left-side.component.css']
})
export class MainLeftSideComponent implements OnInit {
  //@Input() links: Array<any> = [];
  public surveyMenus: Array<any> = [];
  public staffMenus: any = {};
  public osmMenus: any = {};

  private api: ApiHTTPService = new ApiHTTPService();
  constructor() { }

  ngOnInit() {
    this.setupMenu();
  }

  setupMenu(){
    let _self = this;
    this.api.api_MenuLeft(function(response){
      _self.compareMenu(response);
    });
  }

  compareMenu(menus: any){
    let menuSurveys = [];
    for(let item of menus){
      if(item.menuID==21){
        this.staffMenus = item;
      }else if(item.menuID==25){
        this.osmMenus = item;
      }else{
        menuSurveys.push(item);
      }
    }
    this.surveyMenus = menuSurveys;
  }

}
