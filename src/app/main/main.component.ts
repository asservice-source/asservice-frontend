import { Component, OnInit, OnDestroy } from '@angular/core';
import {BaseComponent} from '../base-component';
declare var $:any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  private baseComp: BaseComponent;
  constructor() { }

  ngOnInit() {
    // add the the body classes
    console.log("=> MAIN");
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');
    setTimeout(function(){
      let pathName = location.pathname;
      $.each($('ul.treeview-menu>li>a'), function(){
        if($(this).attr('href')==pathName){
          $(this).parent().parent().parent().find('a').click();
        }
      });
    }, 1000);
    this.baseComp = new BaseComponent();
    this.baseComp.getLocationGooglemaps(null, (data)=>{

      console.log('LocationGooglemaps', data);
    });
  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

}

