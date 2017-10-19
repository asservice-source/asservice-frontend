import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-find-mosquito',
  templateUrl: './filter-find-mosquito.component.html',
  styleUrls: ['./filter-find-mosquito.component.css']
})
export class FilterFindMosquitoComponent implements OnInit {

  public villageNo : string = '0';
  public locationType : string = '0';
  public HomeNo: string = '0';
  public nameLength: number = 10;

  constructor() {

   }

  ngOnInit() {

  }

}
