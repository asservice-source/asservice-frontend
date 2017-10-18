import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ApiHTTPService } from '../../../service/api-http.service';
import { ActionCustomViewComponent } from '../../../action-custom-table/action-custom-view.component';
import { FilterHeadSurveyBean } from '../../../beans/filter-head-survey.bean';
import { LocalDataSource } from 'ng2-smart-table';
declare var $;

@Component({
  selector: 'app-survey-patient-list',
  templateUrl: './survey-patient-list.component.html',
  styleUrls: ['./survey-patient-list.component.css']
})
export class SurveyPatientListComponent extends BaseComponent implements OnInit {

  public patientType: number = 0;
  public isShowsick: boolean = true;
  public surveyTypeCode: string = "PATIENT";

  private api: ApiHTTPService;
  public settings: any;
  public isShowList: boolean = false;
  public source: LocalDataSource = new LocalDataSource();
  public healtInsuranceID = 7;
  public datas = [
    {
      id: 1,
      name: "Leanne Graham",
      citizenId: "1-4113-00-1349-8-9",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 38,
      type: "ติดบ้าน"
    },
    {
      id: 2,
      name: "Ervin Howell",
      citizenId: "1-4113-00-1349-8-0",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 54,
      type: "ติดบ้าน"

    },
    {
      id: 11,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2259-6-4",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 32,
      type: "ติดบ้าน"

    },
    {
      id: 12,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2254-6-2",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 62,
      type: "ติดบ้าน"

    },
    {
      id: 13,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-3259-6-5",
      reason: "อุบัติเหตุทางรถยนต์",
      gender: "ชาย",
      age: 42,
      type: "ติดบ้าน"

    },
  ];

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
        title: 'ชื่อ - นามสกุล',
        filter: false
      },
      citizenId: {
        title: 'เลขประจำตัวประชาชน',
        filter: false,
        width: '200px',
      },
      reason: {
        title: 'สาเหตุความพิการ/ป่วย',
        filter: false,
        width: '190px',
      },
      gender: {
        title: 'เพศ',
        filter: false,
        width: '70px',
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '70px',
      },
      type: {
        title: 'ประเภท',
        filter: false,
        width: '120px',
      },
      action: {
        title: 'การทำงาน',
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

  checkPatient() {
    if (this.patientType == 1) {
      this.isShowsick = false;
    } else if (this.patientType == 2) {
      $("#disabled").hide();
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
