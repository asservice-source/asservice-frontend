import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import * as _ from "lodash";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  public data: any[];
  public rowsOnPage = 5;
  public sortBy = "no";
  public sortOrder = "asc";

  member = 4;

  constructor(private http: Http) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.http.get("assets/data_personal.json")
      .subscribe((data) => {
        setTimeout(() => {
          this.data = _.orderBy(data.json(), this.sortBy, [this.sortOrder]);
          // this.data = _.slice(this.data, this.activePage, this.activePage + this.rowsOnPage);
        }, 1000);
      });
  }

  public onSortOrder(event) {
    this.loadData();
  }
  
}
