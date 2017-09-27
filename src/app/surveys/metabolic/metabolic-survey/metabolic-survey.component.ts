import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';


@Component({
  selector: 'app-metabolic-survey',
  templateUrl: './metabolic-survey.component.html',
  styleUrls: ['./metabolic-survey.component.css']
})
export class MetabolicSurveyComponent implements OnInit {

  pFname = 'สมหมาย';
  pLname = 'หลายใจ';
  citizenID = '1-4599-00321-43-2';
  patentID = 'xxxxxxxxxxxxxxxxx';

  dataFor;

  year = '2560';


xxx;
  
 

  constructor(private http: Http) {

   }

  ngOnInit() {
    this.test();
    
  }

  test() {
    // let headers = new Headers({ 'Content-Type': 'application/json'});
    // let options = new RequestOptions({ headers: headers});

    // this.http.get('http://192.168.1.59:8080/asservice/gender/getAll', options)
    //   .map(res => res.json())
    //   .subscribe(
    //   data => {
    //     this.dataFor = data;
    //     console.log(this.dataFor);
    //     this.xxx=data[0].Name;
    //   },
    //   error => console.log(error)
    //   );
  }

}
