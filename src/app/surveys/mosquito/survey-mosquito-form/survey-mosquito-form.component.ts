import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { BaseComponent } from '../../../base-component';

var $ : any;
@Component({
  selector: 'app-survey-mosquito-form',
  templateUrl: './survey-mosquito-form.component.html',
  styleUrls: ['./survey-mosquito-form.component.css']
})
export class SurveyMosquitoFormComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() action: string;

  public isFindHome: boolean = true;
  public isShowForm: boolean = false;


  ngAfterViewInit(): void {
   
  }

  constructor() {
    super();
   }

  ngOnInit() {
  }

  onBack() {
    // this.patientbean = new PatientBean();
    this.isFindHome = true;
    this.isShowForm = false;
    if (this.ass_action.EDIT == this.action) {
      $('#find-person-md').modal('hide');
    }
  }

}
