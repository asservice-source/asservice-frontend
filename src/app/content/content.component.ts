import { Component, OnInit, Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http, Response } from '@angular/http';
import { BaseComponent } from '../base-component';
import { Service_Statistic } from '../api-managements/service-statistic';

declare var $: any
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
@Injectable()
export class ContentComponent extends BaseComponent implements OnInit {

  apiHttp: Service_Statistic = new Service_Statistic();

  public family = 0; population = 0; male = 0; female = 0;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['ผู้เสียชีวิต', 'ผู้ป่วยมะเร็ง', 'สตรีมีครรภ์', 'ผู้ป่วยและผู้พิการ', 'ผู้เสี่ยงโรคอ้วน'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartData: any[] = [
    { data: [0, 0, 0, 0, 0] }
  ];

  constructor(private http: Http) {
    super();
  }

  ngOnInit() {
    let self = this;

    let death = 0, cancer = 0, pregnant = 0, patient = 0, metabolic = 0;

    self.apiHttp.statistic_family_summary(self.userInfo.personId, function (d) {
      if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
        let data = d.response;
        self.family = data.family;
        self.male = data.male;
        self.female = data.female;
        self.population = self.family + self.male + self.female;
      }
    });

    self.apiHttp.statistic_survey_summary(self.userInfo.personId, function (d) {
      if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
        let data = d.response;
        for (let item of data) {
          switch (item.headerTypeCode) {
            case 'DEATH':
              death = item.survey;
              break;
            case 'CANCER':
              cancer = item.survey;
              break;
            case 'PREGNANT':
              pregnant = item.survey;
              break;
            case 'PATIENT':
              patient = item.survey;
              break;
            case 'METABOLIC':
              metabolic = item.survey;
              break;
          }
        }
        self.barChartData = [{ data: [death, cancer, pregnant, patient, metabolic] }];
      }
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

