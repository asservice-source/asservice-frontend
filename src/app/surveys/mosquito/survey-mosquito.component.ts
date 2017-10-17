import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
import { HeadFilterBean } from '../../beans/survey-head-filter.Bean';

@Component({
  selector: 'app-survey-mosquito',
  templateUrl: './survey-mosquito.component.html',
  styleUrls: ['./survey-mosquito.component.css']
})
export class SurveyMosquitoComponent extends BaseComponent implements OnInit {
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
  
   isDisable= true;
  constructor() { 
    super();
    this.api = new ApiHTTPService();
    let self = this;
    this.settings = this.getTabelSetting({
      seq: {
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
        title: 'สาเหตุการเสียชีวิต',
        filter: false, 
        width: '180px',
      },
      age: {
        title: 'อายุ',
        filter: false ,
        width: '70px',
      },
      status: {
        title: 'สถานะ',
        filter: false,
        width: '90px',
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

  changLocationNo(){
    if(this.mLocationNo==1){
      this.isDisable = false;
   
    }else{
      this.isDisable = true;
 
    }
  }

  onChangeFilter(event: HeadFilterBean){
    console.log("ChangeFilter");
    this.isShowList = false;
  }
  onSearch(event: HeadFilterBean){
      console.log(event);
      this.source = new LocalDataSource(this.datas);
      this.isShowList = true;
      super.setNg2STDatasource(this.source);
  }
}
