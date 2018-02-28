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
    
  }

  ngOnChanges(){
    let self = this;
    self.patientbean = new PatientBean();
    self.patientbean = self.data;
  }

}
