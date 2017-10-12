import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { BaseComponent } from "./../../base-component";
import { PersonBean } from "../../beans/person.bean";
import { ApiHTTPService } from '../../service/api-http.service';
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';
import { HeadFilterBean } from '../../beans/survey-head-filter.Bean';

declare var $;

@Component({
  selector: 'app-survey-metabolic',
  templateUrl: './survey-metabolic.component.html',
  styleUrls: ['./survey-metabolic.component.css']
})
export class SurveyMetabolicComponent extends BaseComponent implements OnInit {

  public year = '2560';
  public citizenID: string = "0";

  public data;
  public mooID: number = 0;
  public xxx: string;
  public check: boolean = false;
  public metabolicHeadID: number = 0;
  public surveyTypeCode: string = "METABOLIC"; 
  public sources: any;
  public isHideList: boolean = true;
  

  private api: ApiHTTPService;
  public settings: any;

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

  doClick(row){
    alert(row.id);
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

    // this.dtOptions = {
    //   pagingType: "full_numbers",
    //   processing: true,
    //   columns: [{
    //     width: "40px",
    //     orderable: false
    //   }, {
    //     width: ""
    //   }, {
    //     width: "220px"
    //   }, {
    //     width: "70px"
    //   }, {
    //     width: "70px"
    //   }, {
    //     width: "70px"
    //   }, {
    //     width: "70px"
    //   }, {
    //     width: "70px"
    //   }, {
    //     width: "70px",
    //     orderable: false
    //   }]
    // };
  }

  openModal(key: string) {
    this.citizenID = key;
    $("#addMetabolicSurvey").modal('show');

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
