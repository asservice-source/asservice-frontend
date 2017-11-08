import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { CancerBean } from '../../../beans/cancer.bean';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';

declare var $;

@Component({
  selector: 'app-survey-cancer-list',
  templateUrl: './survey-cancer-list.component.html',
  styleUrls: ['./survey-cancer-list.component.css']
})
export class SurveyCancerListComponent extends BaseComponent implements OnInit {

  mStatusNo = 0;

  isDisable = true;

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  
  public isShowList: boolean = false;
  public settings: any;
  //public source: LocalDataSource;
  public source: LocalDataSource = new LocalDataSource();
  constructor(private http: Http, private router: Router) {
    super();

    let self = this;

    self.settings = self.getTabelSetting({
      name: {
        title: 'ชื่อ-สกุล',
        filter: false
      },
      age: {
        title: 'อายุ',
        filter: false
      },
      cancerType: {
        title: 'ชนิดของมะเร็ง',
        filter: false
      },
      hospital: {
        title: 'รพ.ที่รักษา',
        filter: false
      },
      sickDate: {
        title: 'วันที่ป่วย',
        filter: false
      },
      telNo: {
        title: 'เบอร์ติดต่อ',
        filter: false
      },
      others: {
        title: 'อื่นๆ',
        filter: false
      },
      status: {
        title: 'สถานะ',
        filter: false
      },
      inputDate: {
        title: 'วันที่ลงข้อมูล',
        filter: false
      },
      action: {
        title: '',
        filter: false,
        type: 'custom',
        renderComponent: SurveyCancerListButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row: CancerBean) => {
            
            $("#modalCancer").modal({ backdrop: 'static', keyboard: false });
          });
        }
      }
    });
  }

  ngOnInit() {
    let self = this;

    self.bindCancerList();
  }

  bindCancerList() {
    let self = this;

    // let URL_LIST_CANCER: string = "homemember/homemember_by_home";
    // let params = {};

    // self.apiHttp.post(URL_LIST_CANCER, params, function (d) {
    //   if (d != null && d.status.toUpperCase() == "SUCCESS") {
    //     console.log(d);
    //     self.source = new LocalDataSource(d.list);
    //     self.setNg2STDatasource(self.source);
    //   } else {
    //     console.log('survey-cancer-list(bindCancerList) occured error(s) => ' + d.message);
    //   }
    // });

    this.http.get("assets/data_test/data_cancer_list.json")
      .map(res => res.json())
      .subscribe((data) => {
        self.source = new LocalDataSource(data);
        self.setNg2STDatasource(self.source);
      });
  }

  changStatusNo() {
    if (this.mStatusNo == 21) {
      this.isDisable = false;

    } else {
      this.isDisable = true;
    }
  }

  onChangeFilter(event: FilterHeadSurveyBean) {
    console.log("ChangeFilter");
    this.isShowList = false;
  }
  onSearch(event: FilterHeadSurveyBean) {
    console.log(event);
    //get datas to (__) 
    this.source = new LocalDataSource();
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }
}

@Component({
  template: "<button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">แก้ไข</button>",
})
export class SurveyCancerListButtonEditComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  clickEdit() {
    this.action.emit(this.rowData);
  }

  
}