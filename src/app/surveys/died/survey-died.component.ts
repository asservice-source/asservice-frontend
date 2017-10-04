import { Component, OnInit } from '@angular/core';
import { BaseSmart } from "../../labels/base.smart";
declare var $: any;
@Component({
  selector: 'app-survey-died',
  templateUrl: './survey-died.component.html',
  styleUrls: ['./survey-died.component.css']
})
export class SurverDiedComponent extends BaseSmart implements OnInit {

  constructor() {  
    super();
   }
  ngOnInit() {
  };



}
