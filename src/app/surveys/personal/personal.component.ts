import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Rx';
import { FilterBean } from "../../beans/filter.bean";
declare var $;

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();

  // Datatables options
  dtOptions: DataTables.Settings = {};

  // Data from api
  data;

  // Passing citizen id from row in table to personal-survey component
  cid: string;

  constructor(private http: Http, private router: Router) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  clickSearch(event: FilterBean) {

    let osmId = event.OSMID;
    let homeId = event.homeID;
    let villageId = event.villageID;

    this.http.get("assets/data_test/data_home_personal.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);

    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      columns: [{
        width: "15%"
      }, {
        width: "15%"
      }, {
        width: "15%"
      }, {
        width: "40%"
      }, {
        width: "10%"
      }, {
        width: "5%",
        orderable: false
      }]
    };

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

    // $("#rowTable").show();
  }

  clickManage(key: string) {
    this.router.navigate(['/main/surveys/personal-detail', key]);
  }

}
