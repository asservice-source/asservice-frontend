import { Component, OnInit} from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import "rxjs"

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  data;

  constructor(private http: Http) {
    // this.http.get("assets/data_personal.json")
    //   .map((res: Response) => res.json())
    //   .subscribe((data) => this.data = data, (err) => console.log(err), () => console.log("Success"));

    this.http.get("assets/data_personal.json")
      .map(res => res.json())
      .subscribe(data => this.data = data);

    this.dtOptions = {
      pagingType: "full_numbers",
      processing: true,
      columns: [{
        width: "5%",
        orderable: false
      }, {
        width: "30%"
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

  ngOnInit(): void {

  }

}
