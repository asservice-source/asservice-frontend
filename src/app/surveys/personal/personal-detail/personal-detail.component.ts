import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
declare var $;

@Component({
  selector: 'app-survey-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class SurveyPersonalDetailComponent implements OnInit {

  // Receive parameters variables
  param_home_id: string

  // Data from api
  data;

  mTypeNo = 1;
  mStudyNo = 3;
  mLiveType = 1;
  citizenID = '1-4599-00321-23-1';
  mOwnerNo = 2;
  pDisease = 'มะเร็งปอด';
  pJob = 'ตัดอ้อย'
  pFname = 'สมหมาย';
  pLname = 'หลายใจ';
  birthDate = '16/09/2535';

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.receiveParameters();
    this.loadData();
    this.onReadyjQuery();
  }

  receiveParameters() {
    this.route.params.subscribe(params => {
      this.param_home_id = params['home_id'];
    });
  }

  loadData() {
    // this.http.get("assets/data_test/data_personal.json")
    //   .map(res => res.json())
    //   .subscribe(data => this.data = data);

    var tbl = $("#tableMember").dataTable({
      "order": [[1, "asc"]],
      "searching": false,
      "paging": false,
      "ajax": {
        // "url": "http://192.168.1.203:8080/api-asservice/address/province",
        "url": "assets/data_test/data_personal.json",
        "type": "GET",
        "datatype": "json",
        // "data": function (params) {
        //   params.myKey = villageNo;
        // },
        "dataSrc": ""
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
          "title": "ชื่อ-สกุล สมาชิก",
          "data": "name",
          "className": "text-left",
          "orderable": true
        },
        {
          "title": "รหัสประจำตัวประชาชน",
          "data": "citizen_id",
          "className": "text-center",
          "orderable": true
        },
        {
          "title": "วัน/เดือน/ปี เกิด",
          "data": "sex",
          "className": "text-center",
          "orderable": true
        },
        {
          "title": "อายุ",
          "data": "blood_type",
          "orderable": true
        },
        {
          "title": "สถานะ",
          "data": "date_of_birth",
          "className": "text-center",
          "orderable": true
        },
        {
          "data": null,
          "orderable": false,
          "className": "text-center",
          "render": function (row) {
            var citizenId = row.citizen_id;
            var btnEdit = "<button style=\"padding-top: 0px; padding-bottom: 0px\" class=\"btn btn-primary\" id=\"btnEdit\" citizen_id=\"" + citizenId + "\" >จัดการ</button>";
            return btnEdit;
          }
        }]
    });

    // Rerender data tables
    tbl.api().ajax.reload();
  }

  clickEdit(key: string) {
    $("#myModal").modal("show");
  }

  clickBack() {
    this.router.navigate(['/main/surveys/personal']);
  }

  onReadyjQuery() {

    $(function () {

      $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
      });

      $('#tableMember').on('click', '#btnEdit', function () {
        var citizenId = $(this).attr('citizen_id');
        alert(citizenId);
      });

    });

  }

}
