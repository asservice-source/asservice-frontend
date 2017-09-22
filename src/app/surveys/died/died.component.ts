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
  constructor() { }

  ngOnInit() {
    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
  });

  $("#textarea").hide();
  }

  onChange(){
    console.log(this.location);

    if(this.location == 0){
      $("#textarea").fadeIn();
    }else{
      $("#textarea").fadeOut();
    }
  }


}
