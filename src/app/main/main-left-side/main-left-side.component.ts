import { Component, OnInit,Input } from '@angular/core';
import { ApiHTTPService } from "../../api-managements/api-http.service";
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import * as myconf from "../../global-config";
import { BaseComponent } from '../../base-component';
import { RequestOptions, Headers} from '@angular/http';

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
  public myconf = myconf;
  private api: ApiHTTPService;
  private baseComponent: BaseComponent;
  
  constructor(public userInfo: UserService, private route: Router) { 
    this.api = new ApiHTTPService();
    this.baseComponent = new BaseComponent();
  }

  ngOnInit() {
    this.setupMenu();
  }

  setupMenu(){
    let _self = this;
    // this.api.api_MenuLeft(function(response){
    //   _self.compareMenu(response);
    // });
    let sid: string = this.baseComponent.userInfo.sid;
    let headobj = { 
                    'Content-Type': 'application/json' 
                    , 'sid': sid
                  };
    let headers = new Headers(headobj);
    let pOptions = new RequestOptions({ headers: headers, method: "post" });


    this.api.http.post(this.baseComponent.getApiUrl('app/menu'), {}, pOptions)
            .map(res => res.json())
            .subscribe(
            data => this.compareMenu(data),
            err => console.log('MENUS ERR=>',err)
            )
  }

  compareMenu(menus: any){
    console.log("compareMenus", menus);
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
  // onManageProfile(){
  //   this.route.navigate(['main/profile/profile-management']); 
  // }

}
