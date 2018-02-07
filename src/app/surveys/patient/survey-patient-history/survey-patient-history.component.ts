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

  @Input() data : PatientBean;

  public patientbean : PatientBean;
  public loading: boolean = false;

  constructor(private changeRef: ChangeDetectorRef) {
    super();
   }

  ngOnInit() {
    //this.changeRef.detectChanges();
    this.patientbean = new PatientBean();
    this.patientbean = this.data;
    console.log("=========== view history data ===========");
    console.log(this.patientbean);
  }

  

}
