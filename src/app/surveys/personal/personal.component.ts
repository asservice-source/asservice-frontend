import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit {

  // Datatables options
  dtOptions: DataTables.Settings = {};

  // Data from api
  data;

  // Passing citizen id from row in table to personal-survey component
  cid: string;

  constructor(private http: Http, private router: Router) {
    this.loadData();
  }

  ngOnInit(): void {

  }

  loadData() {

    this.http.get("assets/data_test/data_home_personal.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);

    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      columns: [{
        width: "15%"
      }, {
        width: "40%"
      }, {
        width: "15%"
      }, {
        width: "15%"
      }, {
        width: "10%"
      }, {
        width: "5%",
        orderable: false
      }]
    };

  }

  clickManage(key: string) {
    this.router.navigate(['/main/surveys/personal-detail', key]);
  }

}
