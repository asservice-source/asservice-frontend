import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor() { }

  ngOnInit() {
    // add the the body classes
    this.body.classList.add('skin-blue');
    this.body.classList.add('sidebar-mini');


    let pathName = location.pathname;
    setTimeout(function(){
      $.each($('.sidebar-menu ul.treeview-menu>li>a'), function(){
        if($(this).attr('href')==pathName){
          $(this).parent().parent().parent().find('a').click();
        }
      });
    }, 300);

  }

   ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-blue');
    this.body.classList.remove('sidebar-mini');
  }

}

