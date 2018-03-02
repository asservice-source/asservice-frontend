import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from '../../base-component';
import {ReportPath} from '../../global-config';

@Component({
  selector: 'app-summary-pregnant',
  templateUrl: './summary-pregnant.component.html',
  styleUrls: ['./summary-pregnant.component.css']
})
export class SummaryPregnantComponent extends BaseComponent implements OnInit {
  public reportPath: string = ReportPath.PREGNANCY
  public report: string = this.surveyHeaderCode.PREGNANT;
  constructor(private changeRef: ChangeDetectorRef) {
    super();
  }
  ngOnInit() {
    this.changeRef.detectChanges();
  }

}
