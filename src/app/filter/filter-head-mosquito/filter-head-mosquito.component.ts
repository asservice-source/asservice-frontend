import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-filter-head-mosquito',
  templateUrl: './filter-head-mosquito.component.html',
  styleUrls: ['./filter-head-mosquito.component.css']
})
export class FilterHeadMosquitoComponent extends BaseComponent implements OnInit {

  public villageNo : string = '0';
  public locationType : string = '0';
  public HomeNo: string = '0';
  public nameLength: number = 10;

  constructor() {
    super();
   }

  ngOnInit() {

  }
  changLocationNo(){

  }
}
