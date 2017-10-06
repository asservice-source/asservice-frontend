import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { FilterBean } from "../../beans/filter.bean";
declare var $: any;

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit, AfterViewInit {

  // public data: any;

  constructor(private http: Http, private router: Router) {

  }

  ngOnInit(): void {
    this.bindJS();
  }

  ngAfterViewInit() {

  }

  clickSearch(event: FilterBean) {

    let villageNo = event.villageID;
    let homeId = event.homeID;
    let osmId = event.OSMID;

    // this.http.get("assets/data_test/data_home_personal.json")
    //   .map(res => res.json())
    //   .subscribe(data => this.data = data);

    // $.ajax({
    //   url: "http://192.168.1.203:8080/api-asservice/address/province",
    //   type: "GET",
    //   datatype: "JSON",
    //   async: false,
    //   success: function (data) {
    //     console.log(data);

    //   }
    // });

    var tbl = $("#tablePersonal").dataTable({
      "destroy": true,
      "order": [[1, "asc"]],
      "searching": false,
      "ajax": {
        // "url": "http://192.168.1.203:8080/api-asservice/address/province",
        "url": "assets/data_test/data_home_personal.json",
        "type": "GET",
        "datatype": "json",
        "data": function (d) {
          d.myKey = villageNo;
          d.myKey = homeId;
          d.myKey = osmId;
        },
        "dataSrc": ""
      },
      "columns": [
        {
          "data": null,
          "orderable": false,
          "className": "text-center",
          "render": function (data, type, row, meta) {
            return meta.row + 1;
          }
        },
        {
          "data": "village_no",
          "className": "text-center",
          "orderable": true
        },
        {
          "data": "home_no",
          "className": "text-center",
          "orderable": true
        },
        {
          "data": "holder_name",
          "orderable": true
        },
        {
          "data": "member_count",
          "className": "text-center",
          "orderable": true
        },
        {
          "data": null,
          "orderable": false,
          "className": "text-center",
          "render": function (row) {
            var homeId = row.home_id;
            var btnManage = "<button style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\" id=\"home_id\" home_id=\"" + homeId + "\" >จัดการ</button>";
            return btnManage;
          }
        }]
    });

    // Rerender data tables
    tbl.api().ajax.reload();

    $("#panel_table_personal").show();
  }

  // clickManage(key: string) {
  //   this.router.navigate(['/main/surveys/personal-detail', key]);
  // }

  bindJS() {

    let component = this;
    $(function () {

      $('#tablePersonal').on('click', '#home_id', function () {
        var homeId = $(this).attr('home_id');
        // document.location.href = '/main/surveys/personal-detail/' + homeId;
        component.router.navigate(['/main/surveys/personal-detail', homeId]);
      });

    });

  }

}
