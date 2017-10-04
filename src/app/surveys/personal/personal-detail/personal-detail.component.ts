import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { ActivatedRoute } from '@angular/router';
declare var $;

@Component({
  selector: 'app-survey-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class SurveyPersonalDetailComponent implements OnInit {

  // Receive parameters
  param_home_id: string

  // Datatables options
  dtOptions: DataTables.Settings = {};

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

  constructor(private http: Http, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.param_home_id = params['home_id'];
    });

    this.loadData();

    $('.datepicker').datepicker({
      format: 'mm/dd/yyyy',
      startDate: '-3d'
    });

  }

  loadData() {
    this.http.get("assets/data_test/data_personal.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);

    this.dtOptions = {
      pagingType: "full_numbers",
      paging: false,
      searching: false,
      columns: [{
        width: "40%"
      }, {
        width: "15%"
      }, {
        width: "15%"
      }, {
        width: "15%"
      }, {
        width: "10%"
      }, {
        width: "5%",
        orderable: false
      }]
    };
  }

  clickEdit(key: string) {
    $("#myModal").modal("show");
  }

}
