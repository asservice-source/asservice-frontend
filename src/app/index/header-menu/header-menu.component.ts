import { Component, OnInit, ElementRef } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit{
    public url:string;
    public menus: Array<any>;
    constructor(public route: Router){
      this.menus = [
        {"link": "/", "title": "หน้าหลัก", "class": ""}
        ,{"link": "/about-system", "title": "เกี่ยวกับระบบ", "class": ""}
        ,{"link": "/contact-us", "title": "ติดต่อเรา","class": ""}
        ,{"link": "/register", "title": "ลงทะเบียน","class": ""}
       ]
      route.events.subscribe((val) => {
        if(val instanceof NavigationEnd){
          console.log(val);
          for(let item of this.menus){
            if(item.link===val.url){
              item.class='active';
            }else{
              item.class ='';
            }
          }
        }
      });
    }
    ngOnInit(): void {

    }
}
