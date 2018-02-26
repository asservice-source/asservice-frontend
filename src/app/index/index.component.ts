import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { LocalStorageManagement } from '../service/localStorage-management';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  private storage: LocalStorageManagement;

  constructor(public user: UserService, private router: Router){
  this.storage = new LocalStorageManagement(this.user);
  }
  ngOnInit(): void {

    let jsonUInfo: any = this.storage.getDataUserInfo();
    if(jsonUInfo){
      this.storage.setUserInfo(jsonUInfo);
      if(this.user.userId){
        this.router.navigate(["main"]);
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
}
