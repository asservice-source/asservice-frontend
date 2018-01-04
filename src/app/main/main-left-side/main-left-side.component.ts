import { Component, OnInit,Input } from '@angular/core';
import { ApiHTTPService } from "../../api-managements/api-http.service";
import { UserService } from '../../service/user.service';

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
  constructor(public userInfo: UserService) { }

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
      if(item.menuId==21){
        this.staffMenus = item;
      }else if(item.menuId==25){
        this.osmMenus = item;
      }else{
        menuSurveys.push(item);
      }
    }
    this.surveyMenus = menuSurveys;
  }

}
