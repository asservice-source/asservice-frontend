import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
declare var $;

@Component({
  selector: 'app-survey-metabolic',
  templateUrl: './survey-metabolic.component.html',
  styleUrls: ['./survey-metabolic.component.css']
})
export class SurveyMetabolicComponent implements OnInit {

  year = '2560';
  public citizenID  : string;
  dtOptions: DataTables.Settings = {};
  data;

  constructor(private http: Http, private router: Router) {
    this.loadData();
   }

  ngOnInit() {
  }

  loadData() {
    
        this.http.get("assets/test-list.json")
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

    openModal(key: string) {
      this.citizenID = key;
     $("#myModal").modal('show');
    
  }

}
