import { Component, OnInit,Input } from '@angular/core';
import {Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import { Http, Response, RequestOptions } from "@angular/http";
declare var $;

@Component({
  selector: 'app-survey-head-filter',
  templateUrl: './survey-head-filter.component.html',
  styleUrls: ['./survey-head-filter.component.css']
})
export class SurveyHeadFilterComponent implements OnInit {

  @Input() set surveyTypeID(surveyTypeID : number){
    this.typeid = surveyTypeID;
  }

  public villageID = 0;
  public OSMID = 0;
  public typeid:number;
  public data;

  constructor(private http: Http) {
    this.getVillageNo();
   }

  ngOnInit() {
    console.log(this.data);
  }

  getVillageNo(){

    const body = { "hospitalCode":"04269" }

    this.http.post("http://192.168.2.227:8080/API-ASService/village/village_no_list",body)
    .map(res => res.json())
    .subscribe(data => this.data = data);
    
  }

}
