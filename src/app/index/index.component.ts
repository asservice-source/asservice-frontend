import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LocalStorageManagement } from '../service/localStorage-management';
import { Router } from '@angular/router';
import {BaseComponent} from '../base-component';
declare var $:any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  private storage: LocalStorageManagement;
  //private baseComp: BaseComponent;
  constructor(public user: UserService, private router: Router){
  this.storage = new LocalStorageManagement(this.user, this.router);
  }
  ngOnInit(): void {

    let jsonUInfo: any = this.storage.getDataUserInfo();
    if(jsonUInfo){
      this.storage.setUserInfo(jsonUInfo);
      if(this.user.userId){
         this.router.navigate(["main"]);
      //  let path = this.getUrlParameter('p');
      //  if(path){
      //   path = atob(path);
      //   console.log('Source',path);
      //   this.router.navigate([path])
      //  }else{
      //   this.router.navigate(["main"]);
      //  }
       
      }
    }

    // setTimeout(function(){
    //   let pathName = location.pathname;
    //   $('.menu-item>a.active').removeClass('active');
    //   $('.header-menu>ul>li.menu-item > a[href="'+pathName+'"]').addClass('active');

    //   $('.header-menu').on('click','.menu-item > a', function(){
    //     $.each($('.menu-item>a'), function(){
    //       $(this).removeClass('active');
    //     });
    //     if(!$(this).hasClass('active')){
    //       $(this).addClass('active');
    //     }
    //   });
    // }
    // , 1000);

  }

 getUrlParameter(sParam) {
    let sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
}
