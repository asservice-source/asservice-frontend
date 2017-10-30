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
  public adminMenus: any = {};

  private api: ApiHTTPService = new ApiHTTPService();
  constructor() { }

  ngOnInit() {
    this.setUpMenu();
  }

  setUpMenu(){
    let self = this;
    this.api.post('app/menu',{}, function(response){
        console.log(response);
        //self.links = response;
        self.compareMenu(response);
    });
  }

  compareMenu(menus: any){
    let menuSurveys = [];
    for(let item of menus){
      if(item.menuID==21){
        this.adminMenus = item;
      }else{
        menuSurveys.push(item);

      }
    }
    this.surveyMenus = menuSurveys;
  }

}
