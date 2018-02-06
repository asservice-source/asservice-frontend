import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActivatedRoute } from '@angular/router';
import { PatientBean } from '../../../beans/patient.bean';

@Component({
  selector: 'app-survey-patient-history',
  templateUrl: './survey-patient-history.component.html',
  styleUrls: ['./survey-patient-history.component.css']
})
export class SurveyPatientHistoryComponent extends BaseComponent implements OnInit {

  @Input() viewBean : PatientBean;

  public PatientBean : PatientBean;
  public loading: boolean = false;

  constructor() {
    super();
   }

  ngOnInit() {
    this.PatientBean = new PatientBean();
    this.PatientBean = this.viewBean;
    console.log("===================viewBean===================");
    console.log(this.viewBean);
  }

}
