import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import {BaseComponent} from "./../../base-component"


declare var $;

@Component({
  selector: 'app-survey-metabolic',
  templateUrl: './survey-metabolic.component.html',
  styleUrls: ['./survey-metabolic.component.css']
})
export class SurveyMetabolicComponent extends BaseComponent implements OnInit {

  year = '2560';
  public citizenID  : string;
  dtOptions: DataTables.Settings = {};
  data;
  

  constructor(private http: Http, private router: Router) {
    super();
    this.loadData();
   }

  ngOnInit() {
  }

  loadData() {
      // const body = {xxx: 'xxx',
      //             aaa: 'aaa',
      //             bbb: 'bbb',
      //             ccc: 'ccc',
      //             ddd: 'ddd',
      //             };

    
    
          this.http.get("assets/test-list.json")
          .map(res => res.json())
          .subscribe(data => this.data = data);
    
        this.dtOptions = {
          pagingType: "full_numbers",
          processing: true,
          columns: [{
            width: "40px",
            orderable: false
          }, {
            width: ""
          }, {
            width: "220px"
          }, {
            width: "70px"
          }, {
            width: "70px"
          }, {
            width: "70px"
          }, {
            width: "70px",
            orderable: false
          }]
        };
    
      }

    openModal(key: string) {
      this.citizenID = key;
     $("#myModal").modal('show');
    
  }

}
