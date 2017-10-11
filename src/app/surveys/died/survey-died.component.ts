import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from "../../base-component";
import { ApiHTTPService } from "../../service/api-http.service";
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';
import { HeadFilterBean } from '../../beans/survey-head-filter.Bean';

declare var $: any;

@Component({
  selector: 'app-survey-died',
  templateUrl: './survey-died.component.html',
  styleUrls: ['./survey-died.component.css']
})
export class SurverDiedComponent extends BaseComponent implements OnInit {
 // Datatables options
 // dtOptions: DataTables.Settings = {};
  private api: ApiHTTPService;
  public settings: any;
  public surveyTypeCode: string = 'DEATH';
  public isHideList: boolean = true;
  public sources: any;
  public datas = [
    {
      id: 1,
      name: "Leanne Graham",
      citizenId: "1-4113-00-1349-8-9",
      reason: "ลืมหายใจ",
      age: 38,
      status: "ยืนยัน"
    },
    {
      id: 2,
      name: "Ervin Howell",
      citizenId: "1-4113-00-1349-8-0",
      reason: "ลืมหายใจ",
      age: 54,
      status: "ยืนยัน"
      
    },
    {
      id: 11,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2259-6-4",
      reason: "ลืมหายใจ",
      age: 32,
      status: "ยืนยัน"
     
    },
    {
      id: 12,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-2254-6-2",
      reason: "ลืมหายใจ",
      age: 62,
      status: "ยืนยัน"
     
    },
    {
      id: 13,
      name: "Nicholas DuBuque",
      citizenId: "1-4113-00-3259-6-5",
      reason: "ลืมหายใจ",
      age: 42,
      status: "ยืนยัน"
     
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
  onChangeFilter(event: HeadFilterBean){
    console.log("ChangeFilter");
    this.isHideList = true;
  }
  onSearch(event: HeadFilterBean){
      console.log(event);
      this.sources = this.datas;
      this.isHideList = false;

  }
  
  doClick(row){
    alert(row.id);
  }
  loadData() {

        // let self = this;
        // this.http.get('address/province', {}, function(data){
        //   self.datas = data;
        // });

  
        

      }

      fetchData(data){
        //var dtTable = $("#table-list").dataTable();
        var tempTable = $('#table-list').html();
        $('#container-table').html('');
        $('#container-table').html(tempTable);
        data = [["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800", "2011/04/25", "$320,800"]]
        var dtTable = $("#table-list").dataTable({
          data: data
        });
      }
}
