import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import {ReportPath} from '../../global-config';

@Component({
  selector: 'app-summary-metabolic',
  templateUrl: './summary-metabolic.component.html',
  styleUrls: ['./summary-metabolic.component.css']
})
export class SummaryMetabolicComponent extends BaseComponent implements OnInit {
  public reportPath: string = ReportPath.METABOLIC;
  public report: string = this.surveyHeaderCode.METABOLIC;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
  }
  ngOnInit() {
    this.changeRef.detectChanges();
  }

}
