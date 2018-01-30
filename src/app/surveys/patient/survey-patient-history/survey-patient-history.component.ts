import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { BaseComponent } from '../../../base-component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-patient-history',
  templateUrl: './survey-patient-history.component.html',
  styleUrls: ['./survey-patient-history.component.css']
})
export class SurveyPatientHistoryComponent extends BaseComponent implements OnInit {

  public loading: boolean = false;

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
