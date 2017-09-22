import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-died',
  templateUrl: './died.component.html',
  styleUrls: ['./died.component.css']
})
export class DiedComponent implements OnInit {
  show = false;
  location = 1;
  cause = 1;
  location2 = 1;
  cause2 = 1;

  constructor() { }

  ngOnInit() {
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
  });

  $("#textLocation").hide();
  $("#textCause").hide();

  $("#textLocation2").hide();
  $("#textCause2").hide();
  
  }

  ChangeLocation(){
    if(this.location == 0){
      $("#textLocation").fadeIn();
    }else{
      $("#textLocation").fadeOut();
    }
  }

  ChangeCause(){
    if(this.cause == 0){
      $("#textCause").fadeIn();
    }else{
      $("#textCause").fadeOut();
    }
  }

  ChangeLocation2(){
    if(this.location2 == 0){
      $("#textLocation2").fadeIn();
    }else{
      $("#textLocation2").fadeOut();
    }
  }

  ChangeCause2(){
    if(this.cause2 == 0){
      $("#textCause2").fadeIn();
    }else{
      $("#textCause2").fadeOut();
    }
  }


}
