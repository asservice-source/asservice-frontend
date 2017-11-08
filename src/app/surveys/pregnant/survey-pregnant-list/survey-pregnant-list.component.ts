import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { BaseComponent } from "./../../../base-component";
import { PersonBean } from "../../../beans/person.bean";
import { ApiHTTPService } from '../../../service/api-http.service';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';
import { PregnantBean} from '../../../beans/pregnant.bean'
declare var $: any

@Component({
  selector: 'app-survey-pregnant-list',
  templateUrl: './survey-pregnant-list.component.html',
  styleUrls: ['./survey-pregnant-list.component.css']
})
export class SurveyPregnantListComponent extends BaseComponent implements OnInit {

  public surveyTypeCode: string = "PREGNANT";
  private api: ApiHTTPService;
  public settings: any;
  public data;
  public isShowList: boolean = true;
  public source: LocalDataSource = new LocalDataSource();
  public action: string = this.ass_action.ADD;
  public pregnantbean : PregnantBean = new PregnantBean();


  constructor(private http: Http, private router: Router,private changeRef: ChangeDetectorRef) {
    super();
    this.loadData();
    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTabelSetting({
      name: {
        title: 'ชื่อ - นามสกุล',
        filter: false,
      },
      cID: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      wombNo: {
        title: 'ครรภ์ที่',
        filter: false,
        width: '90px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      bornDueDate: {
        title: 'วันกำหนดคลอด',
        filter: false,
        width: '150px',
        type:'html',
        valuePrepareFunction: (cell, row) => { 
          return '<div class="text-center">'+cell+'</div>'
        }
      },
      action: {
        title: 'การทำงาน',
        filter: false,
        sort: false,
        width: '120px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: PregnantBean, cell) => {
            console.log(row);
            if(row && row.action.toUpperCase()==self.ass_action.EDIT){
              self.pregnantbean = row;
              self.onModalFrom(self.ass_action.EDIT);
            }
          });
        }
      }
    });
  }
  ngOnInit() {
    this.setUpTable();
  }

  loadData() {
    let self = this;
    this.http.get("assets/test-list.json")
      .map(res => res.json())
      .subscribe(function(response){
        self.data = response;
        self.setUpTable();
      });

  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
   this.setUpTable();
  }

  onModalFrom(action: string){
    this.action = action;
    this.changeRef.detectChanges();
    $('#find-person-md').modal('show');
  }

  setUpTable() {
    this.source = new LocalDataSource(this.data);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }

}
