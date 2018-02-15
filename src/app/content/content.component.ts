import { Component, OnInit, Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http, Response } from '@angular/http';
import { BaseComponent } from '../base-component';
import { Service_Statistic } from '../api-managements/service-statistic';
import { Router } from '@angular/router';

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
  public percentMosquito = ''; percentMetabolic = ''; percentPopulation = '';
  public roundMonitorhici: any = {};
  public roundMetabolic: any = {};
  public roundPopulation: any = {};

  // Graph
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

  // Pie
  public pieChartLabels: string[] = ['พบลูกน้ำ', 'ไม่พบลูกน้ำ'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: string = 'pie';

  constructor(private http: Http, private route: Router) {
    super();
  }

  ngOnInit() {
    let self = this;
    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.MONITORHICI, function(data){
      self.roundMonitorhici = data;
    });
    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.METABOLIC, function(data){
      self.roundMetabolic = data;
    });
    self.apiHttp.getRoundCurrent(self.surveyHeaderCode.POPULATION, function(data){
      self.roundPopulation = data;
    });

   
    if(this.isStaffRole(this.userInfo.roleId)){
      self.apiHttp.statistic_family_summary_hospital(function (d) {
        if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
          let data = d.response;
          self.family = data.family;
          self.male = data.male;
          self.female = data.female;
          self.population = self.male + self.female;
        }
      });
      self.apiHttp.statistic_survey_summary_hospital(function (d) {
        self.setDataResponses(d);
      });
    }else{
      self.apiHttp.statistic_family_summary(self.userInfo.personId, function (d) {
        if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
          let data = d.response;
          self.family = data.family;
          self.male = data.male;
          self.female = data.female;
          self.population = self.male + self.female;
        }
      });
      self.apiHttp.statistic_survey_summary(self.userInfo.personId, function (d) {
        self.setDataResponses(d);
      });
    }
    
  }

  setDataResponses(d:any){
    let death = 0, cancer = 0, pregnant = 0, patient = 0, metabolic = 0;
    let noMosquito = 0, detectedMosquito = 0;
    let self = this; 
    if (d != null && d.status.toString().toUpperCase() == "SUCCESS") {
      let data = d.response;
      for (let item of data) {
        switch (item.headerTypeCode) {
          case 'MONITORHICI':
            if (item.total > 0) {
              self.percentMosquito = ((item.survey / item.total) * 100).toFixed(0) + '%';
            } else {
              self.percentMosquito = '0%';
            }
            break;
          case 'MONITORHICI_DETECTED':
            if (item.total > 0) {
              detectedMosquito = item.survey;
              noMosquito = item.total - item.survey;
            } else {
              detectedMosquito = 50;
              noMosquito = 50;
            }
            break;
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
            if (item.total > 0) {
              self.percentMetabolic = ((item.survey / item.total) * 100).toFixed(0) + '%';
            } else {
              self.percentMetabolic = '0%';
            }
            break;
          case 'POPULATION':
            if (item.total > 0) {
              self.percentPopulation = ((item.survey / item.total) * 100).toFixed(0) + '%';
            } else {
              self.percentPopulation = '0%';
            }
            break;
        }
      }
      self.barChartData = [{ data: [death, cancer, pregnant, patient, metabolic] }];
      self.pieChartData = [detectedMosquito, noMosquito];
    }
  
  }
  // events
  public barChartClicked(e: any): void {
    console.log('barChartClicked',e);
  }

  public barChartHovered(e: any): void {
    console.log('barChartHovered',e);
  }

  // events
  public pieChartClicked(e: any): void {
    console.log('pieChartClicked',e);
  }

  public pieChartHovered(e: any): void {
    console.log('pieChartHovered',e);
  }
}

