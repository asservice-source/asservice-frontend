import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { BaseComponent } from "./../../base-component";
import { PersonBean } from "../../beans/person.bean";
import { ApiHTTPService } from '../../service/api-http.service';
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';
import { HeadFilterBean } from '../../beans/survey-head-filter.Bean';

declare var $: any
@Component({
  selector: 'app-pregnant',
  templateUrl: './survey-pregnant.component.html',
  styleUrls: ['./survey-pregnant.component.css']
})
export class SurveyPregnantComponent extends BaseComponent implements OnInit {
  
  public surveyTypeCode: string = "PREGNANT";
  private api: ApiHTTPService;
  public settings: any;
  public data;
  public isHideList:boolean = true;
  public sources: any;
  
  constructor(private http: Http, private router: Router) { 
    super();
    this.loadData();
    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTabelSetting({
      id: {
        title: 'ลำดับ',
        filter: false,
        sort: false,
        width: '60px',
      },
      name: {
        title: 'ชื่อ - นามสกุล',
        filter: false,
      },
      cID: {
        title: 'เลขประจำตัวประชาชน',
        filter: false, 
        width: '200px',
      },
      homeID: {
        title: 'บ้านเลขที่',
        filter: false, 
        width: '180px',
      },
      gender: {
        title: 'เพศ',
        filter: false ,
        width: '70px',
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '90px',
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          // instance.view.subscribe(row => {
          //   self.doClick(row);
          // });
          // instance.edit.subscribe(row => {
          //   self.doClick(row);
          // });
          // instance.delete.subscribe(row => {
          //   self.doClick(row);
          // });

          instance.action.subscribe(row => {
            self.doClick(row);
          });
        }
      }
    });
  }
  ngOnInit() {
  }

  doClick(row){
    alert(row.id);
  }

  loadData() {
    this.http.get("assets/test-list.json")
    .map(res => res.json())
    .subscribe(data => this.data = data);

  }

  onChangeFilter(event: HeadFilterBean){
    console.log("ChangeFilter");
    this.isHideList = true;
  }
  onSearch(event: HeadFilterBean){
      console.log(event);
      this.sources = this.data;
      this.isHideList = false;

  }
 
}
