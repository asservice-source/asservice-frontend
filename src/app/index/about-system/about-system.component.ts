import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-index-about-system',
  templateUrl: './about-system.component.html',
  styleUrls: ['./about-system.component.css']
})
export class IndexAboutSystemComponent implements OnInit{

    ngOnInit(): void {
      // setTimeout(function(){
      //   let pathName = location.pathname;
      //   $('.menu-item>a.active').removeClass('active');
      //   $('.header-menu>ul>li.menu-item > a[href="'+pathName+'"]').addClass('active');
      // }
      // , 300);
    }

}