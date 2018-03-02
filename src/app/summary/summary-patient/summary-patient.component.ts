import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import {ReportPath} from '../../global-config';

@Component({
  selector: 'app-summary-patient',
  templateUrl: './summary-patient.component.html',
  styleUrls: ['./summary-patient.component.css']
})
export class SummaryPatientComponent extends BaseComponent implements OnInit {
  public reportPath: string = ReportPath.PATIENT;
  public report: string = this.surveyHeaderCode.PATIENT;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
  }
  ngOnInit() {
    this.changeRef.detectChanges();
  }

}
