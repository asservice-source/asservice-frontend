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
    this.onReadyjQuery();
  }

  ngAfterViewInit() {

  }

  clickSearch(event: FilterBean) {
    // let villageNo = event.villageID;
    // let homeId = event.homeID;
    // let osmId = event.OSMID;

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

    // jsonParams["villageNo"] = event.villageID;
    // jsonParams["osmId"] = event.OSMID;
    // jsonParams["id"] = event.homeID;

    var jsonParams = {};
    jsonParams["villageNo"] = "1";
    jsonParams["osmId"] = "1234567890123";
    jsonParams["id"] = "1";

    var tbl = $("#tablePersonal").dataTable({
      "order": [[1, "asc"]],
      "searching": false,
      "ajax": {
        "url": "http://192.168.2.227:8080/API-ASService/home/home_list",
        // "url": "assets/data_test/data_home_personal.json",
        "type": "POST",
        "datatype": "json",
        "contentType": "application/json",
        "data": function () {
          return JSON.stringify(jsonParams);
        },
        "dataSrc": "list"
      },
      "columns": [
        {
          "title": "ลำดับ",
          "data": null,
          "orderable": false,
          "className": "text-center",
          "render": function (data, type, row, meta) {
            return meta.row + 1;
          }
        },
        {
          "title": "หมู่",
          "data": "villageNo",
          "className": "text-center",
          "orderable": true
        },
        {
          "title": "บ้านเลขที่",
          "data": "homeNo",
          "className": "text-center",
          "orderable": true
        },
        {
          "title": "ชื่อ-สกุล เจ้าบ้าน",
          "data": null,
          "className": "dt-head-center dt-body-left",
          "orderable": true,
          "render": function (row) {
            var fullName = row.holder.firstName + " " + row.holder.lastName;
            return fullName;
          }
        },
        {
          "title": "จำนวนสมาชิก",
          "data": "memberAmount",
          "className": "dt-head-center dt-body-right",
          "orderable": true
        },
        {
          "title": "สถานะ",
          "data": "osmId",
          "className": "text-center",
          "orderable": true
        },
        {
          "data": null,
          "orderable": false,
          "className": "text-center",
          "render": function (row) {
            var homeId = row.home_id;
            var btnManage = "<button style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\" id=\"btnManage\" home_id=\"" + homeId + "\" >จัดการ</button>";
            return btnManage;
          }
        }]
    });

    // Rerender data tables
    tbl.api().ajax.reload();

    $("#panel_table_personal").show();
  }

  onReadyjQuery() {
    let _self = this;
    $(function () {

      $('#tablePersonal').on('click', '#btnManage', function () {
        var homeId = $(this).attr('home_id');
        _self.router.navigate(['/main/surveys/personal-detail', homeId]);
      });

    });
  }

}
