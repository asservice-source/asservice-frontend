import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../base-component";
import { Http } from "@angular/http";
declare var $: any;
@Component({
  selector: 'app-survey-died',
  templateUrl: './survey-died.component.html',
  styleUrls: ['./survey-died.component.css']
})
export class SurverDiedComponent extends BaseComponent implements OnInit {
 // Datatables options
  dtOptions: DataTables.Settings = {};
  public data;
  constructor(private http: Http) {  
    super();
   }
  ngOnInit() {
    this.loadData();
  };

  loadData() {
    
        this.http.get("assets/data_test/data_home_personal.json")
          .map(res => res.json())
          .subscribe(data => this.data = data);
    
        this.dtOptions = {
          pagingType: "full_numbers",
          searching: false,
          columns: [{
            orderable: false,
            width: "40px"
          }, {
           
          }, {
            width: "140px"
          }, {
            width: "70px"
          }, {
            width: "70px"
          }, {
            width: "70px"
          }, {
            width: "70px"
          }, {
            width: "60px",
            orderable: false
          }]
        };
      }
}
