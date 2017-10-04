import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
declare var $;

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

    this.http.get("assets/data_personal.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);

    this.dtOptions = {
      pagingType: "full_numbers",
      processing: true,
      columns: [{
        width: "5%",
        orderable: false
      }, {
        width: "30%"
      }, {
        width: "15%"
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
    
    // $("#myModal").modal('show');
    this.router.navigate(['survey'], { queryParams: { cid: key } });
  }

}
