import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-index-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class IndexContactusComponent implements OnInit{

    ngOnInit(): void {
      setTimeout(function(){
        let pathName = location.pathname;
        $('.menu-item>a.active').removeClass('active');
        $('.header-menu>ul>li.menu-item > a[href="'+pathName+'"]').addClass('active');
      }
      , 300);
    }

}