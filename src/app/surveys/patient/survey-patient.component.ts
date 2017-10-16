import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { ApiHTTPService } from '../../service/api-http.service';
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';
import { HeadFilterBean } from '../../beans/survey-head-filter.Bean';
declare var $;
@Component({
  selector: 'app-survey-patient',
  templateUrl: './survey-patient.component.html',
  styleUrls: ['./survey-patient.component.css']
})
export class SurveyPatientComponent extends BaseComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  public patientType:number = 0;
  public isShowsick : boolean = true;
  public surveyTypeCode: string = "PATIENT";

  private api: ApiHTTPService;
  public settings: any;
  public isHideList: boolean = true;
  public sources: any;
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
        width: '180px',
      },
      gender: {
        title: 'เพศ',
        filter: false ,
        width: '50px',
      },
      age: {
        title: 'อายุ',
        filter: false,
        width: '50px',
      },
      type: {
        title: 'ประเภทผู้พิการ/ป่วย',
        filter: false,
        width: '170px',
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

  checkPatient(){
    if(this.patientType == 1){
       this.isShowsick = false;
    }else if(this.patientType == 2){
        $("#disabled").hide();
    }
  }

  loadData() {
  
      // this.dtOptions = {
      //   pagingType: "full_numbers",
      //   processing: true,
      //   columns: [{
      //     width: "40px",
      //     orderable: false
      //   }, {
      //     width: ""
      //   }, {
      //     width: "200px"
      //   }, {
      //     width: "50px"
      //   }, {
      //     width: "170px"
      //   }, {
      //     width: "100px"
      //   }, {
      //     width: "70px",
      //     orderable: false
      //   }]
      // };
  
    }

    onChangeFilter(event: HeadFilterBean){
      console.log("ChangeFilter");
      this.isHideList = true;
    }
    onSearch(event: HeadFilterBean){
        console.log(event);
        this.sources = this.datas;
        this.isHideList = false;
  
    }


}
