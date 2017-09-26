import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $("#person_list_id").hide();
  }

  clickShow(id){
    $("#person_list_id").toggle(700);
  }

}
