import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { BaseComponent } from "./../../base-component";
import { PersonBean } from "../../beans/person.bean";

declare var $;

@Component({
  selector: 'app-survey-metabolic',
  templateUrl: './survey-metabolic.component.html',
  styleUrls: ['./survey-metabolic.component.css']
})
export class SurveyMetabolicComponent extends BaseComponent implements OnInit {

  public year = '2560';
  public citizenID: string = "0";
  public dtOptions: DataTables.Settings = {};
  public data;
  public mooID: number = 0;
  public xxx: string;
  public check: boolean = false;
  public metabolicHeadID: number = 0;
  public surveyTypeCode: string = "METABOLIC";  

  constructor(private http: Http, private router: Router) {
    super();
    this.loadData();
  }

  ngOnInit() {

  }

  save() {
    this.check = true
  }

  loadData() {
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
    $("#addMetabolicSurvey").modal('show');

  }

  getCitizen(event: PersonBean) {
    this.citizenID = event.citizenID;
    console.log(this.citizenID);
    
  }

}
