import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from "../../base-component";
import { ApiHTTPService } from "../../service/api-http.service";
import { ActionCustomViewComponent } from '../../action-custom-table/action-custom-view.component';

declare var $: any;
declare var bootbox:any;

@Component({
  selector: 'app-survey-died',
  templateUrl: './survey-died.component.html',
  styleUrls: ['./survey-died.component.css']
})
export class SurverDiedComponent extends BaseComponent implements OnInit {
 // Datatables options
 // dtOptions: DataTables.Settings = {};
  private http = new ApiHTTPService();
  public settings: any;
  public datas = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
     
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      
    },
    // ... list of items
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz",
     
    },
   
  ];
  
  constructor() {  
    super();
    let self = this;
    this.settings = this.getTabelSetting({
      id: {
        title: 'ID',
        filter: false,
      },
      name: {
        title: 'Full Name',
        filter: false
      },
      username: {
        title: 'User Name',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      action: {
        title: 'Action',
        filter: false,
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
    alert(row.action);
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
        
        // var tbl = $("#table-list").dataTable({
        //   pagingType: "full_numbers",
        //   paging: true,
        //   pageLength: 10,
        //   searching: true,
        //   columns: [{
        //     orderable: false,
        //     width: "40px"
        //   }, {
           
        //   }, {
        //     width: "140px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "60px",
        //     orderable: false
        //   }]
        // });


        // this.dtOptions = {
        //   pagingType: "full_numbers",
        //   paging: true,
        //   pageLength: 10,
        //   searching: true,
        //   columns: [{
        //     orderable: false,
        //     width: "40px"
        //   }, {
           
        //   }, {
        //     width: "140px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "70px"
        //   }, {
        //     width: "60px",
        //     orderable: false
        //   }]
        // };
      }
}
