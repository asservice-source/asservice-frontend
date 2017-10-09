import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-survey-head-filter',
  templateUrl: './survey-head-filter.component.html',
  styleUrls: ['./survey-head-filter.component.css']
})
export class SurveyHeadFilterComponent implements OnInit {

  @Input() set surveyTypeID(surveyTypeID : number){
    console.log(this.surveyTypeID);
  }

  public villageID = 0;
  public OSMID = 0;
  constructor() { }

  ngOnInit() {

  }

}
