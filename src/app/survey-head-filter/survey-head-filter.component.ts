import { Component, OnInit, Input } from '@angular/core';
import { Headers } from '@angular/http';
import { NgModel } from '@angular/forms';
import { Http, Response, RequestOptions, RequestMethod } from "@angular/http";
declare var $;

@Component({
  selector: 'app-survey-head-filter',
  templateUrl: './survey-head-filter.component.html',
  styleUrls: ['./survey-head-filter.component.css']
})
export class SurveyHeadFilterComponent implements OnInit {

  @Input() set surveyTypeCode(surveyTypeCode: string) {
    this.typeCode = surveyTypeCode;
  }

  public villageID = 0;
  public OSMID = 0;
  public typeCode: string;
  public villageList;
  public typeid : number = 1;

  constructor(private http: Http) {
    this.getVillageNo();
  }

  ngOnInit() {

  }

  getVillageNo() {
    let param = { "hospitalCode": "04269" };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    this.http.post("http://192.168.1.203:8080/API-ASService/village/village_no_list", param, options)
      .map(res => res.json())
      .subscribe(data => this.villageList=data.list);

  }
}
