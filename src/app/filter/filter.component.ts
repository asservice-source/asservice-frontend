import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FilterBean } from "../beans/filter.bean";
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() notifyFilter: EventEmitter<FilterBean> = new EventEmitter<FilterBean>();
  public filterBean : FilterBean;
  constructor() { 
    this.filterBean = new FilterBean();
    this.filterBean.villageID = 0;
    this.filterBean.homeID = 0;
    this.filterBean.OSMID = 0;

  }

  ngOnInit() {
  }
  doSearchFilter(){
    this.notifyFilter.emit(this.filterBean);
  }
}
