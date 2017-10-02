import { Component, OnInit } from '@angular/core';
import { LabelManager } from "../../labels/label.manager";
declare var $: any;
@Component({
  selector: 'app-died',
  templateUrl: './died.component.html',
  styleUrls: ['./died.component.css']
})
export class DiedComponent implements OnInit {

  labelManager = new LabelManager();
  constructor() {    
   }
  ngOnInit() {
    this.labelManager.setupLabel();
  };


}
