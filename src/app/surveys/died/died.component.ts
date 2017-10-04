import { Component, OnInit } from '@angular/core';
import { BaseSmart } from "../../labels/base.smart";
declare var $: any;
@Component({
  selector: 'app-died',
  templateUrl: './died.component.html',
  styleUrls: ['./died.component.css']
})
export class DiedComponent extends BaseSmart implements OnInit {

  constructor() {  
    super();
   }
  ngOnInit() {
  };



}
