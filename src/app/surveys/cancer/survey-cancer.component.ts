import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { ApiHTTPService } from '../../service/api-http.service';
import { BaseComponent } from '../../base-component';
declare var $;

@Component({
  selector: 'app-cancer',
  templateUrl: './survey-cancer.component.html',
  styleUrls: ['./survey-cancer.component.css']
})
export class SurveyCancerComponent extends BaseComponent implements OnInit {

  mStatusNo = 0;

  isDisable = true;

  private apiHttp: ApiHTTPService = new ApiHTTPService();
  private URL_LIST_CANCER: string = "home/home_list";

  public settings: any;
  public listHomeData: any = [];
  public source: LocalDataSource;

  constructor(private http: Http, private router: Router) {
    super();

    let self = this;

    self.settings = self.getTabelSetting({
      no: {
        title: 'ลำดับ'
      },
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
        renderComponent: SurveyCancerButtonEditComponent,
        onComponentInitFunction(instance) {
          instance.action.subscribe((row) => {
            $("#modalCancer").modal({ backdrop: 'static', keyboard: false });
          });
        }
      }
    });
  }

  ngOnInit() {

  }

  changStatusNo() {
    if (this.mStatusNo == 21) {
      this.isDisable = false;

    } else {
      this.isDisable = true;
    }
  }

}

@Component({
  template: "<button (click)=\"clickEdit();\" style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\">แก้ไข</button>",
})
export class SurveyCancerButtonEditComponent implements ViewCell, OnInit {
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