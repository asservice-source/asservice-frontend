import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../../base-component";
import { ApiHTTPService } from "../../service/api-http.service";
declare var $: any;
declare var bootbox:any;
@Component({
  selector: 'app-survey-died',
  templateUrl: './survey-died.component.html',
  styleUrls: ['./survey-died.component.css']
})
export class SurverDiedComponent extends BaseComponent implements OnInit {
 // Datatables options
  dtOptions: DataTables.Settings = {};
  public data;
  private http = new ApiHTTPService();
  constructor() {  
    super();
   }
  ngOnInit() {
    this.loadData();
  };

  loadData() {
    
        // this.http.get("assets/data_test/data_home_personal.json")
        //   .map(res => res.json())
        //   .subscribe(data => this.data = data);
        let seft = this;
        this.http.get('address/province', {}, function(data){
          seft.data = data;
          //seft.fetchData(data);
        });

        
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
