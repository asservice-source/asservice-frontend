import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
declare var $;

@Component({
  selector: 'app-metabolic',
  templateUrl: './metabolic.component.html',
  styleUrls: ['./metabolic.component.css']
})
export class MetabolicComponent implements OnInit {

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
