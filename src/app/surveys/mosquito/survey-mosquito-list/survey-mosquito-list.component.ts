import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';

@Component({
  selector: 'app-survey-mosquito-list',
  templateUrl: './survey-mosquito-list.component.html',
  styleUrls: ['./survey-mosquito-list.component.css']
})
export class SurveyMosquitoListComponent extends BaseComponent implements OnInit {

  mLocationNo = 0;
  public surveyTypeCode: string = 'MOSQUITO';
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  private api: ApiHTTPService;
  public settings: any;

  public datas = [
    {
      id: 1,
      name: "Leanne Graham",
      citizenId: "1-4113-00-1349-8-9",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 38,
      type: "ติดบ้าน",
      homeNo: "112/1",
      totalSurvey: "25",
      totalDetect: "13",
      localType: "สถานศาสนา",
      totalCI: "53.57"
    },
    {
      id: 2,
      name: "Ervin Howell",
      citizenId: "1-4113-00-1349-8-0",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 54,
      type: "ติดบ้าน",
      homeNo: "24/9",
      totalSurvey: "44",
      totalDetect: "12",
      localType: "โรงเรียน",
      totalCI: "53.57"

    },
    {
      id: 11,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2259-6-4",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 32,
      type: "ติดบ้าน",
      homeNo: "58/7",
      totalSurvey: "29",
      totalDetect: "7",
      localType: "หลังคาเรือน",
      totalCI: "53.57"

    },
    {
      id: 12,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2254-6-2",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 62,
      type: "ติดบ้าน",
      homeNo: "55/12",
      totalSurvey: "50",
      totalDetect: "12",
      localType: "ศูนย์เด็กเล็ก",
      totalCI: "53.57"

    },
    {
      id: 13,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-3259-6-5",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 42,
      type: "ติดบ้าน",
      homeNo: "222/2",
      totalSurvey: "88",
      totalDetect: "22",
      localType: "หน่วยราชการ",
      totalCI: "53.57"

    },
  ];

  isDisable = true;
  constructor() {
    super();
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
        title: 'ชื่อาอสาสมัคร',
        filter: false
      },
      homeNo: {
        title: 'เลขที่',
        filter: false,
        width: '90px',
      },
      localType: {
        title: 'สถานที่',
        filter: false,
        width: '130px',
      },
      totalSurvey: {
        title: 'ภาชนะที่สำรวจ',
        filter: false,
        width: '150px',
      },
      totalDetect: {
        title: 'ภาชนะที่พบ',
        filter: false,
        width: '150px',
      },
      action: {
        title: 'จัดการ',
        filter: false,
        sort: false,
        width: '100px',
        type: 'custom',
        renderComponent: ActionCustomViewComponent,
        onComponentInitFunction(instance) {

          instance.action.subscribe(row => {
            alert(row.action);
          });
        }
      }
    });
  }

  ngOnInit() {

  }

  changLocationNo() {
    if (this.mLocationNo == 1) {
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
    this.source = new LocalDataSource(this.datas);
    this.isShowList = true;
    super.setNg2STDatasource(this.source);
  }
}
